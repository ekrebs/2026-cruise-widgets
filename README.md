# 2026 Cruise Widgets

Static, embeddable widgets for the 2026 Family Mediterranean Cruise Notion dashboard.

## What It Does

- Live countdown to Norwegian Viva sailaway from Istanbul on June 5, 2026 at 5:00 PM local time.
- Seven-across weather strip for the cruise itinerary.
- Pulls live forecast data from Open-Meteo in the browser when dates are inside the forecast window.
- Falls back to planning estimates for dates outside the forecast window.
- No backend, build step, API keys, or server process.

## Deploy on Cloudflare Pages

- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/` or `.` depending on what the Cloudflare UI accepts for repo root

After deploy, embed the public HTTPS URL in Notion with `/embed`.
