"use client";
import { useState, useEffect } from "react";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("ops_auth");
    if (stored === "yes") setAuth(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_OPS_PASSWORD || process.env.OPS_PASSWORD;

    if (password === correct) {
      window.localStorage.setItem("ops_auth", "yes");
      setAuth(true);
    } else {
      alert("Wrong password");
    }
  };

  if (auth) return children;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">🛑 Ops Restricted</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <input
          type="password"
          placeholder="Enter ops password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-700 rounded p-2"
        />
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded p-2">
          Enter Ops
        </button>
      </form>
    </div>
  );
}
