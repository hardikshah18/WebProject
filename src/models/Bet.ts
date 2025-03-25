import mongoose, { Schema, Document } from "mongoose";

export interface IBet extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  betAmount: number;
  selectedNumber: number;
  spinResult: number;
  winAmount: number;
  createdAt: Date;
}

const BetSchema = new Schema<IBet>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  betAmount: { type: Number, required: true },
  selectedNumber: { type: Number, required: true },
  spinResult: { type: Number, required: true },
  winAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bet || mongoose.model<IBet>("Bet", BetSchema);
