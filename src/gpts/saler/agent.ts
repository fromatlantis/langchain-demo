import { RunnableSequence } from '@langchain/core/runnables';
import { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } from '@langchain/core/prompts';
import { AgentExecutor, type AgentStep } from 'langchain/agents';
import { ChatOpenAI } from '@langchain/openai';
import { formatToOpenAIFunction } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

import { formatToOpenAIFunctionMessages } from 'langchain/agents/format_scratchpad';
import { OpenAIFunctionsAgentOutputParser } from 'langchain/agents/openai/output_parser';
import { StringOutputParser } from '@langchain/core/output_parsers';

import { mattressesSearch, conversationStage, get_working_hours } from './tools';
import { SALES_AGENT_INCEPTION_PROMPT, STAGE_ANALYZER_INCEPTION_PROMPT } from './prompts';

export const genExecutor = async (openAIApiKey: string) => {
    const model = new ChatOpenAI({
        openAIApiKey,
        modelName: 'gpt-3.5-turbo-1106',
        temperature: 0,
        streaming: true,
    });
    const streamingModel = new ChatOpenAI({
        openAIApiKey,
        modelName: 'gpt-3.5-turbo-1106',
        temperature: 0,
        streaming: true,
        callbacks: [
            {
                handleLLMNewToken(token) {
                    // console.log(token);
                },
            },
        ],
    });
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey,
    });
    const tools = [
        conversationStage(model),
        await mattressesSearch(model, embeddings),
        await get_working_hours(model, embeddings),
        new Calculator(),
    ];

    const modelWithFunctions = model.bind({
        functions: tools.map((tool) => formatToOpenAIFunction(tool) as any),
    });

    const SYSTEM = await PromptTemplate.fromTemplate(SALES_AGENT_INCEPTION_PROMPT).format({
        salesperson_name: '小张',
        salesperson_role: '销售经理',
        company_name: 'Sleep Haven',
        company_business:
            'Sleep Haven是一家优质床垫公司，为客户提供最舒适、最支持的睡眠体验。我们提供一系列高品质的床垫、枕头和床上用品，旨在满足客户的独特需求。',
        company_values:
            'Sleep Haven的使命是为人们提供最好的睡眠解决方案，帮助他们获得更好的睡眠。我们相信高质量的睡眠对整体健康和幸福至关重要，我们致力于通过提供卓越的产品和客户服务来帮助我们的客户实现最佳睡眠。',
        conversation_purpose: '了解他们是否希望通过购买优质床垫来获得更好的睡眠。',
        chat_history: '',
        agent_scratchpad: '',
        conversation_type: 'call',
        // conversation_stage: '1'
    });

    const prompt = ChatPromptTemplate.fromMessages([
        ['system', SYSTEM],
        new MessagesPlaceholder('chat_history'),
        ['human', '{input}'],
        new MessagesPlaceholder('agent_scratchpad'),
    ]);
    const prompt1 = new PromptTemplate({
        template: STAGE_ANALYZER_INCEPTION_PROMPT,
        inputVariables: ['chat_history'],
    });
    const chain = prompt1.pipe(model).pipe(new StringOutputParser());
    const runnableAgent = RunnableSequence.from([
        {
            input: (i: { input: string; steps: AgentStep[] }) => i.input,
            agent_scratchpad: (i: { input: string; steps: AgentStep[] }) =>
                formatToOpenAIFunctionMessages(i.steps),
            chat_history: (i: { input: string; steps: AgentStep[]; chat_history: string }) =>
                i.chat_history,
            // conversation_stage: () => chain,
        },
        prompt,
        modelWithFunctions,
        new OpenAIFunctionsAgentOutputParser(),
    ]);

    const executor = AgentExecutor.fromAgentAndTools({
        agent: runnableAgent,
        tools,
        verbose: true,
    });

    return executor;
};
