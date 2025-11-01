import nacl from "tweetnacl";

export async function POST(req: Request) {
  const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!;
  const signature = req.headers.get("x-signature-ed25519") ?? "";
  const timestamp = req.headers.get("x-signature-timestamp") ?? "";
  const rawBody = await req.text();

  // Convert everything to Uint8Array like Discord expects
  const isValid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + rawBody),
    Uint8Array.from(Buffer.from(signature, "hex")),
    Uint8Array.from(Buffer.from(PUBLIC_KEY, "hex"))
  );

  if (!isValid) {
    return new Response("Invalid request signature", { status: 401 });
  }

  const body = JSON.parse(rawBody);

  // Discord ping event
  if (body.type === 1) {
    return Response.json({ type: 1 });
  }

  // Slash command: /scroll landing
  if (body.data?.name === "scroll" && body.data?.options?.[0]?.value === "landing") {
    return Response.json({
      type: 4, // Channel message with source
      data: {
        content: `📜✨ *Hear ye! Hear ye!*  
A noble pilot has landed upon our kingdom's fields! Welcome home, brave air knight! 🦄⚔️`,
      }
    });
  }

  return Response.json({ type: 4, data: { content: "Unknown command" } });
}
