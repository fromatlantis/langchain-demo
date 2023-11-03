import './LoadingMask.css';

const LoadingMask = ({ loadingText }: { loadingText?: string }) => {
    return (
        <div class="loading-mask flex-col">
            <div class="loading-spinner"></div>
            <div>{loadingText ?? '请稍后'}...</div>
        </div>
    );
};

export default LoadingMask;
