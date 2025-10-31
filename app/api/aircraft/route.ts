import { NextResponse } from "next/server";

let latestData: any = {};

export async function POST(request: Request) {
  const body = await request.json();
  latestData = body;
  return NextResponse.json({ status: "ok" });
}

export async function GET() {
  return NextResponse.json(latestData);
}
