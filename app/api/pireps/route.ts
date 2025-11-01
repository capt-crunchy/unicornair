import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Minimal required fields
    const { pilotEmail, callsign, dep, arr, flightTime = 0, remarks = "" } = body;

    if (!pilotEmail || !callsign || !dep || !arr) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Ensure pilot exists (upsert by email)
    const pilot = await prisma.pilot.upsert({
      where: { email: pilotEmail },
      update: {},
      create: { email: pilotEmail, callsign, display: callsign },
    });

    const pirep = await prisma.pirep.create({
      data: {
        pilotId: pilot.id,
        callsign,
        dep,
        arr,
        flightTime,
        remarks,
      },
    });

    return NextResponse.json({ ok: true, pirep }, { status: 201 });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
