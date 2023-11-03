import { createSignal, onMount, For } from 'solid-js';

const IOModel = () => {
    const [countries, setCountries] = createSignal([]);
    onMount(async () => {
        const response = await fetch(`/api/io`, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'custom/non-standard',
            },
            method: 'POST',
            body: JSON.stringify({
                hello: 'world',
            }),
        });
        const result = await response.json();
        setCountries(result);
    });

    return (
        <div>
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
