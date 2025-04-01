"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function WalletPage() {
  const [wallet, setWallet] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

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
      .catch(() => setWallet(0));
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

    const data = await res.json();
    if (res.ok) {
      setWallet(data.wallet);
      setMessage("💰 Funds added successfully!");
      setTimeout(() => setMessage(""), 3000);
      setAmount("");
    } else {
      setMessage("❌ Error adding funds.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/wallet.jpg')" }}
    >
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 pt-10">
        <div className="bg-black bg-opacity-70 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-md w-full text-center border border-green-600">
          <h1 className="text-3xl font-bold mb-2">💳 Wallet Balance</h1>

          {wallet !== null ? (
            <p className="text-4xl font-bold text-green-400">${wallet}</p>
          ) : (
            <p className="text-xl text-yellow-400">Loading...</p>
          )}

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-6 p-3 w-full text-lg border border-gray-300 rounded-md text-black"
          />

          <button
            onClick={addFunds}
            className="mt-4 bg-green-500 hover:bg-green-600 transition-all px-6 py-2 rounded-md text-lg font-semibold"
          >
            💸 Add Money
          </button>

          {message && <p className="mt-4 text-lg font-medium">{message}</p>}
        </div>
      </div>
    </div>
  );
}
