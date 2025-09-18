import { Viewport as BaseViewport, type IViewportOptions as IBaseViewportOptions } from "pixi-viewport";
import type { DragEvent, MovedEvent, ZoomedEvent } from "pixi-viewport/dist/types";
import type { FederatedWheelEvent } from "pixi.js";

export interface IViewportOptions extends IBaseViewportOptions {
  // Plugins
  drag?: boolean;
  pinch?: boolean;
  wheel?: boolean;
  decelerate?: boolean;

  // Events
  onBounceXStart?: (v: BaseViewport) => void;
  onBounceXEnd?: (v: BaseViewport) => void;
  onBounceYStart?: (v: BaseViewport) => void;
  onBounceYEnd?: (v: BaseViewport) => void;
  onClicked?: (e: DragEvent) => void;
  onDragStart?: (e: DragEvent) => void;
  onDragEnd?: (e: DragEvent) => void;
  onFrameEnd?: (v: BaseViewport) => void;
  onMouseEdgeStart?: (v: BaseViewport) => void;
  onMouseEdgeEnd?: (v: BaseViewport) => void;
  onMoved?: (e: MovedEvent) => void;
  onMovedEnd?: (v: BaseViewport) => void;
  onPinchStart?: (v: BaseViewport) => void;
  onPinchEnd?: (v: BaseViewport) => void;
  onSnapStart?: (v: BaseViewport) => void;
  onSnapEnd?: (v: BaseViewport) => void;
  onSnapZoomStart?: (v: BaseViewport) => void;
  onSnapZoomEnd?: (v: BaseViewport) => void;
  onWheel?: (e: FederatedWheelEvent) => void;
  onWheelScroll?: (v: BaseViewport) => void;
  onZoomed?: (e: ZoomedEvent) => void;
  onZoomedEnd?: (v: BaseViewport) => void;
}

export class Viewport extends BaseViewport {
  constructor(options: IViewportOptions) {
    const {
      drag,
      pinch,
      wheel,
      decelerate,

      onBounceXStart,
      onBounceXEnd,
      onBounceYStart,
      onBounceYEnd,
      onClicked,
      onDragStart,
      onDragEnd,
      onFrameEnd,
      onMouseEdgeStart,
      onMouseEdgeEnd,
      onMoved,
      onMovedEnd,
      onPinchStart,
      onPinchEnd,
      onSnapStart,
      onSnapEnd,
      onSnapZoomStart,
      onSnapZoomEnd,
      onWheel,
      onWheelScroll,
      onZoomed,
      onZoomedEnd,

      ...rest
    } = options;

    super(rest);

    if (drag) this.drag({ mouseButtons: "left", keyToPress: ["Space"] });
    if (pinch) this.pinch();
    if (wheel) this.wheel();
    if (decelerate) this.decelerate();

    if (onBounceXStart) this.on("bounce-x-start", onBounceXStart);
    if (onBounceXEnd) this.on("bounce-x-end", onBounceXEnd);
    if (onBounceYStart) this.on("bounce-y-start", onBounceYStart);
    if (onClicked) this.on("clicked", onClicked);
    if (onDragStart) this.on("drag-start", onDragStart);
    if (onDragEnd) this.on("drag-end", onDragEnd);
    if (onFrameEnd) this.on("frame-end", onFrameEnd);
    if (onMouseEdgeStart) this.on("mouse-edge-start", onMouseEdgeStart);
    if (onMouseEdgeEnd) this.on("mouse-edge-end", onMouseEdgeEnd);
    if (onMoved) this.on("moved", onMoved);
    if (onMovedEnd) this.on("moved-end", onMovedEnd);
    if (onPinchStart) this.on("pinch-start", onPinchStart);
    if (onPinchEnd) this.on("pinch-end", onPinchEnd);
    if (onSnapStart) this.on("snap-start", onSnapStart);
    if (onSnapEnd) this.on("snap-end", onSnapEnd);
    if (onSnapZoomStart) this.on("snap-zoom-start", onSnapZoomStart);
    if (onSnapZoomEnd) this.on("snap-zoom-end", onSnapZoomEnd);
    if (onWheel) this.on("wheel", onWheel);
    if (onWheelScroll) this.on("wheel-scroll", onWheelScroll);
    if (onZoomed) this.on("zoomed", onZoomed);
    if (onZoomedEnd) this.on("zoomed-end", onZoomedEnd);
  }
}
