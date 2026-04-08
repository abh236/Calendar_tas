"use client";

import { useState } from "react";

const INIT_RESOURCES = [
  { id: 1, name: "Studio A",      type: "Room",      available: true,  capacity: 10, booked: "—" },
  { id: 2, name: "Camera Kit",    type: "Equipment", available: false, capacity: 1,  booked: "Sara Kim" },
  { id: 3, name: "Edit Suite",    type: "Room",      available: true,  capacity: 4,  booked: "—" },
  { id: 4, name: "Drone Set",     type: "Equipment", available: true,  capacity: 1,  booked: "—" },
  { id: 5, name: "Conference Rm", type: "Room",      available: false, capacity: 20, booked: "Mike Torres" },
  { id: 6, name: "Lighting Rig",  type: "Equipment", available: true,  capacity: 1,  booked: "—" },
];

export default function ResourcesView({ accent }) {
  const [resources, setResources] = useState(INIT_RESOURCES);
  const [filter, setFilter]       = useState("All");

  const toggle = (id) => setResources(p =>
    p.map(r => r.id === id ? { ...r, available: !r.available, booked: r.available ? "You" : "—" } : r)
  );

  const filtered = filter === "All" ? resources : resources.filter(r => r.type === filter);
  const free   = resources.filter(r => r.available).length;
  const booked = resources.filter(r => !r.available).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Resources</h1>
        <p className="text-sm text-slate-400 mt-1">{free} available · {booked} booked</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 paper-shadow flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#dcfce7" }}>
            <svg className="w-5 h-5" style={{ color: "#16a34a" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">{free}</p>
            <p className="text-xs text-slate-400">Available</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 paper-shadow flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fee2e2" }}>
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">{booked}</p>
            <p className="text-xs text-slate-400">Booked</p>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {["All","Room","Equipment"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="press px-4 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: filter === f ? accent : "#fff",
              color: filter === f ? "#fff" : "#64748b",
              border: `1.5px solid ${filter === f ? accent : "#e2e8f0"}`,
              cursor: "pointer",
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Resource list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white rounded-2xl p-4 paper-shadow flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: r.available ? "#dcfce7" : "#fee2e2" }}>
              {r.type === "Room"
                ? <svg className="w-5 h-5" style={{ color: r.available ? "#16a34a" : "#dc2626" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                : <svg className="w-5 h-5" style={{ color: r.available ? "#16a34a" : "#dc2626" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 2l-4 5-4-5"/></svg>
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-slate-800">{r.name}</p>
              <p className="text-xs text-slate-400">{r.type} · Cap: {r.capacity}</p>
              {!r.available && <p className="text-[10px] text-red-400 font-semibold mt-0.5">Booked by {r.booked}</p>}
            </div>
            <button onClick={() => toggle(r.id)}
              className="press flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={{
                background: r.available ? accent : "#f1f5f9",
                color: r.available ? "#fff" : "#64748b",
                border: "none", cursor: "pointer",
              }}>
              {r.available ? "Book" : "Release"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
