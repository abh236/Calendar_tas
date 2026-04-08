"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Design", "Dev", "Marketing", "General"];

const INIT_NOTES = [
  { id: 1, text: "Finalize mood boards for Q4 launch by the 10th.", category: "Design",    done: false },
  { id: 2, text: "Review team schedule with the editorial lead.",   category: "General",   done: false },
  { id: 3, text: "Book studio space for the 22nd.",                 category: "General",   done: true  },
  { id: 4, text: "Coordinate with resource team for equipment.",    category: "General",   done: false },
  { id: 5, text: "Push new landing page to staging.",               category: "Dev",       done: false },
  { id: 6, text: "Write copy for email campaign.",                  category: "Marketing", done: true  },
];

export default function ProjectNotesView({ accent }) {
  const [notes, setNotes]       = useState(INIT_NOTES);
  const [input, setInput]       = useState("");
  const [category, setCategory] = useState("General");
  const [filter, setFilter]     = useState("All");

  const addNote = () => {
    if (!input.trim()) return;
    setNotes(p => [...p, { id: Date.now(), text: input.trim(), category, done: false }]);
    setInput("");
  };

  const toggleDone = id => setNotes(p => p.map(n => n.id === id ? { ...n, done: !n.done } : n));
  const removeNote = id => setNotes(p => p.filter(n => n.id !== id));

  const filtered = filter === "All" ? notes : notes.filter(n => n.category === filter);
  const done     = notes.filter(n => n.done).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Project Notes</h1>
          <p className="text-sm text-slate-400 mt-1">{done}/{notes.length} completed</p>
        </div>
        {/* Progress ring */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke={accent} strokeWidth="3"
              strokeDasharray={`${notes.length > 0 ? Math.round((done/notes.length)*100) : 0} 100`} strokeLinecap="round"/>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-700">
            {notes.length > 0 ? Math.round((done/notes.length)*100) : 0}%
          </span>
        </div>
      </div>

      {/* Add note */}
      <div className="bg-white rounded-2xl p-4 paper-shadow mb-6">
        <div className="flex gap-2 mb-3">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addNote()}
            placeholder="Add a project note..."
            className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none transition-all"
            onFocus={e => e.target.style.borderColor = accent}
            onBlur={e => e.target.style.borderColor = "#e2e8f0"}
          />
          <button onClick={addNote}
            className="press px-4 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0"
            style={{ background: accent, border: "none", cursor: "pointer" }}>
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.filter(c => c !== "All").map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className="press px-3 py-1 rounded-full text-xs font-bold transition-all"
              style={{ background: category === c ? accent : "#f1f5f9", color: category === c ? "#fff" : "#64748b", border: "none", cursor: "pointer" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {CATEGORIES.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="press px-3 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{ background: filter === f ? accent : "#fff", color: filter === f ? "#fff" : "#64748b", border: `1.5px solid ${filter === f ? accent : "#e2e8f0"}`, cursor: "pointer" }}>
            {f}
          </button>
        ))}
      </div>

      {/* Notes list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-8 paper-shadow text-center">
            <p className="text-slate-400 text-sm">No notes in this category.</p>
          </div>
        )}
        {filtered.map(note => (
          <div key={note.id}
            className="bg-white rounded-2xl px-4 py-3 paper-shadow flex items-center gap-3 group transition-all"
            style={{ opacity: note.done ? 0.6 : 1 }}>
            {/* Checkbox */}
            <button onClick={() => toggleDone(note.id)}
              className="press w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
              style={{ background: note.done ? accent : "transparent", borderColor: note.done ? accent : "#cbd5e1", cursor: "pointer" }}>
              {note.done && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              )}
            </button>
            <p className={`flex-1 text-sm text-slate-700 ${note.done ? "line-through text-slate-400" : ""}`}>
              {note.text}
            </p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: `${accent}15`, color: accent }}>
              {note.category}
            </span>
            <button onClick={() => removeNote(note.id)}
              className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all text-xs flex-shrink-0"
              style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
