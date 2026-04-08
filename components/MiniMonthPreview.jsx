"use client";

import { buildCells, isSameDay } from "@/lib/calendarData";

export default function MiniMonthPreview({ monthIndex, monthName, year, today, accent, isActive, onClick }) {
  const cells = buildCells(year, monthIndex);

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-2 rounded-xl transition-all hover:scale-105 focus:outline-none focus-visible:ring-2"
      style={{
        background: isActive ? `${accent}18` : "transparent",
        border: isActive ? `2px solid ${accent}` : "2px solid transparent",
        minWidth: 72,
      }}
      aria-label={`Jump to ${monthName}`}
    >
      {/* Month name */}
      <span
        className="text-[9px] font-black uppercase tracking-widest mb-1"
        style={{ color: isActive ? accent : "#9ca3af" }}
      >
        {monthName.slice(0, 3)}
      </span>

      {/* Mini grid */}
      <div className="grid grid-cols-7 gap-px w-full">
        {cells.slice(0, 35).map((date, i) => {
          if (!date) return <div key={i} className="w-2 h-2" />;
          const isToday = isSameDay(date, today);
          return (
            <div
              key={i}
              className="mini-day w-2 h-2 rounded-sm"
              style={{
                background: isToday
                  ? accent
                  : date.getDay() === 0 || date.getDay() === 6
                  ? `${accent}33`
                  : "#e5e7eb",
              }}
            />
          );
        })}
      </div>
    </button>
  );
}
