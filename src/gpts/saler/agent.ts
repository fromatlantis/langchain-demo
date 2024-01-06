import { RunnableSequence } from '@langchain/core/runnables';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { AgentExecutor, type AgentStep } from 'langchain/agents';
import { ChatOpenAI } from '@langchain/openai';
import { formatToOpenAIFunction } from 'langchain/tools';

import { formatToOpenAIFunctionMessages } from 'langchain/agents/format_scratchpad';
import { OpenAIFunctionsAgentOutputParser } from 'langchain/agents/openai/output_parser';

import { tools } from './tools';

export const genExecutor = (openAIApiKey: string) => {
    const model = new ChatOpenAI({
        openAIApiKey,
        modelName: 'gpt-3.5-turbo',
        temperature: 0,
    });

    const modelWithFunctions = model.bind({
        functions: tools.map((tool) => formatToOpenAIFunction(tool) as any),
    });

    const prompt = ChatPromptTemplate.fromMessages([
        ['system', "You are very powerful assistant, but don't know current events"],
        ['human', '{input}'],
        new MessagesPlaceholder('agent_scratchpad'),
    ]);

    const runnableAgent = RunnableSequence.from([
        {
            input: (i: { input: string; steps: AgentStep[] }) => i.input,
            agent_scratchpad: (i: { input: string; steps: AgentStep[] }) =>
                formatToOpenAIFunctionMessages(i.steps),
        },
        prompt,
        modelWithFunctions,
        new OpenAIFunctionsAgentOutputParser(),
    ]);

    const executor = AgentExecutor.fromAgentAndTools({
        agent: runnableAgent,
        tools,
    });

    return executor;
};
