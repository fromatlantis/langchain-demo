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
            // for await (const chunk of result) {
            //     console.log(JSON.stringify(chunk, null, 2));
            // }
            // this.chatHistory.push(new AIMessage(result.output));
            // return result.output;
            return result
        } else {
            return '代理加载中...';
        }
    }
}
