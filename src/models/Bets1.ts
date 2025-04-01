import mongoose from "mongoose";

const BetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  betAmount: { type: Number, required: true },
  selectedNumber: { type: Number, required: false, default: null }, // ✅ optional now
  betType: { type: String, required: false, default: null },        // ✅ new for "odd", "even", etc.
  spinResult: { type: Number, required: true },
  winAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// ✅ This is critical for Next.js hot reload environments
export default mongoose.models.Bet || mongoose.model("Bet", BetSchema);
