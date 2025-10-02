import "pixi.js";

declare module "pixi.js" {
  interface Container {
    dirty: boolean;
  }
}
