import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import { WebSocketExpress } from 'websocket-express'

import morgan from "morgan";

// Short-circuit the type-checking of the built output.
const BUILD_PATH = "./build/server/index.js";
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = new WebSocketExpress()

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
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts");
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  console.log("Starting production server");
  app.useHTTP(
    "/assets",
    WebSocketExpress.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
  app.useHTTP(morgan("tiny"));
  app.useHTTP(WebSocketExpress.static("build/client", { maxAge: "1h" }));
  app.use(await import(BUILD_PATH).then((mod) => mod.app));
}

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
