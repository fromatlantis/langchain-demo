import { createSignal, createEffect, onMount, For, Show } from 'solid-js';

const Home = () => {
    const [key, setKey] = createSignal(localStorage.getItem('localKey') || '');
    const [code, setCode] = createSignal('');
    const [user, setUser] = createSignal('');
    const handleChange = (e: CustomEvent) => {
        setKey(e.detail.value);
        localStorage.setItem('localKey', e.detail.value);
    };
    createEffect(async () => {
        if(!code()) return;
        const response = await fetch(`/api/jmToken`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                code: code(),
            }),
        });
        const res = await response.json();
        console.log(res);
        if (!res.resultData.token) return;
        const responseUser = await fetch(`/api/jmUser`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                token: res.resultData.token,
            }),
        });
        const resUser = await responseUser.json();
        setUser(resUser);
    });

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
            {user}
        </>
    );
};

export default Home;
