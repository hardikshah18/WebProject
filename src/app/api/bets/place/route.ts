import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Bet from "@/models/Bet";

export async function POST(req: Request) {
  try {
    const { betAmount, selectedNumber, spinResult, winAmount, betType } = await req.json();
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

    // Validate bet input
    if (
      typeof betAmount !== "number" ||
      typeof spinResult !== "number" ||
      typeof winAmount !== "number" ||
      (selectedNumber === undefined && !betType)
    ) {
      return NextResponse.json({ error: "Invalid bet data" }, { status: 400 });
    }    

    // Update wallet
    user.wallet -= betAmount;
    user.wallet += winAmount;
    await user.save();

    await Bet.create({
      userId,
      betAmount,
      selectedNumber: selectedNumber ?? null, // ✅ Fallback ensures null is stored
      betType: betType ?? null,
      spinResult,
      winAmount,
      createdAt: new Date(),
    });

    console.log({
      betAmount,
      selectedNumber,
      betType,
      spinResult,
      winAmount,
    }); 

    return NextResponse.json({ wallet: user.wallet });
  } catch (error) {
    console.error("Bet placement error:", error);
    return NextResponse.json({ error: "Error processing bet" }, { status: 500 });
  }
}