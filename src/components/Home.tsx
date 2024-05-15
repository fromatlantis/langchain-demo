import { createSignal, onMount, For, Show } from 'solid-js';

const Home = () => {
    const [key, setKey] = createSignal(localStorage.getItem('localKey') || '');
    const [code, setCode] = createSignal('');
    const handleChange = (e: CustomEvent) => {
        setKey(e.detail.value);
        localStorage.setItem('localKey', e.detail.value);
    };

    onMount(() => {
        var param = {
            appKey: 'ri1otwHDtOUnX6YmLjEg',
            callback: (result: any) => {
                console.log(result);
                setCode(result.code);
            },
        };
        // @ts-ignore
        jme.login.getAuthorizationCode(param);
    });

    return (
        <>
            <span>{code()}</span>
            <ar-textarea
                class="w-lg"
                value={key()}
                onChange={handleChange}
                placeholder="OpenAI API Key"
            ></ar-textarea>
        </>
    );
};

export default Home;
