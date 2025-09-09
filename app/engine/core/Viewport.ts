import { Viewport as BaseViewport, type IViewportOptions as IBaseViewportOptions } from "pixi-viewport";

export interface IViewportOptions extends IBaseViewportOptions {
  drag?: boolean;
  pinch?: boolean;
  wheel?: boolean;
  decelerate?: boolean;
}

export class Viewport extends BaseViewport {
  constructor(options: IViewportOptions) {
    const { drag, pinch, wheel, decelerate, ...rest } = options;
    super(rest);
    if (drag) this.drag();
    if (pinch) this.pinch();
    if (wheel) this.wheel();
    if (decelerate) this.decelerate();
  }
}
