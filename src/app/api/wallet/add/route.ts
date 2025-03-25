import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = decoded.id;

    // Connect to the database
    await connectDB();

    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user's wallet
    user.wallet += amount;
    await user.save();

    return NextResponse.json({ wallet: user.wallet });
  } catch (error) {
    console.error(error); // For debugging purposes
    return NextResponse.json({ error: "Error adding funds" }, { status: 500 });
  }
}
