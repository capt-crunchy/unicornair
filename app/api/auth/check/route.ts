
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  const body = await req.json()
  const pass = body?.password || ''
  const ADMIN = process.env.ADMIN_PASSWORD
  if(!ADMIN) return NextResponse.json({ error: 'Server missing ADMIN_PASSWORD' }, { status: 500 })
  if(pass === ADMIN) return NextResponse.json({ ok: true })
  return NextResponse.json({ error: 'bad' }, { status: 401 })
}
