"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-5xl font-extrabold mb-4 animate-pulse">
          Welcome to the Ultimate Roulette Experience
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Play, bet, and win big. Explore our exciting game and check out your history.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/roulette")}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg transition-all transform hover:scale-105"
          >
            Play Now
          </button>
          <button
            onClick={() => router.push("/bets")}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition-all transform hover:scale-105"
          >
            Bet History
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Play With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <img src="/roulette_wheel.png" alt="Fast gameplay" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Action</h3>
              <p className="text-center text-gray-400">
                Experience live roulette spins and see instant results.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/wallet.svg" alt="Wallet" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Wallet</h3>
              <p className="text-center text-gray-400">
                Your funds are safely stored and instantly updated with every game.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/next.svg" alt="Seamless experience" className="w-20 h-20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Intuitive Interface</h3>
              <p className="text-center text-gray-400">
                Easy to navigate, track your bets, and win with an elegant interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to spin the wheel?</h2>
          <p className="text-gray-300 mb-8">
            Join thousands of players who enjoy the thrill of the game. It's time to bet, spin, and win.
          </p>
          <button
            onClick={() => router.push("/roulette")}
            className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-full transition-all transform hover:scale-110 text-xl font-semibold"
          >
            Start Playing
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Ultimate Roulette. All rights reserved.</p>
      </footer>
    </div>
  );
}
