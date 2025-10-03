import { Container, Graphics, Rectangle, Ticker, type ContainerOptions } from "pixi.js";

interface LayerOptions extends ContainerOptions {}

export class Layer extends Container {
  constructor(options: LayerOptions) {
    super(options);
  }
}
