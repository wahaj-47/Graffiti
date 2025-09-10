import { Document, Schema, type InferSchemaType } from "mongoose";

export const pieceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    yDoc: {
      type: Buffer,
      default: () => Buffer.alloc(0),
    },
  },
  { timestamps: true },
);

export type Piece = InferSchemaType<typeof pieceSchema>;
export interface IPiece extends Piece, Document {}
