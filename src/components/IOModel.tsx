import { onMount } from 'solid-js';
const IOModel = () => {
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
    });

    return <div>Model IO</div>;
};

export default IOModel;
