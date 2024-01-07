import { genExecutor } from './agent';
let instance = null;
export class Service {
    executor;
    constructor(openAIApiKey: string) {
        if (!instance) {
            this.init(openAIApiKey)
            instance = this;
        }
        return instance;
    }
    async init(openAIApiKey: string) {
        this.executor = await genExecutor(openAIApiKey);
    }
    async invoke(input: string) {
        const result = await this.executor.invoke({
            input,
        });
        return result;
    }
}
