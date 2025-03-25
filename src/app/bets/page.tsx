"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Bet {
  _id: string;
  betAmount: number;
  selectedNumber: number;
  spinResult: number;
  winAmount: number;
  createdAt: string;
}

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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Your Bet History</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && bets.length === 0 ? (
        <p>No bets placed yet.</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-600 text-white">
          <thead>
            <tr className="border border-gray-600">
              <th className="px-4 py-2">Bet Amount</th>
              <th className="px-4 py-2">Selected Number</th>
              <th className="px-4 py-2">Spin Result</th>
              <th className="px-4 py-2">Win Amount</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet) => (
              <tr key={bet._id} className="border border-gray-600">
                <td className="px-4 py-2">${bet.betAmount}</td>
                <td className="px-4 py-2">{bet.selectedNumber}</td>
                <td className="px-4 py-2">{bet.spinResult}</td>
                <td className="px-4 py-2">${bet.winAmount}</td>
                <td className="px-4 py-2">{new Date(bet.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
