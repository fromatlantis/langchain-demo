import { createSignal, For, Show } from 'solid-js';
import LoadingMask from './LoadingMask';

const Summary = () => {
    const [answer, setAnswer] = createSignal('');
    const [loading, setLoading] = createSignal(false);

    const handleSend = () => {
        getAnswer();
    };

    const getAnswer = async () => {
        setLoading(true);
        const response = await fetch(`/api/summary`, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'custom/non-standard',
            },
            method: 'POST',
            body: JSON.stringify({
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
            <div class="w-full flex items-center gap-y3 m-b-6">
                <a href="/api/state_of_the_union_zh.txt" target="_blank">
                    2020年美国国情咨文state_of_the_union_zh.txt
                </a>
                <ar-button onClick={handleSend}>
                    <ar-icon name="send"></ar-icon>
                </ar-button>
            </div>
            {answer()}
        </div>
    );
};

export default Summary;
