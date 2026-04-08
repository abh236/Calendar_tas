"use client";

import { useState, useId } from "react";

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-zinc-800 rounded-sm px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function NotesPanel({ notes, setNotes, range, accent, searchQuery }) {
  const [input, setInput] = useState("");
  const inputId = useId();

  const addNote = () => {
    const text = input.trim();
    if (!text) return;
    setNotes(prev => [...prev, { id: crypto.randomUUID(), text }]);
    setInput("");
  };

  const removeNote = id => setNotes(prev => prev.filter(n => n.id !== id));

  const fmt = d => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const rangeLabel = range.start
    ? range.end ? `${fmt(range.start)} – ${fmt(range.end)}` : fmt(range.start)
    : null;

  const filtered = searchQuery
    ? notes.filter(n => n.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

  return (
    <div className="flex flex-col h-full p-5 md:p-7" style={{ minHeight: 380 }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-black tracking-widest uppercase text-slate-500">Notes</h3>
          {notes.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: accent }}>
              {notes.length}
            </span>
          )}
        </div>
        <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z"/>
        </svg>
      </div>

      {/* Range badge */}
      {rangeLabel && (
        <div className="mb-3 self-start inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full text-white shadow-sm"
          style={{ background: accent }}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          {rangeLabel}
        </div>
      )}

      {/* Search banner */}
      {searchQuery && (
        <div className="mb-3 px-3 py-2 rounded-lg flex items-center justify-between"
          style={{ background: `${accent}12`, border: `1px solid ${accent}30` }}>
          <span className="text-[11px] font-semibold" style={{ color: accent }}>
            "{searchQuery}"
          </span>
          <span className="text-[10px] text-slate-400">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <label htmlFor={inputId} className="sr-only">New note</label>
        <input
          id={inputId}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addNote()}
          placeholder="Add a memo..."
          className="flex-1 text-sm border rounded-xl px-3 py-2.5 outline-none transition-all"
          style={{
            borderColor: "#e2e8f0",
            background: "#f8fafc",
          }}
          onFocus={e => { e.target.style.borderColor = accent; e.target.style.background = "#fff"; }}
          onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.background = "#f8fafc"; }}
        />
        <button onClick={addNote} aria-label="Add note"
          className="btn-press w-10 h-10 flex items-center justify-center rounded-xl text-white font-bold text-xl flex-shrink-0 shadow-sm hover:opacity-90 transition-opacity"
          style={{ background: accent }}>
          +
        </button>
      </div>

      {/* Ruled notes list */}
      <div className="ruled-lines flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="flex items-center gap-2 mt-2 text-sm font-semibold" style={{ color: `${accent}99` }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Add a new memo...
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-slate-400 italic mt-2">No match for "{searchQuery}"</p>
        ) : (
          <div className="text-sm text-slate-600 font-medium">
            {filtered.map(note => (
              <div key={note.id} className="flex items-start gap-1.5 group min-h-[2.5rem] py-0.5">
                <span className="flex-1 break-words leading-10">
                  • {highlight(note.text, searchQuery)}
                </span>
                <button onClick={() => removeNote(note.id)}
                  aria-label={`Remove: ${note.text}`}
                  className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all text-xs mt-2.5 flex-shrink-0">
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-5 border-t border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}15` }}>
            <svg className="w-5 h-5" style={{ color: accent }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 20V10M12 20V4M6 20v-6"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Productivity</p>
            <p className="text-sm font-black text-slate-800">82% Target Met</p>
          </div>
        </div>
        <button
          onClick={() => {
            if (notes.length === 0) { alert("No notes to export yet. Add some memos first!"); return; }
            const content = notes.map((n, i) => `${i + 1}. ${n.text}`).join("\n");
            const blob = new Blob([`Monthly Notes Report\n${"=".repeat(30)}\n\n${content}\n\nTotal: ${notes.length} memo${notes.length !== 1 ? "s" : ""}`], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "notes-report.txt"; a.click();
            URL.revokeObjectURL(url);
          }}
          className="btn-press w-full py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-700 transition-colors"
          style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}>
          Download Full Report
        </button>
      </div>
    </div>
  );
}
