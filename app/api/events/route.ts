
import { NextResponse } from 'next/server'

export async function GET(){
  const events = [
    { id: 'evt-1', title: 'Spokane Sunset Hop', desc: 'GEG scenic loop, beginner-friendly', date: '2025-11-02', timez: '18:00Z' },
    { id: 'evt-2', title: 'Rain City Turnarounds', desc: 'SEA/PAE/OLM quick circuits', date: '2025-11-08', timez: '20:00Z' },
    { id: 'evt-3', title: 'Mountain Mail Run', desc: 'Short-field practice into MSO', date: '2025-11-15', timez: '19:30Z' },
  ]
  return NextResponse.json({ events })
}
