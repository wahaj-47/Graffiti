import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import mongoose from "mongoose";
import { pieceSchema } from "database/schema";
import { DatabaseContext } from "database/context";
import piece from "database/services/Piece";

import { nsPiece } from "socket/namespace";
export { nsPiece };

declare module "react-router" {
  interface AppLoadContext {}
}

export const app = express();

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const client = mongoose.createConnection(process.env.DATABASE_URL);
client.model("Piece", pieceSchema);
app.use((_, __, next) => DatabaseContext.run(client, next));

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        piece,
      };
    },
  })
);
