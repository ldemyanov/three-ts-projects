export default class CustomImageLoader {

  static async loadImage(url: string, callback?: (loadedImg: HTMLImageElement) => void): Promise<HTMLImageElement> {

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();

      image.crossOrigin = 'anonymous';

      // image.onload = () => resolve(image);

      image.addEventListener('load', () => {

        if (image) {
          // callback(image);
          resolve(image);
        }

      }, { once: true });

      image.src = url;
    });

    return promise;
  }



}