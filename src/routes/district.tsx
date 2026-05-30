import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Card, HealthDot, SectionTitle } from "@/components/AppShell";
import { Search, AlertCircle, ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/district")({
  head: () => ({
    meta: [
      { title: "District Map · VidyaSetu" },
      { name: "description", content: "A friendly district map showing which schools need help today." },
    ],
  }),
  component: DistrictPage,
});

const schools = [
  { id: 1, name: "Sarojini Vidyalaya", block: "Haveli", tone: "good" as const, x: 30, y: 35, students: 412, concern: "All well" },
  { id: 2, name: "Anand Vidya Mandir", block: "Mulshi", tone: "watch" as const, x: 55, y: 28, students: 280, concern: "Attendance dipping in Grade 6" },
  { id: 3, name: "Govt Primary School Khed", block: "Khed", tone: "urgent" as const, x: 70, y: 55, students: 156, concern: "3 teachers absent · reading slowed" },
  { id: 4, name: "Zilla Parishad Junnar", block: "Junnar", tone: "urgent" as const, x: 22, y: 65, students: 198, concern: "Migration concerns rising" },
  { id: 5, name: "Bhor Public School", block: "Bhor", tone: "good" as const, x: 45, y: 75, students: 320, concern: "All well" },
  { id: 6, name: "Maval English School", block: "Maval", tone: "watch" as const, x: 80, y: 40, students: 240, concern: "Math fluency below grade" },
];

function DistrictPage() {
  const [selected, setSelected] = useState(schools[2]);
  return (
    <AppShell title="Pune Zilla · 412 schools">
      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        <Card className="p-0 overflow-hidden">
          {/* Map */}
          <div className="relative h-[520px] bg-[radial-gradient(circle_at_30%_20%,_oklch(0.94_0.03_85),_oklch(0.98_0.01_85))]">
            {/* district outline */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <path
                d="M10 30 Q 25 5, 50 12 T 92 25 Q 95 50, 88 75 T 50 92 Q 20 90, 8 70 T 10 30 Z"
                fill="oklch(0.32 0.13 275 / 0.06)"
                stroke="oklch(0.32 0.13 275 / 0.3)"
                strokeWidth="0.4"
                strokeDasharray="1 1.5"
              />
            </svg>
            {/* search */}
            <div className="absolute top-4 left-4 right-4 flex gap-2">
              <div className="flex-1 bg-card rounded-2xl shadow-card flex items-center gap-2 px-4 py-2.5">
                <Search size={16} className="text-muted-foreground" />
                <input
                  placeholder="Search a school or block..."
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
              <button className="bg-card rounded-2xl shadow-card px-4 py-2.5 text-sm font-medium flex items-center gap-2">
                <MapPin size={14} /> Layers
              </button>
            </div>
            {/* school pins */}
            {schools.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                <span
                  className={`block w-9 h-9 rounded-full ring-4 ring-card flex items-center justify-center text-white text-xs font-bold ${
                    s.tone === "good"
                      ? "bg-emerald"
                      : s.tone === "watch"
                      ? "bg-saffron text-saffron-foreground"
                      : "bg-destructive animate-pulse-ring"
                  } ${selected.id === s.id ? "scale-125" : "group-hover:scale-110"} transition`}
                >
                  {s.name[0]}
                </span>
              </button>
            ))}
            {/* legend */}
            <div className="absolute bottom-4 left-4 bg-card rounded-2xl shadow-card px-4 py-3 flex gap-4 text-xs">
              <span className="flex items-center gap-1.5"><HealthDot tone="good" /> Healthy</span>
              <span className="flex items-center gap-1.5"><HealthDot tone="watch" /> Attention</span>
              <span className="flex items-center gap-1.5"><HealthDot tone="urgent" /> Urgent</span>
            </div>
            {/* summary */}
            <div className="absolute bottom-4 right-4 bg-card rounded-2xl shadow-card px-4 py-3">
              <div className="text-xs text-muted-foreground">Today's snapshot</div>
              <div className="flex gap-3 text-sm font-semibold mt-1">
                <span className="text-emerald">312 ✓</span>
                <span className="text-saffron">78 ⚠</span>
                <span className="text-destructive">22 !</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Selected school */}
        <div className="space-y-4">
          <Card>
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 w-3 h-3 rounded-full ${
                  selected.tone === "good" ? "bg-emerald" : selected.tone === "watch" ? "bg-saffron" : "bg-destructive"
                }`}
              />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">{selected.block} Block</div>
                <h3 className="font-bold text-lg leading-tight">{selected.name}</h3>
                <div className="text-xs text-muted-foreground">{selected.students} students</div>
              </div>
            </div>
            <p className="text-sm mt-3 p-3 rounded-xl bg-secondary/60">
              <AlertCircle size={14} className="inline mr-1 text-saffron" />
              {selected.concern}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[{ l: "Attend", v: 78 }, { l: "Learn", v: 64 }, { l: "Staff", v: 70 }].map((m) => (
                <div key={m.l} className="bg-secondary/60 rounded-xl p-2">
                  <div className="text-xs text-muted-foreground">{m.l}</div>
                  <div className="font-bold">{m.v}%</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionTitle>Recommended actions</SectionTitle>
            <ul className="space-y-2">
              {[
                "Send substitute teachers from nearby Bhor school",
                "Schedule a reading specialist visit this Friday",
                "Share success kit from Sarojini Vidyalaya",
              ].map((a, i) => (
                <li key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/40">
                  <span className="w-6 h-6 rounded-full bg-emerald text-emerald-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm flex-1">{a}</span>
                  <ArrowRight size={14} className="text-muted-foreground" />
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionTitle>Resources needed</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {["2 substitute teachers", "Reading kit (Grade 3)", "Sanitary supplies"].map((r) => (
                <span key={r} className="px-3 py-1.5 rounded-full bg-saffron/20 text-sm font-medium">
                  {r}
                </span>
              ))}
            </div>
            <button className="mt-3 w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold">
              Send help to this school
            </button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
