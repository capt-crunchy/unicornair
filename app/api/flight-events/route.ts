// app/api/flight-events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { postToDiscord, type FlightEvent } from "@/lib/discord";

const SECRET = process.env.OPS_SHARED_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Simple bearer token check
    if (!SECRET) return NextResponse.json({ error: "Server missing secret" }, { status: 500 });
    const auth = req.headers.get("authorization") ?? "";
    if (!auth.startsWith("Bearer ") || auth.slice(7) !== SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as FlightEvent;

    // Basic schema guard
    if (!body || !("type" in body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Send to Discord
    await postToDiscord(body);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("flight-events error:", err);
    return NextResponse.json({ error: err.message ?? "Server error" }, { status: 500 });
  }
}
