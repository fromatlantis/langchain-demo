import { PromptTemplate } from 'langchain/prompts';
import { LLMChain, RetrievalQAChain } from 'langchain/chains';
import { BaseLanguageModel } from 'langchain/base_language';
import { loadSalesDocVectorStore } from './retrieval';
import { STAGE_ANALYZER_INCEPTION_PROMPT, SALES_AGENT_INCEPTION_PROMPT } from './prompts';
export const loadStageAnalyzerChain = (llm: BaseLanguageModel, verbose: boolean = false) => {
    const prompt = new PromptTemplate({
        template: STAGE_ANALYZER_INCEPTION_PROMPT,
        inputVariables: ['conversation_history', 'conversation_stage_id'],
    });
    return new LLMChain({ llm, prompt, verbose });
};
export function loadSalesConversationChain(llm: BaseLanguageModel, verbose: boolean = false) {
    const prompt = new PromptTemplate({
        template: SALES_AGENT_INCEPTION_PROMPT,
        inputVariables: [
            'salesperson_name',
            'salesperson_role',
            'company_name',
            'company_business',
            'company_values',
            'conversation_purpose',
            'conversation_type',
            'conversation_stage',
            'conversation_history',
        ],
    });
    return new LLMChain({ llm, prompt, verbose });
}
export async function setup_knowledge_base(llm: BaseLanguageModel, config: Record<string, string>) {
    const vectorStore = await loadSalesDocVectorStore(config);
    const knowledge_base = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
    return knowledge_base;
}
