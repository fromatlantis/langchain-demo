import { OpenAI } from 'langchain/llms/openai';
import { loadSummarizationChain, AnalyzeDocumentChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PromptTemplate } from 'langchain/prompts';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';

import type { APIRoute } from 'astro';

import { OPENAI_API_KEY } from '~/config';

export const POST: APIRoute = async ({ params, request }) => {
    try {
        
        // @ts-ignore
        console.log(Deno?.env.get('DENO_REGION'))
        
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
        const summaryTemplate = `请使用中文总结出关键信息：
            --------
            {text}
            --------
        `;
        const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);
        const text = `议长女士、副总统女士、我们的第一夫人和第二先生。国会和内阁成员。最高法院法官。我的美国同胞们。去年，新冠肺炎 (COVID-19) 将我们分开。今年我们终于又在一起了。今晚，我们以民主党、共和党和独立人士的身份开会。但最重要的是作为美国人。对美国人民和宪法负有相互之间的责任。并坚定不移地相信自由将永远战胜暴政。六天前，俄罗斯总统弗拉基米尔·普京试图动摇自由世界的基础，认为他可以让自由世界屈服于他的威胁方式。但他严重失算了。他以为只要进入乌克兰，世界就会翻滚。相反，他遇到了一堵他从未想象过的力量之墙。他见到了乌克兰人民。从泽连斯基总统到每一位乌克兰人，他们的无畏、勇气和决心激励着世界。成群结队的市民用身体挡住坦克。从学生到退休教师，每个人都变成了保卫祖国的士兵。在这场斗争中，正如泽连斯基总统在欧洲议会演讲中所说的“光明将战胜黑暗”。乌克兰驻美国大使今晚在这里。让我们今晚在这个会议厅的每个人向乌克兰和世界发出明确的信号。如果可以的话，请起立并表明，是的，我们美利坚合众国与乌克兰人民站在一起。纵观我们的历史，我们已经吸取了这样的教训：当独裁者不为他们的侵略付出代价时，他们就会造成更多的混乱。他们继续前进。美国和世界面临的成本和威胁不断上升​​。这就是为什么创建北约联盟是为了确保第二次世界大战后欧洲的和平与稳定。美国和其他 29 个国家都是其成员。这很重要。美国外交很重要。美国解决问题。普京最近对乌克兰的攻击是有预谋的、无端的。他拒绝了反复的外交努力。他认为西方和北约不会做出回应。他认为他可以在家里分裂我们。普京错了。我们准备好了。这就是我们所做的。我们做了广泛而认真的准备。我们花了几个月的时间建立了一个由欧洲、美洲、亚洲和非洲的其他热爱自由国家组成的联盟来对抗普京。我花了无数的时间来团结我们的欧洲盟友。我们提前与世界分享了我们所知道的普京的计划，以及他将如何试图错误地为自己的侵略行为辩护。我们用事实反驳俄罗斯的谎言。现在他已经采取了行动，自由世界正在追究他的责任。还有法国、德国、意大利等27个欧盟成员国，以及英国、加拿大、日本、韩国、澳大利亚、新西兰等许多国家，甚至还有瑞士。我们正在给俄罗斯带来痛苦并支持乌克兰人民。普京现在比以往任何时候都更加与世隔绝。我们正在与我们的盟友一起实施强有力的经济制裁。我们正在将俄罗斯最大的银行与国际金融体系隔离。阻止俄罗斯央行捍卫俄罗斯卢布，使得普京的 6300 亿美元“战争基金”变得毫无价值。我们正在阻止俄罗斯获得技术，这将在未来几年削弱其经济实力并削弱其军事力量。今晚，我要对俄罗斯寡头和腐败领导人说，他们不再从这个暴力政权那里骗取数十亿美元。美国司法部正在组建一个专门工作组，追查俄罗斯寡头的罪行。我们正在与我们的欧洲盟友一起寻找并扣押您的游艇、您的豪华公寓、您的私人飞机。我们是为了你的不义之财而来的。今晚我宣布，我们将与我们的盟友一起对所有俄罗斯航班关闭美国领空——进一步孤立俄罗斯——并进一步挤压他们的经济。卢布已贬值 30%。俄罗斯股市已下跌 40%，交易仍暂停。俄罗斯经济步履蹒跚，罪魁祸首是普京一人。我们与我们的盟友一起为乌克兰人争取自由的斗争提供支持。军事援助。经济援助。人道主义援助。我们正在向乌克兰提供超过10亿美元的直接援助。我们将继续帮助乌克兰人民保卫自己的国家并帮助减轻他们的痛苦。让我明确一点，我们的军队没有也不会在乌克兰与俄罗斯军队发生冲突。我们的军队前往欧洲不是为了在乌克兰作战，而是为了保卫我们的北约盟国——以防普京决定继续向西推进。为此，我们动员了美国地面部队、空军中队和舰艇部署来保护包括波兰、罗马尼亚、拉脱维亚、立陶宛和爱沙尼亚在内的北约国家。正如我已经明确表示的那样，美国和我们的盟国将全力保卫北约国家的每一寸领土。我们仍然保持清醒的头脑。乌克兰人正以纯粹的勇气进行反击。但接下来的几天、几周、几个月对他们来说将是艰难的。普京发动了暴力和混乱。尽管他可能会在战场上有所收获，但从长远来看，他将付出持续高昂的代价。自豪的乌克兰人民已经独立30年了，他们一再表明，他们不会容忍任何试图让国家倒退的人。对于所有美国人，我将像我一直承诺的那样对你们诚实。俄罗斯独裁者入侵外国，给全世界带来了代价。我正在采取强有力的行动，确保我们的制裁所带来的痛苦是针对俄罗斯经济的。我将使用我们可以使用的一切工具来保护美国企业和消费者。今晚，我可以宣布，美国已与其他 30 个国家合作，从世界各地的储备中释放了 6000 万桶石油。美国将领导这一努力，从我们自己的战略石油储备中释放 3000 万桶。如果有必要，我们随时准备与我们的盟友团结起来，采取更多行动。这些措施将有助于抑制国内天然气价格。我知道有关正在发生的事情的消息似乎令人震惊。但我想让你知道我们会没事的。当这个时代的历史被书写时，普京对乌克兰的战争将使俄罗斯变得更弱，而世界其他国家则变得更强。虽然世界各地的人们不应该经历如此可怕的事情才能看到其中的利害关系，但现在每个人都清楚地看到了这一点。我们看到各国领导人团结一致，看到更加统一的欧洲和更加统一的西方。我们看到人们团结一致，聚集在世界各地的城市，甚至在俄罗斯，表达对乌克兰的支持。在民主与专制的斗争中，民主国家正在崛起，世界显然正在选择和平与安全的一边。这是一个真正的考验。这需要时间。因此，让我们继续从乌克兰人民的钢铁意志中汲取灵感。对于我们的乌克兰裔美国人同胞，我们与你们站在一起，他们将我们两个国家联系在一起。普京可能会用坦克环绕基辅，但他永远无法赢得乌克兰人民的心和灵魂。他永远不会熄灭他们对自由的热爱。他永远不会削弱自由世界的决心。今晚我们相聚在一个经历了这个国家有史以来最艰难的两年的美国。大流行一直在惩罚。许多家庭靠工资过活，努力应对食品、天然气、住房等不断上涨的成本。我明白。我记得当我父亲不得不离开宾夕法尼亚州斯克兰顿的家去寻找工作时。我在一个家庭中长大，如果食品价格上涨，你感觉到了。这就是为什么我作为总统所做的第一件事就是争取通过美国救援计划。因为人们正在受伤。我们需要采取行动，我们也做到了。在我们历史上的关键时刻，很少有立法能比这更能帮助我们摆脱危机。它推动了我们为全国接种疫苗和抗击 COVID-19 的努力。它立即为数千万美国人带来了经济救济。帮助他们解决餐桌上的食物问题，为他们提供栖身之所，并降低医疗保险费用。正如我父亲常说的，它给了人们一点喘息的空间。与上届政府通过的 2 万亿美元减税计划不同，美国最富有的 1% 的人受益，而美国救援计划则帮助了劳动人民，并且没有让任何人掉队。它起作用了。它创造了就业机会。很多工作机会。事实上，仅去年我们的经济就创造了超过 650 万个新就业机会，一年内创造的就业机会比美国历史上任何时候都多。去年，我们的经济增长率为 5.7%，这是近 40 年来最强劲的增长，这是为这个国家的劳动人民带来根本性变革的第一步。在过去的 40 年里，我们被告知，如果我们为最顶层的人提供税收减免，那么好处就会惠及其他所有人。但这种“涓滴效应”理论导致了经济增长疲软、工资下降、赤字增加，以及顶层人士与其他人之间近一个世纪以来最大的差距。哈里斯副总统和我带着对美国新的经济愿景竞选公职。投资美国。教育美国人。增加劳动力。自下而上、自中而外地建设经济，而不是自上而下。因为我们知道，当中产阶级壮大时，穷人就有了上升的阶梯，而富人则过得很好。美国曾经拥有地球上最好的道路、桥梁和机场。现在我们的基础设施排名世界第13位。如果我们不解决这个问题，我们将无法竞争 21 世纪的就业机会。这就是为什么通过两党基础设施​​法如此重要——这是历史上重建美国最广泛的投资。这是两党共同努力的结果，我要感谢为实现这一目标而努力的两党成员。我们已经讨论完了基础设施周。我们将迎来一个基础设施十年。它将改变美国，并让我们走上一条赢得21世纪与世界其他国家（特别是与中国）的经济竞争的道路。正如我告诉习近平的那样，做空美国人民从来都不是一个好赌注。我们将为数百万美国人创造良好的就业机会，实现全美道路、机场、港口和水道的现代化。我们将竭尽全力抵御气候危机的破坏性影响并促进环境正义。我们将建设一个由 500,000 个电动汽车充电站组成的全国网络，开始更换有毒的铅管，以便每个孩子和每个美国人在家里和学校都能喝到干净的水，为每个美国人提供负担得起的高速互联网——城市、郊区、农村和部落社区。已经公布了 4,000 个项目。今晚，我宣布今年我们将开始修复超过 65,000 英里的高速公路和 1,500 座年久失修的桥梁。当我们用纳税人的钱重建美国时，我们将购买美国产品：购买美国产品以支持美国就业。联邦政府每年花费约 6000 亿美元来保障国家安全。近一个世纪以来，一直有一项法律来确保纳税人的钱支持美国的就业和企业。每届政府都说他们会这样做，但我们实际上正在这样做。我们将购买美国产品，以确保从航空母舰的甲板到高速公路护栏上的钢材的所有东西都是美国制造的。但为了争夺未来最好的工作，我们还需要与中国和其他竞争对手创造公平的竞争环境。这就是为什么国会通过两党创新法案如此重要，该法案将对新兴技术和美国制造业进行创纪录的投资。让我举一个例子来说明为什么通过这一考试如此重要。如果您向俄亥俄州哥伦布以东 20 英里行驶，您会发现 1,000 英亩的空地。它看起来并不多，但如果你停下来仔细观察，你会看到一个“梦想之地”，这是建设美国未来的基础。帮助建立硅谷的美国公司英特尔将在这里建造其价值 200 亿美元的半导体“巨型基地”。一处拥有多达八家最先进的工厂。10,000 个新的高薪工作岗位。一些世界上最先进的制造工艺制造出指尖大小的计算机芯片，为世界和我们的日常生活提供动力。智能手机。互联网。我们尚未发明的技术。但这只是开始。今晚出席的英特尔首席执行官帕特·基辛格 (Pat Gelsinger) 告诉我，他们准备将投资从 200 亿美元增加到 1000 亿美元。这将是美国历史上最大的制造业投资之一。他们所等待的就是你通过这项法案。所以我们不要再等了。发送到我的办公桌上。我会签的。我们将真正起飞。英特尔并不孤单。美国正在发生一些事情。只要环顾四周，你就会看到一个奇妙的故事。印有“美国制造”产品的自豪感的重生。美国制造业的振兴。公司现在选择在这里建造新工厂，而就在几年前，他们还会在海外建造工厂。这就是正在发生的事情。福特将投资 110 亿美元生产电动汽车，在全国创造 11,000 个就业岗位。通用汽车正在进行其历史上最大的投资——70 亿美元用于生产电动汽车，为密歇根州创造 4,000 个就业岗位。总而言之，去年我们在美国创造了 369,000 个新的制造业就业岗位。受到我所见过的乔乔·伯吉斯 (JoJo Burgess) 等人的支持，他们是来自匹兹堡的几代钢铁工会工人，今晚他也和我们在一起。正如俄亥俄州参议员谢罗德·布朗所说，“是时候埋葬‘铁锈地带’这个标签了。” 是时候了。但尽管我们的经济出现了诸多亮点、创纪录的就业增长和更高的工资，但仍有太多家庭难以维持生计。通货膨胀正在剥夺他们本来可以感受到的收益。我得到它。这就是为什么我的首要任务是控制价格。看，我们的经济复苏速度比大多数人预期的要快，但大流行意味着企业很难雇用足够的工人来维持工厂的生产。疫情还扰乱了全球供应链。当工厂关闭时，生产商品并将其从仓库运送到商店需要更长的时间，价格就会上涨。看看汽车。去年，没有足够的半导体来制造人们想要购买的所有汽车。你猜怎么着，汽车价格上涨了。所以——我们有一个选择。对抗通货膨胀的一种方法是压低工资，让美国人变得更穷。我有一个更好的计划来对抗通货膨胀。降低你的成本，而不是你的工资。在美国制造更多的汽车和半导体。美国有更多的基础设施和创新。更多的商品在美国运输得更快、更便宜。更多可以让您在美国过上好生活的工作。我们不要依赖外国供应链，而是在美国制造。经济学家称之为“提高经济的生产能力”。我称之为建设一个更美好的美国。我对抗通货膨胀的计划将降低你们的成本并降低赤字。17位诺贝尔经济学奖获得者表示，我的计划将缓解长期通胀压力。顶级商界领袖和大多数美国人都支持我的计划。计划是这样的：首先——削减处方药的成本。看看胰岛素就知道了。十分之一的美国人患有糖尿病。在弗吉尼亚州，我遇到了一个 13 岁的男孩，名叫约书亚·戴维斯 (Joshua Davis)。他和他的父亲都患有 1 型糖尿病，这意味着他们每天都需要胰岛素。每瓶胰岛素的制造成本约为 10 美元。但制药公司向约书亚和他父亲这样的家庭收取的费用高达 30 倍。我和约书亚的妈妈谈过。想象一下，看着您的孩子需要胰岛素，却不知道您将如何支付费用，这是什么感觉。它对你的尊严、你直视孩子眼睛的能力、成为你期望成为的父母的能力有何影响。约书亚今晚和我们在一起。昨天是他的生日。哥们儿生日快乐。对于 Joshua 以及其他 200,000 名患有 1 型糖尿病的年轻人来说，让我们将胰岛素的费用限制在每月 35 美元，这样每个人都能负担得起。制药公司仍然会做得很好。在我们这样做的同时，让医疗保险协商降低处方药的价格，就像退伍军人管理局已经做的那样。看，美国救援计划正在帮助数百万享受《平价医疗法案》计划的家庭每年节省 2,400 美元的医疗保险费。让我们缩小覆盖范围的差距，让这些节省成为永久性的。其次——通过应对气候变化，每年平均减少家庭能源成本 500 美元。让我们提供投资和税收抵免，使您的家庭和企业能够经受住考验，提高能源效率，并且您可以获得税收抵免；将美国太阳能、风能等清洁能源产量提高一倍；降低电动汽车的价格，每月可以再节省 80 美元，因为您再也不用支付加油费了。第三——削减儿童保育费用。许多家庭每年为每个孩子支付高达 14,000 美元的托儿费用。中产阶级和工薪家庭不应将超过收入的 7% 用于照顾幼儿。我的计划将使大多数家庭的费用减少一半，并帮助父母，包括数百万在大流行期间因无力承担托儿费用而离开劳动力市场的妇女，能够重返工作岗位。我的计划还不止于此。它还包括家庭和长期护理。更实惠的住房。每个 3 岁和 4 岁的孩子都可以参加学前班。所有这些都将降低成本。根据我的计划，年收入低于 40 万美元的人不会再缴纳一分钱的新税。没有人。所有美国人都同意的一件事是税收制度不公平。我们必须解决它。我无意惩罚任何人。但让我们确保企业和最富有的美国人开始支付他们的公平份额。就在去年，55 家财富 500 强企业赚取了 400 亿美元的利润，并且缴纳了零美元的联邦所得税。这根本不公平。这就是为什么我建议企业的最低税率为 15%。我们让 130 多个国家就全球最低税率达成一致，这样公司就不能通过将工作岗位和工厂转移到海外来逃避在国内缴纳税款。这就是为什么我建议堵住漏洞，这样非常富有的人就不会缴纳比教师或消防员更低的税率。这就是我的计划。它将促进经济增长并降低家庭成本。那么我们还在等什么呢？让我们完成这件事吧。当你在讨论的时候，请确认我对美联储的提名，美联储在对抗通货膨胀方面发挥着关键作用。我的计划不仅会降低为家庭提供公平机会的成本，还会降低赤字。上届政府不仅通过对富人和企业减税来扩大赤字，还削弱了监管机构的作用，而监管机构的职责是防止流行病救助资金被浪费。但在我的政府中，监管机构受到了欢迎。我们正在追捕那些窃取了本应为小企业和数百万美国人提供的数十亿救济金的犯罪分子。今晚，我宣布司法部将任命一名大流行欺诈罪首席检察官。到今年年底，赤字将降至我上任前的一半以下。唯一一位在一年内削减赤字超过一万亿美元的总统。降低成本也意味着需要更多的竞争。我是一个资本主义者，但没有竞争的资本主义就不是资本主义。这是剥削——并且会抬高价格。当公司不必竞争时，他们的利润就会上升，你的价格就会上涨，小企业和家庭农民和牧场主就会破产。我们看到这种情况发生在海运承运人将货物进出美国的过程中。疫情期间，这些外资企业提价幅度高达1000%，利润创历史新高。今晚，我将宣布严厉打击这些向美国企业和消费者收取过高费用的公司。随着华尔街公司接管更多疗养院，这些疗养院的质量下降，成本上升。这一切都在我的监督下结束。医疗保险将为疗养院设定更高的标准，并确保您的亲人得到他们应得和期望的护理。我们还将通过为工人提供公平的机会、提供更多的培训和学徒机会、根据他们的技能而不是学位来雇用他们，从而削减成本并保持经济强劲。让我们通过《薪资公平法案》和带薪休假。将最低工资提高到每小时 15 美元，并扩大儿童税收抵免，这样就没有人会养育一个贫困家庭。让我们增加佩尔助学金，增加对 HBCU 的历史性支持，并投资于我们的全职教师第一夫人吉尔所说的美国最保守的秘密：社区大学。当大多数工人想要组建工会时，让我们通过《PRO 法案》——他们不应该被阻止。当我们投资于我们的工人时，当我们自下而上、自中而外地共同建设经济时，我们就可以做一些我们很长时间没有做过的事情：建设一个更美好的美国。两年多来，COVID-19 影响了我们生活和国家生活中的每一个决定。我知道你很累，很沮丧，也很疲惫。但我也知道这一点。由于我们取得的进展，由于你们的韧性和我们拥有的工具，今晚我可以说我们正在安全地前进，回到更正常的日常生活。我们抗击新冠肺炎 (COVID-19) 的斗争已进入新阶段，重症病例已降至去年 7 月以来的最高水平。就在几天前，美国疾病控制与预防中心（CDC）发布了新的口罩指南。根据这些新的指导方针，全国大部分地区的大多数美国人现在可以不戴口罩了。根据预测，未来几周全国更多地区将达到这一目标。由于我们去年取得的进展，COVID-19 不再需要控制我们的生活。我知道有些人在谈论“与 COVID-19 共存”。今晚 – 我想说，我们永远不会仅仅接受与 COVID-19 一起生活。我们将像对抗其他疾病一样继续对抗这种病毒。由于这是一种会变异和传播的病毒，我们将保持警惕。以下是我们安全前进时的四个常识性步骤。首先，通过疫苗和治疗保持保护。我们知道疫苗有多么有效。如果您接种了疫苗并加强接种，您将获得最高程度的保护。我们永远不会放弃为更多美国人接种疫苗。现在，我知道有 5 岁以下孩子的父母渴望看到为他们的孩子获得授权的疫苗。科学家们正在努力实现这一目标，届时我们将准备好大量疫苗。我们还准备好抗病毒治疗。如果您感染了 COVID-19，辉瑞药丸可将您入院的几率降低 90%。我们订购的此类药物比世界上任何人都多。辉瑞正在加班加点，争取本月为我们提供 100 万粒药片，下个月将增加一倍以上。我们正在发起“测试治疗”计划，以便人们可以在药房接受测试，如果结果呈阳性，可以当场免费获得抗病毒药物。如果您免疫力低下或有其他脆弱性，我们提供治疗和免费的优质口罩。在我们前进的过程中，我们不会让任何人落后，也不会忽视任何人的需求。在测试方面，我们已经提供了数亿个测试供您免费订购。即使您今晚已经订购了免费测试，我也宣布您从下周开始可以从 covidtests.gov 订购更多测试。其次——我们必须为新的变体做好准备。在过去的一年里，我们在检测新变体方面取得了更大的进步。如有必要，我们将能够在 100 天内部署新疫苗，而不是更多的几个月或几年。而且，如果国会提供我们所需的资金，我们将在需要时准备好新的测试、口罩和药品库存。我不能保证不会出现新的变体。但我可以向你保证，如果真的发生，我们将尽一切努力做好准备。第三，我们可以结束学校和企业的关闭。我们有我们需要的工具。现在是美国人重返工作岗位并再次充满我们伟大的市中心的时候了。在家工作的人们可以放心地开始返回办公室。我们正在联邦政府这样做。绝大多数联邦工作人员将再次亲自工作。我们的学校开放。让我们保持这种状态吧。我们的孩子需要上学。随着 75% 的美国成年人完全接种了疫苗，住院率下降了 77%，大多数美国人可以摘下口罩，重返工作岗位，留在教室，安全前行。我们之所以能实现这一目标，是因为我们提供了免费的疫苗、治疗、检测和口罩。当然，继续这样做是要花钱的。我很快就会向国会发出请求。绝大多数美国人已经使用过这些工具，并且可能想再次使用，因此我预计国会会迅速通过它。第四，我们将继续为世界接种疫苗。我们已向 112 个国家发送了 4.75 亿剂疫苗，比任何其他国家都多。我们不会停止。我们因 COVID-19 失去了太多。彼此相处的时间。最糟糕的是，造成如此多的生命损失。让我们利用这一刻来重置。让我们停止将 COVID-19 视为党派分界线，而要看看它到底是什么：一种可怕的疾病。让我们停止将彼此视为敌人，并开始看到彼此的真实身份：美国同胞。我们无法改变我们之间的分歧。但我们可以改变我们前进的方式——在 COVID-19 和我们必须共同面对的其他问题上。最近，在威尔伯特·莫拉警官和他的搭档杰森·里维拉警官的葬礼几天后，我访问了纽约市警察局。他们当时正在接听 9-1-1 的电话，一名男子用偷来的枪开枪打死了他们。莫拉警官当时 27 岁。里维拉警官当时22岁。这两位多米尼加裔美国人都在同一条街道上长大，后来他们选择担任警察巡逻。我与他们的家人交谈，告诉他们，我们永远欠他们的牺牲，我们将继续履行他们的使命，恢复每个社区应有的信任和安全。我已经研究这些问题很长时间了。我知道什么是有效的：投资于预防犯罪和社区警察，他们会遵守规则，了解社区，并且能够恢复信任和安全。所以我们不要放弃我们的街道。或者在安全和平等正义之间做出选择。让我们齐心协力，保护我们的社区，恢复信任，并追究执法部门的责任。这就是为什么司法部要求其官员配备随身摄像头、禁止掐脖子以及限制不敲门令。这就是为什么美国救援计划提供了 3500 亿美元，城市、州和县可以用它来雇佣更多的警察，并投资于经过验证的策略，例如社区暴力中断——值得信赖的使者打破暴力和创伤的循环，给年轻人带来希望。我们都应该同意：答案不是取消对警察的资助。答案是为警察提供保护我们社区所需的资源和培训资金。我要求民主党人和共和党人：通过我的预算并确保我们社区的安全。我将继续竭尽全力打击枪支走私和可以在网上购买并在家制作的幽灵枪——它们没有序列号，也无法追踪。我要求国会通过行之有效的措施来减少枪支暴力。通过普遍背景调查。为什么恐怖分子名单上的任何人都可以购买武器？禁止攻击性武器和大容量弹匣。废除使枪支制造商成为美国唯一不能被起诉的行业的责任盾。这些法律不违反第二修正案。他们拯救生命。美国最基本的权利是投票权——以及投票权。而且它正在受到攻击。一个又一个的州通过了新的法律，不仅是为了压制投票，而且是为了颠覆整个选举。我们不能让这种事发生。今晚。我呼吁参议院： 通过《投票自由法案》。通过约翰·刘易斯投票权法案。当你这样做的时候，通过《披露法案》，这样美国人就可以知道谁在资助我们的选举。今晚，我要向一位毕生为这个国家服务的人表示敬意：斯蒂芬·布雷耶法官——退伍军人、宪法学者、即将退休的美国最高法院法官。布雷耶法官，感谢您的服务。总统最重要的宪法责任之一是提名某人在美国最高法院任职。四天前，当我提名巡回上诉法院法官科坦吉·布朗·杰克逊时，我就这样做了。我们国家最顶尖的法律头脑之一，他将继承布雷耶法官的卓越遗产。私人执业前顶级诉讼律师。前联邦公设辩护人。来自公立学校教育工作者和警察家庭。共识的缔造者。自从获得提名以来，她获得了广泛的支持——从警察兄弟会到民主党和共和党任命的前法官。如果我们要促进自由和正义，我们就需要确保边境安全并修复移民制度。我们可以两者兼得。在我们的边境，我们安装了尖端扫描仪等新技术，以更好地侦查毒品走私。我们与墨西哥和危地马拉建立了联合巡逻队，以抓获更多人口贩运者。我们正在设立专门的移民法官，以便逃离迫害和暴力的家庭能够更快地审理他们的案件。我们正在兑现承诺并支持南美洲和中美洲的合作伙伴收容更多难民并确保他们自己的边界安全。我们可以在完成这一切的同时，继续点燃自由的火炬，正是它带领几代移民——我的祖先和你们的许多祖先——来到了这片土地。为梦想家、临时身份人士、农场工人和重要工人提供获得公民身份的途径。修改我们的法律，让企业拥有所需的工人，让家庭不必等待数十年才能团聚。这不仅是正确的做法，也是经济上明智的做法。这就是为什么移民改革得到了从工会到宗教领袖再到美国商会的所有人的支持。让我们一劳永逸地完成它。促进自由和正义还需要保护妇女的权利。罗伊诉韦德案中确认的宪法权利——半个世纪以来的先例——正受到前所未有的攻击。如果我们想要前进而不是倒退，我们就必须保护获得医疗保健的机会。维护女性的选择权。让我们继续推进美国的孕产妇保健。对于我们的 LGBTQ+ 美国人来说，让我们最终将两党平等法案拿到我的办公桌上。针对跨性别美国人及其家人的州法律的猛烈攻击是错误的。正如我去年所说，特别是对我们年轻的跨性别美国人来说，作为总统，我将永远支持你们，这样你们就可以做自己，发挥上帝赋予的潜力。虽然我们常常表现出意见不一致，但事实并非如此。去年我签署了 80 项两党法案成为法律。从防止政府关门到保护亚裔美国人免受仍然常见的仇恨犯罪的侵害，再到改革军事司法。很快，我们将加强我三十年前首次起草的《针对妇女暴力法案》。对我们来说，向全国展示我们可以团结起来做大事非常重要。所以今晚我将提出一个国家团结议程。我们可以一起做四件大事。首先，战胜阿片类药物流行病。我们能做的还有很多。增加用于预防、治疗、减少伤害和恢复的资金。废除阻止医生开出治疗处方的过时规则。与州和地方执法部门合作追捕贩运者，阻止非法药物的流动。如果您患有毒瘾，请知道您并不孤单。我相信康复，并庆祝 2300 万美国人的康复。其次，我们要关注心理健康。尤其是我们的孩子，他们的生活和教育都发生了翻天覆地的变化。美国救援计划为学校提供资金聘请教师并帮助学生弥补学习损失。我敦促每位家长确保您的学校这样做。我们都可以发挥作用——报名成为导师或导师。疫情爆发前，孩子们也陷入困境。欺凌、暴力、创伤和社交媒体的危害。正如今晚与我们在一起的弗朗西斯·豪根（Frances Haugen）所表明的那样，我们必须让社交媒体平台对他们在我们的孩子身上进行的以营利为目的的国家实验负责。是时候加强隐私保护、禁止针对儿童的定向广告、要求科技公司停止收集有关我们孩子的个人数据了。让我们为所有美国人提供他们需要的心理健康服务。他们可以向更多的人寻求帮助，并获得身心健康护理的完全平等。第三，支持我们的退伍军人。退伍军人是我们中最好的。我始终相信，我们负有神圣的义务，为所有被派遣去参战的人提供装备，并在他们回国后照顾他们及其家人。我的政府正在提供就业培训和住房方面的援助，现在正在帮助低收入退伍军人获得退伍军人管理局的无债务护理。我们在伊拉克和阿富汗的军队面临着许多危险。其中一名驻扎在基地，吸入来自焚烧战争废物（医疗和危险材料、喷气燃料等）的“燃烧坑”的有毒烟雾。当他们回到家乡时，世界上许多最健康、训练最好的战士都不再一样了。头痛。麻木。头晕。癌症会让他们被送进铺着旗帜的棺材里。我知道。其中一名士兵是我的儿子博·拜登少校。我们不确定烧伤坑是否是导致他脑癌或我们许多士兵患病的原因。但我致力于尽我们所能找出一切。致力于像来自俄亥俄州的丹妮尔罗宾逊这样的军人家庭。希思·罗宾逊中士的遗孀。他生来就是一名军人。陆军国民警卫队。科索沃和伊拉克的战地医务人员。驻扎在巴格达附近，距离足球场大小的燃烧坑仅几码远。希斯的遗孀丹妮尔今晚和我们在一起。他们喜欢去看俄亥俄州立大学的橄榄球比赛。他喜欢和女儿一起拼搭乐高积木。但长期暴露在烧伤坑中导致的癌症蹂躏了希斯的肺部和身体。丹妮尔说希思一直到最后都是一名斗士。他不知道如何停止战斗，她也不知道。通过她的痛苦，她找到了要求我们做得更好的目标。今晚，丹妮尔——我们是。退伍军人管理局正在开创将有毒物质暴露与疾病联系起来的新方法，已经帮助更多的退伍军人获得了福利。今晚，我宣布我们将把资格扩大到患有九种呼吸道癌症的退伍军人。我还呼吁国会：通过一项法律，确保在伊拉克和阿富汗遭受毒害的退伍军人最终获得他们应得的福利和全面的医疗保健。第四，让我们消灭我们所知的癌症。这对我和吉尔、卡玛拉以及你们很多人来说都是个人的。癌症是美国第二大死因，仅次于心脏病。上个月，我宣布了我们的计划，以加强奥巴马总统六年前要求我领导的癌症登月计划。我们的目标是在未来25年内将癌症死亡率降低至少50%，将更多癌症从死刑转变为可治疗的疾病。为患者和家属提供更多支持。为了实现这一目标，我呼吁国会资助 ARPA-H（健康高级研究计划局）。它基于 DARPA（国防部项目），该项目催生了互联网、GPS 等。ARPA-H 将有一个单一的目标——推动癌症、阿尔茨海默病、糖尿病等方面的突破。国家的团结议程。我们做得到。我的美国同胞们，今晚，我们聚集在一个神圣的空间——我们民主的堡垒。在这座国会大厦里，一代又一代的美国人在伟大的斗争中辩论了伟大的问题，做出了伟大的事情。我们为自由而战，扩大了自由，击败了极权主义和恐怖。并建立了世界上最强大、最自由、最繁荣的国家。现在正是时候。我们的责任时刻。我们对决心和良心、对历史本身的考验。我们的性格就是在这一刻形成的。我们的目的已经找到了。我们的未来已铸成。嗯，我了解这个国家。我们将迎接考验。保护自由和自由，扩大公平和机会。我们将拯救民主。尽管这些时期很艰难，但我对今天的美国比我一生中的任何时候都更加乐观。因为我看到了我们掌握之中的未来。因为我知道没有什么超出我们的能力范围。我们是地球上唯一一个始终将所面临的每一次危机转化为机遇的国家。唯一可以用一个词来定义的国家：可能性。因此，今天晚上，在我们建国 245 周年之际，我来报告国情咨文。我的报告是这样的：国情咨文是强大的——因为你们，美国人民，是强大的。今天我们比一年前更强大。一年后我们将比今天更强大。现在是我们迎接和克服时代挑战的时刻。我们会作为一个民族。一个美国。美利坚合众国。愿上帝保佑你们大家。愿上帝保护我们的军队。`;
        const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
        const docs = await textSplitter.createDocuments([text]);
        const chain = loadSummarizationChain(model, {
            type: 'refine',
            questionPrompt: SUMMARY_PROMPT,
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
