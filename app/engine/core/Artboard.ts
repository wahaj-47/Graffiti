import { Container, Graphics, Rectangle, type ContainerOptions } from "pixi.js";

interface ArtboardOptions extends ContainerOptions {
  width: number;
  height: number;
}

export class Artboard extends Container {
  constructor(options: ArtboardOptions) {
    super(options);

    console.log("Artboard options:", options);

    const { width, height } = options;
    this.eventMode = "dynamic";
    const background = new Graphics().rect(0, 0, width, height).fill(0xffffff);
    const mask = new Graphics().rect(0, 0, width, height).fill(0x000000);
    this.addChild(background);
    this.addChild(mask);
    this.mask = mask;
  }
}
