import { createSignal, For, Show } from 'solid-js';
import LoadingMask from './LoadingMask';

const RetrievalQA = () => {
    const [url, setUrl] = createSignal('https://lilianweng.github.io/posts/2023-06-23-agent/');
    const [prompt, setPrompt] = createSignal('What is task decomposition?');
    const [answer, setAnswer] = createSignal('');
    const [loading, setLoading] = createSignal(false);

    const handleUrlChange = (e: CustomEvent) => {
        setUrl(e.detail.value);
    };

    const handleChange = (e: CustomEvent) => {
        setPrompt(e.detail.value);
    };

    const handleSend = () => {
        getAnswer();
    };

    const getAnswer = async () => {
        setLoading(true);
        const response = await fetch(`/api/qa`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                url: url(),
                prompt: prompt(),
            }),
        });
        const result = await response.json();
        setAnswer(result?.text);
        setLoading(false);
    };

    return (
        <div class="w-full flex-1 relative">
            <Show when={loading()}>
                <LoadingMask />
            </Show>
            <ar-textarea
                class="flex-1 m-b-6"
                value={url()}
                onChange={handleUrlChange}
                placeholder="Web Url"
            ></ar-textarea>
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
            {answer()}
        </div>
    );
};

export default RetrievalQA;
