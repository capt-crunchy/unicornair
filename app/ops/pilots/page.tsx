
import PasswordGate from '@/components/PasswordGate'
import { GlassPanel } from '@/components/ui/GlassPanel'

async function getPilots(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/pilots`, { cache: 'no-store' })
  return res.ok ? res.json() : { pilots: [] }
}

export default async function PilotsPage(){
  const { pilots } = await getPilots()
  return (
    <PasswordGate>
      <GlassPanel title="Pilots">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-cyan-200/80">
              <tr className="text-left border-b border-cyan-900/40">
                <th className="py-2 pr-2">Handle</th>
                <th className="py-2 pr-2">Hours</th>
                <th className="py-2 pr-2">Rank</th>
                <th className="py-2 pr-2">Last Flight</th>
              </tr>
            </thead>
            <tbody>
              {pilots.map((p:any)=> (
                <tr key={p.handle} className="border-b border-cyan-900/30">
                  <td className="py-2">{p.handle}</td>
                  <td>{p.hours}</td>
                  <td>{p.rank}</td>
                  <td>{p.last_flight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </PasswordGate>
  )
}
