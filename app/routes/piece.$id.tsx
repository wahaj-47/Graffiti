import { useEffect } from "react";
import type { Route } from "./+types/piece.$id";
import { io } from "socket.io-client";
import { Artboard } from "~/components/artboard/artboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Piece" }, { name: "description", content: "Piece" }];
}

export default function Piece({ params }: Route.ComponentProps) {
  useEffect(() => {
    console.log("Creating ws connection");
    const sPiece = io("/piece");
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Artboard></Artboard>
    </div>
  );
}
