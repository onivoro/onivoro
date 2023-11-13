import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from "./keys.constant.js";
import { KEYDOWN, KEYUP } from "./events.constant.js";
import { on } from "./on.function.js";

export class InputHandler {
    keys: string[] = [];
    constructor() {
        bindKeys([ARROW_DOWN, ARROW_UP, ARROW_LEFT, ARROW_RIGHT], this.keys);
    }

    has(key: string) {
        return this.keys.includes(key);
    }
}

function bindKeys(keysToBind: string[], keys: string[]) {
    on(KEYDOWN, (e: KeyboardEvent) => {
        console.warn(KEYDOWN, e.key)
        if (keysToBind.includes(e.key) && keys.indexOf(e.key) === -1) {
            keys.push(e.key);
            console.warn('pushed ' + e.key)
        }
    });

    on(KEYUP, (e: KeyboardEvent) => {
        console.warn(KEYUP, e.key)
        if (keysToBind.includes(e.key)) {
            const index = keys.indexOf(e.key);
            if (index !== -1) {
                keys.splice(index, 1);
                console.warn('removed ' + e.key)
            }
        }
    });
}