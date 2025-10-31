
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url)
  const icao = (searchParams.get('icao') || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
  if(!icao) return NextResponse.json({ error: 'Missing ICAO' }, { status: 400 })

  const KEY = process.env.CHECKWX_API_KEY
  if(!KEY) return NextResponse.json({ error: 'Server missing CHECKWX_API_KEY' }, { status: 500 })

  const endpoint = `https://api.checkwx.com/metar/${icao}/decoded`
  try{
    const resp = await fetch(endpoint, { headers: { 'X-API-Key': KEY } })
    if(!resp.ok){
      const text = await resp.text()
      return NextResponse.json({ error: 'Upstream error', status: resp.status, body: text }, { status: 502 })
    }
    const data = await resp.json()
    // data format per CheckWX: { results: n, data: [ { raw_text, ... } ] }
    const raw = data?.data?.[0]?.raw_text || null
    return NextResponse.json({ icao, metar: raw, data })
  }catch(err:any){
    return NextResponse.json({ error: err?.message || 'Fetch failed' }, { status: 500 })
  }
}
