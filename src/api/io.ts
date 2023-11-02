import { z } from "zod";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";

import type { APIRoute } from 'astro';

import { OPENAI_API_KEY } from '~/config';

export const post: APIRoute = async ({ params, request }) => {
  const outputParser = StructuredOutputParser.fromZodSchema(
    z
      .array(
        z.object({
          fields: z.object({
            Name: z.string().describe("The name of the country"),
            Capital: z.string().describe("The country's capital"),
          }),
        })
      )
      .describe("An array of Airtable records, each representing a country")
  );
  
  const chatModel = new ChatOpenAI({
    openAIApiKey: OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo", // Or gpt-3.5-turbo
    temperature: 0, // For best results with the output fixing parser
  });
  
  const outputFixingParser = OutputFixingParser.fromLLM(chatModel, outputParser);
  
  // Don't forget to include formatting instructions in the prompt!
  const prompt = new PromptTemplate({
    template: `Answer the user's question as best you can:\n{format_instructions}\n{query}`,
    inputVariables: ["query"],
    partialVariables: {
      format_instructions: outputFixingParser.getFormatInstructions(),
    },
  });
  
  const answerFormattingChain = new LLMChain({
    llm: chatModel,
    prompt,
    outputKey: "records", // For readability - otherwise the chain output will default to a property named "text"
    outputParser: outputFixingParser,
  });
  
  const result = await answerFormattingChain.call({
    query: "List 5 countries.",
  });
  return new Response(JSON.stringify({
    name: "nzw"
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};