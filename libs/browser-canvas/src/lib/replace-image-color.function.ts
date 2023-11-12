
export function replaceImageColor(canvas: HTMLCanvasElement, imageUrl: string, modifier: (red: number, green: number, blue: number, alpha: number) => {red: number, green: number, blue: number, alpha: number}) {
    const context = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        context?.drawImage(img, 0, 0);
        modifyPixels(context as any);

        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = image;
    };

    img.src = imageUrl;

    const modifyPixels = (ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const redOriginal = data[i];
            const greenOriginal = data[i + 1];
            const blueOriginal = data[i + 2];
            const alphaOriginal = data[i + 3];

            const {red, green, blue, alpha} = modifier(redOriginal, greenOriginal, blueOriginal, alphaOriginal);

            data[i] = red;
            data[i + 1] = green;
            data[i + 2] = blue;
            data[i + 3] = alpha;
        }
        ctx.putImageData(imageData, 0, 0);
    };

}