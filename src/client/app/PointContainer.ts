import CustomImageLoader from "./ImageLoader";

type Point2D = { x: number, y: number };

interface IPointContainer {
  createPoindCloud: () => Promise<Point2D[]>
}

export default class PointContainer implements IPointContainer {

  canvas2D: HTMLCanvasElement;
  ctx2D: CanvasRenderingContext2D;
  imageUrl: string;

  size: number;

  constructor(imgUrl: string, size: number) {
    this.imageUrl = imgUrl;
    this.size = size;
    this.canvas2D = this.create2DCanvas();
    this.ctx2D = this.canvas2D.getContext('2d')!;
  }

  create2DCanvas() {
    const canvas2D = document.createElement('canvas');

    canvas2D.classList.add("canvas2d-2");
    canvas2D.height = this.size;
    canvas2D.width = this.size;

    document.body.append(canvas2D);

    return canvas2D;
  }

  async createPoindCloud() {

    const points: Point2D[] = [];
    const img = await CustomImageLoader.loadImage(this.imageUrl);
    this.ctx2D.drawImage(img, 0, 0, this.size, this.size);

    const imageData = this.ctx2D.getImageData(0, 0, this.size, this.size).data;

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        // const red = imageData[((size * y) + x) * 4];
        // const green = imageData[((size * y) + x) * 4 + 1];
        // const blue = imageData[((size * y) + x) * 4 + 2];
        const alpha = imageData[((this.size * y) + x) * 4 + 3];
        if (alpha > 0) {
          points.push({ x: 3 * (x - this.size / 2), y: 3 * (this.size / 2 - y) });
        }
      }
    }

    return points;
  }
}