import { OpenAI } from 'langchain/llms/openai';
import { loadSummarizationChain, AnalyzeDocumentChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PromptTemplate } from 'langchain/prompts';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';

import type { APIRoute } from 'astro';

import { OPENAI_API_KEY } from '~/config';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        // const loader = new CheerioWebBaseLoader('https://mp.weixin.qq.com/s/cI8iTflC3YO_g5ZIIqP2YQ');
        // const docs = await loader.load();
        // // 文档分割
        // const textSplitter = new RecursiveCharacterTextSplitter({
        //     chunkSize: 1000,
        //     chunkOverlap: 200,
        // });
        // const splitDocs = await textSplitter.splitDocuments(docs);
        const model = new OpenAI({
            openAIApiKey: OPENAI_API_KEY,
            modelName: 'gpt-3.5-turbo', // Or gpt-3.5-turbo
            temperature: 0, // For best results with the output fixing parser
        });
        // const combineDocsChain = loadSummarizationChain(model);
        // const chain = new AnalyzeDocumentChain({
        //     combineDocumentsChain: combineDocsChain,
        // });
        const summaryTemplate = `请使用中文总结出关键信息。`;
        const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);
        const text = `议长女士、副总统女士、我们的第一夫人和第二先生。国会和内阁成员。最高法院法官。我的美国同胞们。去年，新冠肺炎 (COVID-19) 将我们分开。今年我们终于又在一起了。今晚，我们以民主党、共和党和独立人士的身份开会。但最重要的是作为美国人。对美国人民和宪法负有相互之间的责任。并坚定不移地相信自由将永远战胜暴政。六天前，俄罗斯总统弗拉基米尔·普京试图动摇自由世界的基础，认为他可以让自由世界屈服于他的威胁方式。但他严重失算了。他以为只要进入乌克兰，世界就会翻滚。相反，他遇到了一堵他从未想象过的力量之墙。他见到了乌克兰人民。从泽连斯基总统到每一位乌克兰人，他们的无畏、勇气和决心激励着世界。成群结队的市民用身体挡住坦克。从学生到退休教师，每个人都变成了保卫祖国的士兵。在这场斗争中，正如泽连斯基总统在欧洲议会演讲中所说的“光明将战胜黑暗”。乌克兰驻美国大使今晚在这里。让我们今晚在这个会议厅的每个人向乌克兰和世界发出明确的信号。如果可以的话，请起立并表明，是的，我们美利坚合众国与乌克兰人民站在一起。纵观我们的历史，我们已经吸取了这样的教训：当独裁者不为他们的侵略付出代价时，他们就会造成更多的混乱。他们继续前进。美国和世界面临的成本和威胁不断上升​​。这就是为什么创建北约联盟是为了确保第二次世界大战后欧洲的和平与稳定。美国和其他 29 个国家都是其成员。这很重要。美国外交很重要。美国解决问题。普京最近对乌克兰的攻击是有预谋的、无端的。他拒绝了反复的外交努力。他认为西方和北约不会做出回应。他认为他可以在家里分裂我们。普京错了。我们准备好了。这就是我们所做的。我们做了广泛而认真的准备。我们花了几个月的时间建立了一个由欧洲、美洲、亚洲和非洲的其他热爱自由国家组成的联盟来对抗普京。我花了无数的时间来团结我们的欧洲盟友。`;
        const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
        const docs = await textSplitter.createDocuments([text]);
        const chain = loadSummarizationChain(model, {
            type: 'stuff',
            prompt: SUMMARY_PROMPT,
        });
        const result = await chain.call({
            input_documents: docs,
        });
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
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
