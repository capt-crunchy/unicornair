import { NextRequest, NextResponse } from "next/server";
import nacl from "tweetnacl";

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY!;
const PLANE_ICON = "https://unicornair.vercel.app/assets/unicorn-plane.png";

// Verify request signature from Discord
function verifyDiscordRequest(req: NextRequest, rawBody: string) {
  const timestamp = req.headers.get("x-signature-timestamp") ?? "";
  const signature = req.headers.get("x-signature-ed25519") ?? "";
  const isValid = nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, "hex"),
    Buffer.from(PUBLIC_KEY, "hex")
  );
  return isValid;
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!verifyDiscordRequest(req, raw)) {
    return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  }

  const interaction = JSON.parse(raw);

  // PING
  if (interaction.type === 1) {
    return NextResponse.json({ type: 1 }); // PONG
  }

  // APPLICATION_COMMAND
  if (interaction.type === 2) {
    const name = interaction.data?.name;
    const sub = interaction.data?.options?.[0];

    if (name === "scroll" && sub?.name === "landing") {
      const opts = Object.fromEntries((sub.options ?? []).map((o: any) => [o.name, o.value]));

      const pilot = opts.pilot as string;
      const flight = opts.flight as string;
      const route = opts.route as string; // "KDEN→KSEA"
      const fpm = Number(opts.fpm);
      const score = opts.score !== undefined ? Number(opts.score) : undefined;
      const gs = opts.gs !== undefined ? Number(opts.gs) : undefined;

      // Tone: Medium Medieval
      const dramatic =
        fpm <= -400
          ? "⚠️ The earth did tremble at thy alighting; the guild’s carpenters are summoned."
          : fpm <= -220
          ? "✨ A landing most worthy; the court nods in solemn approval."
          : "🌬️ A feather’s kiss upon the stones—bards shall sing of this touch.";

      const embed = {
        title: `🏰 Hear ye! A Noble Landing is proclaimed`,
        color: fpm <= -400 ? 0xEF4444 : fpm <= -220 ? 0xA78BFA : 0x22C55E,
        thumbnail: { url: PLANE_ICON },
        fields: [
          { name: "Sky-Knight", value: pilot, inline: true },
          { name: "Flight", value: flight, inline: true },
          { name: "Route", value: route, inline: true },
          { name: "Vertical Speed", value: `${Math.round(fpm)} fpm`, inline: true },
          ...(gs !== undefined ? [{ name: "Touch GS", value: `${Math.round(gs)} kt`, inline: true }] : []),
          ...(score !== undefined ? [{ name: "Landing Score", value: `${score}/100`, inline: true }] : []),
        ],
        description: dramatic,
        timestamp: new Date().toISOString(),
        footer: { text: "Unicorn Air • Royal Flight Court" },
      };

      // Respond with an embed (type 4 = CHANNEL_MESSAGE_WITH_SOURCE)
      return NextResponse.json({
        type: 4,
        data: {
          embeds: [embed],
        },
      });
    }
  }

  return NextResponse.json({ type: 4, data: { content: "🦄 The scribes did not understand thy request." } });
}
