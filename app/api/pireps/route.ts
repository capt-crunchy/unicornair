export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received PIREP:", data);

    return new Response(
      JSON.stringify({ ok: true, message: "PIREP saved (temp mock)" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
