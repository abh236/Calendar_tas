"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import BentoCards from "./BentoCards";
import MiniMonthPreview from "./MiniMonthPreview";
import InsightsView from "./InsightsView";
import ArchiveView from "./ArchiveView";
import { MONTH_NAMES, MONTH_CONFIG, storageKey } from "@/lib/calendarData";

const TODAY = new Date();

export default function StudioPlanner() {
  const [currentDate, setCurrentDate]   = useState(() => new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));
  const [range, setRange]               = useState({ start: null, end: null });
  const [notes, setNotes]               = useState([]);
  const [animating, setAnimating]       = useState(false);
  const [visible, setVisible]           = useState(true);
  const [searchQuery, setSearchQuery]   = useState("");
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newEventText, setNewEventText] = useState("");
  const [showYearView, setShowYearView] = useState(false);
  const [isDark, setIsDark]             = useState(false);
  const [activeNav, setActiveNav]       = useState("Calendar");

  const month  = currentDate.getMonth();
  const year   = currentDate.getFullYear();
  const config = MONTH_CONFIG[month];
  const key    = storageKey(year, month);
  const prevKey = useRef(null);

  useEffect(() => {
    document.body.style.background = isDark ? "#0f172a" : config.bg;
  }, [config.bg, isDark]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      setNotes(saved ? JSON.parse(saved) : []);
    } catch { setNotes([]); }
  }, [key]);

  useEffect(() => {
    if (prevKey.current !== key) { prevKey.current = key; return; }
    try { localStorage.setItem(key, JSON.stringify(notes)); } catch {}
  }, [notes, key]);

  useEffect(() => {
    const h = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft")  navigate("prev");
      if (e.key === "t" || e.key === "T") jumpToToday();
      if (e.key === "n" || e.key === "N") setShowNewEvent(true);
      if (e.key === "y" || e.key === "Y") setShowYearView(v => !v);
      if (e.key === "Escape") { setShowNewEvent(false); setShowYearView(false); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const navigate = useCallback((dir) => {
    if (animating) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setCurrentDate(prev => {
        const d = new Date(prev);
        d.setMonth(d.getMonth() + (dir === "next" ? 1 : -1));
        return d;
      });
      setRange({ start: null, end: null });
      setVisible(true);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const jumpToToday = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setCurrentDate(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));
      setRange({ start: null, end: null });
      setVisible(true);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const handleDayClick = useCallback((date) => {
    setRange(prev => {
      if (!prev.start || (prev.start && prev.end)) return { start: date, end: null };
      if (date < prev.start) return { start: date, end: prev.start };
      return { start: prev.start, end: date };
    });
  }, []);

  const handleAddEvent = () => {
    const text = newEventText.trim();
    if (!text) return;
    setNotes(prev => [...prev, { id: crypto.randomUUID(), text }]);
    setNewEventText("");
    setShowNewEvent(false);
  };

  const jumpToMonth = (y, m) => {
    setActiveNav("Calendar");
    setVisible(false);
    setTimeout(() => {
      setCurrentDate(new Date(y, m, 1));
      setRange({ start: null, end: null });
      setVisible(true);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: isDark ? "#0f172a" : config.bg, transition: "background 0.6s ease" }}>

      <TopBar
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        accent={config.accent}
        onNewEvent={() => setShowNewEvent(true)}
        onToggleDark={() => setIsDark(v => !v)}
        isDark={isDark}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />

      <div className="flex flex-1 pt-16">
        <SideBar
          accent={config.accent}
          month={MONTH_NAMES[month]}
          year={year}
          onPrev={() => navigate("prev")}
          onNext={() => navigate("next")}
          onToday={jumpToToday}
          mood={config.mood}
          onNewEvent={() => setShowNewEvent(true)}
        />

        <main className="flex-1 min-w-0 overflow-y-auto pb-24 lg:pb-10">

          {activeNav === "Insights" && <InsightsView accent={config.accent} />}

          {activeNav === "Archive" && (
            <ArchiveView accent={config.accent} onJumpToMonth={jumpToMonth} />
          )}

          {activeNav === "Calendar" && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

              {/* Controls row */}
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={() => setShowYearView(v => !v)}
                  className="press text-xs font-bold px-4 py-2 rounded-full border-2 transition-all"
                  style={{ borderColor: config.accent, color: showYearView ? "#fff" : config.accent, background: showYearView ? config.accent : "rgba(255,255,255,0.9)" }}
                >
                  {showYearView ? "✕ Hide Year View" : "📅 Year View"}
                </button>
                <div className="hidden lg:flex items-center gap-4">
                  {[["←/→","Navigate"],["T","Today"],["N","New note"],["Y","Year"]].map(([k, lbl]) => (
                    <span key={k} className="flex items-center gap-1 text-xs" style={{ color: "#94a3b8" }}>
                      <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: "#fff", border: "1px solid #e2e8f0" }}>{k}</kbd>
                      {lbl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Year view */}
              {showYearView && (
                <div className="mb-6 bg-white rounded-2xl paper-shadow p-4 overflow-x-auto">
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#94a3b8" }}>
                    {year} — tap any month to jump
                  </p>
                  <div className="flex gap-2" style={{ minWidth: "max-content" }}>
                    {MONTH_NAMES.map((name, m) => (
                      <MiniMonthPreview key={m} monthIndex={m} monthName={name} year={year}
                        today={TODAY} accent={MONTH_CONFIG[m].accent} isActive={m === month}
                        onClick={() => {
                          if (m === month) return;
                          setVisible(false);
                          setTimeout(() => {
                            setCurrentDate(new Date(year, m, 1));
                            setRange({ start: null, end: null });
                            setVisible(true);
                          }, 300);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Spiral binding */}
              <div className="flex justify-center items-end gap-2.5 h-8 relative select-none px-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-5 rounded-t-full"
                  style={{ border: "2.5px solid #64748b", borderBottom: "none" }} />
                {Array.from({ length: 22 }).map((_, i) => (
                  <div key={i} className="spiral-coil" />
                ))}
              </div>

              {/* Calendar card */}
              <div className="rounded-b-2xl overflow-hidden paper-shadow" style={{ background: isDark ? "#1e293b" : "#fff" }}>

                {/* Hero image */}
                <div className="relative">
                  <div className="wave-clip" style={{ height: 240 }}>
                    <img
                      src={config.url}
                      alt={`${MONTH_NAMES[month]} ${year}`}
                      className="w-full h-full object-cover block"
                      loading="lazy"
                      onError={e => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.style.background = `linear-gradient(135deg, ${config.accent}, ${config.accent}55)`;
                      }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))" }} />
                  </div>
                  <div className="absolute bottom-0 right-0 text-right px-6 py-4"
                    style={{ background: `linear-gradient(135deg, transparent 20%, ${config.accent}ee 65%)` }}>
                    <p className="text-white/80 text-xs font-bold tracking-widest uppercase mb-1">{year}</p>
                    <h2 className="text-white font-black tracking-tighter leading-none text-4xl sm:text-5xl">
                      {MONTH_NAMES[month].toUpperCase()}
                    </h2>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white"
                      style={{ background: `${config.accent}dd`, backdropFilter: "blur(8px)" }}>
                      {config.mood}
                    </span>
                  </div>
                  <button onClick={() => navigate("prev")} aria-label="Previous month"
                    className="press absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", border: "none", cursor: "pointer" }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <button onClick={() => navigate("next")} aria-label="Next month"
                    className="press absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", border: "none", cursor: "pointer" }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                </div>

                {/* Notes + Grid */}
                <div className={`flex flex-col md:flex-row ${visible ? "flip-in" : "flip-out"}`}>
                  <div className="w-full md:w-56 lg:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r" style={{ borderColor: "#f1f5f9" }}>
                    <NotesPanel notes={notes} setNotes={setNotes} range={range} accent={config.accent} searchQuery={searchQuery} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <CalendarGrid year={year} month={month} today={TODAY} range={range} onDayClick={handleDayClick} accent={config.accent} />
                    {range.start && (
                      <div className="mx-4 mb-4 px-4 py-2.5 rounded-xl flex items-center justify-between text-white text-xs font-semibold"
                        style={{ background: config.accent }}>
                        <span>
                          {range.end
                            ? `📅 ${range.start.toLocaleDateString(undefined,{month:"short",day:"numeric"})} → ${range.end.toLocaleDateString(undefined,{month:"short",day:"numeric"})}`
                            : `📅 ${range.start.toLocaleDateString(undefined,{month:"short",day:"numeric"})} — pick end date`}
                        </span>
                        <button onClick={() => setRange({ start: null, end: null })}
                          className="press ml-3 font-bold text-white/70 hover:text-white"
                          style={{ background: "none", border: "none", cursor: "pointer" }}>
                          Clear ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <BentoCards accent={config.accent} notes={notes} />
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center gap-2 px-3 py-2"
        style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderTop: "1px solid #e2e8f0" }}>
        <button onClick={() => navigate("prev")} className="press flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "#fff", border: "1.5px solid #e2e8f0", color: "#475569", cursor: "pointer" }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          Prev
        </button>
        <button onClick={jumpToToday} className="press flex-1 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: config.accent, border: "none", cursor: "pointer" }}>
          Today
        </button>
        <button onClick={() => navigate("next")} className="press flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "#fff", border: "1.5px solid #e2e8f0", color: "#475569", cursor: "pointer" }}>
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <button onClick={() => setShowNewEvent(true)} className="press w-11 h-11 rounded-full flex items-center justify-center text-white flex-shrink-0"
          style={{ background: config.accent, border: "none", cursor: "pointer", boxShadow: `0 4px 12px ${config.accent}55` }}
          aria-label="New note">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>

      {/* New Note modal */}
      {showNewEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
          onClick={e => e.target === e.currentTarget && setShowNewEvent(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: config.accent }} />
              <h2 className="text-lg font-black text-slate-800">New Note</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4 pl-5">
              {MONTH_NAMES[month]} {year}
              {range.start && ` · ${range.start.toLocaleDateString(undefined,{month:"short",day:"numeric"})}${range.end ? ` – ${range.end.toLocaleDateString(undefined,{month:"short",day:"numeric"})}` : ""}`}
            </p>
            <input autoFocus type="text" value={newEventText}
              onChange={e => setNewEventText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAddEvent()}
              placeholder="Type your note..."
              className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-4"
              style={{ border: `1.5px solid ${config.accent}`, boxSizing: "border-box" }}
            />
            <div className="flex gap-3">
              <button onClick={handleAddEvent} className="press flex-1 py-2.5 rounded-xl text-white font-bold text-sm"
                style={{ background: config.accent, border: "none", cursor: "pointer" }}>
                Add Note
              </button>
              <button onClick={() => { setShowNewEvent(false); setNewEventText(""); }}
                className="press flex-1 py-2.5 rounded-xl font-bold text-sm"
                style={{ background: "#f1f5f9", color: "#475569", border: "none", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB desktop */}
      <button onClick={() => setShowNewEvent(true)}
        className="press hidden lg:flex fixed bottom-8 right-8 w-14 h-14 rounded-full items-center justify-center text-white z-40"
        style={{ background: config.accent, border: "none", cursor: "pointer", boxShadow: `0 8px 24px ${config.accent}55` }}
        aria-label="New note">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
      </button>
    </div>
  );
}
