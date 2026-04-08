"use client";

import { useState, useCallback } from "react";
import { DAY_LABELS, buildCells, isSameDay, isBetween, getHoliday } from "@/lib/calendarData";

function Confetti({ accent }) {
  const colors = [accent, "#ffffff", "#fbbf24", "#34d399", "#f87171", "#a78bfa", "#fb923c"];
  return Array.from({ length: 12 }).map((_, i) => (
    <div key={i} className="confetti-piece"
      style={{
        left: `${5 + i * 8}%`,
        top: "10%",
        width: i % 2 === 0 ? 7 : 5,
        height: i % 2 === 0 ? 5 : 8,
        borderRadius: i % 3 === 0 ? "50%" : "2px",
        background: colors[i % colors.length],
        animationDelay: `${i * 0.055}s`,
      }}
    />
  ));
}

export default function CalendarGrid({ year, month, today, range, onDayClick, accent }) {
  const [confettiDay, setConfettiDay] = useState(null);
  const cells = buildCells(year, month);

  const handleClick = useCallback((date) => {
    onDayClick(date);
    if (isSameDay(date, today)) {
      setConfettiDay(date.getDate());
      setTimeout(() => setConfettiDay(null), 1100);
    }
  }, [onDayClick, today]);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-3">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-[11px] font-black uppercase tracking-widest py-2"
            style={{ color: "#94a3b8" }}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 rounded-xl overflow-hidden"
        style={{ border: "1px solid #e2e8f0", gap: "1px", background: "#e2e8f0" }}>
        {cells.map((date, i) => {
          if (!date) {
            return (
              <div key={i} className="day-cell"
                style={{ minHeight: 72, background: "#f8fafc" }} />
            );
          }

          const isToday   = isSameDay(date, today);
          const isStart   = !!(range.start && isSameDay(date, range.start));
          const isEnd     = !!(range.end   && isSameDay(date, range.end));
          const isIn      = isBetween(date, range.start, range.end);
          const holiday   = getHoliday(date.getMonth(), date.getDate());
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const showConf  = confettiDay === date.getDate() && isToday;

          // Background
          let bg = "#ffffff";
          if (isStart || isEnd) bg = accent;
          else if (isIn)        bg = `${accent}15`;

          // Number color
          let numColor = "#1e293b";
          if (isStart || isEnd) numColor = "#ffffff";
          else if (isToday)     numColor = accent;
          else if (isWeekend)   numColor = accent;

          return (
            <button key={i}
              onClick={() => handleClick(date)}
              aria-label={`${date.toDateString()}${holiday ? ` — ${holiday.label}` : ""}${isToday ? " (Today)" : ""}`}
              aria-pressed={isStart || isEnd}
              className="day-cell relative text-left p-2 md:p-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset overflow-hidden"
              style={{
                minHeight: 72,
                background: bg,
                boxShadow: isToday && !isStart && !isEnd
                  ? `inset 0 0 0 2px ${accent}` : undefined,
              }}
            >
              {/* Today pulse */}
              {isToday && !isStart && !isEnd && (
                <span className="today-pulse" style={{ color: accent }} />
              )}

              {/* Confetti */}
              {showConf && <Confetti accent={accent} />}

              {/* Day number */}
              <span
                className={`relative z-10 block leading-none ${
                  isStart || isEnd ? "text-base font-black"
                  : isToday ? "text-base font-black"
                  : "text-sm font-semibold"
                }`}
                style={{ color: numColor }}
              >
                {date.getDate()}
              </span>

              {/* Today label */}
              {isToday && !isStart && !isEnd && (
                <span className="relative z-10 block text-[9px] font-black uppercase tracking-wider mt-0.5"
                  style={{ color: accent }}>
                  Today
                </span>
              )}

              {/* Range highlight bar */}
              {isIn && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ background: accent }} />
              )}

              {/* Holiday */}
              {holiday && (
                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-0.5 z-10">
                  <span className="text-[11px] leading-none">{holiday.emoji}</span>
                  <span className="hidden xl:block text-[8px] font-semibold truncate"
                    style={{ color: isStart || isEnd ? "rgba(255,255,255,0.9)" : accent }}>
                    {holiday.label}
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              {!isStart && !isEnd && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: `${accent}0c` }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
