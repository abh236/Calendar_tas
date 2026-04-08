"use client";

import { useState } from "react";

const NAV = [
  { label: "Month View",    d: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
  { label: "Team Schedule", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
  { label: "Resources",     d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
  { label: "Project Notes", d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" },
];

function SideContent({ accent, month, year, onPrev, onNext, onToday, mood, onNewEvent, onClose, sideView, onSideView }) {
  const go = (label) => { onSideView(label); if (onClose) onClose(); };

  return (
    <div className="flex flex-col gap-2 h-full p-4">
      <div className="px-3 py-3">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accent }}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
          </div>
          <span className="text-base font-black text-slate-800 tracking-tight">Editorial Wall</span>
        </div>
        <p className="text-xs font-medium text-slate-400 pl-11 uppercase tracking-widest">{month} {year}</p>
      </div>

      {mood && (
        <div className="mx-3 px-3 py-2 rounded-xl text-xs font-semibold text-white text-center" style={{ background: accent }}>
          {mood}
        </div>
      )}

      <nav className="space-y-0.5">
        {NAV.map(({ label, d }) => {
          const active = sideView === label;
          return (
            <button key={label} onClick={() => go(label)}
              className="nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left"
              style={{ background: active ? "#fff" : "transparent", color: active ? "#1e40af" : "#64748b", boxShadow: active ? "0 1px 4px rgba(0,0,0,0.06)" : "none", border: "none", cursor: "pointer" }}>
              <svg className="w-4 h-4 flex-shrink-0" style={{ color: active ? accent : "#94a3b8" }}
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={d}/></svg>
              {label}
              {active && <svg className="w-3.5 h-3.5 ml-auto" style={{ color: accent }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>}
            </button>
          );
        })}
      </nav>

      <button onClick={() => { onNewEvent(); if (onClose) onClose(); }}
        className="press mx-2 py-3 px-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, border: "none", cursor: "pointer", boxShadow: `0 4px 12px ${accent}44` }}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        New Event
      </button>

      <div className="px-3">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Navigate</p>
        <div className="flex gap-2 mb-2">
          <button onClick={() => { onPrev(); if (onClose) onClose(); }}
            className="press flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold"
            style={{ background: "#fff", border: "1.5px solid #e2e8f0", color: "#475569", cursor: "pointer" }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>Prev
          </button>
          <button onClick={() => { onNext(); if (onClose) onClose(); }}
            className="press flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold"
            style={{ background: "#fff", border: "1.5px solid #e2e8f0", color: "#475569", cursor: "pointer" }}>
            Next<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
        <button onClick={() => { onToday(); if (onClose) onClose(); }}
          className="press w-full py-2 rounded-xl text-xs font-bold text-white"
          style={{ background: accent, border: "none", cursor: "pointer" }}>Jump to Today</button>
      </div>

      {sideView === "Month View" && (
        <div className="px-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Legend</p>
          <div className="space-y-1.5">
            {[
              { bg: "transparent", border: `2px solid ${accent}`, label: "Today" },
              { bg: accent,        border: "none",                 label: "Range start / end" },
              { bg: `${accent}30`, border: "none",                 label: "Days in range" },
              { bg: "#f87171",     border: "none",                 label: "Holiday" },
            ].map(({ bg, border, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs" style={{ color: "#64748b" }}>
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: bg, border }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto pt-3" style={{ borderTop: "1px solid #e2e8f0" }}>
        <a href="mailto:support@interactivecalendar.app"
          className="nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{ color: "#64748b", textDecoration: "none", display: "flex" }}>
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/><circle cx="12" cy="12" r="10"/>
          </svg>Support
        </a>
        <button
          onClick={() => { if (window.confirm("Sign out?")) { document.body.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;flex-direction:column;gap:16px;background:#f8fafc"><div style="font-size:48px">👋</div><p style="font-size:18px;font-weight:700;color:#1e293b">Signed out</p><button onclick="location.reload()" style="padding:10px 24px;background:#0ea5e9;color:white;border:none;border-radius:12px;font-weight:700;cursor:pointer">Sign back in</button></div>`; } }}
          className="nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>
          <svg className="w-4 h-4" style={{ color: "#f87171" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>Sign Out
        </button>
      </div>
    </div>
  );
}

export default function SideBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 overflow-y-auto"
        style={{ background: "#f8fafc", borderRight: "1px solid #e2e8f0", height: "calc(100vh - 64px)", position: "sticky", top: 64 }}>
        <SideContent {...props} />
      </aside>

      {/* Mobile trigger */}
      <button onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed left-4 bottom-20 z-40 w-10 h-10 rounded-full flex items-center justify-center text-white press"
        style={{ background: props.accent, border: "none", cursor: "pointer", boxShadow: `0 4px 16px ${props.accent}66` }}
        aria-label="Open menu">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto slide-in-right"
            style={{ background: "#f8fafc", boxShadow: "4px 0 24px rgba(0,0,0,0.15)" }}>
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <span className="text-sm font-black text-slate-600 uppercase tracking-widest">Menu</span>
              <button onClick={() => setMobileOpen(false)}
                className="press w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500"
                style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
            </div>
            <SideContent {...props} onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
