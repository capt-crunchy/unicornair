
import { NextResponse } from 'next/server'

export async function GET(){
  const flights = [
    { cs: 'UCA659', dep: 'KGEG', arr: 'KSEA', type: 'A20N', status: 'ENROUTE' },
    { cs: 'UCA204', dep: 'KPDX', arr: 'KGEG', type: 'A20N', status: 'ENROUTE' },
    { cs: 'UCA118', dep: 'KGEG', arr: 'KMSO', type: 'C208', status: 'CLIMB' },
  ]
  return NextResponse.json({ flights })
}
