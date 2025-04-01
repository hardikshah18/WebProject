"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert(data.error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-black bg-cover bg-center"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg w-96 border border-white/30 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">🎰 Welcome Back</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        />

        <button
          onClick={handleLogin}
          disabled={!email || !password}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 transition-all disabled:opacity-60"
        >
          🔐 Login
        </button>

        <p className="mt-4 text-white">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-green-400 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}