import { getModel } from "database/context";
import type { Piece, IPiece } from "database/schema";

export async function createPiece(data: Piece): Promise<IPiece> {
  const PieceModel = getModel("Piece");
  return await PieceModel.create(data);
}

export async function getPieceById(id: string): Promise<IPiece | null> {
  const PieceModel = getModel("Piece");
  return await PieceModel.findById(id);
}

export async function updatePiece(
  id: string,
  data: Partial<Piece>
): Promise<IPiece | null> {
  const PieceModel = getModel("Piece");
  return await PieceModel.findByIdAndUpdate(id, data, { new: true });
}

export async function deletePiece(id: string): Promise<IPiece | null> {
  const PieceModel = getModel("Piece");
  return await PieceModel.findByIdAndDelete(id);
}
