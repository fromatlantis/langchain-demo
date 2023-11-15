import { OpenAI } from 'langchain/llms/openai';
import { loadSummarizationChain, AnalyzeDocumentChain } from 'langchain/chains';

import type { APIRoute } from 'astro';

import { OPENAI_API_KEY } from '~/config';

export const post: APIRoute = async ({ params, request }) => {
    const body = await request.json();
    const decoder = new TextDecoder('utf-8');
    console.log('fetch txt')
    const res = await fetch('https://langchain.deno.dev/state_of_the_union_zh.txt').catch((err)=> {
      console.log(err)
    })
    // const text = await res.text();
    console.log(res)
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
        input_document: '',
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
