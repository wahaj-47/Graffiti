import Piece, { type IPiece, type TPiece } from "server/models/Piece";

export async function createPiece(data: TPiece): Promise<IPiece> {
  const piece = new Piece(data);
  return await piece.save();
}

export async function getPieceById(id: string): Promise<IPiece | null> {
  return await Piece.findById(id);
}

export async function updatePiece(
  id: string,
  data: TPiece
): Promise<IPiece | null> {
  return await Piece.findByIdAndUpdate(id, data, { new: true });
}

export async function deletePiece(id: string): Promise<IPiece | null> {
  return await Piece.findByIdAndDelete(id);
}
