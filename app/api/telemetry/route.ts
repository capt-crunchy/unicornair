let planes: any = {};

export async function POST(req: Request) {
  const { id, lat, lon, alt } = await req.json();
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const p = planes[id] || { trail: [] };

  // append trail (limit length)
  p.trail = [...(p.trail || []), [lat, lon]].slice(-20);

  planes[id] = { id, lat, lon, alt, trail: p.trail };

  return Response.json({ ok: true });
}

export async function GET() {
  return Response.json(Object.values(planes));
}
