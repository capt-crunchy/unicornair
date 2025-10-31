
import PasswordGate from '@/components/PasswordGate'
import { StatCard } from '@/components/ui/StatCard'
import { GlassPanel } from '@/components/ui/GlassPanel'

export default async function OpsHome(){
  // In real impl, fetch from APIs; here we show placeholders
  const stats = [
    { label: 'Flights Online', value: 3, sub: 'A320 (2) • GA (1)' },
    { label: 'Pilots Active (24h)', value: 12, sub: 'Avg leg 1.7h' },
    { label: 'Fleet Airframes', value: 7, sub: 'A320neo • C208 • B58' },
    { label: 'Events This Month', value: 4, sub: '2 fly-ins • 2 challenges' },
  ]

  return (
    <PasswordGate>
      <div className="grid md:grid-cols-4 gap-3">
        {stats.map(s => (<StatCard key={s.label} label={s.label} value={s.value} sub={s.sub}/>))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <GlassPanel title="Live Flights">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-cyan-200/80">
                <tr className="text-left border-b border-cyan-900/40">
                  <th className="py-2 pr-2">Callsign</th>
                  <th className="py-2 pr-2">From → To</th>
                  <th className="py-2 pr-2">Type</th>
                  <th className="py-2 pr-2">ETA</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-cyan-900/30"><td className="py-2">UCA659</td><td>GEG → SEA</td><td>A20N</td><td>00:31</td></tr>
                <tr className="border-b border-cyan-900/30"><td className="py-2">UCA204</td><td>PDX → GEG</td><td>A20N</td><td>00:54</td></tr>
                <tr><td className="py-2">UCA118</td><td>GEG → MSO</td><td>C208</td><td>01:12</td></tr>
              </tbody>
            </table>
          </div>
        </GlassPanel>
        <GlassPanel title="Upcoming Events">
          <ul className="text-sm space-y-2">
            <li className="flex items-center justify-between"><span>Spokane Sunset Hop</span><span className="text-cyan-200/70">Nov 2 • 18:00Z</span></li>
            <li className="flex items-center justify-between"><span>Rain City Turnarounds</span><span className="text-cyan-200/70">Nov 8 • 20:00Z</span></li>
            <li className="flex items-center justify-between"><span>Mountain Mail Run</span><span className="text-cyan-200/70">Nov 15 • 19:30Z</span></li>
          </ul>
        </GlassPanel>
      </div>
    </PasswordGate>
  )
}
