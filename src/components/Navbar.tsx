"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setWallet(data.user.wallet));
  }, []);

  return (
    <nav className="bg-gray-900 bg-opacity-95 p-4 px-8 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="text-white text-2xl font-bold">🎰 Roulette Game</div>
        <div className="flex flex-wrap gap-6 text-sm md:text-base">
          <Link href="/dashboard" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/wallet" className="text-white hover:text-gray-300">Wallet (${wallet})</Link>
          <Link href="/bets" className="text-white hover:text-gray-300">Bet History</Link>
          <Link href="/roulette" className="text-white hover:text-gray-300">Play Roulette</Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="text-red-400 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}