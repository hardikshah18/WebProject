import mongoose from "mongoose";

const BetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  betAmount: { type: Number, required: true },
  selectedNumber: { type: Number, required: true },
  spinResult: { type: Number, required: true },
  winAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bet || mongoose.model("Bet", BetSchema);
