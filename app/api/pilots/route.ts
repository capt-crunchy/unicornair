
import { NextResponse } from 'next/server'

export async function GET(){
  const pilots = [
    { handle: 'Flip', hours: 142, rank: 'Captain', last_flight: 'UCA659 • 2h ago' },
    { handle: 'SkyMage', hours: 87, rank: 'FO', last_flight: 'UCA118 • 5h ago' },
    { handle: 'RunwayKnight', hours: 33, rank: 'SO', last_flight: 'UCA204 • 1d ago' },
  ]
  return NextResponse.json({ pilots })
}
