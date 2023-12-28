import type { APIRoute } from 'astro';
import { OpenAI } from 'langchain/llms/openai';
// import { llm } from '~/gpts/llm/openai';
import { loadStageAnalyzerChain } from '~/gpts/sales-gpt/chains';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.json();
        const llm = new OpenAI({
          openAIApiKey: body.localKey,
          modelName: 'gpt-3.5-turbo', // Or gpt-3.5-turbo
          // streaming: true,
          temperature: 0, // For best results with the output fixing parser
      });
        const stage_analyzer_chain = loadStageAnalyzerChain(llm, true);
        const res = await stage_analyzer_chain.call({ conversation_history: "" });
        console.log(res)
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
