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
        const summaryTemplate = `请使用中文总结出关键信息：
            --------
            {text}
            --------
        `;
        const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);
        const text = `Madam Speaker, Madam Vice President, our First Lady and Second Gentleman. Members of Congress and the Cabinet. Justices of the Supreme Court. My fellow Americans.  

        Last year COVID-19 kept us apart. This year we are finally together again. 
        
        Tonight, we meet as Democrats Republicans and Independents. But most importantly as Americans. 
        
        With a duty to one another to the American people to the Constitution. 
        
        And with an unwavering resolve that freedom will always triumph over tyranny. 
        
        Six days ago, Russia’s Vladimir Putin sought to shake the foundations of the free world thinking he could make it bend to his menacing ways. But he badly miscalculated. 
        
        He thought he could roll into Ukraine and the world would roll over. Instead he met a wall of strength he never imagined. 
        
        He met the Ukrainian people. 
        
        From President Zelenskyy to every Ukrainian, their fearlessness, their courage, their determination, inspires the world. 
        
        Groups of citizens blocking tanks with their bodies. Everyone from students to retirees teachers turned soldiers defending their homeland. 
        
        In this struggle as President Zelenskyy said in his speech to the European Parliament “Light will win over darkness.” The Ukrainian Ambassador to the United States is here tonight. 
        
        Let each of us here tonight in this Chamber send an unmistakable signal to Ukraine and to the world. 
        
        Please rise if you are able and show that, Yes, we the United States of America stand with the Ukrainian people. 
        
        Throughout our history we’ve learned this lesson when dictators do not pay a price for their aggression they cause more chaos.   
        
        They keep moving.   
        
        And the costs and the threats to America and the world keep rising.   
        
        That’s why the NATO Alliance was created to secure peace and stability in Europe after World War 2. 
        
        The United States is a member along with 29 other nations. 
        
        It matters. American diplomacy matters. American resolve matters. 
        
        Putin’s latest attack on Ukraine was premeditated and unprovoked. 
        
        He rejected repeated efforts at diplomacy. 
        
        He thought the West and NATO wouldn’t respond. And he thought he could divide us at home. Putin was wrong. We were ready.  Here is what we did.   
        
        We prepared extensively and carefully. 
        
        We spent months building a coalition of other freedom-loving nations from Europe and the Americas to Asia and Africa to confront Putin. 
        
        I spent countless hours unifying our European allies. We shared with the world in advance what we knew Putin was planning and precisely how he would try to falsely justify his aggression.  
        
        We countered Russia’s lies with truth.   
        
        And now that he has acted the free world is holding him accountable. 
        
        Along with twenty-seven members of the European Union including France, Germany, Italy, as well as countries like the United Kingdom, Canada, Japan, Korea, Australia, New Zealand, and many others, even Switzerland. 
        
        We are inflicting pain on Russia and supporting the people of Ukraine. Putin is now isolated from the world more than ever. 
        
        Together with our allies –we are right now enforcing powerful economic sanctions. 
        
        We are cutting off Russia’s largest banks from the international financial system.  
        
        Preventing Russia’s central bank from defending the Russian Ruble making Putin’s $630 Billion “war fund” worthless.   
        
        We are choking off Russia’s access to technology that will sap its economic strength and weaken its military for years to come.  
        
        Tonight I say to the Russian oligarchs and corrupt leaders who have bilked billions of dollars off this violent regime no more. 
        
        The U.S. Department of Justice is assembling a dedicated task force to go after the crimes of Russian oligarchs.  
        
        We are joining with our European allies to find and seize your yachts your luxury apartments your private jets. We are coming for your ill-begotten gains. 
        
        And tonight I am announcing that we will join our allies in closing off American air space to all Russian flights – further isolating Russia – and adding an additional squeeze –on their economy. The Ruble has lost 30% of its value. 
        
        The Russian stock market has lost 40% of its value and trading remains suspended. Russia’s economy is reeling and Putin alone is to blame. 
        
        Together with our allies we are providing support to the Ukrainians in their fight for freedom. Military assistance. Economic assistance. Humanitarian assistance. 
        
        We are giving more than $1 Billion in direct assistance to Ukraine. 
        
        And we will continue to aid the Ukrainian people as they defend their country and to help ease their suffering.  
        
        A cancer that would put them in a flag-draped coffin. 
        
        I know. 
        
        One of those soldiers was my son Major Beau Biden. 
        
        We don’t know for sure if a burn pit was the cause of his brain cancer, or the diseases of so many of our troops. 
        
        But I’m committed to finding out everything we can. 
        
        Committed to military families like Danielle Robinson from Ohio. 
        
        The widow of Sergeant First Class Heath Robinson.  
        
        He was born a soldier. Army National Guard. Combat medic in Kosovo and Iraq. 
        
        Stationed near Baghdad, just yards from burn pits the size of football fields. 
        
        Heath’s widow Danielle is here with us tonight. They loved going to Ohio State football games. He loved building Legos with their daughter. 
        
        But cancer from prolonged exposure to burn pits ravaged Heath’s lungs and body. 
        
        Danielle says Heath was a fighter to the very end. 
        
        He didn’t know how to stop fighting, and neither did she. 
        
        Through her pain she found purpose to demand we do better. 
        
        Tonight, Danielle—we are. 
        
        The VA is pioneering new ways of linking toxic exposures to diseases, already helping more veterans get benefits. 
        
        And tonight, I’m announcing we’re expanding eligibility to veterans suffering from nine respiratory cancers. 
        
        I’m also calling on Congress: pass a law to make sure veterans devastated by toxic exposures in Iraq and Afghanistan finally get the benefits and comprehensive health care they deserve. 
        
        And fourth, let’s end cancer as we know it. 
        
        This is personal to me and Jill, to Kamala, and to so many of you. 
        
        Cancer is the #2 cause of death in America–second only to heart disease. 
        
        Last month, I announced our plan to supercharge  
        the Cancer Moonshot that President Obama asked me to lead six years ago. 
        
        Our goal is to cut the cancer death rate by at least 50% over the next 25 years, turn more cancers from death sentences into treatable diseases.  
        
        More support for patients and families. 
        
        To get there, I call on Congress to fund ARPA-H, the Advanced Research Projects Agency for Health. 
        
        It’s based on DARPA—the Defense Department project that led to the Internet, GPS, and so much more.  
        
        ARPA-H will have a singular purpose—to drive breakthroughs in cancer, Alzheimer’s, diabetes, and more. 
        
        A unity agenda for the nation. 
        
        We can do this. 
        
        My fellow Americans—tonight , we have gathered in a sacred space—the citadel of our democracy. 
        
        In this Capitol, generation after generation, Americans have debated great questions amid great strife, and have done great things. 
        
        We have fought for freedom, expanded liberty, defeated totalitarianism and terror. 
        
        And built the strongest, freest, and most prosperous nation the world has ever known. 
        
        Now is the hour. 
        
        Our moment of responsibility. 
        
        Our test of resolve and conscience, of history itself. 
        
        It is in this moment that our character is formed. Our purpose is found. Our future is forged. 
        
        Well I know this nation.  
        
        We will meet the test. 
        
        To protect freedom and liberty, to expand fairness and opportunity. 
        
        We will save democracy. 
        
        As hard as these times have been, I am more optimistic about America today than I have been my whole life. 
        
        Because I see the future that is within our grasp. 
        
        Because I know there is simply nothing beyond our capacity. 
        
        We are the only nation on Earth that has always turned every crisis we have faced into an opportunity. 
        
        The only nation that can be defined by a single word: possibilities. 
        
        So on this night, in our 245th year as a nation, I have come to report on the State of the Union. 
        
        And my report is this: the State of the Union is strong—because you, the American people, are strong. 
        
        We are stronger today than we were a year ago. 
        
        And we will be stronger a year from now than we are today. 
        
        Now is our moment to meet and overcome the challenges of our time. 
        
        And we will, as one people. 
        
        One America. 
        
        The United States of America. 
        
        May God bless you all. May God protect our troops.`;
        const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 3000 });
        const docs = await textSplitter.createDocuments([text]);
        const chain = loadSummarizationChain(model, {
            type: 'refine',
            questionPrompt: SUMMARY_PROMPT
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
