import { InputHandler } from './lib/input-handler.class';
import { Layer } from './lib/layer.class';
import { Player } from './lib/player.class';

const BACKGROUND_IMAGE_WIDTH = 2560;
const BACKGROUND_IMAGE_HEIGHT = 1440;

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const CANVAS_WIDTH = canvas.width = BACKGROUND_IMAGE_WIDTH * .4;
    const CANVAS_HEIGHT = canvas.height = BACKGROUND_IMAGE_HEIGHT * 2 / 3 - 40;
    const GAME_SPEED = 10;
    let lastTime = 0;
    const timeBetweenFrames = 20;
    const layers = [
        new Layer('layer-1.png', 0.2, BACKGROUND_IMAGE_WIDTH, BACKGROUND_IMAGE_HEIGHT, GAME_SPEED),
        new Layer('layer-2.png', 0.4, BACKGROUND_IMAGE_WIDTH, BACKGROUND_IMAGE_HEIGHT, GAME_SPEED),
        new Layer('layer-3.png', 0.6, BACKGROUND_IMAGE_WIDTH, BACKGROUND_IMAGE_HEIGHT, GAME_SPEED),
        new Layer('layer-4.png', 0.8, BACKGROUND_IMAGE_WIDTH, BACKGROUND_IMAGE_HEIGHT, GAME_SPEED),
    ];

    const inputHandler = new InputHandler();

    const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, 114, 176, inputHandler);

    function animate(time: number) {
        const deltaTime = !time ? timeBetweenFrames : time - lastTime;

        lastTime = time;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        layers.forEach(layer => {
            layer.draw(ctx, deltaTime);
        });

        player.draw(ctx, deltaTime);

        requestAnimationFrame(animate);
    }

    animate(0);
});