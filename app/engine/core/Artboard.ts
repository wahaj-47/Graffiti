import { Container, Graphics, Rectangle, Ticker, type ContainerOptions } from "pixi.js";

interface ArtboardOptions extends ContainerOptions {}

export class Artboard extends Container {
  constructor(options: ArtboardOptions) {
    super(options);

    this.eventMode = "static";
    this.cacheAsTexture(true);

    const ticker = new Ticker();
    ticker.add(this.update, this);
    ticker.start();
  }

  protected update(): void {
    this.updateCacheTexture();
  }
}
