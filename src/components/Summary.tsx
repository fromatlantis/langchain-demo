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
            },
            method: 'POST',
        });
        const result = await response.json();
        if (result.error) {
            setAnswer(result.error.message);
        } else {
            setAnswer(result.text || result.output_text);
        }
        setLoading(false);
    };

    return (
        <div class="w-full flex-1 relative">
            <Show when={loading()}>
                <LoadingMask />
            </Show>
            <div class="w-full flex items-center gap-x-3 m-b-6">
                <a href="/state_of_the_union_zh.txt" target="_blank">
                    2020年美国国情咨文state_of_the_union_zh.txt
                </a>
                <ar-button onClick={handleSend}>生成摘要</ar-button>
            </div>
            <pre>{answer()}</pre>
        </div>
    );
};

export default Summary;
