
'use client'
import React, { useState, useEffect } from 'react'

export default function PasswordGate({ children }:{ children: React.ReactNode }){
  const [ok, setOk] = useState(false)
  const [err, setErr] = useState<string|null>(null)
  const [pw, setPw] = useState('')

  useEffect(()=>{
    const cached = sessionStorage.getItem('ua_admin_ok')
    if (cached === '1') setOk(true)
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    const res = await fetch('/api/auth/check', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password: pw })})
    if(res.ok){
      sessionStorage.setItem('ua_admin_ok', '1')
      setOk(true)
    } else {
      setErr('Incorrect password')
    }
  }

  if (ok) return <>{children}</>

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-[#0b0f14]/80 border border-cyan-900/40 shadow-card p-4">
        <h2 className="text-xl font-bold mb-2">Ops Admin Access</h2>
        <p className="text-cyan-200/80 text-sm mb-3">Enter the admin password to open the ops dashboard.</p>
        <input className="w-full bg-black/50 border border-cyan-900/40 rounded-xl px-3 py-2" type="password" placeholder="Admin password" value={pw} onChange={e=>setPw(e.target.value)} />
        {err && <p className="text-red-400 text-sm mt-2">{err}</p>}
        <button className="mt-3 btn btn-primary w-full" type="submit">Enter</button>
      </form>
    </div>
  )
}
