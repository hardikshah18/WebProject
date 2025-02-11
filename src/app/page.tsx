"use client"; // Add this at the top

import { useState } from "react";
import Roulette from "../components/Roulette";
import BettingPanel from "../components/BettingPanel";

export default function Home() {
  const [balance, setBalance] = useState(100);

  const placeBet = (betType: string, amount: number) => {
    if (amount > balance) {
      alert("Not enough balance!");
      return;
    }

    setBalance(balance - amount);
    setTimeout(() => {
      const isWin = Math.random() > 0.5; // Simple win/loss logic
      if (isWin) {
        setBalance(balance + amount * 2);
        alert(`You won! New Balance: $${balance + amount * 2}`);
      } else {
        alert(`You lost! New Balance: $${balance - amount}`);
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Roulette Game</h1>
      <p className="mt-2">Balance: ${balance}</p>
      <Roulette />
      <BettingPanel placeBet={placeBet} />
    </div>
  );
}
