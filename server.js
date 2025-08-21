import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import { WebSocketExpress } from 'websocket-express'
import { Hocuspocus } from "@hocuspocus/server"
import morgan from "morgan";

// Short-circuit the type-checking of the built output.
const BUILD_PATH = "./build/server/index.js";
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = new WebSocketExpress()
const hocuspocus = new Hocuspocus({
  name: "piece:hocuspocus",
  onConfigure: async () => {
    console.log(`Server configured - Connections: ${hocuspocus.getConnectionsCount()}`)
  },
  connected: async () => {
    console.log(`Connection established - Connections: ${hocuspocus.getConnectionsCount()}`)
  }
});

app.useHTTP(compression());
app.disable("x-powered-by");

if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );
  app.useHTTP(viteDevServer.middlewares);
  const source = await viteDevServer.ssrLoadModule("./server/app.ts");
  app.useHTTP(async (req, res, next) => {
    try {
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
  app.use("/join", source.pieceRouter(hocuspocus))
} else {
  console.log("Starting production server");

  app.useHTTP(
    "/assets",
    WebSocketExpress.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
  app.useHTTP(morgan("tiny"));
  app.useHTTP(WebSocketExpress.static("build/client", { maxAge: "1h" }));
  const mod = await import(BUILD_PATH)
  app.useHTTP(mod.app);
  app.use("/join", mod.pieceRouter(hocuspocus));
}

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
