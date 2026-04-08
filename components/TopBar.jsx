"use client";

import { useState } from "react";

const INIT_NOTIFS = [
  { id: 1, text: "Team sync at 3pm today", time: "2h ago", dot: "#f59e0b", read: false },
  { id: 2, text: "Q4 report due Friday",   time: "5h ago", dot: "#ef4444", read: false },
  { id: 3, text: "Studio booked for 22nd", time: "1d ago", dot: "#22c55e", read: true  },
];

export default function TopBar({ onSearch, searchQuery, accent, onNewEvent, onToggleDark, isDark, activeNav, onNavChange }) {
  const [showNotif, setShowNotif]       = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [notifs, setNotifs]             = useState(INIT_NOTIFS);

  const unread = notifs.filter(n => !n.read).length;
  const markRead  = id  => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAll   = ()  => setNotifs(p => p.map(n => ({ ...n, read: true })));
  const clearAll  = ()  => { setNotifs([]); setShowNotif(false); };

  const closeAll = () => { setShowNotif(false); setShowSettings(false); setShowShortcuts(false); };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 gap-4"
        style={{ background: isDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`, boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }}>

        {/* Brand + nav */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <span className="font-black tracking-tight text-base sm:text-lg whitespace-nowrap"
              style={{ color: isDark ? "#f1f5f9" : "#1e293b" }}>
              Interactive Calendar
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {["Calendar","Insights","Archive"].map(label => (
              <button key={label} onClick={() => onNavChange(label)}
                className="press px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: (activeNav || "Calendar") === label ? `${accent}18` : "transparent",
                  color: (activeNav || "Calendar") === label ? accent : isDark ? "#94a3b8" : "#64748b",
                  border: "none", cursor: "pointer", fontWeight: (activeNav || "Calendar") === label ? 700 : 500,
                }}>
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search */}
          <div className="relative hidden sm:block">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
              style={{ color: searchQuery ? accent : "#94a3b8" }}
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input value={searchQuery} onChange={e => onSearch(e.target.value)}
              placeholder="Search notes..." type="text" aria-label="Search notes"
              className="pl-9 pr-8 py-2 rounded-full text-sm outline-none w-40 lg:w-48 transition-all"
              style={{ background: isDark ? "#1e293b" : "#f1f5f9", border: `1.5px solid ${searchQuery ? accent : "transparent"}`, color: isDark ? "#f1f5f9" : "#1e293b" }}
            />
            {searchQuery && (
              <button onClick={() => onSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => { setShowNotif(v => !v); setShowSettings(false); setShowShortcuts(false); }}
              className="press relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
              style={{ background: "none", border: "none", cursor: "pointer" }} aria-label="Notifications">
              <svg className="w-5 h-5" style={{ color: isDark ? "#94a3b8" : "#64748b" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center"
                  style={{ fontSize: 9, fontWeight: 800, border: "2px solid white" }}>
                  {unread}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="slide-in absolute right-0 top-11 w-80 rounded-2xl overflow-hidden z-50"
                style={{ background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.14)", border: "1px solid #f1f5f9" }}>
                <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <span className="text-sm font-black text-slate-800">
                    Notifications
                    {unread > 0 && <span className="text-xs font-bold text-red-500 ml-1">({unread} new)</span>}
                  </span>
                  <div className="flex items-center gap-2">
                    {unread > 0 && (
                      <button onClick={markAll} className="text-xs font-semibold"
                        style={{ color: accent, background: "none", border: "none", cursor: "pointer" }}>
                        Mark all read
                      </button>
                    )}
                    <button onClick={() => setShowNotif(false)}
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 text-xs"
                      style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
                  </div>
                </div>
                {notifs.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-slate-400">All caught up! 🎉</div>
                ) : notifs.map(n => (
                  <div key={n.id} onClick={() => markRead(n.id)}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer"
                    style={{ background: n.read ? "transparent" : `${accent}06` }}>
                    <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.dot }} />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-700">{n.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: accent }} />}
                  </div>
                ))}
                {notifs.length > 0 && (
                  <div className="px-4 py-2.5" style={{ borderTop: "1px solid #f1f5f9" }}>
                    <button onClick={clearAll}
                      className="w-full text-xs font-bold py-2 rounded-xl hover:bg-slate-50 transition-colors"
                      style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative">
            <button onClick={() => { setShowSettings(v => !v); setShowNotif(false); setShowShortcuts(false); }}
              className="press w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
              style={{ background: showSettings ? "#f1f5f9" : "none", border: "none", cursor: "pointer" }} aria-label="Settings">
              <svg className="w-5 h-5" style={{ color: showSettings ? accent : isDark ? "#94a3b8" : "#64748b" }}
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>

            {showSettings && (
              <div className="slide-in absolute right-0 top-11 w-60 rounded-2xl overflow-hidden z-50"
                style={{ background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.14)", border: "1px solid #f1f5f9" }}>
                <div className="px-4 py-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <p className="text-sm font-black text-slate-800">Settings</p>
                </div>

                {/* Dark mode toggle */}
                <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    <span className="text-sm font-medium text-slate-700">Dark Mode</span>
                  </div>
                  <button onClick={() => { onToggleDark(); }}
                    className="press relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
                    style={{ background: isDark ? accent : "#e2e8f0", border: "none", cursor: "pointer" }}>
                    <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                      style={{ left: isDark ? "calc(100% - 22px)" : "2px" }} />
                  </button>
                </div>

                {/* Keyboard shortcuts */}
                <button onClick={() => { setShowShortcuts(true); setShowSettings(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                  style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 2l-4 5-4-5"/>
                  </svg>
                  <span className="text-sm font-medium text-slate-700">Keyboard Shortcuts</span>
                </button>

                {/* New event */}
                <button onClick={() => { onNewEvent(); setShowSettings(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                  style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  <span className="text-sm font-medium text-slate-700">New Note</span>
                </button>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="press w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black cursor-pointer select-none flex-shrink-0"
            style={{ background: accent, boxShadow: `0 2px 8px ${accent}55` }}>
            IC
          </div>
        </div>
      </header>

      {/* Keyboard shortcuts modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}
          onClick={e => e.target === e.currentTarget && setShowShortcuts(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-slate-800">Keyboard Shortcuts</h2>
              <button onClick={() => setShowShortcuts(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400"
                style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
            </div>
            <div className="space-y-2">
              {[
                ["←  /  →", "Navigate months"],
                ["T", "Jump to today"],
                ["N", "New note"],
                ["Y", "Toggle year view"],
                ["Esc", "Close modals"],
              ].map(([key, desc]) => (
                <div key={key} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <span className="text-sm text-slate-600">{desc}</span>
                  <kbd className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold"
                    style={{ background: "#f1f5f9", color: accent, border: `1px solid ${accent}30` }}>
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {(showNotif || showSettings) && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}
    </>
  );
}
