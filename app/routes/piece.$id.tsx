import { useEffect } from "react";
import type { Route } from "./+types/piece.$id";
import { io } from "socket.io-client";
import { Artboard } from "~/components/artboard/artboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Piece" }, { name: "description", content: "Piece" }];
}

export default function Piece({ params }: Route.ComponentProps) {
  const { id } = params;

  useEffect(() => {
    const socket = io("/piece");
    socket.on("connect", () => {
      socket.emit("piece:join", id);
    });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Artboard></Artboard>
    </div>
  );
}
