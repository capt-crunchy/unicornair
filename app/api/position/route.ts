import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST JSON: { pilotEmail, callsign, lat, lon, alt, gs, hdg }
export async function POST(req: NextRequest) {
  try {
    const { pilotEmail, callsign, lat, lon, alt, gs, hdg } = await req.json();

    if (!pilotEmail || !callsign || lat == null || lon == null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const pilot = await prisma.pilot.upsert({
      where: { email: pilotEmail },
      update: {},
      create: { email: pilotEmail, callsign, display: callsign },
    });

    const pos = await prisma.position.create({
      data: { pilotId: pilot.id, callsign, lat, lon, alt: alt ?? 0, gs: gs ?? 0, hdg: hdg ?? 0 },
    });

    return NextResponse.json({ ok: true, id: pos.id }, { status: 201 });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// GET latest positions for map
export async function GET() {
  const since = new Date(Date.now() - 1000 * 60 * 15); // last 15m
  const latest = await prisma.$queryRawUnsafe(`
    SELECT DISTINCT ON (callsign) id, callsign, lat, lon, alt, gs, hdg, "when"
    FROM "Position"
    WHERE "when" > $1
    ORDER BY callsign, "when" DESC
  `, since);
  return NextResponse.json({ aircraft: latest });
}
