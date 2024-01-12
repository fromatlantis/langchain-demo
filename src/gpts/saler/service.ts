import { genExecutor } from './agent';
import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import { AgentExecutor } from 'langchain/agents';

let instance = null;
export class Service {
    executor: AgentExecutor;
    chatHistory: BaseMessage[] = [];
    constructor(openAIApiKey: string) {
        if (!instance) {
            this.init(openAIApiKey);
            instance = this;
        }
        return instance;
    }
    async init(openAIApiKey: string) {
        this.executor = await genExecutor(openAIApiKey);
    }
    async invoke(input: string) {
        if (this.executor) {
            this.chatHistory.push(new HumanMessage(input));
            const result = this.executor.streamLog({
                input,
                chat_history: this.chatHistory,
            });
            // this.chatHistory.push(new AIMessage(result.output));
            // return result.output;
            return new ReadableStream({
                async start(controller) {
                    for await (const chunk of result) {
                        controller.enqueue(chunk);
                    }
                    controller.close();
                },
            });
        } else {
            return '代理加载中...';
        }
    }
}
