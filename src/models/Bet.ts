import mongoose, { Schema, Document } from "mongoose";

export interface IBet extends Document {
  userId: mongoose.Types.ObjectId;
  betAmount: number;
  selectedNumber?: number | null;
  betType?: string | null;
  spinResult: number;
  winAmount?: number;
  createdAt?: Date;
}

const BetSchema = new Schema<IBet>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  betAmount: { type: Number, required: true },
  selectedNumber: {
    type: Number,
    default: null,
    // ✅ Conditional required using `this` safely
    required: function (this: IBet) {
      return this.betType === null;
    },
  },
  betType: {
    type: String,
    default: null,
    required: function (this: IBet) {
      return this.selectedNumber === null;
    },
  },
  spinResult: { type: Number, required: true },
  winAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Export model
export default mongoose.models.Bet || mongoose.model<IBet>("Bet", BetSchema);