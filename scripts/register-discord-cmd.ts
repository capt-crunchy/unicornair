// Run: npx ts-node scripts/register-discord-cmd.ts
const APP_ID = process.env.DISCORD_APP_ID!;
const GUILD_ID = process.env.DISCORD_GUILD_ID!;
const TOKEN = process.env.DISCORD_BOT_TOKEN!;

async function main() {
  const url = `https://discord.com/api/v10/applications/${APP_ID}/guilds/${GUILD_ID}/commands`;

  const command = {
    name: "scroll",
    description: "Royal proclamations of flight",
    options: [
      {
        type: 1, // SUB_COMMAND
        name: "landing",
        description: "Announce a noble landing",
        options: [
          { type: 3, name: "pilot", description: "Pilot name or callsign", required: true },
          { type: 3, name: "flight", description: "Flight number (e.g., UCA123)", required: true },
          { type: 3, name: "route", description: "KDEN→KSEA", required: true },
          { type: 4, name: "fpm", description: "Landing vertical speed (fpm)", required: true },
          { type: 4, name: "score", description: "Landing score (0-100)", required: false },
          { type: 4, name: "gs", description: "Groundspeed on touchdown (kt)", required: false },
        ],
      },
    ],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status}: ${text}`);
  console.log("Registered /scroll landing ✅", text);
}

main().catch(e => { console.error(e); process.exit(1); });
