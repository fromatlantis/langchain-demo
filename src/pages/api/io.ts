import { z } from 'zod';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { StructuredOutputParser, OutputFixingParser } from 'langchain/output_parsers';

import type { APIRoute } from 'astro';

import { OPENAI_API_KEY } from '~/config';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.json();
        const outputParser = StructuredOutputParser.fromZodSchema(
            z
                .array(
                    z.object({
                        Name: z.string().describe('The name of the country'),
                        Capital: z.string().describe("The country's capital"),
                        // Number: z.number().describe("The country's area"),
                        Area: z.number(),
                        Population: z.number(),
                        // Number: z.number().describe("The population of this country"), prompt: 请列举5个国家 | 请列举人口数量最多的5个国家
                    }),
                )
                .describe('An array of Airtable records, each representing a country'),
        );

        const chatModel = new ChatOpenAI({
            // openAIApiKey: OPENAI_API_KEY,
            modelName: 'gpt-3.5-turbo', // Or gpt-3.5-turbo
            temperature: 0, // For best results with the output fixing parser
        });

        const outputFixingParser = OutputFixingParser.fromLLM(chatModel, outputParser);

        // Don't forget to include formatting instructions in the prompt!
        const prompt = new PromptTemplate({
            template: `{format_instructions}\n{query}`,
            inputVariables: ['query'],
            partialVariables: {
                format_instructions: outputFixingParser.getFormatInstructions(),
            },
        });

        const answerFormattingChain = new LLMChain({
            llm: chatModel,
            prompt,
            outputKey: 'records', // For readability - otherwise the chain output will default to a property named "text"
            outputParser: outputFixingParser,
        });
        const result = await answerFormattingChain.call({
            query: body.prompt,
        });
        return new Response(JSON.stringify(result.records), {
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
