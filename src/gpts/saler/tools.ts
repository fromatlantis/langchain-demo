import { ChainTool, DynamicTool } from 'langchain/tools';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { BaseLanguageModel } from 'langchain/base_language';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { products } from './products';
import { STAGE_ANALYZER_INCEPTION_PROMPT } from './prompts';
import { LLMChain } from 'langchain/chains';

const customTool = new DynamicTool({
    name: 'get_word_length',
    description: 'Returns the length of a word.',
    func: async (input: string) => input.length.toString(),
});

/** Define your list of tools. */
export const tools = [customTool];

export async function productSearch(llm: BaseLanguageModel, embeddings: OpenAIEmbeddings) {
    const splitter = new CharacterTextSplitter({
        chunkSize: 10,
        chunkOverlap: 0,
    });
    const docs = await splitter.createDocuments([products.content]);
    const new_docs = await splitter.splitDocuments(docs);
    const vectorstore = await MemoryVectorStore.fromDocuments(new_docs, embeddings);
    const retriever = vectorstore.asRetriever();
    const chain = RetrievalQAChain.fromLLM(llm, retriever);
    return new ChainTool({
        name: '产品搜索',
        description: '当您需要回答有关床垫产品信息的问题时非常有用',
        chain,
    });
}
export const conversationStage = (llm: BaseLanguageModel, verbose: boolean = false) => {
    const prompt = new PromptTemplate({
        template: STAGE_ANALYZER_INCEPTION_PROMPT,
        inputVariables: ['chat_history', 'conversation_stage_id'],
    });
    const chain = new LLMChain({ llm, prompt, verbose });
    return new ChainTool({
        name: 'conversation-stage',
        description: '当您需要从对话历史中判断你现在所处在哪个阶段时非常有用',
        chain,
    });
};
