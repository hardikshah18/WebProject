"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/roulette_board.jpg')" }}
    >
      <div className="bg-black bg-opacity-80 min-h-screen backdrop-blur-sm">
        <Navbar />
        <main className="pt-24 px-4 md:px-10 space-y-20">

          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center text-center py-20 px-6">
            <h1 className="text-5xl font-extrabold mb-4 animate-pulse drop-shadow-md">
              Welcome to the Ultimate Roulette Experience
            </h1>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl">
              Play, bet, and win big. Explore our exciting game and check out your history.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
          <section className="py-16 bg-black bg-opacity-60">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">Why Play With Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  {
                    title: "Real-Time Action",
                    desc: "Experience live roulette spins and see instant results.",
                    icon: "/roulette_wheel.png",
                  },
                  {
                    title: "Secure Wallet",
                    desc: "Your funds are safely stored and instantly updated with every game.",
                    icon: "/wallet.svg",
                  },
                  {
                    title: "Intuitive Interface",
                    desc: "Easy to navigate, track your bets, and win with an elegant interface.",
                    icon: "/next.svg",
                  },
                ].map((item, i) => (
                  <div className="flex flex-col items-center text-center" key={i}>
                    <img src={item.icon} alt={item.title} className="w-24 h-24 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 text-center">
            <div className="max-w-2xl mx-auto px-6">
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
        </main>
        <footer className="py-6 bg-black bg-opacity-70 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ultimate Roulette. All rights reserved.</p>
        </footer>
      </div>
    </div>

  );
}