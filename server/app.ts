import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import mongoose from "mongoose";
import { pieceSchema } from "database/schema";
import { DatabaseContext } from "database/context";
import { Database } from "@hocuspocus/extension-database";
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

const hocuspocus = new Hocuspocus({
  name: "piece:hocuspocus",
  extensions: [
    new Database({
      fetch: async ({ documentName }) => {
        if (client.readyState !== 1) {
          console.log("Database not connected");
          return null;
        }

        return DatabaseContext.run(client, async () => {
          const doc = await piece.read(documentName);
          if (!doc) return null;

          const { yDoc } = doc;
          if (yDoc.length === 0) return null;

          return yDoc;
        });
      },
      store: async ({ documentName, state }) => {
        return DatabaseContext.run(client, async () => {
          piece.update(documentName, { yDoc: state });
        });
      },
    }),
  ],
  onConfigure: async () => {
    console.log(`Server configured - Connections: ${hocuspocus.getConnectionsCount()}`);
  },
  connected: async () => {
    console.log(`Connection established - Connections: ${hocuspocus.getConnectionsCount()}`);
  },
});

app.use((_, __, next) => DatabaseContext.run(client, next));

app.use("/join", pieceRouter(hocuspocus));

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        piece,
      };
    },
  }),
);

export { app };
