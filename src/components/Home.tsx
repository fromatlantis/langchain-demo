import { createSignal, For, Show } from 'solid-js';

const Home = () => {
    const [key, setKey] = createSignal(localStorage.getItem('localKey') || '');

    const handleChange = (e: CustomEvent) => {
        setKey(e.detail.value);
        localStorage.setItem('localKey', e.detail.value);
    };

    return (
        <ar-textarea
            class="w-lg"
            value={key()}
            onChange={handleChange}
            placeholder="OpenAI API Key"
        ></ar-textarea>
    );
};

export default Home;
