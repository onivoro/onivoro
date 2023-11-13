import { PATH_TO_CHARACTERS } from './asset-paths.constant.js';
import { getImagePath } from './get-image-path.function.js';
import { InputHandler } from './input-handler.class.js';
import { ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from './keys.constant.js';

interface IDrawable {
    x: number;
    y: number;
}
export class Player implements IDrawable {
    imageNumber = 33;
    x;
    y;
    image!: HTMLImageElement;
    speed = 0;
    vy = 0;
    weight = 1;
    yLimit: number;

    constructor(
        private gameWidth: number, private gameHeight: number, private width: number, private height: number, private inputHandler: InputHandler,
    ) {

        this.x = 10;
        this.y = this.gameHeight - this.height;
        this.yLimit = this.gameHeight - this.height;
        this.image = this.#getImage(this.imageNumber);
    }

    #update() {
        this.imageNumber++;

        if (this.inputHandler.has(ARROW_LEFT)) {
            this.speed = -5;
        } else if (this.inputHandler.has(ARROW_RIGHT)) {
            this.speed = 5;
        } else {
            this.speed = 0;
            this.imageNumber = 33;
        }

        if (this.inputHandler.has(ARROW_UP)) {
            if (this.y > 0) {
                this.y -= 10;
            }
        } else {
            if(this.y < this.yLimit) {
                this.y += 10;
            }
        }

        this.image = this.#getImage(this.imageNumber);

        this.x += this.speed;
    }

    draw(ctx: CanvasRenderingContext2D, deltaTime: number) {
        this.#update();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    #getImagePath(index: number) {
        return getImagePath((i: number) => `${PATH_TO_CHARACTERS}dad/run/run_${i}.png`, index % 42, 3);
    }

    #getImage(index: number): HTMLImageElement {
        return (window as any)[`run_${(index % 42).toString().padStart(3, '0')}`];
    }
}

