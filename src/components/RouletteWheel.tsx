"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface RouletteProps {
  spinResult: number | null;
  isSpinning: boolean;
}

export default function RouletteWheel({ spinResult, isSpinning }: RouletteProps) {
  const [ballPosition, setBallPosition] = useState({ x: 0, y: -110 });

  const wheelRotation = useMotionValue(0);
  const ballRotation = useMotionValue(0);

  useEffect(() => {
    if (isSpinning && spinResult !== null) {
      const spins = Math.floor(Math.random() * 3) + 6; // Between 6–8 spins
      const finalWheelDeg = spins * 360 + spinResult * (360 / 37);
      const finalBallDeg = -finalWheelDeg * 1.8; // Spins faster & opposite

      // Animate wheel
      animate(wheelRotation, finalWheelDeg, {
        duration: 4,
        ease: "easeOut",
      });

      // Animate ball + inward movement simulation
      let frame = 0;
      const totalFrames = 130;
      const interval = setInterval(() => {
        const progress = frame / totalFrames;

        // Gradually reduce radius to simulate ball falling
        const radius = 110 - progress * 50;

        // Interpolate ball angle
        const currentDeg = finalBallDeg * progress;
        const angle = (currentDeg * Math.PI) / 180;

        setBallPosition({
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
        });

        frame++;
        if (frame > totalFrames) clearInterval(interval);
      }, 30);
    }
  }, [isSpinning, spinResult]);

  return (
    <div className="relative flex justify-center items-center w-[320px] h-[320px]">
      {/* Wheel */}
      <motion.div
        style={{ rotate: wheelRotation }}
        className="w-[300px] h-[300px] rounded-full overflow-hidden"
      >
        <Image
          src="/roulette_wheel.png"
          alt="Roulette Wheel"
          width={300}
          height={300}
          className="rounded-full w-full h-full object-contain"
          priority
        />
      </motion.div>

      {/* Ball */}
      <motion.div
        animate={{
          x: ballPosition.x,
          y: ballPosition.y,
        }}
        transition={{ ease: "easeOut", duration: 0.2 }}
        className="absolute w-[16px] h-[16px] bg-white rounded-full shadow-md z-10"
      />
    </div>
  );
}