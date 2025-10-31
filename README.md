
# Unicorn Air (Next.js + Tailwind)

## Quickstart
1. `pnpm i` (or `npm i`/`yarn`)
2. Copy `.env.example` to `.env.local` and put your `CHECKWX_API_KEY`.
3. `pnpm dev` then open http://localhost:3000
4. Test the widget: enter ICAO (e.g., KGEG) and click **Fetch**.

## Deploy
- Vercel: add `CHECKWX_API_KEY` as an environment variable.
- Docker: build a production image and set `CHECKWX_API_KEY` in the container env.

## Notes
- The API route proxies to CheckWX `/metar/{ICAO}/decoded` with header `X-API-Key`.
- Replace with NOAA/AviationWeather.gov if preferred.
