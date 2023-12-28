import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { BaseLanguageModel } from 'langchain/base_language';
import { stageAnalyzerPrompt } from './prompts';
export const loadStageAnalyzerChain = (llm: BaseLanguageModel, verbose: boolean = false) => {
    const prompt = new PromptTemplate({
        template: stageAnalyzerPrompt,
        inputVariables: ['conversation_history'],
    });
    return new LLMChain({ llm, prompt, verbose });
};
