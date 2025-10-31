
import React from 'react'

export function GlassPanel({ title, children, right }: { title: string, children: React.ReactNode, right?: React.ReactNode }){
  return (
    <section className="rounded-2xl bg-[#0b0f14]/60 border border-cyan-900/40 shadow-card">
      <header className="flex items-center justify-between px-4 py-3 border-b border-cyan-900/40 bg-gradient-to-b from-[#0a0e12] to-transparent">
        <h3 className="font-bold tracking-wide text-cyan-100">{title}</h3>
        {right}
      </header>
      <div className="p-4">
        {children}
      </div>
    </section>
  )
}
