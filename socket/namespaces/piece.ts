import type { Namespace, Socket } from "socket.io";
import { io } from "~/server";

const nsPiece: Namespace = io.of("/piece");
nsPiece.on("connection", (socket: Socket) => {
  console.log("Connected to namespace piece");
  socket.join("piece:{id}");
});
