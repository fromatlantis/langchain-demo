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
            <Show when={countries().length > 0}>
                <table class="border-collapse">
                    <tbody>
                        <tr>
                            <td class="border b-solid b-gray-3 p3 bg-gray text-center ">国家名称</td>
                            <td class="border b-solid b-gray-3 p3 bg-gray text-center ">国家首都</td>
                            <td class="border b-solid b-gray-3 bg-gray text-center ">值</td>
                        </tr>
                        <For each={countries()}>
                            {(country) => (
                                <tr>
                                    <td class="border b-solid b-gray-3 p3">{country.Name}</td>
                                    <td class="border b-solid b-gray-3 p3">{country.Capital}</td>
                                    <td class="border b-solid b-gray-3 p3">{country.Number}</td>
                                </tr>
                            )}
                        </For>
                    </tbody>
                </table>
            </Show>
        </div>
    );
};

export default IOModel;
