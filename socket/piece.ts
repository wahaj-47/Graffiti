import type { Socket } from "socket.io";

export default function nsPieceHandler(socket: Socket) {
  console.log(`Client connected: ${socket.id}`);

  socket.on("piece:join", (pieceId) => {
    console.log(`Client joined: ${pieceId}`);
    socket.join(`piece-${pieceId}`);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
}
