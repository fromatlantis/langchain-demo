import { createSignal, createEffect, onMount, For, Show } from 'solid-js';

const Home = () => {
    const [key, setKey] = createSignal(localStorage.getItem('localKey') || '');
    const [code, setCode] = createSignal('');
    const [user, setUser] = createSignal<{ avatar: string; name: string }>();
    const handleChange = (e: CustomEvent) => {
        setKey(e.detail.value);
        localStorage.setItem('localKey', e.detail.value);
    };
    createEffect(async () => {
        if (!code()) return;
        // alert(code())
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
        // alert(JSON.stringify(res));
        if (!res.resultData.data.token) return;
        const responseUser = await fetch(`/api/jmUser`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                token: res.resultData.data.token,
            }),
        });
        const resUser = await responseUser.json();
        setUser({
            avatar: resUser.resultData.data.avatarUrl,
            name: resUser.resultData.data.name,
        });
        // alert(JSON.stringify(resUser));
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
            <p>Code: {code()}</p>
            <p>用户信息：</p>
            <Show when={user()}>
                <p class="flex gap-2 items-center">
                    <img class="w-10" src={user().avatar} alt="" />
                    <span>{user().name}</span>
                </p>
            </Show>
        </>
    );
};

export default Home;
