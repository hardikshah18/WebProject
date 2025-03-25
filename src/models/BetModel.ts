import mongoose from "mongoose";

const BetSchema = new mongoose.Schema({
  player: String,
  bet: Object,
  createdAt: Date
});

export const BetModel = mongoose.model("Bet", BetSchema);
