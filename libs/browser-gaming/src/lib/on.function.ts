export function on (eventName: keyof WindowEventMap, fn: Function) {
    window.addEventListener(eventName, fn as any);
}