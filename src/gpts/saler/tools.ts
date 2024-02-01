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
import { StringOutputParser } from '@langchain/core/output_parsers';
import { works } from './works';

const customTool = new DynamicTool({
    name: 'get_word_length',
    description: 'Returns the length of a word.',
    func: async (input: string) => input.length.toString(),
});

/** Define your list of tools. */
export const tools = [customTool];

export async function mattressesSearch(llm: BaseLanguageModel, embeddings: OpenAIEmbeddings) {
    const splitter = new CharacterTextSplitter({
        chunkSize: 10,
        chunkOverlap: 0,
    });
    const docs = await splitter.createDocuments([products.content]);
    const new_docs = await splitter.splitDocuments(docs);
    const vectorstore = await MemoryVectorStore.fromDocuments(new_docs, embeddings);
    const retriever = vectorstore.asRetriever();
    const template = `使用以下上下文来回答用户的问题。
----------------
{context}
Question: {question}
Helpful Answer:
`;

    const chain = RetrievalQAChain.fromLLM(llm, retriever, {
        prompt: PromptTemplate.fromTemplate(template),
    });
    return new ChainTool({
        name: 'mattresses-search',
        description: '当您需要回答有关床垫信息的问题时非常有用',
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
export async function get_working_hours(llm: BaseLanguageModel, embeddings: OpenAIEmbeddings) {
    const splitter = new CharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 0,
    });
    const docs = await splitter.createDocuments([works.content]);
    const new_docs = await splitter.splitDocuments(docs);
    const vectorstore = await MemoryVectorStore.fromDocuments(new_docs, embeddings);
    const retriever = vectorstore.asRetriever();
    const template = `使用以下上下文来回答用户的问题。第一行为表头，剩下行为表格内容
----------------
{context}
Question: {question}
Helpful Answer:
`;

    const chain = RetrievalQAChain.fromLLM(llm, retriever, {
        prompt: PromptTemplate.fromTemplate(template),
    });
    return new ChainTool({
        name: 'get_working_hours',
        description: '当您需要查询和计算工时时非常有用',
        chain,
    });
}