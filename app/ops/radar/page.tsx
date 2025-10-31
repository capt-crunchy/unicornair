"use client";

import dynamic from "next/dynamic";

const RadarMap = dynamic(() => import("@/components/RadarMap"), { ssr: false });

export default function RadarPage() {
  return (
    <div className="min-h-screen bg-black pt-6 px-4">
      <h1 className="text-3xl font-bold text-purple-300 mb-3">
        🛫 Unicorn Air Live Radar
      </h1>
      <p className="text-purple-400/70 mb-6">
        Real-time aircraft tracking feed 🟣✈️
      </p>
      <RadarMap />
    </div>
  );
}
