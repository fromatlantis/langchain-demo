import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { OPENAI_API_KEY, BASE_URL } from '~/config';

const openAIApiKey = OPENAI_API_KEY;
const baseURL = BASE_URL;

export const embeddings: OpenAIEmbeddings = new OpenAIEmbeddings({
    openAIApiKey,
    configuration: { baseURL },
});
const options = {
    openAIApiKey,
    temperature: 0,
    maxConcurrency: 3,
    modelName: 'gpt-3.5-turbo',
    configuration: { baseURL },
};
export const llm = new OpenAI(options);
export const chat = new ChatOpenAI(options);
