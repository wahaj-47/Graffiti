import { Container, Graphics, Rectangle, Ticker, type ContainerOptions } from "pixi.js";

interface LayerOptions extends ContainerOptions {}

export class Layer extends Container {
  constructor(options: LayerOptions) {
    super(options);

    this.cacheAsTexture({ antialias: true });

    const ticker = new Ticker();
    ticker.add(this.update, this);
    ticker.start();
  }

  protected update(): void {
    this.updateCacheTexture();
  }
}
