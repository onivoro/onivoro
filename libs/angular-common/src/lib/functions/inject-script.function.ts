export function injectScript(src: string) {
    return new Promise(resolve => {
        const s = document.createElement('script');
        s.onload = resolve;
        s.src = src;
        document.body.appendChild(s);
    });
}