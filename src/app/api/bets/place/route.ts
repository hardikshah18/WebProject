import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Bet from "@/models/Bet";

export async function POST(req: Request) {
  try {
    const { betAmount, selectedNumber, spinResult, winAmount } = await req.json();
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = decoded.id;

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user wallet
    user.wallet -= betAmount;
    user.wallet += winAmount;
    await user.save();

    // Create the bet record
    await Bet.create({
      userId,
      betAmount,
      selectedNumber,
      spinResult,
      winAmount,
      createdAt: new Date(),
    });

    return NextResponse.json({ wallet: user.wallet });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error processing bet" }, { status: 500 });
  }
}
