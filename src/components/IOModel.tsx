import { createSignal, onMount, For } from 'solid-js';

const IOModel = () => {
    const [prompt, setPrompt] = createSignal('List 5 countries.');
    const [countries, setCountries] = createSignal([]);

    onMount(async () => {
        getCountries();
    });

    const handleChange = (e: CustomEvent) => {
        setPrompt(e.detail.value);
    };

    const handleSend = () => {
        getCountries();
    };

    const getCountries = async () => {
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
    };

    return (
        <div class="w-full flex-1">
            <ar-textarea
                value={prompt()}
                onChange={handleChange}
                placeholder="user prompt"
            ></ar-textarea>
            <ar-button onClick={handleSend}>
                <ar-icon name="send"></ar-icon>
            </ar-button>
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
