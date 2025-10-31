
import React from 'react'
import Link from 'next/link'

export default function OpsLayout({ children }:{ children: React.ReactNode }){
  return (
    <div className="min-h-screen">
      <div className="border-b border-cyan-900/40 bg-[#071017]/90 backdrop-blur sticky top-[57px] z-10">
        <div className="container flex items-center gap-4 py-3">
          <span className="text-cyan-300 font-bold tracking-widest uppercase text-xs">Ops Console</span>
          <nav className="flex gap-2 text-sm">
            <Link className="nav-link" href="/ops">Dashboard</Link>
            <Link className="nav-link" href="/ops/flights">Flights</Link>
            <Link className="nav-link" href="/ops/pilots">Pilots</Link>
            <Link className="nav-link" href="/ops/events">Events</Link>
          </nav>
        </div>
      </div>
      <div className="container py-6">{children}</div>
    </div>
  )
}
