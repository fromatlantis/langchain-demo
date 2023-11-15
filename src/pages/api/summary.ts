import { OpenAI } from 'langchain/llms/openai';
import { loadSummarizationChain, AnalyzeDocumentChain } from 'langchain/chains';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';

import type { APIRoute } from 'astro';

import { OPENAI_API_KEY } from '~/config';

export const post: APIRoute = async ({ params, request }) => {
    const loader = new CheerioWebBaseLoader("https://mp.weixin.qq.com/s/cI8iTflC3YO_g5ZIIqP2YQ");
    const docs = await loader.load();
    console.log(docs)
    const model = new OpenAI({
        openAIApiKey: OPENAI_API_KEY,
        modelName: 'gpt-3.5-turbo', // Or gpt-3.5-turbo
        temperature: 0, // For best results with the output fixing parser
    });
    const combineDocsChain = loadSummarizationChain(model);
    const chain = new AnalyzeDocumentChain({
        combineDocumentsChain: combineDocsChain,
    });
    const result = await chain.call({
        input_document: docs,
    });
    return new Response(
        JSON.stringify({
            text: result,
        }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
};
