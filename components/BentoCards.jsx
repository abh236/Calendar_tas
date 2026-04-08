"use client";

export default function BentoCards({ accent, notes = [] }) {
  const handleSessions = () => alert("24 sessions scheduled this month.\n\nClick any day on the calendar to start selecting a date range for your sessions.");
  const handleMilestone = () => alert("🌟 Key Milestone: Annual Studio Showcase\n\nThis is your biggest event of the year. Make sure all team members are prepared!");
  const handleTeam = () => alert("👥 9 Team Members Active\n\nCross-department sync is in progress. Check Team Schedule in the sidebar for details.");

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
      {/* Sessions */}
      <button onClick={handleSessions}
        className="press bg-white rounded-xl paper-shadow p-6 flex flex-col justify-between h-48 text-left group hover:shadow-lg transition-all w-full"
        style={{ border: "1px solid #f1f5f9", cursor: "pointer" }}>
        <svg className="w-8 h-8 transition-transform group-hover:scale-110" style={{ color: accent }}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        <div>
          <h4 className="text-2xl font-black tracking-tight text-slate-800">24 Sessions</h4>
          <p className="text-sm font-medium text-slate-500">Scheduled this month</p>
          <p className="text-xs mt-1 font-semibold" style={{ color: accent }}>Click to view →</p>
        </div>
      </button>

      {/* Key milestone */}
      <button onClick={handleMilestone}
        className="press rounded-xl paper-shadow p-6 flex flex-col justify-between h-48 text-white text-left group hover:scale-[1.02] transition-all w-full"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)`, border: "none", cursor: "pointer" }}>
        <svg className="w-8 h-8 text-white/80 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <div>
          <h4 className="text-2xl font-black tracking-tight">Key Milestone</h4>
          <p className="text-sm text-white/80 font-medium">Annual Studio Showcase</p>
          <p className="text-xs mt-1 text-white/60 font-semibold">Click for details →</p>
        </div>
      </button>

      {/* Team */}
      <button onClick={handleTeam}
        className="press bg-white rounded-xl paper-shadow p-6 flex flex-col justify-between h-48 text-left group hover:shadow-lg transition-all w-full"
        style={{ border: "1px solid #f1f5f9", cursor: "pointer" }}>
        <svg className="w-8 h-8 text-slate-400 transition-transform group-hover:scale-110"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <div>
          <h4 className="text-2xl font-black tracking-tight text-slate-800">9 Team Active</h4>
          <p className="text-sm font-medium text-slate-500">Cross-department sync</p>
          <p className="text-xs mt-1 font-semibold" style={{ color: accent }}>Click to view →</p>
        </div>
      </button>
    </section>
  );
}
