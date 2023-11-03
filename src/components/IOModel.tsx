import { createSignal, For, Show } from 'solid-js';
import LoadingMask from './LoadingMask';

const IOModel = () => {
    const [prompt, setPrompt] = createSignal('List 5 countries.');
    const [countries, setCountries] = createSignal([]);
    const [loading, setLoading] = createSignal(false);

    const handleChange = (e: CustomEvent) => {
        setPrompt(e.detail.value);
    };

    const handleSend = () => {
        getCountries();
    };

    const getCountries = async () => {
        setLoading(true);
        const response = await fetch(`/api/io`, {
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
        setCountries(result);
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
                    placeholder="user prompt"
                ></ar-textarea>
                <ar-button onClick={handleSend}>
                    <ar-icon name="send"></ar-icon>
                </ar-button>
            </div>
            <For each={countries()}>
                {(country) => (
                    <li>
                        Name: {country.Name} Capital: {country.Capital}
                    </li>
                )}
            </For>
        </div>
    );
};

export default IOModel;
