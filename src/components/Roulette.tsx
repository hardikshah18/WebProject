import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Roulette.css";

const numbers = [
  "0", "32", "15", "19", "4", "21", "2", "25", "17", "34", "6",
  "27", "13", "36", "11", "30", "8", "23", "10", "5", "24",
  "16", "33", "1", "20", "14", "31", "9", "22", "18", "29",
  "7", "28", "12", "35", "3", "26"
];

const getColor = (num: string) => num === "0" ? "bg-green-500" : parseInt(num) % 2 === 0 ? "bg-black" : "bg-red-600";

const Roulette = ({ onSpinEnd }: { onSpinEnd: (winningNumber: string) => void }) => {
  const [spinning, setSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<string | null>(null);
  const [spinHistory, setSpinHistory] = useState<string[]>([]);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * numbers.length);
    
    setTimeout(() => {
      const result = numbers[randomIndex];
      setWinningNumber(result);
      setSpinHistory([...spinHistory, result]);
      setSpinning(false);
      onSpinEnd(result); // Notify Game.tsx
    }, 3000);
  };

  const resetGame = () => {
    setWinningNumber(null);
    setSpinHistory([]);
  };

  return (
    <div className="roulette-container">
      <motion.div
        animate={{ rotate: spinning ? 3600 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="roulette-wheel"
      >
        <div className={`roulette-inner ${getColor(winningNumber || "0")}`}>
          {winningNumber || "Spin"}
        </div>
      </motion.div>
      <button
        onClick={spinWheel}
        disabled={spinning}
        className="spin-button"
      >
        Spin Roulette
      </button>
      {winningNumber && (
        <>
          <p className="winning-number">Winning Number: {winningNumber}</p>
          <button
            onClick={resetGame}
            className="reset-button"
          >
            Reset
          </button>
        </>
      )}
      {spinHistory.length > 0 && (
        <div className="spin-history">
          <p>Spin History:</p>
          <ul>
            {spinHistory.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Roulette;