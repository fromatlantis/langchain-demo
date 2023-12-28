import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { BaseLanguageModel } from 'langchain/base_language';
import { STAGE_ANALYZER_INCEPTION_PROMPT } from './prompts';
export const loadStageAnalyzerChain = (llm: BaseLanguageModel, verbose: boolean = false) => {
    const prompt = new PromptTemplate({
        template: STAGE_ANALYZER_INCEPTION_PROMPT,
        inputVariables: ['conversation_history', 'conversation_stage_id'],
    });
    return new LLMChain({ llm, prompt, verbose });
};
