import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import { connectDB } from "./config/db";
import piece from "./services/Piece";

await connectDB();

declare module "react-router" {
  interface AppLoadContext {
    piece: typeof piece;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        piece: piece,
      };
    },
  })
);
