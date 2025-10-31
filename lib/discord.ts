// lib/discord.ts
export type FlightEvent =
  | {
      type: "departed";
      pilot: string;        // "UCA001"
      flight: string;       // "UCA123"
      dep: string;          // "KDEN"
      arr: string;          // "KLAX"
      icao?: string;        // "A20N"
      etdZ?: string;        // ISO time
    }
  | {
      type: "arrived";
      pilot: string;
      flight: string;
      dep: string;
      arr: string;
      landingRate?: number; // fpm
      score?: number;       // 0-100
      fuelUsedKg?: number;
      etaZ?: string;        // actual arrival time
    }
  | {
      type: "position";
      pilot: string;
      callsign: string;
      lat: number;
      lon: number;
      altFt: number;
      gsKt: number;
      hdg: number;
      phase?: "TAXI" | "CLIMB" | "CRUISE" | "DESCENT" | "APP" | "LANDED";
    };

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;
const VA_NAME = process.env.VA_NAME ?? "Unicorn Air";
const ICON_URL = "https://unicornair.vercel.app/assets/unicorn-plane.png";

function colorFor(type: FlightEvent["type"]) {
  return type === "departed" ? 0x8b5cf6 // purple
       : type === "arrived"  ? 0x22c55e // green
       :                       0x60a5fa; // blue
}

export async function postToDiscord(evt: FlightEvent) {
  if (!WEBHOOK_URL) throw new Error("Missing DISCORD_WEBHOOK_URL");

  const title =
    evt.type === "departed" ? `🛫 ${evt.flight} departed ${evt.dep}`
  : evt.type === "arrived"  ? `🛬 ${evt.flight} arrived ${evt.arr}`
  :                           `📍 ${evt.callsign} position update`;

  const fields =
    evt.type === "departed" ? [
      { name: "Pilot", value: evt.pilot, inline: true },
      { name: "Route", value: `${evt.dep} → ${evt.arr}`, inline: true },
      ...(evt.icao ? [{ name: "Type", value: evt.icao, inline: true }] : []),
      ...(evt.etdZ  ? [{ name: "ETD", value: evt.etdZ, inline: true }] : []),
    ]
  : evt.type === "arrived" ? [
      { name: "Pilot", value: evt.pilot, inline: true },
      { name: "Route", value: `${evt.dep} → ${evt.arr}`, inline: true },
      ...(evt.landingRate !== undefined
        ? [{ name: "Landing", value: `${evt.landingRate} fpm`, inline: true }]
        : []),
      ...(evt.score !== undefined
        ? [{ name: "Score", value: `${evt.score}/100`, inline: true }]
        : []),
      ...(evt.fuelUsedKg !== undefined
        ? [{ name: "Fuel Used", value: `${evt.fuelUsedKg} kg`, inline: true }]
        : []),
      ...(evt.etaZ ? [{ name: "On-Blocks", value: evt.etaZ, inline: true }] : []),
    ]
  : [
      { name: "Pilot", value: evt.pilot, inline: true },
      { name: "Alt", value: `${Math.round(evt.altFt)} ft`, inline: true },
      { name: "GS", value: `${Math.round(evt.gsKt)} kt`, inline: true },
      ...(evt.phase ? [{ name: "Phase", value: evt.phase, inline: true }] : []),
    ];

  const payload = {
    username: `${VA_NAME} Ops`,
    avatar_url: ICON_URL,
    embeds: [
      {
        title,
        color: colorFor(evt.type),
        thumbnail: { url: ICON_URL },
        fields,
        timestamp: new Date().toISOString(),
        footer: { text: VA_NAME },
      },
    ],
  };

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Discord webhook failed: ${res.status} ${t}`);
  }
}
