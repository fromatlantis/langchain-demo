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
        getAnswer();
    };

    const getAnswer = async () => {
        setLoading(true);
        const response = await fetch(`/api/chat`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                prompt: prompt(),
            }),
        });
        const result = await response.json();
        if (result.error) {
            setAnswer(result.error.message);
        } else {
            setAnswer(result.text);
        }
        setLoading(false);
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
            {answer()}
        </div>
    );
};

export default AIChat;
