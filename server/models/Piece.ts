import mongoose, { Document } from "mongoose";

export interface TPiece {
  title: string;
}

export interface IPiece extends TPiece, Document {}

const pieceSchema = new mongoose.Schema<IPiece>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Piece = mongoose.model<IPiece>("Piece", pieceSchema);

export default Piece;
