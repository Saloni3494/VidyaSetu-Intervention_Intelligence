import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, HealthDot, Ring, SectionTitle } from "@/components/AppShell";
import { Mic, Calendar, BookOpen, Heart, ArrowRight, Sparkles, CheckCircle2, Bell, Search, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/teacher")({
  head: () => ({
    meta: [
      { title: "Teacher Companion · VidyaSetu" },
      { name: "description", content: "Your daily teaching companion." },
    ],
  }),
  component: TeacherHome,
});

const suggestions = [
  { text: "Pair Rohan with Sneha for paired reading today", icon: BookOpen },
  { text: "Send a kind WhatsApp note to Pooja's parents", icon: Heart },
  { text: "Try the 5-minute number game with Grade 5B", icon: Sparkles },
];

const pendingTasks = [
  { text: "Update Term 1 Math grades", due: "Today", urgent: true },
  { text: "Review Sneha's reading progress", due: "Tomorrow", urgent: false },
  { text: "PTA Meeting preparation", due: "Friday", urgent: false },
];

function TeacherHome() {
  const [search, setSearch] = useState("");

  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents
  });

  const filteredStudents = (students || []).filter((s: any) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppShell title="Good morning, Anita Ma'am">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Hero greeting + class health */}
        <Card className="lg:col-span-2 bg-gradient-warm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Today · Grade 5B</div>
              <h2 className="text-2xl font-bold mt-1">Your class is feeling <span className="text-emerald">good</span> today</h2>
              <p className="text-sm text-muted-foreground mt-1">28 of 32 students present · 4 need a little extra care</p>
            </div>
            <Ring value={84} tone="good" size={84} />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Attendance", value: 88, tone: "good" as const },
              { label: "Reading", value: 74, tone: "watch" as const },
              { label: "Wellbeing", value: 92, tone: "good" as const },
            ].map((m) => (
              <div key={m.label} className="bg-card rounded-2xl p-3 flex items-center gap-3 border border-border/60">
                <Ring value={m.value} tone={m.tone} size={48} />
                <div>
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                  <div className="text-sm font-semibold capitalize">{m.tone === "good" ? "Healthy" : "Watch"}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Voice assistant */}
        <Card className="bg-gradient-indigo text-primary-foreground relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-saffron/30 blur-2xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-xs font-medium">
              <Sparkles size={12} className="text-saffron" /> Ask in any language
            </div>
            <h3 className="text-xl font-bold mt-3">Need a hand?</h3>
            <p className="text-sm opacity-85 mt-1">
              "Mujhe Rohan ke liye kya karna chahiye?" — bas poochho.
            </p>
            <button 
              onClick={() => toast.info("Hold to speak functionality is managed via Saarthi.")}
              className="mt-5 inline-flex items-center gap-3 bg-saffron text-saffron-foreground px-4 py-3 rounded-2xl font-semibold w-full justify-center"
            >
              <span className="w-9 h-9 rounded-full bg-white/40 flex items-center justify-center animate-pulse-ring">
                <Mic size={18} />
              </span>
              Hold to speak
            </button>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="bg-secondary/50 p-1 rounded-2xl inline-flex mb-4">
          <TabsTrigger value="overview" className="rounded-xl px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Class Overview</TabsTrigger>
          <TabsTrigger value="students" className="rounded-xl px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Students & Nudges</TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-xl px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Tasks & Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="grid md:grid-cols-2 gap-5">
             <Card>
               <SectionTitle>Class Learning Progress</SectionTitle>
               <div className="space-y-4">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium">Math Fluency</span>
                     <span className="text-emerald font-semibold">82%</span>
                   </div>
                   <div className="h-2 rounded-full bg-secondary overflow-hidden">
                     <div className="h-full bg-emerald" style={{ width: '82%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium">Marathi Reading</span>
                     <span className="text-saffron font-semibold">65%</span>
                   </div>
                   <div className="h-2 rounded-full bg-secondary overflow-hidden">
                     <div className="h-full bg-saffron" style={{ width: '65%' }}></div>
                   </div>
                 </div>
               </div>
             </Card>
             <Card>
               <SectionTitle>Recent Assessments</SectionTitle>
               <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                   <div>
                     <div className="font-semibold text-sm">Weekly Math Quiz</div>
                     <div className="text-xs text-muted-foreground">Taken 2 days ago</div>
                   </div>
                   <div className="text-sm font-semibold text-emerald">Avg 78%</div>
                 </div>
                 <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                   <div>
                     <div className="font-semibold text-sm">Marathi Reading Comprehension</div>
                     <div className="text-xs text-muted-foreground">Taken 5 days ago</div>
                   </div>
                   <div className="text-sm font-semibold text-saffron">Avg 62%</div>
                 </div>
               </div>
             </Card>
           </div>
        </TabsContent>

        <TabsContent value="students" className="mt-0 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold">Student Search</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                      type="text" 
                      placeholder="Find a student..." 
                      className="pl-9 pr-4 py-2 bg-secondary rounded-xl text-sm w-48 md:w-64 focus:outline-none focus:ring-2 ring-primary/20"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  {isLoading && (
                    <div className="sm:col-span-2 text-center py-8 text-muted-foreground animate-pulse">
                      Loading your students...
                    </div>
                  )}
                  {filteredStudents.map((s: any) => (
                    <Link
                      to="/student/$id"
                      params={{ id: s.id }}
                      key={s.id}
                      className="bg-card rounded-3xl p-4 border border-border/60 shadow-card flex items-center gap-4 hover:-translate-y-0.5 transition"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-secondary text-secondary-foreground font-semibold flex items-center justify-center text-lg">
                        {s.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <HealthDot tone={s.tone} pulse />
                          <div className="font-semibold truncate">{s.name}</div>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{s.concern}</div>
                      </div>
                      <Ring value={s.ring} tone={s.tone} size={48} />
                      <ArrowRight size={16} className="text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <SectionTitle hint="VidyaSetu suggests">Gentle next steps</SectionTitle>
                <div className="space-y-3">
                  {suggestions.map((s, i) => {
                    const I = s.icon;
                    return (
                      <Card key={i} className="flex items-start gap-3" >
                        <div className="w-10 h-10 rounded-xl bg-saffron/15 text-saffron flex items-center justify-center shrink-0">
                          <I size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{s.text}</p>
                          <button 
                            onClick={() => toast.success("Marked as done!")}
                            className="mt-2 text-xs font-semibold text-primary inline-flex items-center gap-1"
                          >
                            Mark as done <CheckCircle2 size={12} />
                          </button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-0 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid lg:grid-cols-2 gap-5">
            <Card>
              <SectionTitle>Today's plan</SectionTitle>
              <ol className="relative border-l-2 border-dashed border-border ml-2 space-y-4">
                {[
                  { t: "9:00", a: "Morning circle · Marathi" },
                  { t: "10:15", a: "Paired reading session" },
                  { t: "12:00", a: "Parent call — Rohan's mother" },
                  { t: "2:00", a: "Math fluency game" },
                ].map((p, i) => (
                  <li key={i} className="ml-4">
                    <span className="absolute -left-[7px] w-3 h-3 rounded-full bg-saffron" />
                    <div className="text-xs text-muted-foreground">{p.t}</div>
                    <div className="text-sm font-medium">{p.a}</div>
                  </li>
                ))}
              </ol>
            </Card>
            
            <div className="space-y-5">
              <Card>
                <SectionTitle>Pending Tasks</SectionTitle>
                <div className="space-y-3">
                  {pendingTasks.map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${t.urgent ? 'bg-destructive' : 'bg-primary'}`}></div>
                        <span className="text-sm font-medium">{t.text}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {t.due}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <SectionTitle>Recent updates</SectionTitle>
                <ul className="space-y-3">
                  {[
                    { icon: CheckCircle2, t: "Sneha completed her reading goal", tone: "text-emerald" },
                    { icon: Bell, t: "Pooja's mother responded to your note", tone: "text-saffron" },
                    { icon: Calendar, t: "PTA meeting moved to Friday", tone: "text-primary" },
                  ].map((u, i) => {
                    const I = u.icon;
                    return (
                      <li key={i} className="flex items-center gap-3">
                        <I size={18} className={u.tone} />
                        <span className="text-sm">{u.t}</span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
