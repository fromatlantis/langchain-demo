import { DynamicTool } from "langchain/tools";

const customTool = new DynamicTool({
  name: "get_word_length",
  description: "Returns the length of a word.",
  func: async (input: string) => input.length.toString(),
});

/** Define your list of tools. */
export const tools = [customTool];