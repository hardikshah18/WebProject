"use client";

import { useEffect, useState } from "react";

interface Bet {
  _id: string;
  betAmount: number;
  selectedNumber: number;
  spinResult: number;
  winAmount: number;
  createdAt: string;
}

export default function BetHistory() {
  const [bets, setBets] = useState<Bet[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/bets?userId=USER_ID", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBets(data.bets));
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">📜 Bet History</h2>
      <table className="w-full border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 border border-gray-600">Bet Amount</th>
            <th className="p-2 border border-gray-600">Selected Number</th>
            <th className="p-2 border border-gray-600">Winning Number</th>
            <th className="p-2 border border-gray-600">Win/Loss</th>
            <th className="p-2 border border-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {bets.map((bet) => (
            <tr key={bet._id} className="bg-gray-800">
              <td className="p-2 border border-gray-600">${bet.betAmount}</td>
              <td className="p-2 border border-gray-600">{bet.selectedNumber}</td>
              <td className="p-2 border border-gray-600">{bet.spinResult}</td>
              <td className={`p-2 border border-gray-600 ${bet.winAmount > 0 ? "text-green-400" : "text-red-400"}`}>
                {bet.winAmount > 0 ? `+${bet.winAmount}` : "Lost"}
              </td>
              <td className="p-2 border border-gray-600">{new Date(bet.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
