import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Ring, SectionTitle } from "@/components/AppShell";
import { Sparkles, Heart, TrendingUp, Globe, Users } from "lucide-react";

export const Route = createFileRoute("/state")({
  head: () => ({
    meta: [
      { title: "State Stories · VidyaSetu" },
      { name: "description", content: "Maharashtra's learning story — progress, inclusion, and the children behind the numbers." },
    ],
  }),
  component: StatePage,
});

function StatePage() {
  return (
    <AppShell title="Maharashtra · Learning Stories">
      <Card className="bg-gradient-indigo text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-saffron/30 rounded-full blur-3xl" />
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <Ring value={78} tone="good" size={130} />
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide opacity-80">State Learning Health</div>
            <h2 className="text-3xl font-bold mt-1">Maharashtra is rising, gently.</h2>
            <p className="text-base opacity-85 mt-1 max-w-xl">
              1.1 crore children · 96,400 schools · 8% more children reading at grade level than last year.
            </p>
          </div>
        </div>
      </Card>

      {/* impact tiles */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {[
          { icon: TrendingUp, label: "Districts improving", v: "29 of 36", t: "good", color: "text-emerald" },
          { icon: Users, label: "Girls' enrollment", v: "+12% YoY", t: "good", color: "text-emerald" },
          { icon: Globe, label: "Languages active", v: "10 today", t: "good", color: "text-saffron" },
          { icon: Heart, label: "Dropout reduced", v: "−18%", t: "good", color: "text-emerald" },
        ].map((s, i) => {
          const I = s.icon;
          return (
            <Card key={i}>
              <div className={`w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center ${s.color}`}>
                <I size={20} />
              </div>
              <div className="mt-3 text-sm text-muted-foreground">{s.label}</div>
              <div className="text-2xl font-bold mt-1">{s.v}</div>
            </Card>
          );
        })}
      </div>

      {/* district progress */}
      <Card className="mt-6">
        <SectionTitle hint="Tap a district for stories">District progress</SectionTitle>
        <div className="space-y-3">
          {[
            { d: "Pune", v: 86, t: "good" as const, n: "Best in reading recovery" },
            { d: "Nagpur", v: 74, t: "watch" as const, n: "Grade 7 attendance dipping" },
            { d: "Aurangabad", v: 62, t: "watch" as const, n: "Migration-affected blocks" },
            { d: "Gadchiroli", v: 48, t: "urgent" as const, n: "Needs urgent teacher support" },
            { d: "Mumbai Suburban", v: 89, t: "good" as const, n: "Strong inclusion progress" },
          ].map((d, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-32 text-sm font-semibold">{d.d}</div>
              <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    d.t === "good" ? "bg-emerald" : d.t === "watch" ? "bg-saffron" : "bg-destructive"
                  }`}
                  style={{ width: `${d.v}%` }}
                />
              </div>
              <div className="w-10 text-right text-sm font-bold">{d.v}</div>
              <div className="hidden md:block w-64 text-xs text-muted-foreground">{d.n}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Story cards */}
      <div className="mt-6">
        <SectionTitle hint="From the field this month">Stories of impact</SectionTitle>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              place: "Solapur · Mangalwedha",
              title: "Sneha is back in school.",
              body: "After two months away helping at home, a teacher's visit and a small scholarship brought her back. She's already reading again.",
              tone: "bg-emerald/12 text-emerald",
            },
            {
              place: "Nashik · Trimbak",
              title: "A Marathi-Pawra reading bridge.",
              body: "92 tribal children are learning to read using a bilingual story set crafted by their own teachers.",
              tone: "bg-saffron/20 text-foreground",
            },
            {
              place: "Pune · Junnar",
              title: "From red to amber in 8 weeks.",
              body: "Junnar block reduced absenteeism by 31% after a community 'Sunday Smiles' drive led by parents.",
              tone: "bg-primary/10 text-primary",
            },
          ].map((s, i) => (
            <Card key={i}>
              <div className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${s.tone}`}>{s.place}</div>
              <h3 className="font-bold text-lg mt-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
              <button className="mt-3 text-sm font-semibold text-primary inline-flex items-center gap-1">Read full story →</button>
            </Card>
          ))}
        </div>
      </div>

      {/* inclusion */}
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <Card>
          <SectionTitle>Gender inclusion</SectionTitle>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-end gap-1.5 h-32">
                {[60, 64, 68, 72, 75, 78, 82].map((v, i) => (
                  <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-saffron to-saffron/40" style={{ height: `${v}%` }} />
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-2">Girls' retention · last 7 years</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald">82%</div>
              <div className="text-xs text-muted-foreground">Today</div>
            </div>
          </div>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <div className="flex items-center gap-2 text-xs opacity-80">
            <Sparkles size={14} className="text-saffron" /> VidyaSetu insight
          </div>
          <h3 className="text-lg font-semibold mt-2">
            Schools using local-language reading kits are 2.3× more likely to retain first-generation learners.
          </h3>
          <p className="text-sm opacity-85 mt-2">
            Consider expanding the bilingual story program to 8 more aspirational districts this quarter.
          </p>
          <button className="mt-3 bg-saffron text-saffron-foreground px-4 py-2 rounded-xl text-sm font-semibold">
            Draft a state circular
          </button>
        </Card>
      </div>
    </AppShell>
  );
}
