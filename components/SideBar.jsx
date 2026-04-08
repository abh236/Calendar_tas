"use client";

import { useState } from "react";

const NAV = [
  { label: "Month View",    d: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
  { label: "Team Schedule", d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
  { label: "Resources",     d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
  { label: "Project Notes", d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" },
];

const TEAM = [
  { name: "Alex Chen",   role: "Designer",  color: "#f59e0b", status: "online"  },
  { name: "Sara Kim",    role: "Developer", color: "#10b981", status: "online"  },
  { name: "Mike Torres", role: "PM",        color: "#6366f1", status: "away"    },
  { name: "Priya Nair",  role: "Marketing", color: "#ef4444", status: "offline" },
];

const RESOURCES = [
  { name: "Studio A",   type: "Room",      available: true  },
  { name: "Camera Kit", type: "Equipment", available: false },
  { name: "Edit Suite", type: "Room",      available: true  },
  { name: "Drone Set",  type: "Equipment", available: true  },
];

export default function SideBar({ accent, month, year, onPrev, onNext, onToday, mood, onNewEvent }) {
  const [activeNav, setActiveNav]       = useState("Month View");
  const [projectNote, setProjectNote]   = useState("");
  const [projectNotes, setProjectNotes] = useState([
    "Finalize mood boards by the 10th.",
    "Review team schedule with editorial lead.",
  ]);

  const addProjectNote = () => {
    if (!projectNote.trim()) return;
    setProjectNotes(p => [...p, projectNote.trim()]);
    setProjectNote("");
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 overflow-y-auto"
      style={{ background: "#f8fafc", borderRight: "1px solid #e2e8f0", height: "calc(100vh - 64px)", position: "sticky", top: 64 }}>
      <div className="p-4 flex flex-col gap-2 h-full">

        {/* Brand */}
        <div className="px-3 py-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: accent }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <span className="text-base font-black text-slate-800 tracking-tight">Editorial Wall</span>
          </div>
          <p className="text-xs font-medium text-slate-400 pl-11 uppercase tracking-widest">{month} {year}</p>
        </div>

        {/* Mood */}
        {mood && (
          <div className="mx-3 mb-1 px-3 py-2 rounded-xl text-xs font-semibold text-white text-center" style={{ background: accent }}>
            {mood}
          </div>
        )}

        {/* Nav tabs */}
        <nav className="space-y-0.5">
          {NAV.map(({ label, d }) => {
            const isActive = activeNav === label;
            return (
              <button key={label} onClick={() => setActiveNav(label)}
                className="nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left"
                style={{ background: isActive ? "#fff" : "transparent", color: isActive ? "#1e40af" : "#64748b", boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.06)" : "none", border: "none", cursor: "pointer" }}>
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? accent : "#94a3b8" }}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d={d}/>
                </svg>
                {label}
              </button>
            );
          })}
        </nav>

        {/* Dynamic content panel */}
        <div className="flex-1 overflow-y-auto mt-1 min-h-0">

          {activeNav === "Team Schedule" && (
            <div className="px-2 py-2">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 px-2">Team Status</p>
              <div className="space-y-1">
                {TEAM.map(m => (
                  <div key={m.name} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white transition-colors cursor-pointer">
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: m.color }}>
                        {m.name[0]}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                        style={{ background: m.status === "online" ? "#22c55e" : m.status === "away" ? "#f59e0b" : "#94a3b8" }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.role} · {m.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === "Resources" && (
            <div className="px-2 py-2">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 px-2">Resources</p>
              <div className="space-y-2">
                {RESOURCES.map(r => (
                  <div key={r.name} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-100">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{r.name}</p>
                      <p className="text-[10px] text-slate-400">{r.type}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: r.available ? "#dcfce7" : "#fee2e2", color: r.available ? "#16a34a" : "#dc2626" }}>
                      {r.available ? "Free" : "Booked"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === "Project Notes" && (
            <div className="px-2 py-2">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 px-2">Project Notes</p>
              <div className="flex gap-1.5 mb-3">
                <input value={projectNote} onChange={e => setProjectNote(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addProjectNote()}
                  placeholder="Add note..."
                  className="flex-1 text-xs rounded-lg px-2.5 py-2 outline-none"
                  style={{ border: `1.5px solid ${accent}`, background: "#fff" }}
                />
                <button onClick={addProjectNote}
                  className="press w-8 h-8 flex items-center justify-center rounded-lg text-white font-bold flex-shrink-0"
                  style={{ background: accent, border: "none", cursor: "pointer" }}>+</button>
              </div>
              <div className="space-y-1.5">
                {projectNotes.map((n, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white border border-slate-100 group">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: accent }} />
                    <p className="text-xs text-slate-600 flex-1">{n}</p>
                    <button onClick={() => setProjectNotes(p => p.filter((_, j) => j !== i))}
                      className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 text-[10px] flex-shrink-0"
                      style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* New Event CTA */}
        <button onClick={onNewEvent}
          className="press mx-2 py-3 px-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 text-white"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, border: "none", cursor: "pointer", boxShadow: `0 4px 12px ${accent}44` }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          New Event
        </button>

        {/* Navigate */}
        <div className="px-3 mt-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Navigate</p>
          <div className="flex gap-2 mb-2">
            <button onClick={onPrev} className="press flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold"
              style={{ background: "#fff", border: "1.5px solid #e2e8f0", color: "#475569", cursor: "pointer" }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
              Prev
            </button>
            <button onClick={onNext} className="press flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold"
              style={{ background: "#fff", border: "1.5px solid #e2e8f0", color: "#475569", cursor: "pointer" }}>
              Next
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <button onClick={onToday} className="press w-full py-2 rounded-xl text-xs font-bold text-white"
            style={{ background: accent, border: "none", cursor: "pointer" }}>
            Jump to Today
          </button>
        </div>

        {/* Legend */}
        {activeNav === "Month View" && (
          <div className="px-3 mt-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Legend</p>
            <div className="space-y-1.5">
              {[
                { bg: "transparent", border: `2px solid ${accent}`, label: "Today" },
                { bg: accent, border: "none", label: "Range start / end" },
                { bg: `${accent}30`, border: "none", label: "Days in range" },
                { bg: "#f87171", border: "none", label: "Holiday" },
              ].map(({ bg, border, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs" style={{ color: "#64748b" }}>
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: bg, border }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3" style={{ borderTop: "1px solid #e2e8f0" }}>
          <a href="mailto:support@interactivecalendar.app"
            className="nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{ color: "#64748b", textDecoration: "none", display: "flex" }}>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            Support
          </a>
          <button
            onClick={() => {
              if (window.confirm("Sign out of Interactive Calendar?")) {
                document.body.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;flex-direction:column;gap:16px;background:#f8fafc"><div style="font-size:48px">👋</div><p style="font-size:18px;font-weight:700;color:#1e293b">Signed out successfully</p><button onclick="location.reload()" style="padding:10px 24px;background:#0ea5e9;color:white;border:none;border-radius:12px;font-weight:700;cursor:pointer;font-size:14px">Sign back in</button></div>`;
              }
            }}
            className="nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium"
            style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}>
            <svg className="w-4 h-4" style={{ color: "#f87171" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
