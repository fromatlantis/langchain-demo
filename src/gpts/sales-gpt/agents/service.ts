import { llm } from '~/gpts/llm/openai';
import { SalesGPT } from '~/gpts/sales-gpt/agents/salesGPT';
import { agent_setup } from './setup';
let instance = null;
export class Service {
    sales_agent: SalesGPT;
    constructor(openAIApiKey: string) {
        this.init(openAIApiKey);
        if (!instance) {
            // 初始化数据库连接
            instance = this;
        }
        return instance;
    }
    async init(openAIApiKey: string) {
        const { salesperson_name } = agent_setup;
        const config = {
            salesperson_name,
            use_tools: true,
            openAIApiKey,
        };
        this.sales_agent = await SalesGPT.from_llm(llm({ openAIApiKey }), true, config);
    }
    async chat(question: string) {
        const sales_agent = this.sales_agent;
        if (!sales_agent) {
            return '代理模块加载中，请稍后再试...';
        }
        if (!question) {
            sales_agent.seed_agent();
        } else {
            sales_agent.human_step(question);
        }
        await sales_agent.determine_conversation_stage();
        const answer = await sales_agent.step();
        console.log(answer);
        return answer;
    }
}
