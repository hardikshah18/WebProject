import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Bet from "@/models/Bet";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = decoded.id;

    const bets = await Bet.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, bets });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
