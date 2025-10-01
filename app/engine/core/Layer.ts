import {
  Bounds,
  Container,
  Graphics,
  ObservablePoint,
  Point,
  ViewContainer,
  type ContainerChild,
  type ContainerOptions,
  type GraphicsOptions,
  type IRenderLayer,
} from "pixi.js";

const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const TILE_SIZE = 1024;
function normalize(v: number) {
  return Math.floor(v / TILE_SIZE);
}

interface LayerOptions extends ContainerOptions {}

export class Layer extends Container {
  _tiles: Map<string, Tile>;

  constructor(options: LayerOptions) {
    super(options);

    this._tiles = new Map<string, Container>();
    this.on("childAdded", this._addToTile);
  }

  private _addToTile(child: ContainerChild) {
    if (child instanceof Tile) {
      console.log("Tile added");
      return;
    }

    if (child instanceof BoundingBox) {
      console.log("Bounding box added");
      return;
    }

    const bbox = new BoundingBox();
    this.addChild(bbox);

    child.onRender = () => {
      const { x, y, width, height } = child.getLocalBounds(); // x,y,width,height in world coords
      bbox.clear();
      bbox.rect(x, y, width, height).stroke({ width: 2, color: "white" });
    };

    //

    // console.log("Child updated");

    // const bounds = child.getBounds();
    // const { minX, maxX, minY, maxY } = bounds;
    // const startX = normalize(minX);
    // const endX = normalize(maxX);
    // const startY = normalize(minY);
    // const endY = normalize(maxY);

    // for (let x = startX; x <= endX; x++) {
    //   for (let y = startY; y <= endY; y++) {
    //     const tile = this._getTile(x, y);
    //     // tile.addChild(child);
    //   }
    // }

    // this.removeChild(child);
  }

  private _getTile(x: number, y: number): Tile {
    const key = `${x},${y}`;

    if (this._tiles.has(key)) return this._tiles.get(key)!;

    const tile = new Tile({ x, y });
    this._tiles.set(key, tile);
    this.addChild(tile);
    return tile;
  }
}

interface TileOptions extends ContainerOptions {
  x: number;
  y: number;
}

class Tile extends Container {
  constructor(options: TileOptions) {
    options.x *= TILE_SIZE;
    options.y *= TILE_SIZE;
    options.width = TILE_SIZE;
    options.height = TILE_SIZE;

    super(options);

    this.cacheAsTexture(true);
    this.cullable = true;

    // DEBUG
    const background = new Graphics()
      .rect(0, 0, options.width, options.height)
      .stroke({ width: 10, color: randomColor() });
    this.addChild(background);
  }
}

class BoundingBox extends Graphics {
  constructor(options?: GraphicsOptions) {
    super(options);
  }
}
