"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RouletteWheel from "@/components/RouletteWheel";

export default function RoulettePage() {
  const [wallet, setWallet] = useState<number>(0);
  const [betAmount, setBetAmount] = useState("");
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [betType, setBetType] = useState<string | null>(null);
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const router = useRouter();

  //Here Darshan Gandhi did the division of numbers into red and black number and set up layout of table
  const redNumbers = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18,
    19, 21, 23, 25, 27, 30, 32, 34, 36,
  ]);

  const tableLayout = [
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
  ];

  useEffect(() => {
    const fetchWallet = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const res = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setWallet(res.ok && data.user?.wallet ? data.user.wallet : 0);
      } catch (err) {
        console.error("Wallet fetch error", err);
        setWallet(0);
      }
    };

    fetchWallet();
  }, [router]);

  const handleBet = async () => {
    if (!betAmount || (selectedNumber === null && !betType)) {
      alert("Please enter a bet amount and select a number or bet type.");
      return;
    }
    if (wallet !== null && Number(betAmount) > wallet) {
      alert("Insufficient funds!");
      return;
    }

    setIsSpinning(true);
    setShowWinAnimation(false);

    setTimeout(async () => {
      const result = Math.floor(Math.random() * 37);
      setSpinResult(result);

      let winAmount = 0;
      const amount = Number(betAmount);

      // Calculate win based on selected bet type or number
      if (selectedNumber !== null && result === selectedNumber) {
        winAmount = amount * 35;
      } else if (betType === "1st12" && result >= 1 && result <= 12) {
        winAmount = amount * 3;
      } else if (betType === "2nd12" && result >= 13 && result <= 24) {
        winAmount = amount * 3;
      } else if (betType === "3rd12" && result >= 25 && result <= 36) {
        winAmount = amount * 3;
      } else if (betType === "even" && result !== 0 && result % 2 === 0) {
        winAmount = amount * 2;
      } else if (betType === "odd" && result % 2 === 1) {
        winAmount = amount * 2;
      } else if (betType === "red" && redNumbers.has(result)) {
        winAmount = amount * 2;
      } else if (betType === "black" && !redNumbers.has(result) && result !== 0) {
        winAmount = amount * 2;
      } else if (betType === "1to18" && result >= 1 && result <= 18) {
        winAmount = amount * 2;
      } else if (betType === "19to36" && result >= 19 && result <= 36) {
        winAmount = amount * 2;
      }

      const token = localStorage.getItem("token");
      const res = await fetch("/api/bets/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          betAmount: amount,
          selectedNumber: selectedNumber ?? null,
          betType: betType ?? null,
          spinResult: result,
          winAmount,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setWallet(data.wallet);
        if (winAmount > 0) {
          setShowWinAnimation(true);
          setTimeout(() => setShowWinAnimation(false), 4000); // auto-hide
        }
      } else {
        alert(data.error);
      }

      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-green-800 text-white px-4 pb-20">
      
      {showWinAnimation && (
        <video
          src="/falling_poker_chips.webp"
          autoPlay
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-contain z-50 pointer-events-none"
        />
      )}

      <button
        onClick={() => router.push("/dashboard")}
        className="absolute top-5 left-5 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-white z-10"
      >
        ⬅ Exit to Dashboard
      </button>

      <h2 className="text-3xl font-bold mt-20 mb-2 z-10">🎰 Roulette</h2>
      <p className="text-lg mb-2 z-10">Wallet Balance: ${wallet}</p>

      <RouletteWheel spinResult={spinResult} isSpinning={isSpinning} />

      <input
        type="number"
        placeholder="Bet Amount"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        className="mb-4 p-2 text-black w-48 border border-gray-400 rounded-md z-10"
      />

      {/* Number Grid */}
      <div className="grid grid-cols-12 gap-2 max-w-6xl my-4 z-10">
        {tableLayout.map((row, rowIndex) =>
          row.map((number) => {
            const isSelected = selectedNumber === number;
            const isRed = redNumbers.has(number);
            return (
              <button
                key={`${rowIndex}-${number}`}
                onClick={() => {
                  setSelectedNumber(number);
                  setBetType(null);
                }}
                className={`py-2 rounded font-bold text-white text-sm w-full ${
                  isSelected ? "ring-4 ring-yellow-300" : isRed ? "bg-red-600" : "bg-gray-800"
                }`}
              >
                {number}
              </button>
            );
          })
        )}
      </div>

      {/* Mid Betting Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-6 justify-center z-10">
        {[
          { label: "0", value: "0" },
          { label: "1st 12", value: "1st12" },
          { label: "2nd 12", value: "2nd12" },
          { label: "3rd 12", value: "3rd12" },
          { label: "Even", value: "even" },
          { label: "Odd", value: "odd" },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => {
              setSelectedNumber(null);
              setBetType(value);
            }}
            className={`px-4 py-2 rounded-md font-bold ${
              betType === value ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Bottom Betting Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 z-10">
        {[
          { label: "Red", value: "red" },
          { label: "Black", value: "black" },
          { label: "1 to 18", value: "1to18" },
          { label: "19 to 36", value: "19to36" },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => {
              setSelectedNumber(null);
              setBetType(value);
            }}
            className={`px-4 py-2 rounded-md font-bold ${
              betType === value ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={handleBet}
        disabled={isSpinning}
        className="bg-red-500 px-6 py-2 text-white rounded-md hover:bg-red-600 transition-all z-10"
      >
        {isSpinning ? "Spinning..." : "🎡 Spin the Wheel"}
      </button>

      {spinResult !== null && (
        <p className="mt-4 text-xl z-10">Winning Number: {spinResult}</p>
      )}
    </div>
  );
}