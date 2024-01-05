import type { APIRoute } from 'astro';
import { OpenAI } from 'langchain/llms/openai';
import { llm } from '~/gpts/llm/openai';
import { agent_setup } from '~/gpts/sales-gpt/agents/setup';
import { loadStageAnalyzerChain, loadSalesConversationChain } from '~/gpts/sales-gpt/chains';
import { setup_knowledge_base } from '~/gpts/sales-gpt/agents/tools';
import { Service } from '~/gpts/sales-gpt/agents/service';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.json();
        // const stage_analyzer_chain = loadStageAnalyzerChain(
        //     llm({ openAIApiKey: body.localKey }),
        //     true,
        // );
        // const res = await stage_analyzer_chain.call({
        //     conversation_history: '',
        //     conversation_stage_id: 0,
        // });
        // const sales_conversation_utterance_chain = loadSalesConversationChain(
        //     llm({ openAIApiKey: body.localKey }),
        //     true,
        // );
        // const res = await sales_conversation_utterance_chain.call({
        //     ...agent_setup,
        //     // 测试时，写死历史聊天记录
        //     conversation_history: `你好，我是${agent_setup.company_name}的${agent_setup.salesperson_name}。有什么需要帮助的吗? <END_OF_TURN>\nUser: 你好,你们公司的业务是什么？ <END_OF_TURN>`,
        //     // 测试时，写死当前谈话的阶段，后续由我们上面写的StageAnalyzerChain来动态提供
        //     conversation_stage:
        //         '**介绍**：首先，自我介绍和公司，语气要亲切而专业，明确告知打电话的目的。',
        // });
        // const knowledge_base = await setup_knowledge_base(llm({ openAIApiKey: body.localKey }), {
        //     openAIApiKey: body.localKey,
        // });
        // const res = await knowledge_base.call({ query: body.prompt });
        console.log('first')
        const service = new Service(body.localKey)
        const res = await service.chat(body.prompt);
        return new Response(
            JSON.stringify(res),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
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
