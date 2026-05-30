import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, HealthDot, SectionTitle } from "@/components/AppShell";
import { CheckCircle2, Clock, ArrowRight, Sparkles, Plus } from "lucide-react";

export const Route = createFileRoute("/interventions")({
  head: () => ({
    meta: [
      { title: "Intervention Center · VidyaSetu" },
      { name: "description", content: "Track every child's care plan like a gentle treatment record — problem, action, follow-up, outcome." },
    ],
  }),
  component: InterventionsPage,
});

import { useQuery } from "@tanstack/react-query";
import { fetchInterventions } from "@/lib/api";
import { toast } from "sonner";

const steps = ["Problem", "Action Taken", "Follow-up", "Outcome", "Improvement"];

function InterventionsPage() {
  const { data: items, isLoading } = useQuery({
    queryKey: ['interventions'],
    queryFn: () => fetchInterventions()
  });

  const displayItems = items || [];

  return (
    <AppShell title="Intervention Center">
      <Card className="bg-gradient-warm">
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">This week</div>
            <h2 className="text-2xl font-bold mt-1">
              {isLoading ? "Loading interventions..." : `${displayItems.length} children are getting a little extra care`}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">9 are improving · 4 still need time · 1 needs urgent help</p>
          </div>
          <button 
            onClick={() => toast.success("Drafting new care plan...")}
            className="bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2"
          >
            <Plus size={16} /> Start a new care plan
          </button>
        </div>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4 mt-5">
        {[
          { l: "Resolved this month", v: 23, c: "text-emerald" },
          { l: "Active care plans", v: displayItems.length, c: "text-saffron" },
          { l: "Awaiting follow-up", v: 6, c: "text-primary" },
        ].map((s) => (
          <Card key={s.l}>
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className={`text-3xl font-bold mt-1 ${s.c}`}>{s.v}</div>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <SectionTitle hint="Like a treatment tracker">Active care plans</SectionTitle>
        <div className="space-y-4">
          {isLoading && (
            <div className="text-center py-8 text-muted-foreground animate-pulse">
              Loading active care plans...
            </div>
          )}
          {displayItems.map((it: any, i: number) => (
            <Card key={i}>
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="md:w-60 min-w-0">
                  <div className="flex items-center gap-2">
                    <HealthDot tone={it.tone} />
                    <div className="font-semibold truncate">Student {it.student_id}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                    <Clock size={12} /> {it.follow_up}
                  </div>
                </div>

                <div className="flex-1">
                  {/* steps */}
                  <div className="flex items-center gap-2">
                    {steps.map((s, idx) => {
                      const done = idx < it.step;
                      const active = idx === it.step - 1;
                      return (
                        <div key={s} className="flex items-center flex-1 last:flex-none">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              done
                                ? "bg-emerald text-emerald-foreground"
                                : active
                                ? "bg-saffron text-saffron-foreground"
                                : "bg-secondary text-muted-foreground"
                            }`}
                            title={s}
                          >
                            {done ? <CheckCircle2 size={12} /> : idx + 1}
                          </div>
                          {idx < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 ${done ? "bg-emerald" : "bg-border"}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
                    <div className="p-2.5 rounded-xl bg-secondary/60">
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Problem</div>
                      <div>{it.problem}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald/10">
                      <div className="text-[10px] uppercase tracking-wide text-emerald">Action</div>
                      <div>{it.action}</div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      it.status === "Resolved"
                        ? "bg-emerald/15 text-emerald"
                        : it.status === "Improving"
                        ? "bg-emerald/15 text-emerald"
                        : it.status === "In progress"
                        ? "bg-saffron/20 text-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {it.status}
                  </span>
                  <button className="mt-3 block text-sm font-semibold text-primary inline-flex items-center gap-1">
                    Open <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-6 bg-primary text-primary-foreground">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-saffron text-saffron-foreground flex items-center justify-center">
            <Sparkles size={22} />
          </div>
          <div className="flex-1">
            <div className="text-xs opacity-80">VidyaSetu noticed</div>
            <p className="mt-1 text-base">
              "3 of your active plans are due for follow-up this week. Want me to draft reminders for the parents?"
            </p>
          </div>
          <button className="bg-saffron text-saffron-foreground px-4 py-2 rounded-xl text-sm font-semibold">Draft reminders</button>
        </div>
      </Card>
    </AppShell>
  );
}
