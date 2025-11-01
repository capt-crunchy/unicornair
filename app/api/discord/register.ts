// Run once to register commands: https://YOURDOMAIN.vercel.app/api/discord/register
const DISCORD_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const GUILD_ID = process.env.DISCORD_GUILD_ID!; // or leave out for global

export async function GET() {
  const commands = [
    {
      name: "scroll",
      description: "Unfurl a royal scroll",
      options: [
        {
          name: "type",
          type: 3, // STRING
          description: "scroll type",
          required: true,
          choices: [{ name: "landing", value: "landing" }]
        }
      ]
    }
  ];

  const url = `https://discord.com/api/v10/applications/${CLIENT_ID}/guilds/${GUILD_ID}/commands`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands)
  });

  return new Response(`Registered: ${res.status}`);
}
