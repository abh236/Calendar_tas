"use client";

import { MONTH_NAMES, MONTH_CONFIG, storageKey } from "@/lib/calendarData";

const TODAY = new Date();

function Bar({ label, value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 w-8 text-right flex-shrink-0">{label}</span>
      <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-bold text-slate-600 w-6 flex-shrink-0">{value}</span>
    </div>
  );
}

export default function InsightsView({ accent }) {
  // Gather notes from all months in localStorage
  const allMonthsData = MONTH_NAMES.map((name, m) => {
    const key = storageKey(TODAY.getFullYear(), m);
    let count = 0;
    try {
      const saved = localStorage.getItem(key);
      count = saved ? JSON.parse(saved).length : 0;
    } catch {}
    return { name: name.slice(0, 3), month: m, count, accent: MONTH_CONFIG[m].accent };
  });

  const totalNotes   = allMonthsData.reduce((s, d) => s + d.count, 0);
  const maxNotes     = Math.max(...allMonthsData.map(d => d.count), 1);
  const activeMonths = allMonthsData.filter(d => d.count > 0).length;
  const currentMonth = allMonthsData[TODAY.getMonth()];
  const mostActive   = allMonthsData.reduce((a, b) => b.count > a.count ? b : a);

  // Fake productivity data for visual richness
  const weekData = [
    { day: "Mon", tasks: 4 }, { day: "Tue", tasks: 7 }, { day: "Wed", tasks: 5 },
    { day: "Thu", tasks: 9 }, { day: "Fri", tasks: 6 }, { day: "Sat", tasks: 2 }, { day: "Sun", tasks: 1 },
  ];
  const maxTasks = Math.max(...weekData.map(d => d.tasks));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Insights</h1>
        <p className="text-sm text-slate-400 mt-1">Your calendar activity for {TODAY.getFullYear()}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Notes",    value: totalNotes,                  icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" },
          { label: "Active Months",  value: activeMonths,                icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
          { label: "This Month",     value: currentMonth.count,          icon: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" },
          { label: "Most Active",    value: mostActive.count > 0 ? mostActive.name : "—", icon: "M18 20V10M12 20V4M6 20v-6", isText: true },
        ].map(({ label, value, icon, isText }) => (
          <div key={label} className="bg-white rounded-2xl p-4 paper-shadow">
            <svg className="w-5 h-5 mb-3" style={{ color: accent }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d={icon}/>
            </svg>
            <p className={`font-black tracking-tight text-slate-800 ${isText ? "text-lg" : "text-3xl"}`}>{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Notes per month bar chart */}
        <div className="bg-white rounded-2xl p-5 paper-shadow">
          <h3 className="text-sm font-black text-slate-700 mb-4">Notes per Month</h3>
          {totalNotes === 0 ? (
            <p className="text-sm text-slate-400 italic">No notes yet. Start adding memos to see insights.</p>
          ) : (
            <div className="space-y-2.5">
              {allMonthsData.map(d => (
                <Bar key={d.month} label={d.name} value={d.count} max={maxNotes} color={d.accent} />
              ))}
            </div>
          )}
        </div>

        {/* Weekly activity */}
        <div className="bg-white rounded-2xl p-5 paper-shadow">
          <h3 className="text-sm font-black text-slate-700 mb-4">Weekly Activity (sample)</h3>
          <div className="flex items-end gap-2 h-32">
            {weekData.map(({ day, tasks }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg transition-all duration-500"
                  style={{ height: `${(tasks / maxTasks) * 100}%`, background: accent, opacity: 0.7 + (tasks / maxTasks) * 0.3 }} />
                <span className="text-[9px] font-bold text-slate-400">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productivity ring */}
      <div className="bg-white rounded-2xl p-5 paper-shadow flex items-center gap-6">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke={accent} strokeWidth="3"
              strokeDasharray="82 100" strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-800">82%</span>
        </div>
        <div>
          <p className="text-lg font-black text-slate-800">82% Productivity</p>
          <p className="text-sm text-slate-400 mt-0.5">Target met this month</p>
          <div className="flex gap-3 mt-3">
            {[["Completed","18","#22c55e"],["Pending","4","#f59e0b"],["Overdue","2","#ef4444"]].map(([l,v,c]) => (
              <div key={l}>
                <p className="text-base font-black" style={{ color: c }}>{v}</p>
                <p className="text-[10px] text-slate-400">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
