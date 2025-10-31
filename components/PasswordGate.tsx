"use client";

import { useState, useEffect } from "react";

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("ops_auth");
    if (stored === "yes") setAuth(true);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_OPS_PASSWORD;

    if (!correct) {
      setError("❗ Password env not set on server");
      return;
    }

    if (password.trim() === correct.trim()) {
      window.localStorage.setItem("ops_auth", "yes");
      setAuth(true);
    } else {
      setError("❌ Incorrect password");
      setPassword("");
    }
  };

  if (auth) return children;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/70 text-white p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-80">
        <h1 className="text-2xl font-bold text-center mb-4">🧠 Unicorn Ops Access</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter ops password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
            className={`border rounded p-2 bg-black/20 placeholder-gray-400 text-white ${
              error ? "border-red-500" : "border-white/30"
            }`}
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition p-2 rounded text-white font-semibold shadow-md hover:shadow-purple-500/25"
          >
            Enter Ops
          </button>
        </form>
      </div>
    </div>
  );
}
