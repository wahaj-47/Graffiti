import {
  createPiece,
  deletePiece,
  getPieceById,
  updatePiece,
} from "server/controllers/Piece";
import type { TPiece } from "server/models/Piece";

const piece: Service<TPiece> = {
  create: createPiece,
  read: getPieceById,
  update: updatePiece,
  delete: deletePiece,
};

export default piece;
