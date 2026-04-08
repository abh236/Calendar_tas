"use client";

import { useState } from "react";
import { MONTH_NAMES, MONTH_CONFIG, storageKey } from "@/lib/calendarData";

const TODAY = new Date();
const YEARS = [TODAY.getFullYear(), TODAY.getFullYear() - 1];

export default function ArchiveView({ accent, onJumpToMonth }) {
  const [selectedYear, setSelectedYear] = useState(TODAY.getFullYear());
  const [expandedMonth, setExpandedMonth] = useState(null);

  // Load notes for every month of the selected year
  const months = MONTH_NAMES.map((name, m) => {
    const key = storageKey(selectedYear, m);
    let notes = [];
    try {
      const saved = localStorage.getItem(key);
      notes = saved ? JSON.parse(saved) : [];
    } catch {}
    return { name, month: m, notes, accent: MONTH_CONFIG[m].accent, mood: MONTH_CONFIG[m].mood };
  });

  const totalNotes = months.reduce((s, m) => s + m.notes.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Archive</h1>
          <p className="text-sm text-slate-400 mt-1">{totalNotes} note{totalNotes !== 1 ? "s" : ""} across {months.filter(m => m.notes.length > 0).length} months</p>
        </div>
        {/* Year switcher */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#f1f5f9" }}>
          {YEARS.map(y => (
            <button key={y} onClick={() => { setSelectedYear(y); setExpandedMonth(null); }}
              className="press px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
              style={{
                background: selectedYear === y ? "#fff" : "transparent",
                color: selectedYear === y ? accent : "#64748b",
                border: "none", cursor: "pointer",
                boxShadow: selectedYear === y ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}>
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map(({ name, month, notes, accent: mAccent, mood }) => {
          const isExpanded = expandedMonth === month;
          const isCurrent  = selectedYear === TODAY.getFullYear() && month === TODAY.getMonth();

          return (
            <div key={month}
              className="bg-white rounded-2xl overflow-hidden paper-shadow transition-all"
              style={{ border: isCurrent ? `2px solid ${mAccent}` : "2px solid transparent" }}>

              {/* Month header */}
              <button
                onClick={() => setExpandedMonth(isExpanded ? null : month)}
                className="w-full flex items-center justify-between p-4 text-left"
                style={{ background: "none", border: "none", cursor: "pointer" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                    style={{ background: mAccent }}>
                    {name.slice(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                      {name}
                      {isCurrent && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: mAccent }}>Now</span>}
                    </p>
                    <p className="text-[10px] text-slate-400">{mood}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: notes.length > 0 ? `${mAccent}18` : "#f1f5f9", color: notes.length > 0 ? mAccent : "#94a3b8" }}>
                    {notes.length} note{notes.length !== 1 ? "s" : ""}
                  </span>
                  <svg className="w-4 h-4 text-slate-400 transition-transform"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </button>

              {/* Expanded notes */}
              {isExpanded && (
                <div className="px-4 pb-4" style={{ borderTop: "1px solid #f1f5f9" }}>
                  {notes.length === 0 ? (
                    <p className="text-xs text-slate-400 italic pt-3">No notes for this month.</p>
                  ) : (
                    <ul className="pt-3 space-y-1.5">
                      {notes.map((note, i) => (
                        <li key={note.id || i} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: mAccent }} />
                          {note.text}
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Jump to this month */}
                  <button
                    onClick={() => onJumpToMonth(selectedYear, month)}
                    className="press mt-3 w-full py-2 rounded-xl text-xs font-bold text-white"
                    style={{ background: mAccent, border: "none", cursor: "pointer" }}>
                    Go to {name} →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {totalNotes === 0 && (
        <div className="mt-8 text-center py-16 bg-white rounded-2xl paper-shadow">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-lg font-black text-slate-700">No notes archived yet</p>
          <p className="text-sm text-slate-400 mt-1">Add memos on the Calendar tab to see them here.</p>
        </div>
      )}
    </div>
  );
}
