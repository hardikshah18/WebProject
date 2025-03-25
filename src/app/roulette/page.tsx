"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RouletteWheel from "@/components/RouletteWheel";

export default function RoulettePage() {
  const [wallet, setWallet] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchWallet = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const res = await fetch("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setWallet(data.user.wallet);
      } else {
        setWallet(0);
      }
    };

    fetchWallet();
  }, []);

  const handleBet = async () => {
    if (!betAmount || selectedNumber === null) {
      alert("Please enter a bet amount and select a number.");
      return;
    }
    if (wallet !== null && Number(betAmount) > wallet) {
      alert("Insufficient funds!");
      return;
    }

    setIsSpinning(true);

    setTimeout(async () => {
      const result = Math.floor(Math.random() * 37);
      setSpinResult(result);

      let winAmount = 0;
      if (result === selectedNumber) {
        winAmount = Number(betAmount) * 35;
      }

      const token = localStorage.getItem("token");
      const res = await fetch("/api/bets/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          betAmount: Number(betAmount),
          selectedNumber,
          spinResult: result,
          winAmount,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setWallet(data.wallet);
        alert(winAmount > 0 ? `🎉 You won $${winAmount}!` : "❌ You lost! Try again.");
      } else {
        alert(data.error);
      }

      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
       <button
        onClick={() => router.push("/dashboard")} // Navigate to dashboard
        className="absolute top-5 left-5 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
      >
        ⬅ Exit to Dashboard
      </button>
      <h2 className="text-3xl font-bold mb-4">🎰 Roulette</h2>
      <p className="text-lg mb-2">Wallet Balance: ${wallet !== null ? wallet : "Loading..."}</p>

      {/* Roulette Wheel */}
      <RouletteWheel spinResult={spinResult} isSpinning={isSpinning} />

      {/* Bet Amount Input */}
      <input
        type="number"
        placeholder="Bet Amount"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        className="mb-2 p-2 text-black w-48 border border-gray-400 rounded-md"
      />

      {/* Number Selection Grid */}
      <div className="grid grid-cols-6 gap-2 my-4">
        {Array.from({ length: 37 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedNumber(i)}
            className={`px-4 py-2 border rounded-md ${
              selectedNumber === i ? "bg-green-500 text-white" : "bg-gray-700"
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      {/* Spin Button */}
      <button
        onClick={handleBet}
        disabled={isSpinning}
        className="bg-red-500 px-6 py-2 text-white rounded-md hover:bg-red-600 transition-all"
      >
        {isSpinning ? "Spinning..." : "🎡 Spin the Wheel"}
      </button>

      {/* Display Spin Result */}
      {spinResult !== null && <p className="mt-4 text-xl">Winning Number: {spinResult}</p>}
    </div>
  );
}
