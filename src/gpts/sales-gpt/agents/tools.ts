import { RetrievalQAChain } from 'langchain/chains';
import { BaseLanguageModel } from 'langchain/base_language';
import { ChainTool } from "langchain/tools";
import { loadSalesDocVectorStore } from '../retrieval';
export async function setup_knowledge_base(llm: BaseLanguageModel, config: Record<string, string>) {
    const vectorStore = await loadSalesDocVectorStore(config);
    const knowledge_base = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever());
    return knowledge_base;
}
export async function get_tools(llm: BaseLanguageModel, config: Record<string, string>) {
  const chain = await setup_knowledge_base(llm, config);
  const tools = [
    new ChainTool({
      name: "产品搜索",
      description:
        "当您需要回答有关产品信息的问题时非常有用",
      chain,
    }),
  ];
  return tools;
}

