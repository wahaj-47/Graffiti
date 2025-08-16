import { Socket } from "socket.io";

export function connect(socket: Socket) {
  console.log("Someone connected to ns piece");
  socket.join("piece:{id}");
}
