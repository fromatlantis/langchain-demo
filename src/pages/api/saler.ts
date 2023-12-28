import type { APIRoute } from 'astro';
import { OpenAI } from 'langchain/llms/openai';
import { llm } from '~/gpts/llm/openai';
import { loadStageAnalyzerChain } from '~/gpts/sales-gpt/chains';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.json();
        const stage_analyzer_chain = loadStageAnalyzerChain(
            llm({ openAIApiKey: body.localKey }),
            true,
        );
        const res = await stage_analyzer_chain.call({
            conversation_history: '',
            conversation_stage_id: 0,
        });
        console.log(res);
        // const result = await model.call(body.prompt);
        // return new Response(
        //     JSON.stringify({
        //         text: result,
        //     }),
        //     {
        //         status: 200,
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     },
        // );
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
