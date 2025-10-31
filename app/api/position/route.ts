import { NextResponse } from "next/server";

let aircraftPositions: Record<string, any> = {};

export async function POST(req: Request) {
  const data = await req.json();
  const { callsign, lat, lon, alt, gs, hdg } = data;

  aircraftPositions[callsign] = {
    callsign,
    lat,
    lon,
    alt,
    gs,
    hdg,
    timestamp: Date.now()
  };

  return NextResponse.json({ status: "ok" });
}

// GET endpoint for the map to read positions
export async function GET() {
  return NextResponse.json(aircraftPositions);
}
