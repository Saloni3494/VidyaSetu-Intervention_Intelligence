import { AppShell, Card, HealthDot, SectionTitle, AppleHealthRings } from "@/components/AppShell";
import { Users, BookOpen, GraduationCap, Building, Heart, ArrowRight, Sparkles, Activity } from "lucide-react";
import { toast } from "sonner";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/principal")({
  head: () => ({
    meta: [
      { title: "School Pulse · VidyaSetu" },
      { name: "description", content: "Feel the pulse of your school — attendance, learning, teachers, and infrastructure in one warm view." },
    ],
  }),
  component: PrincipalPage,
});

const pulses = [
  { label: "Attendance", v: 86, tone: "good" as const, icon: Users, note: "Steady this week" },
  { label: "Learning Outcomes", v: 72, tone: "watch" as const, icon: BookOpen, note: "Grade 7 needs care" },
  { label: "Intervention Success", v: 84, tone: "good" as const, icon: Activity, note: "75% of plans improving" },
  { label: "Teacher Engagement", v: 78, tone: "watch" as const, icon: GraduationCap, note: "2 teachers overloaded" },
  { label: "School Infrastructure", v: 90, tone: "good" as const, icon: Building, note: "All facilities working" },
];

function PulseSystem({ score }: { score: number }) {
  // A simple glowing pulse visualization for the health index
  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <div className="absolute inset-0 rounded-full bg-emerald/20 animate-ping opacity-75 duration-1000"></div>
      <div className="absolute inset-2 rounded-full bg-emerald/30 animate-pulse"></div>
      <div className="absolute inset-4 rounded-full bg-emerald flex items-center justify-center shadow-lg shadow-emerald/40 z-10">
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-foreground leading-none">{score}</div>
          <div className="text-[10px] font-bold text-emerald-foreground/80 uppercase tracking-widest mt-1">Index</div>
        </div>
      </div>
    </div>
  );
}

function PrincipalPage() {
  return (
    <AppShell title="Sarojini Vidyalaya · School Pulse">
      <Card className="bg-gradient-warm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <PulseSystem score={81} />
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold flex items-center gap-1.5 mb-1">
              <Activity size={14} className="text-emerald" /> School Health Index
            </div>
            <h2 className="text-2xl font-bold mt-1">Your school is breathing well</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-lg">
              The combined health score indicates strong infrastructure and attendance, but learning outcomes in Grade 7 are suppressing the overall index.
            </p>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => toast.success("Drafting assembly agenda...")}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
              >
                <Heart size={14} /> Plan a school assembly
              </button>
              <button 
                onClick={() => toast.success("Report shared with PTA.")}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-xl text-sm font-semibold"
              >
                Share with PTA
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-5">
        {pulses.map((p) => {
          const I = p.icon;
          return (
            <Card key={p.label} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-secondary text-primary flex items-center justify-center">
                  <I size={16} />
                </div>
                <div className={`text-xl font-bold ${p.tone === 'good' ? 'text-emerald' : p.tone === 'watch' ? 'text-saffron' : 'text-destructive'}`}>
                  {p.v}
                </div>
              </div>
              <div className="text-sm font-semibold leading-tight">{p.label}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2">
                <HealthDot tone={p.tone} /> <span className="truncate">{p.note}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-6">
        <Card>
          <SectionTitle hint="38 children this week">Students needing support</SectionTitle>
          <div className="space-y-3">
            {[
              { c: "Grade 3", n: "8 children · Reading dip after holidays", t: "watch" as const },
              { c: "Grade 7", n: "12 children · Attendance falling Mondays", t: "urgent" as const },
              { c: "Grade 9", n: "5 children · Exam anxiety reported", t: "watch" as const },
            ].map((g, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/60">
                <HealthDot tone={g.t} pulse />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{g.c}</div>
                  <div className="text-xs text-muted-foreground">{g.n}</div>
                </div>
                <ArrowRight size={16} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle>Teacher workload</SectionTitle>
          <div className="space-y-3">
            {[
              { n: "Anita Deshmukh", l: "Balanced", v: 70, t: "good" as const },
              { n: "Rahul Verma", l: "Heavy week", v: 88, t: "watch" as const },
              { n: "Priya Iyer", l: "Overloaded", v: 95, t: "urgent" as const },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-saffron/20 text-foreground flex items-center justify-center font-semibold text-sm">
                  {t.n.split(" ").map((x) => x[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{t.n}</div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden mt-1">
                    <div
                      className={`h-full ${
                        t.t === "good" ? "bg-emerald" : t.t === "watch" ? "bg-saffron" : "bg-destructive"
                      }`}
                      style={{ width: `${t.v}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{t.l}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 bg-primary text-primary-foreground">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-saffron text-saffron-foreground flex items-center justify-center">
            <Sparkles size={22} />
          </div>
          <div className="flex-1">
            <div className="text-xs opacity-80">Recommended school action</div>
            <h3 className="text-lg font-semibold mt-1">
              Run a 2-week "Monday Smiles" attendance drive in Grade 7
            </h3>
            <p className="text-sm opacity-85 mt-1">
              Three nearby schools reduced Monday absences by 22% with this approach.
            </p>
          </div>
          <button className="bg-saffron text-saffron-foreground px-4 py-2 rounded-xl text-sm font-semibold">Start drive</button>
        </div>
      </Card>
    </AppShell>
  );
}
