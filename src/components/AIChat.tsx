import { createSignal, For, Show } from 'solid-js';
import LoadingMask from './LoadingMask';

const AIChat = () => {
    const [prompt, setPrompt] = createSignal('hello');
    const [answer, setAnswer] = createSignal('');
    const [loading, setLoading] = createSignal(false);

    const handleChange = (e: CustomEvent) => {
        setPrompt(e.detail.value);
    };

    const handleSend = () => {
        setAnswer('');
        getAnswer();
    };

    const getAnswer = async () => {
        // setLoading(true);
        const response = await fetch(`/api/saler`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                prompt: prompt(),
                localKey: localStorage.getItem('localKey'),
            }),
        });
        const data = response.body as any;
        if (!data) {
            throw new Error('没有返回数据，请稍后再试');
        }
        // const reader = data.getIterator();
        // for await (const chunk of reader) {
        //     // 解析数据块
        //     console.log(JSON.stringify(chunk, null, 2));
        // }
        const reader = data.getReader();
        const decoder = new TextDecoder('utf-8');
        let done = false;
        while (!done) {
            const answer = await reader.read();
            console.log(answer)
            // const { value, done: readerDone, ...others } = await reader.read();
            // console.log(value, others);
            // if (value) {
            //     const char = decoder.decode(value);
            //     console.log(char);
            //     if (char === '\n' && answer().endsWith('\n')) {
            //         continue;
            //     }
            //     if (char) {
            //         setAnswer(answer() + char);
            //     }
            // }
            done = answer.done;
        }
        // const result = await response.json();
        // if (result.error) {
        //     setAnswer(result.error.message);
        // } else {
        //     setAnswer(result.text);
        // }
        // setLoading(false);
    };

    return (
        <div class="w-full flex-1 relative">
            <Show when={loading()}>
                <LoadingMask />
            </Show>
            <div class="w-full flex m-b-6">
                <ar-textarea
                    class="flex-1"
                    value={prompt()}
                    onChange={handleChange}
                    placeholder="User Prompt"
                ></ar-textarea>
                <ar-button onClick={handleSend}>
                    <ar-icon name="send"></ar-icon>
                </ar-button>
            </div>
            <ar-rich-text text={answer()}></ar-rich-text>
        </div>
    );
};

export default AIChat;
