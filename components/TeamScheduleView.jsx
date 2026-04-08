"use client";

const TEAM = [
  { name: "Alex Chen",   role: "Designer",   color: "#f59e0b", status: "online",  tasks: ["Mood board Q4", "Brand refresh"], hours: 32 },
  { name: "Sara Kim",    role: "Developer",  color: "#10b981", status: "online",  tasks: ["API integration", "Dashboard UI"], hours: 40 },
  { name: "Mike Torres", role: "PM",         color: "#6366f1", status: "away",    tasks: ["Sprint planning", "Stakeholder sync"], hours: 28 },
  { name: "Priya Nair",  role: "Marketing",  color: "#ef4444", status: "offline", tasks: ["Campaign launch", "Analytics review"], hours: 20 },
  { name: "James Wu",    role: "Copywriter", color: "#06b6d4", status: "online",  tasks: ["Blog posts", "Email copy"], hours: 24 },
];

const STATUS_COLOR = { online: "#22c55e", away: "#f59e0b", offline: "#94a3b8" };

export default function TeamScheduleView({ accent }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Team Schedule</h1>
        <p className="text-sm text-slate-400 mt-1">{TEAM.filter(t => t.status === "online").length} members online now</p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Online",  count: TEAM.filter(t => t.status === "online").length,  color: "#22c55e" },
          { label: "Away",    count: TEAM.filter(t => t.status === "away").length,    color: "#f59e0b" },
          { label: "Offline", count: TEAM.filter(t => t.status === "offline").length, color: "#94a3b8" },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 paper-shadow text-center">
            <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ background: color }} />
            <p className="text-2xl font-black text-slate-800">{count}</p>
            <p className="text-xs text-slate-400 font-medium">{label}</p>
          </div>
        ))}
      </div>

      {/* Team cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEAM.map(member => (
          <div key={member.name} className="bg-white rounded-2xl p-5 paper-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-black"
                  style={{ background: member.color }}>
                  {member.name[0]}
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white"
                  style={{ background: STATUS_COLOR[member.status] }} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-800">{member.name}</p>
                <p className="text-xs text-slate-400">{member.role}</p>
              </div>
              <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                style={{ background: `${STATUS_COLOR[member.status]}20`, color: STATUS_COLOR[member.status] }}>
                {member.status}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-1.5 mb-4">
              {member.tasks.map(task => (
                <div key={task} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                  {task}
                </div>
              ))}
            </div>

            {/* Hours bar */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hours this week</span>
                <span className="text-xs font-black text-slate-700">{member.hours}h</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(member.hours / 40) * 100}%`, background: accent }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
