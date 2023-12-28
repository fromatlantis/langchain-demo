import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { OPENAI_API_KEY, BASE_URL } from '~/config';

const openAIApiKey = OPENAI_API_KEY;
const baseURL = BASE_URL;

export const embeddings: (config: Record<string, string>) => OpenAIEmbeddings = (config) =>
    new OpenAIEmbeddings({
        openAIApiKey,
        configuration: { baseURL },
        ...config,
    });
const options = {
    openAIApiKey,
    temperature: 0,
    maxConcurrency: 3,
    modelName: 'gpt-3.5-turbo',
    configuration: { baseURL },
};
export const llm = (config: Record<string, string>) => new OpenAI({ ...options, ...config });
export const chat = (config: Record<string, string>) => new ChatOpenAI({ ...options, ...config });
