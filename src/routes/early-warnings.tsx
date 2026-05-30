import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, HealthDot, SectionTitle } from "@/components/AppShell";
import { AlertCircle, UserX, GraduationCap, MapPin, Search, ArrowRight, ShieldAlert, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "@/lib/api";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/early-warnings")({
  head: () => ({
    meta: [
      { title: "Early Warning Center · VidyaSetu" },
      { name: "description", content: "Proactive intelligence layer identifying risks before they become problems." },
    ],
  }),
  component: EarlyWarningsPage,
});

const risks = [
  { category: "Learning Risk", count: 12, icon: GraduationCap, tone: "watch", color: "text-saffron" },
  { category: "Attendance Risk", count: 8, icon: UserX, tone: "urgent", color: "text-destructive" },
  { category: "Dropout Risk", count: 2, icon: ShieldAlert, tone: "urgent", color: "text-destructive" },
  { category: "Transition Risk", count: 15, icon: MapPin, tone: "watch", color: "text-saffron" },
  { category: "Wellbeing Risk", count: 5, icon: AlertCircle, tone: "watch", color: "text-saffron" },
];

function EarlyWarningsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents
  });

  const filteredStudents = (students || []).filter((s: any) => s.tone !== 'good' && s.name.toLowerCase().includes(search.toLowerCase()));

  const getViewTitle = () => {
    if (!user) return "At-Risk Entities";
    if (user.role === "teacher") return "At-Risk Students in Your Class";
    if (user.role === "principal") return "At-Risk Classrooms & Students";
    return "At-Risk Schools in District";
  };

  return (
    <AppShell title="Early Warning Center">
      {/* Overview Cards */}
      <Card className="bg-gradient-indigo text-primary-foreground mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <div className="text-xs uppercase tracking-wide opacity-80 flex items-center gap-2">
              <Zap size={14} className="text-saffron" /> VidyaSetu Intelligence
            </div>
            <h2 className="text-2xl font-bold mt-1">42 active early warnings</h2>
            <p className="text-sm opacity-85 mt-1 max-w-xl">
              Our models have identified emerging patterns that require gentle intervention to prevent long-term impact.
            </p>
          </div>
          <div className="flex gap-2">
             <button 
               onClick={() => toast.success("Generating Risk Report via Saarthi...")}
               className="bg-saffron text-saffron-foreground px-4 py-2.5 rounded-xl text-sm font-semibold"
             >
               Generate Risk Report
             </button>
          </div>
        </div>
      </Card>

      {/* Risk Categories */}
      <SectionTitle>Warning Categories</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {risks.map((r, i) => {
          const I = r.icon;
          return (
            <Card key={i} className="text-center">
              <div className="flex justify-center mb-2">
                <I size={24} className={r.color} />
              </div>
              <div className="text-2xl font-bold">{r.count}</div>
              <div className="text-xs text-muted-foreground mt-1">{r.category}</div>
            </Card>
          )
        })}
      </div>

      {/* Role-Based List */}
      <SectionTitle>{getViewTitle()}</SectionTitle>
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or reason..." 
              className="pl-9 pr-4 py-2 bg-secondary rounded-xl text-sm w-full md:w-80 focus:outline-none focus:ring-2 ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground hidden sm:block">
            Showing {filteredStudents.length} results
          </div>
        </div>

        <div className="space-y-3">
          {filteredStudents.map((s, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-border/40 hover:bg-secondary/40 transition">
              <div className="flex items-center gap-3 md:w-1/4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center font-bold text-lg text-primary">{s.avatar}</div>
                <div>
                  <div className="font-semibold text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground">Grade {s.grade}</div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <HealthDot tone={s.tone} pulse />
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {s.tone === 'urgent' ? 'High Risk' : 'Elevated Risk'}
                  </span>
                </div>
                <div className="text-sm mt-1">{s.concern}</div>
              </div>

              <div className="sm:w-1/4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Suggested Action</div>
                <div className="text-sm font-medium">
                  {s.tone === 'urgent' ? 'Immediate Parent Meeting' : 'Peer Learning Group'}
                </div>
              </div>

              <div className="sm:text-right">
                <Link 
                  to="/student/$id" 
                  params={{ id: s.id }} 
                  className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:underline"
                >
                  Review <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="text-center py-8 text-muted-foreground animate-pulse">
              Loading intelligence data...
            </div>
          )}

          {!isLoading && filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No active warnings found matching your search.
            </div>
          )}
        </div>
      </Card>
    </AppShell>
  );
}
