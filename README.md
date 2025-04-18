## 🌀 Roulette Game – Web App

This is a **Roulette Game Web Application** built with **Next.js**, using the **App Router**, **TailwindCSS**, **Framer Motion**, **MongoDB via Mongoose**, and **JWT-based authentication**. The app allows users to register, login, manage their wallet, and engage in game phases using an interactive dashboard.

---

### 🌐 Live Demo

Check out the live version of the application here:  
🔗 [https://app.vercel.app](https://app.vercel.app)

---

### 🚀 How to Run the Application Locally

1. **Clone the repository** (or extract this ZIP if not cloned from GitHub):
   ```bash
   git clone <your-repo-url>
   cd project-phases-supernova-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Rename `.env.local.example` (if available) to `.env.local` and fill in:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

### 🧩 Project Functionality Overview

- **User Authentication:**
  - Sign up and login functionality with JWT-based sessions
  - Passwords are securely hashed with `bcryptjs`

- **MongoDB Integration:**
  - Uses `mongoose` to store user data, wallet balance, and game state

- **Roulette Dashboard:**
  - An animated, real-time interface using `framer-motion` and `animejs`
  - Users can:
    - View their wallet balance
    - Add or withdraw money
    - Participate in roulette game rounds

- **Modern Frontend Stack:**
  - Built using `Next.js 15`, `TypeScript`, and `TailwindCSS`
  - App Router enabled for modular and scalable routing
  - Animations for interactive UI/UX
