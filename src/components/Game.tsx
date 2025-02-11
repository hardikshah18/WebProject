"use client"
import React, { useState } from "react";
import Roulette from "./Roulette";
import BettingPanel from "./BettingPanel";

const Game = () => {
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState<{ type: string; amount: number } | null>(null);
  const [message, setMessage] = useState("");

  const placeBet = (betType: string, amount: number) => {
    if (amount > balance) {
      alert("Not enough balance!");
      return;
    }
    setBet({ type: betType, amount });
    setMessage(`Bet placed: ${betType} for $${amount}`);
  };

  const checkWin = (winningNumber: string) => {
    if (!bet) return;
    
    const isWin =
      (bet.type === "Red" && parseInt(winningNumber) % 2 !== 0) ||
      (bet.type === "Black" && parseInt(winningNumber) % 2 === 0) ||
      (bet.type === "Odd" && parseInt(winningNumber) % 2 !== 0) ||
      (bet.type === "Even" && parseInt(winningNumber) % 2 === 0) ||
      (bet.type === "Green" && winningNumber === "0");

    if (isWin) {
      setBalance(balance + bet.amount * 2);
      setMessage(`You won! New Balance: $${balance + bet.amount * 2}`);
    } else {
      setBalance(balance - bet.amount);
      setMessage(`You lost! New Balance: $${balance - bet.amount}`);
    }

    setBet(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Roulette Game</h1>
      <p className="mt-2">Balance: ${balance}</p>
      <Roulette onSpinEnd={checkWin} />
      <BettingPanel placeBet={placeBet} />
      <p className="mt-4">{message}</p>
    </div>
  );
};

export default Game;
