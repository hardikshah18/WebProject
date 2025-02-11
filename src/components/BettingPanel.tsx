"use client"
import React, { useState } from "react";

const BettingPanel = ({ placeBet }: { placeBet: (bet: string, amount: number) => void }) => {
  const [betType, setBetType] = useState("Red");
  const [amount, setAmount] = useState(10);

  return (
    <div className="mt-6 flex flex-col items-center">
      <select
        value={betType}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBetType(e.target.value)}
        className="px-4 py-2 border rounded-lg bg-gray-800 text-white"
      >
        <option value="Red">Red</option>
        <option value="Black">Black</option>
        <option value="Odd">Odd</option>
        <option value="Even">Even</option>
          <option value="Green">Green (0)</option>
        </select>
    <input
      type="number"
      value={amount}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseInt(e.target.value))}
      className="mt-2 px-4 py-2 border rounded-lg bg-gray-800 text-white"
    />
      <button
        onClick={() => placeBet(betType, amount)}
        className="mt-4 px-6 py-2 bg-green-600 text-white font-bold rounded-lg"
      >
        Place Bet
      </button>
    </div>
  );
};

export default BettingPanel;
