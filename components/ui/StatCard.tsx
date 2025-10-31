
import React from 'react'

export function StatCard({ label, value, sub }: { label: string, value: string|number, sub?: string }){
  return (
    <div className="rounded-2xl bg-[#0b0f14]/80 border border-cyan-900/40 shadow-card p-4">
      <div className="text-xs uppercase tracking-wider text-cyan-200/70">{label}</div>
      <div className="text-3xl font-extrabold mt-1">{value}</div>
      {sub && <div className="text-cyan-200/70 text-sm mt-1">{sub}</div>}
    </div>
  )
}
