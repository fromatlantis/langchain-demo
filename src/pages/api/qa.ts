import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

import { RetrievalQAChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';

import type { APIRoute } from 'astro';

import { OPENAI_API_KEY } from '~/config';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.json();
        // 从静态网页加载文档
        const loader = new CheerioWebBaseLoader(body.url);
        const data = await loader.load();
        // 文档分割
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const splitDocs = await textSplitter.splitDocuments(data);
        // 嵌入并存储在向量数据库
        const embeddings = new OpenAIEmbeddings();
        const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
        // LLM
        const model = new ChatOpenAI({
            openAIApiKey: OPENAI_API_KEY,
            modelName: 'gpt-3.5-turbo', // Or gpt-3.5-turbo
            temperature: 0, // For best results with the output fixing parser
        });
        // 提示模版
        const template = `Use the following pieces of context to answer the question at the end.
      If you don't know the answer, just say that you don't know, don't try to make up an answer.
      Use three sentences maximum and keep the answer as concise as possible.
      Always say "thanks for asking!" at the end of the answer.
      {context}
      Question: {question}
      Helpful Answer:`;
        const prompt = PromptTemplate.fromTemplate(template);
        // chain
        const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
            prompt,
        });
        const result = await chain.call({
            query: body.prompt,
        });
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: {
                    message: error.message,
                },
            }),
            { status: 400 },
        );
    }
};
