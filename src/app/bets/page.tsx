"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Bet {
  _id: string;
  betAmount: number;
  selectedNumber: number | null;
  betType: string | null;
  spinResult: number;
  winAmount: number;
  createdAt: string;
}

// Optional label mapping for bet types
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

export default function BetHistoryPage() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/bets/history", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bet history");
        return res.json();
      })
      .then((data) => {
        setBets(data.bets);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen p-6 text-white"
      style={{
        backgroundImage: "url('/casino_table_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-3xl font-bold mb-6">🎲 Your Bet History</h2>

      {loading && <p className="text-lg text-gray-200">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && bets.length === 0 ? (
        <p>No bets placed yet.</p>
      ) : (
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="w-full text-center border border-gray-700 bg-black bg-opacity-70 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 border border-gray-700">Bet Amount</th>
                <th className="px-4 py-2 border border-gray-700">Bet Placed</th>
                <th className="px-4 py-2 border border-gray-700">Spin Result</th>
                <th className="px-4 py-2 border border-gray-700">Win/Loss</th>
                <th className="px-4 py-2 border border-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {bets.map((bet) => (
                <tr key={bet._id} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-2 border border-gray-700">${bet.betAmount}</td>
                  <td className="px-4 py-2 border border-gray-700">
                    {bet.selectedNumber !== null
                      ? bet.selectedNumber
                      : bet.betType
                      ? betTypeLabels[bet.betType] || bet.betType
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">{bet.spinResult}</td>
                  <td
                    className={`px-4 py-2 border border-gray-700 font-semibold ${
                      bet.winAmount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {bet.winAmount > 0 ? `+${bet.winAmount}` : "Lost"}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {new Date(bet.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}