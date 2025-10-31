
import PasswordGate from '@/components/PasswordGate'
import { GlassPanel } from '@/components/ui/GlassPanel'

async function getFlights(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/flights`, { cache: 'no-store' })
  return res.ok ? res.json() : { flights: [] }
}

export default async function FlightsPage(){
  const { flights } = await getFlights()
  return (
    <PasswordGate>
      <GlassPanel title="Flights">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-cyan-200/80">
              <tr className="text-left border-b border-cyan-900/40">
                <th className="py-2 pr-2">Callsign</th>
                <th className="py-2 pr-2">From</th>
                <th className="py-2 pr-2">To</th>
                <th className="py-2 pr-2">Type</th>
                <th className="py-2 pr-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((f:any)=> (
                <tr key={f.cs} className="border-b border-cyan-900/30">
                  <td className="py-2">{f.cs}</td>
                  <td>{f.dep}</td>
                  <td>{f.arr}</td>
                  <td>{f.type}</td>
                  <td>{f.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </PasswordGate>
  )
}
