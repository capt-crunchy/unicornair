
import PasswordGate from '@/components/PasswordGate'
import { GlassPanel } from '@/components/ui/GlassPanel'

async function getEvents(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/events`, { cache: 'no-store' })
  return res.ok ? res.json() : { events: [] }
}

export default async function EventsPage(){
  const { events } = await getEvents()
  return (
    <PasswordGate>
      <GlassPanel title="Events">
        <ul className="space-y-2">
          {events.map((e:any)=> (
            <li key={e.id} className="flex items-center justify-between rounded-xl border border-cyan-900/40 bg-[#0b0f14]/60 p-3">
              <div>
                <div className="font-semibold">{e.title}</div>
                <div className="text-cyan-200/70 text-sm">{e.desc}</div>
              </div>
              <div className="text-cyan-200/80 text-sm">{e.date} • {e.timez}</div>
            </li>
          ))}
        </ul>
      </GlassPanel>
    </PasswordGate>
  )
}
