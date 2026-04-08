export const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// Per-month config: hero image, accent colour, page bg, mood label + emoji
export const MONTH_CONFIG = [
  { url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",  accent: "#0ea5e9", bg: "#e0f2fe", mood: "❄️ Icy & Bold",    season: "Winter"  },
  { url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80", accent: "#6366f1", bg: "#ede9fe", mood: "🎿 Powder Rush",   season: "Winter"  },
  { url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80", accent: "#22c55e", bg: "#dcfce7", mood: "🌊 Wild Waves",    season: "Spring"  },
  { url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&q=80", accent: "#f59e0b", bg: "#fef9c3", mood: "⛏️ Summit Push",   season: "Spring"  },
  { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80", accent: "#10b981", bg: "#d1fae5", mood: "🏃 Trail Blazing", season: "Spring"  },
  { url: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&q=80", accent: "#f97316", bg: "#ffedd5", mood: "🧗 Vertical Limit", season: "Summer" },
  { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80", accent: "#06b6d4", bg: "#cffafe", mood: "🚣 Glacial Flow",  season: "Summer"  },
  { url: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80", accent: "#eab308", bg: "#fef9c3", mood: "🚵 Downhill Fast", season: "Summer"  },
  { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80", accent: "#ef4444", bg: "#fee2e2", mood: "🍂 Misty Peaks",   season: "Autumn"  },
  { url: "https://images.unsplash.com/photo-1500534905-d8d1b2b1e8b0?w=1200&q=80",   accent: "#f97316", bg: "#ffedd5", mood: "🪂 Free Fall",     season: "Autumn"  },
  { url: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80", accent: "#8b5cf6", bg: "#ede9fe", mood: "🏂 Deep Powder",   season: "Autumn"  },
  { url: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&q=80", accent: "#3b82f6", bg: "#dbeafe", mood: "⛷️ Last Runs",     season: "Winter"  },
];

// Comprehensive holidays (month 0-indexed)
export const HOLIDAYS = {
  "0-1":  { label: "New Year's Day",    emoji: "🎆" },
  "0-15": { label: "MLK Day",           emoji: "✊" },
  "1-2":  { label: "Groundhog Day",     emoji: "🦔" },
  "1-14": { label: "Valentine's Day",   emoji: "❤️" },
  "2-17": { label: "St. Patrick's",     emoji: "🍀" },
  "2-20": { label: "Spring Equinox",    emoji: "🌱" },
  "3-1":  { label: "April Fools",       emoji: "🃏" },
  "3-22": { label: "Earth Day",         emoji: "🌍" },
  "4-5":  { label: "Cinco de Mayo",     emoji: "🌮" },
  "4-12": { label: "Mother's Day",      emoji: "💐" },
  "5-19": { label: "Father's Day",      emoji: "👔" },
  "5-21": { label: "Summer Solstice",   emoji: "☀️" },
  "6-4":  { label: "Independence Day",  emoji: "🎇" },
  "8-22": { label: "Autumn Equinox",    emoji: "🍁" },
  "9-31": { label: "Halloween",         emoji: "🎃" },
  "10-11":{ label: "Veterans Day",      emoji: "🎖️" },
  "10-27":{ label: "Thanksgiving",      emoji: "🦃" },
  "11-21":{ label: "Winter Solstice",   emoji: "🌨️" },
  "11-24": { label: "Christmas Eve",    emoji: "🎄" },
  "11-25": { label: "Christmas",        emoji: "🎁" },
  "11-31": { label: "New Year's Eve",   emoji: "🥂" },
};

export function getHoliday(month, day) {
  return HOLIDAYS[`${month}-${day}`] || null;
}

export function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export function isBetween(date, start, end) {
  if (!start || !end) return false;
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return d > s && d < e;
}

export function buildCells(year, month) {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function storageKey(year, month) {
  return `interactive-cal-notes-${year}-${month}`;
}
