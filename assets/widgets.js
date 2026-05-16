const embarkationTime = new Date("2026-06-05T17:00:00+03:00").getTime();

const staticWeather = [
  { date: "2026-06-02", city: "Atlanta, GA", high: 85, low: 68, condition: "Partly Cloudy", lat: 33.749, lon: -84.388 },
  { date: "2026-06-03", city: "Istanbul, Turkey", high: 79, low: 64, condition: "Mostly Sunny", lat: 41.0082, lon: 28.9784 },
  { date: "2026-06-04", city: "Istanbul, Turkey", high: 79, low: 64, condition: "Breezy", lat: 41.0082, lon: 28.9784 },
  { date: "2026-06-05", city: "Istanbul, Turkey", high: 81, low: 66, condition: "Sunny", lat: 41.0082, lon: 28.9784 },
  { date: "2026-06-06", city: "Kusadasi, Turkey", high: 88, low: 66, condition: "Hot and Sunny", lat: 37.8579, lon: 27.261 },
  { date: "2026-06-07", city: "Santorini, Greece", high: 79, low: 70, condition: "Sunny and Breezy", lat: 36.3932, lon: 25.4615 },
  { date: "2026-06-08", city: "Mykonos, Greece", high: 79, low: 68, condition: "Windy Sun", lat: 37.4467, lon: 25.3289 },
  { date: "2026-06-09", city: "Athens, Greece", high: 86, low: 68, condition: "Hot and Sunny", lat: 37.9838, lon: 23.7275 },
  { date: "2026-06-10", city: "Olympia, Greece", high: 84, low: 66, condition: "Sunny", lat: 37.6386, lon: 21.63 },
  { date: "2026-06-11", city: "Corfu, Greece", high: 82, low: 66, condition: "Sea Breeze", lat: 39.6243, lon: 19.9217 },
  { date: "2026-06-12", city: "Dubrovnik, Croatia", high: 82, low: 66, condition: "Sunny", lat: 42.6507, lon: 18.0944 },
  { date: "2026-06-13", city: "Kotor, Montenegro", high: 82, low: 66, condition: "Sunny", lat: 42.4247, lon: 18.7712 },
  { date: "2026-06-14", city: "Zadar, Croatia", high: 81, low: 64, condition: "Sunny", lat: 44.1194, lon: 15.2314 },
  { date: "2026-06-15", city: "Venice, Italy", high: 81, low: 64, condition: "Warm", lat: 45.4408, lon: 12.3155 },
  { date: "2026-06-16", city: "Venice, Italy", high: 81, low: 64, condition: "Warm", lat: 45.4408, lon: 12.3155 },
  { date: "2026-06-17", city: "Venice, Italy", high: 81, low: 64, condition: "Warm Morning", lat: 45.4408, lon: 12.3155 },
];

const weatherLabels = new Map([
  [0, "Sunny"],
  [1, "Mostly Sunny"],
  [2, "Partly Cloudy"],
  [3, "Cloudy"],
  [45, "Fog"],
  [48, "Fog"],
  [51, "Light Drizzle"],
  [53, "Drizzle"],
  [55, "Drizzle"],
  [61, "Light Rain"],
  [63, "Rain Likely"],
  [65, "Rain Likely"],
  [80, "Showers"],
  [81, "Rain Likely"],
  [82, "Heavy Rain"],
  [95, "Thunderstorms"],
]);

function formatDate(isoDate) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  })
    .format(new Date(`${isoDate}T12:00:00Z`))
    .replace(",", "")
    .toUpperCase();
}

function daysUntil(isoDate) {
  const today = new Date();
  const localMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const target = new Date(`${isoDate}T00:00:00Z`);
  return Math.round((target.getTime() - localMidnight.getTime()) / 86400000);
}

function weatherIcon(condition) {
  const label = condition.toLowerCase();
  if (label.includes("rain") || label.includes("shower") || label.includes("drizzle")) {
    return `<svg class="weather-icon" viewBox="0 0 26 26" fill="none"><path d="M4.333 16.141c-.805-.823-1.412-1.817-1.776-2.909a7.58 7.58 0 0 1-.322-3.393 7.59 7.59 0 0 1 1.196-3.191A7.59 7.59 0 0 1 5.903 4.303a7.58 7.58 0 0 1 3.25-1.026 7.58 7.58 0 0 1 3.371.501 7.59 7.59 0 0 1 2.811 1.926 7.58 7.58 0 0 1 1.684 2.963h1.94a4.875 4.875 0 0 1 2.707 8.929M17.333 15.167v6.5M8.667 15.167v6.5M13 17.333v6.5" stroke="black" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  if (label.includes("cloud") || label.includes("breeze") || label.includes("wind") || label.includes("warm")) {
    return `<svg class="weather-icon" viewBox="0 0 26 26" fill="none"><path d="M13 2.167v2.167M5.341 5.341l1.527 1.528M21.667 13h2.166M20.659 5.341l-1.527 1.528M17.276 13.705a4.34 4.34 0 0 0-6.419-4.472M14.083 23.834h-6.5a5.417 5.417 0 1 1 5.309-6.5h1.191a3.25 3.25 0 1 1 0 6.5Z" stroke="black" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  return `<svg class="weather-icon" viewBox="0 0 26 26" fill="none"><path d="M13 2.167v2.167M13 21.667v2.167M5.341 5.341l1.527 1.528M19.132 19.132l1.527 1.527M2.167 13h2.166M21.667 13h2.166M6.868 19.132l-1.527 1.527M20.659 5.341l-1.527 1.528M17.333 13A4.333 4.333 0 1 1 8.667 13a4.333 4.333 0 0 1 8.666 0Z" stroke="black" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function startCountdown(root = document) {
  function updateCountdown() {
    const remaining = Math.max(0, embarkationTime - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    root.getElementById("days").textContent = String(days);
    root.getElementById("hours").textContent = String(hours).padStart(2, "0");
    root.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    root.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function renderWeather(cards, source, root = document) {
  root.getElementById("weatherStrip").innerHTML = cards
    .map(
      (card) => `
        <article class="weather-card" title="${card.city}: ${card.high}° / ${card.low}° · ${card.condition}">
          <div class="weather-date">${formatDate(card.date)}</div>
          <div class="weather-city">${card.city}</div>
          <div class="weather-main">${weatherIcon(card.condition)}<div class="weather-temp">${card.high}°</div></div>
          <div class="weather-condition">${card.condition}</div>
        </article>
      `
    )
    .join("");
  root.getElementById("status").textContent = source;
}

async function refreshWeather(root = document) {
  const settled = await Promise.allSettled(
    staticWeather.map(async (card) => {
      if (daysUntil(card.date) < 0 || daysUntil(card.date) > 16) return { ...card, live: false };
      const params = new URLSearchParams({
        latitude: card.lat,
        longitude: card.lon,
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        temperature_unit: "fahrenheit",
        timezone: "auto",
        start_date: card.date,
        end_date: card.date,
      });
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      if (!response.ok) throw new Error(`Weather request failed for ${card.city}`);
      const data = await response.json();
      return {
        ...card,
        high: Math.round(data.daily.temperature_2m_max[0]),
        low: Math.round(data.daily.temperature_2m_min[0]),
        condition: weatherLabels.get(data.daily.weather_code[0]) || card.condition,
        live: true,
      };
    })
  );

  const cards = settled.map((result, index) =>
    result.status === "fulfilled" ? result.value : { ...staticWeather[index], live: false }
  );
  const liveCount = cards.filter((card) => card.live).length;
  renderWeather(
    cards,
    liveCount
      ? `Live Open-Meteo forecast for ${liveCount} day${liveCount === 1 ? "" : "s"}; planning estimates for the rest.`
      : "Forecasts are estimates until 16 days before the date, then will update automatically.",
    root
  );
}

function startWeather(root = document) {
  renderWeather(staticWeather, "Loading weather...", root);
  refreshWeather(root);
  setInterval(() => refreshWeather(root), 60 * 60 * 1000);
}
