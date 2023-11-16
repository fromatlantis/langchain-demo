import { OpenAI } from 'langchain/llms/openai';

import type { APIRoute } from 'astro';

import { OPENAI_API_KEY } from '~/config';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.json();

        const model = new OpenAI({
            openAIApiKey: OPENAI_API_KEY,
            modelName: 'gpt-3.5-turbo', // Or gpt-3.5-turbo
            temperature: 0, // For best results with the output fixing parser
        });
        console.log('first')
        const result = await model.call(body.prompt);
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
