
'use client'
import { useState } from 'react'

export default function HomePage(){
  const [icao, setIcao] = useState('KGEG')
  const [metar, setMetar] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMetar = async () => {
    setLoading(true); setError(null)
    try{
      const res = await fetch(`/api/metar?icao=${icao.trim().toUpperCase()}`)
      if(!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMetar(data.metar ?? JSON.stringify(data, null, 2))
    }catch(e:any){
      setError(e.message || 'Failed to fetch METAR')
    }finally{
      setLoading(false)
    }
  }

  return (
    <main>
      <section className="py-12">
        <div className="container grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">Fly the skies where legends are born</h1>
            <p className="text-violet-200/80 mt-2">Plan in SimBrief, track on FsHub, and talk to ATC with natural speech via SayIntentions.AI.</p>
            <div className="mt-4 flex gap-3">
              <a className="btn btn-primary" href="https://fshub.io" target="_blank" rel="noopener">View Airline on FsHub</a>
              <a className="btn" href="/about">Learn More</a>
            </div>
            <ul className="flex flex-wrap gap-2 mt-3 text-sm text-violet-200">
              <li className="border border-violet-900 rounded-lg px-2 py-1">SimBrief</li>
              <li className="border border-violet-900 rounded-lg px-2 py-1">FsHub</li>
              <li className="border border-violet-900 rounded-lg px-2 py-1">Hoppie ACARS</li>
              <li className="border border-violet-900 rounded-lg px-2 py-1">SayIntentions.AI Partner</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="font-bold mb-2">Live METAR</h2>
            <div className="flex gap-2 mb-2">
              <input className="flex-1 px-3 py-2 rounded-xl bg-black/30 border border-violet-900" value={icao} onChange={e=>setIcao(e.target.value)} placeholder="ICAO e.g. KGEG"/>
              <button onClick={fetchMetar} className="btn btn-primary" disabled={loading}>{loading?'Loading…':'Fetch'}</button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {metar ? <pre className="text-sm whitespace-pre-wrap">{metar}</pre> : <p className="text-violet-200/80 text-sm">Enter an ICAO code and click Fetch.</p>}
          </div>
        </div>
      </section>

      <section className="py-8 border-t border-[hsl(var(--border))]">
        <div className="container grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Alliance & Tracking</h2>
            <p className="text-violet-200/80">Add our tiny banner to your alliance flight tracker, or embed live stats here.</p>
            <pre className="card overflow-auto text-sm mt-2">{`<a href="https://unicornair.fun" title="Unicorn Air">
  <img src="https://unicornair.fun/assets/banner-tiny.svg" alt="Unicorn Air">
</a>`}</pre>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to claim your wings?</h2>
            <p className="text-violet-200/80">It’s free to join. Bring your A320neo or your favorite GA ride—we’ll handle the magic.</p>
            <a className="btn btn-primary mt-3" href="/crew" target="_blank">Open Crew Portal</a>
          </div>
        </div>
      </section>
    </main>
  )
}
