import { genExecutor } from './agent';
let instance = null;
export class Service {
    executor;
    constructor(openAIApiKey: string) {
        if (!instance) {
            this.executor = genExecutor(openAIApiKey);
            instance = this;
        }
        return instance;
    }
    async invoke(input: string) {
        const result = await this.executor.invoke({
            input,
        });
        return result;
    }
}
