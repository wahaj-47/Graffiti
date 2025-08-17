import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";

// Short-circuit the type-checking of the built output.
const BUILD_PATH = "./build/server/index.js";
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const piece = io.of("/piece");

app.use(compression());
app.disable("x-powered-by");

if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );
  app.use(viteDevServer.middlewares);
  const source = await viteDevServer.ssrLoadModule("./server/app.ts");
  app.use(async (req, res, next) => {
    try {
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
  piece.on("connection", source.nsPiece);
} else {
  console.log("Starting production server");
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
  app.use(morgan("tiny"));
  app.use(express.static("build/client", { maxAge: "1h" }));
  const mod = await import(BUILD_PATH)
  app.use(mod.app);
  piece.on("connection", mod.nsPiece);
}

httpServer.listen(PORT);
