"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function WalletPage() {
  const [wallet, setWallet] = useState<number | null>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setWallet(data.user.wallet))
      .catch(() => setWallet(0)); // If error, assume 0
  }, []);

  const addFunds = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    const res = await fetch("/api/wallet/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: Number(amount) }),
    });

    if (res.ok) {
      const data = await res.json();
      setWallet(data.wallet);
      alert("💰 Funds added successfully!");
    } else {
      alert("❌ Error adding funds.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold">💳 Wallet Balance</h1>

        {/* Display Wallet Amount */}
        {wallet !== null ? (
          <p className="text-2xl font-semibold mt-4 text-green-400">${wallet}</p>
        ) : (
          <p className="text-xl text-yellow-500">Loading...</p>
        )}

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-4 p-3 w-64 border border-gray-400 rounded-md text-black"
        />

        {/* Add Money Button */}
        <button
          onClick={addFunds}
          className="mt-3 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all"
        >
          Add Money
        </button>
      </div>
    </div>
  );
}
