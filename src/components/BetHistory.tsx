"use client";

import { useEffect, useState } from "react";

interface Bet {
  _id: string;
  betAmount: number;
  selectedNumber: number | null;
  betType: string | null;
  spinResult: number;
  winAmount: number;
  createdAt: string;
}

const betTypeLabels: Record<string, string> = {
  "1st12": "1st 12",
  "2nd12": "2nd 12",
  "3rd12": "3rd 12",
  "even": "Even",
  "odd": "Odd",
  "red": "Red",
  "black": "Black",
  "1to18": "1 to 18",
  "19to36": "19 to 36",
  "0": "0",
};

export default function BetHistory() {
  const [bets, setBets] = useState<Bet[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/bets", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBets(data.bets));
  }, []);

  return (
    <div
      className="p-6 text-white min-h-screen"
      style={{
        backgroundImage: "url('/casino_table_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">🎲 Your Bet History</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-600 bg-black bg-opacity-70 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 bg-opacity-80">
              <th className="p-3 border border-gray-600">Bet Amount</th>
              <th className="p-3 border border-gray-600">Bet Placed</th>
              <th className="p-3 border border-gray-600">Spin Result</th>
              <th className="p-3 border border-gray-600">Win/Loss</th>
              <th className="p-3 border border-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet) => (
              <tr key={bet._id} className="bg-gray-900 bg-opacity-70 hover:bg-gray-800 transition">
                <td className="p-3 border border-gray-600">${bet.betAmount}</td>
                <td className="p-3 border border-gray-600">
                  {bet.selectedNumber !== null
                    ? bet.selectedNumber
                    : bet.betType
                    ? betTypeLabels[bet.betType] || bet.betType
                    : "-"}
                </td>
                <td className="p-3 border border-gray-600">{bet.spinResult}</td>
                <td
                  className={`p-3 border border-gray-600 font-bold ${
                    bet.winAmount > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {bet.winAmount > 0 ? `+${bet.winAmount}` : "Lost"}
                </td>
                <td className="p-3 border border-gray-600">{new Date(bet.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}