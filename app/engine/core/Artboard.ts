import { Container, Graphics, Rectangle, Ticker, type ContainerOptions } from "pixi.js";

interface ArtboardOptions extends ContainerOptions {
  width: number;
  height: number;
}

export class Artboard extends Container {
  constructor(options: ArtboardOptions) {
    super(options);

    const { width, height } = options;
    this.eventMode = "dynamic";
    const background = new Graphics().rect(0, 0, width, height).fill(0xffffff);
    this.addChild(background);

    this.cacheAsTexture(true);

    const ticker = new Ticker();
    ticker.add(() => {
      this.updateCacheTexture();
    });
    ticker.start();
  }
}
