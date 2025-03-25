import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Bet from "@/models/Bet";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { method } = req;

  switch (method) {
    case "GET": // Fetch user's bet history
      try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const userId = decoded.id;

        const bets = await Bet.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, bets });
      } catch (error) {
        console.error("Error fetching bet history:", error);
        return res.status(500).json({ error: "Server error" });
      }

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
