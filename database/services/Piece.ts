import {
  createPiece,
  deletePiece,
  getPieceById,
  updatePiece,
} from "database/controllers/Piece";
import type { Piece } from "database/schema";

const piece: Service<Piece> = {
  create: createPiece,
  read: getPieceById,
  update: updatePiece,
  delete: deletePiece,
};

export default piece;
