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
            const chatHistory = this.chatHistory;
            chatHistory.push(new HumanMessage(input));
            // console.log(chatHistory);
            const result = this.executor.streamLog({
                input,
                chat_history: chatHistory,
            });
            // this.chatHistory.push(new AIMessage(result.output));
            // return result.output;
            return new ReadableStream<Uint8Array>({
                async start(controller) {
                    const encoder = new TextEncoder();
                    for await (const chunk of result) {
                        console.log(chunk);
                        if (chunk.ops?.length > 0) {
                            const [firstOp] = chunk.ops;
                            // console.log(addOp.path, addOp.value)
                            if (
                                firstOp.op === 'add' &&
                                firstOp.path.startsWith('/logs/ChatOpenAI') &&
                                typeof firstOp.value === 'string' &&
                                firstOp.value.length
                            ) {
                                // console.log(addOp, chunk)
                                const uint8Array = encoder.encode(firstOp.value);
                                controller.enqueue(uint8Array);
                            } else if (
                                firstOp.op === 'add' &&
                                firstOp.path === '/streamed_output/-' &&
                                typeof firstOp.value?.output === 'string'
                            ) {
                                // console.log('all', addOp);
                                chatHistory.push(new AIMessage(firstOp.value.output));
                            }
                        }
                    }
                    controller.close();
                },
            });
        } else {
            return '代理加载中...';
        }
    }
}
