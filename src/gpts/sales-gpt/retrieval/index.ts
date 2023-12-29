import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { embeddings } from '~/gpts/llm/openai';
import { products } from '../config/products';
export const loadSalesDocVectorStore = async (config: Record<string, string>) => {
    const splitter = new CharacterTextSplitter({
        chunkSize: 10,
        chunkOverlap: 0,
    });
    const docs = await splitter.createDocuments([products.content]);
    const new_docs = await splitter.splitDocuments(docs);
    return HNSWLib.fromDocuments(new_docs, embeddings(config));
};
