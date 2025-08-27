import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import mongoose from "mongoose";
import { pieceSchema } from "database/schema";
import { DatabaseContext } from "database/context";
import piece from "database/services/Piece";

import { Hocuspocus } from "@hocuspocus/server";
import { pieceRouter } from "socket/piece";

declare module "react-router" {
  interface AppLoadContext {}
}

const app = express();

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const client = mongoose.createConnection(process.env.DATABASE_URL);
client.model("Piece", pieceSchema);
app.use((_, __, next) => DatabaseContext.run(client, next));

const hocuspocus = new Hocuspocus({
  name: "piece:hocuspocus",
  onConfigure: async () => {
    console.log(
      `Server configured - Connections: ${hocuspocus.getConnectionsCount()}`
    );
  },
  connected: async () => {
    console.log(
      `Connection established - Connections: ${hocuspocus.getConnectionsCount()}`
    );
  },
});

app.use("/join", pieceRouter(hocuspocus));

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

export { app };
