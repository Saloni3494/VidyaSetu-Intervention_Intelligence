import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Card, HealthDot, SectionTitle } from "@/components/AppShell";
import { Search, Layers, Users, BookOpen, Building, Plane } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community Risk Map · VidyaSetu" },
      { name: "description", content: "A friendly community map showing where children may need extra care — attendance, migration, dropout, and learning deficits." },
    ],
  }),
  component: CommunityPage,
});

const layers = [
  { id: "attendance", label: "Attendance decline", icon: Users, color: "text-saffron" },
  { id: "migration", label: "Migration patterns", icon: Plane, color: "text-primary" },
  { id: "dropout", label: "Dropout hotspots", icon: Building, color: "text-destructive" },
  { id: "learning", label: "Learning deficit areas", icon: BookOpen, color: "text-emerald" },
];

const zones = [
  { x: 20, y: 25, r: 40, tone: "watch", label: "Wagholi · attendance dipping" },
  { x: 55, y: 40, r: 55, tone: "urgent", label: "Khed · migration cluster" },
  { x: 75, y: 70, r: 35, tone: "good", label: "Bhor · recovering deficit" },
  { x: 35, y: 70, r: 45, tone: "watch", label: "Junnar · dropout concerns" },
];

function CommunityPage() {
  const [active, setActive] = useState("attendance");
  return (
    <AppShell title="Community Risk Map">
      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <Card className="p-0 overflow-hidden">
          <div className="relative h-[560px] bg-[radial-gradient(circle_at_20%_30%,_oklch(0.95_0.04_85),_oklch(0.98_0.01_85))]">
            {/* roads */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <path d="M0 50 Q 30 30, 60 55 T 100 40" stroke="oklch(0.32 0.13 275 / 0.15)" strokeWidth="0.6" fill="none" />
              <path d="M20 0 Q 25 40, 50 60 T 70 100" stroke="oklch(0.32 0.13 275 / 0.12)" strokeWidth="0.5" fill="none" />
              <path d="M0 80 L 100 75" stroke="oklch(0.32 0.13 275 / 0.1)" strokeWidth="0.4" fill="none" strokeDasharray="2 1" />
            </svg>

            {/* zones */}
            {zones.map((z, i) => (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${z.x}%`,
                  top: `${z.y}%`,
                  width: z.r * 2,
                  height: z.r * 2,
                  background:
                    z.tone === "good"
                      ? "radial-gradient(circle, oklch(0.65 0.14 155 / 0.35), oklch(0.65 0.14 155 / 0) 70%)"
                      : z.tone === "watch"
                      ? "radial-gradient(circle, oklch(0.78 0.16 65 / 0.4), oklch(0.78 0.16 65 / 0) 70%)"
                      : "radial-gradient(circle, oklch(0.62 0.21 25 / 0.4), oklch(0.62 0.21 25 / 0) 70%)",
                }}
              />
            ))}

            {/* pins */}
            {zones.map((z, i) => (
              <div
                key={`p-${i}`}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${z.x}%`, top: `${z.y}%` }}
              >
                <div className="bg-card rounded-2xl px-3 py-1.5 shadow-card text-xs font-medium flex items-center gap-2 whitespace-nowrap">
                  <HealthDot tone={z.tone as any} /> {z.label}
                </div>
              </div>
            ))}

            {/* search */}
            <div className="absolute top-4 left-4 right-4 flex gap-2">
              <div className="flex-1 bg-card rounded-2xl shadow-card flex items-center gap-2 px-4 py-2.5">
                <Search size={16} className="text-muted-foreground" />
                <input placeholder="Search a village or block..." className="bg-transparent outline-none text-sm flex-1" />
              </div>
              <button className="bg-card rounded-2xl shadow-card px-4 py-2.5 text-sm font-medium flex items-center gap-2">
                <Layers size={14} /> Layers
              </button>
            </div>

            {/* legend */}
            <div className="absolute bottom-4 left-4 bg-card rounded-2xl shadow-card px-4 py-3 flex gap-4 text-xs">
              <span className="flex items-center gap-1.5"><HealthDot tone="good" /> Healthy</span>
              <span className="flex items-center gap-1.5"><HealthDot tone="watch" /> Watching</span>
              <span className="flex items-center gap-1.5"><HealthDot tone="urgent" /> Needs help</span>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <SectionTitle>Show me</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              {layers.map((l) => {
                const I = l.icon;
                const isOn = active === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setActive(l.id)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      isOn ? "border-primary bg-primary/5" : "border-border bg-card"
                    }`}
                  >
                    <I size={18} className={l.color} />
                    <div className="text-sm font-semibold mt-2">{l.label}</div>
                    <div className="text-xs text-muted-foreground opacity-80">mapped risks</div>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card>
            <SectionTitle>Top concern zones</SectionTitle>
            <ul className="space-y-2">
              {zones.map((z, i) => (
                <li key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/40">
                  <HealthDot tone={z.tone as any} />
                  <div className="text-sm flex-1">{z.label}</div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <div className="text-xs opacity-80">Community signal</div>
            <p className="text-sm mt-2">
              Migration to Khed has risen by 18% this season. 4 schools in the area may see new admissions this month.
            </p>
            <button className="mt-3 bg-saffron text-saffron-foreground px-3 py-2 rounded-xl text-sm font-semibold">
              Prepare welcome kits
            </button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
