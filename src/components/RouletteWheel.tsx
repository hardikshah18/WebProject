"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function RouletteWheel({ spinResult, isSpinning }: { spinResult: number | null; isSpinning: boolean }) {
  const [wheelRotation, setWheelRotation] = useState(0);
  const [ballRotation, setBallRotation] = useState(0);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: -110 }); // Ball starts at the top inside the wheel

  useEffect(() => {
    if (isSpinning) {
      const randomSpins = Math.floor(Math.random() * 4) + 5; // Between 5 to 8 full spins
      const finalRotation = randomSpins * 360 + (spinResult !== null ? (spinResult * (360 / 37)) : 0);

      setWheelRotation(finalRotation); // Apply rotation to the wheel

      let ballSpin = finalRotation * 2; // Ball spins 2x faster than the wheel initially
      let ballSpeed = 60; // Ball starts fast
      let radius = 110; // Maximum radius (inside the wheel)

      const ballInterval = setInterval(() => {
        setBallRotation((prev) => prev - ballSpeed); // Ball rotates opposite to the wheel

        // Reduce ball speed gradually (friction effect)
        if (ballSpeed > 1.5) {
          ballSpeed *= 0.97; // Slows down naturally
        }

        // Ball moves inward over time (to simulate falling into a pocket)
        if (radius > 50) {
          radius -= 0.3; // Smooth inward movement
        }

        // Calculate the ball's new position
        const angle = (ballRotation * Math.PI) / 180;
        const newX = radius * Math.cos(angle);
        const newY = radius * Math.sin(angle);

        setBallPosition({ x: newX, y: newY });

        // Stop the ball once it's slow enough
        if (ballSpeed < 1.5) {
          clearInterval(ballInterval);
          setBallRotation(finalRotation * -1.5); // Ensure it aligns with the final number
        }
      }, 30);
    }
  }, [isSpinning, spinResult]);

  return (
    <div className="relative flex justify-center items-center w-[320px] h-[320px]">
      {/* Spinning Wheel */}
      <motion.div
        animate={{ rotate: wheelRotation }}
        transition={{ duration: 4, ease: "easeOut" }} // Realistic deceleration
        className="w-full h-full"
      >
        <Image src="/roulette_wheel.png" alt="Roulette Wheel" width={300} height={300} className="rounded-full" />
      </motion.div>

      {/* Ball (Properly Constrained to Stay Inside the Wheel) */}
      <motion.div
        animate={{
          x: ballPosition.x,
          y: ballPosition.y,
        }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute w-[15px] h-[15px] bg-white rounded-full shadow-lg"
      />
    </div>
  );
}
