let aircraftState: Record<string, any> = {};

export async function POST(req: Request) {
  const data = await req.json();

  // ✅ If payload is direct plane data, wrap it by callsign
  if (data.callsign) {
    aircraftState[data.callsign] = {
      ...data,
      timestamp: Date.now()
    };
  } else {
    // ✅ If properly keyed by callsign, use as-is
    for (const key in data) {
      aircraftState[key] = {
        ...data[key],
        timestamp: Date.now()
      };
    }
  }

  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
}

export async function GET() {
  return Response.json(aircraftState);
}
