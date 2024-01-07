import { ChainTool, DynamicTool } from 'langchain/tools';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { BaseLanguageModel } from 'langchain/base_language';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { products } from './products';

const customTool = new DynamicTool({
    name: 'get_word_length',
    description: 'Returns the length of a word.',
    func: async (input: string) => input.length.toString(),
});

/** Define your list of tools. */
export const tools = [customTool];

export async function productSearch(llm: BaseLanguageModel) {
    const splitter = new CharacterTextSplitter({
        chunkSize: 10,
        chunkOverlap: 0,
    });
    const docs = await splitter.createDocuments([products.content]);
    const new_docs = await splitter.splitDocuments(docs);
    const vectorstore = await MemoryVectorStore.fromDocuments(new_docs, new OpenAIEmbeddings());
    const retriever = vectorstore.asRetriever();
    const chain = RetrievalQAChain.fromLLM(llm, retriever);
    return new ChainTool({
        name: '床垫产品搜索',
        description: '当您需要回答有关床垫产品信息的问题时非常有用',
        chain,
    });
}
