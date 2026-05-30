import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, HealthDot, Ring, SectionTitle, AppleHealthRings } from "@/components/AppShell";
import { BookOpen, Calculator, Heart, Users, Sparkles, ArrowRight, CheckCircle2, Calendar, Edit3, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentById, fetchAiExplanation } from "@/lib/api";
import { toast } from "sonner";

export const Route = createFileRoute("/student/$id")({
  head: () => ({
    meta: [
      { title: "Student story · VidyaSetu" },
      { name: "description", content: "A complete, gentle picture of one child — learning, wellbeing, and the next kind step." },
    ],
  }),
  component: StudentPage,
});

function StudentPage() {
  const { id } = Route.useParams();
  
  const { data: student, isLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: () => fetchStudentById(id)
  });

  const { data: aiData, isLoading: aiLoading } = useQuery({
    queryKey: ['ai', id],
    queryFn: () => fetchAiExplanation(student),
    enabled: !!student
  });

  if (isLoading || !student) {
    return <AppShell title="Loading..."><div className="p-8 text-center animate-pulse">Loading student profile...</div></AppShell>;
  }

  const { name, avatar, tone, ring, concern } = student;
  const isRohan = name.includes("Rohan");

  return (
    <AppShell title={`${name}'s Story`}>
      {/* Header */}
      {/* Header and Health Score */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 bg-gradient-warm flex flex-col justify-center">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <div className="w-20 h-20 rounded-3xl bg-saffron/30 text-saffron-foreground flex items-center justify-center text-3xl font-bold mx-auto md:mx-0 mb-4">{avatar}</div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Grade 5B · Roll 14 · Marathi medium</div>
              <h2 className="text-2xl font-bold mt-1">{name}</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                {isRohan ? "Rohan is a curious child who loves drawing. He's been a little quiet this week." : "A bright student with great potential."}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <AppleHealthRings learning={45} attendance={70} engagement={82} support={60} size={140} />
              <div className="text-xs text-muted-foreground mt-2 font-medium tracking-wide">COMBINED HEALTH</div>
            </div>
          </div>
        </Card>

        {/* AI Explanation Panel */}
        <Card className="bg-secondary/40 border-saffron/20 relative overflow-hidden">
          {aiLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 backdrop-blur-sm z-10">
               <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                 <Sparkles size={16} className="text-saffron" /> VidyaSetu is analyzing...
               </div>
            </div>
          ) : null}
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-saffron font-semibold mb-3">
            <Sparkles size={14} /> Why is {name.split(" ")[0]} flagged?
          </div>
          <ul className="space-y-3">
            {aiData?.reasons?.map((reason: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-saffron mt-1.5 shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
            {!aiData && (
              <li className="flex gap-3 text-sm opacity-50">
                <div className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                <span>Awaiting AI analysis...</span>
              </li>
            )}
          </ul>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="bg-secondary/50 p-1 rounded-2xl inline-flex w-max">
            <TabsTrigger value="overview" className="rounded-xl px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
            <TabsTrigger value="attendance" className="rounded-xl px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Attendance</TabsTrigger>
            <TabsTrigger value="assessments" className="rounded-xl px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Assessments</TabsTrigger>
            <TabsTrigger value="interventions" className="rounded-xl px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Interventions</TabsTrigger>
            <TabsTrigger value="parents" className="rounded-xl px-4 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Parents & Notes</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-4 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Four health cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Calendar, label: "Attendance", v: 70, t: "watch" as const, sub: "Missed 3 days" },
              { icon: BookOpen, label: "Reading", v: 55, t: "urgent" as const, sub: "Below grade level" },
              { icon: Calculator, label: "Math", v: 78, t: "good" as const, sub: "On track" },
              { icon: Heart, label: "Wellbeing", v: 65, t: "watch" as const, sub: "Quiet this week" },
            ].map((m, i) => {
              const I = m.icon;
              return (
                <Card key={i}>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center">
                      <I size={18} />
                    </div>
                    <Ring value={m.v} tone={m.t} size={48} />
                  </div>
                  <div className="mt-3 text-sm font-semibold">{m.label}</div>
                  <div className="text-xs text-muted-foreground">{m.sub}</div>
                </Card>
              );
            })}
          </div>

          {/* Story: what happened / why / what next */}
          <div className="grid lg:grid-cols-3 gap-5 mt-6">
            <Card>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">What happened?</div>
              <p className="text-sm mt-2 leading-relaxed">
                Rohan's reading fluency dropped from 45 to 28 words per minute this month, and he missed school on three Mondays.
              </p>
            </Card>
            <Card className="border-saffron/40">
              <div className="text-xs uppercase tracking-wide text-saffron font-semibold">Why?</div>
              <p className="text-sm mt-2 leading-relaxed">
                His father started a new job in another district. The family is adjusting and Mondays have become difficult.
              </p>
            </Card>
            <Card className="bg-emerald/8 border-emerald/30">
              <div className="text-xs uppercase tracking-wide text-emerald font-semibold">What should happen next?</div>
              <p className="text-sm mt-2 leading-relaxed">
                A short paired-reading routine for 2 weeks, and a gentle call to his mother on Friday.
              </p>
              <button 
                onClick={() => toast.success("Care plan started. Teacher notified.")}
                className="mt-3 inline-flex items-center gap-2 bg-emerald text-emerald-foreground px-4 py-2 rounded-xl text-sm font-semibold"
              >
                Start this plan <ArrowRight size={14} />
              </button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="mt-4 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card>
            <SectionTitle>Monthly Attendance Record</SectionTitle>
            <div className="grid grid-cols-7 gap-2 text-center mt-4 max-w-lg">
              {['M','T','W','T','F','S','S'].map(d => (
                <div key={d} className="text-xs text-muted-foreground font-semibold">{d}</div>
              ))}
              {/* Empty days */}
              <div></div><div></div>
              {/* Days 1-30 */}
              {Array.from({length: 30}).map((_, i) => {
                const day = i + 1;
                // mock some absences
                const isAbsent = day === 5 || day === 12 || day === 19;
                return (
                  <div key={day} className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium ${isAbsent ? 'bg-saffron text-saffron-foreground' : 'bg-emerald/20 text-emerald'}`}>
                    {day}
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex gap-4 text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald/20 border border-emerald"></div> Present</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-saffron border border-saffron"></div> Absent</div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="mt-4 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card>
             <SectionTitle>Assessment History</SectionTitle>
             <div className="space-y-4">
               {[
                 { name: "Term 1 Math", date: "15 Oct", score: "78%", avg: "65%", status: "above" },
                 { name: "Marathi Reading", date: "02 Oct", score: "55%", avg: "70%", status: "below" },
                 { name: "Science Quiz", date: "28 Sep", score: "82%", avg: "75%", status: "above" },
               ].map((a, i) => (
                 <div key={i} className="flex justify-between items-center p-4 bg-secondary/50 rounded-2xl">
                   <div>
                     <div className="font-semibold">{a.name}</div>
                     <div className="text-xs text-muted-foreground">{a.date}</div>
                   </div>
                   <div className="text-right">
                     <div className={`font-bold ${a.status === 'above' ? 'text-emerald' : 'text-saffron'}`}>{a.score}</div>
                     <div className="text-xs text-muted-foreground">Class Avg: {a.avg}</div>
                   </div>
                 </div>
               ))}
             </div>
          </Card>
        </TabsContent>

        <TabsContent value="interventions" className="mt-4 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-5">
            <Card>
              <SectionTitle hint="Like a treatment record">Intervention history</SectionTitle>
              <ol className="relative border-l-2 border-dashed border-border ml-3 space-y-5">
                {[
                  { d: "12 Aug", t: "Paired reading started", tone: "good" as const, note: "With Sneha · 15 min daily" },
                  { d: "21 Aug", t: "Mother contacted", tone: "good" as const, note: "Shared a weekly plan via WhatsApp" },
                  { d: "2 Sep", t: "Reading reassessment", tone: "watch" as const, note: "Improved to 36 wpm" },
                  { d: "Today", t: "New plan suggested", tone: "watch" as const, note: "Continue 2 more weeks" },
                ].map((p, i) => (
                  <li key={i} className="ml-5">
                    <span className={`absolute -left-[9px] w-4 h-4 rounded-full ring-4 ring-card ${
                      p.tone === "good" ? "bg-emerald" : "bg-saffron"
                    }`} />
                    <div className="text-xs text-muted-foreground">{p.d}</div>
                    <div className="text-sm font-semibold">{p.t}</div>
                    <div className="text-sm text-muted-foreground">{p.note}</div>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="bg-primary text-primary-foreground h-max relative overflow-hidden">
              {aiLoading ? (
                 <div className="absolute inset-0 flex items-center justify-center bg-primary/80 backdrop-blur-sm z-10">
                   <div className="flex items-center gap-2 text-sm text-primary-foreground/80 animate-pulse">
                     <Sparkles size={16} className="text-saffron" /> Generating recommendations...
                   </div>
                 </div>
              ) : null}
              <div className="flex items-center gap-2 text-xs opacity-80 uppercase tracking-wide mb-3">
                <Sparkles size={14} className="text-saffron" /> Intervention Recommendations
              </div>
              <div className="space-y-3">
                {aiData?.recommendations?.map((rec: any, i: number) => (
                  <div key={i} className="bg-white/10 rounded-xl p-3">
                    <div className="font-semibold text-sm">{rec.title}</div>
                    <div className="text-xs opacity-80 mt-1">{rec.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => toast.success("Top suggestion applied to care plan.")}
                  className="bg-saffron text-saffron-foreground px-4 py-2.5 rounded-xl text-sm font-semibold flex-1"
                >
                  Apply Top Suggestion
                </button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="parents" className="mt-4 outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="grid md:grid-cols-2 gap-5">
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-secondary text-primary flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <div className="font-semibold">Parent engagement</div>
                  <div className="text-xs text-muted-foreground">Mother responds within a day · WhatsApp</div>
                </div>
                <HealthDot tone="good" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {["Mon", "Wed", "Fri"].map((d) => (
                  <div key={d} className="rounded-xl bg-secondary py-2">
                    <div className="text-xs text-muted-foreground">{d}</div>
                    <CheckCircle2 size={16} className="text-emerald mx-auto mt-1" />
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-card border border-border/60 rounded-xl">
                  <MessageCircle size={16} className="mt-1 text-primary" />
                  <div>
                    <div className="text-sm font-medium">WhatsApp message sent</div>
                    <div className="text-xs text-muted-foreground">2 days ago · Read</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-card border border-border/60 rounded-xl">
                  <Calendar size={16} className="mt-1 text-primary" />
                  <div>
                    <div className="text-sm font-medium">In-person PTM attended</div>
                    <div className="text-xs text-muted-foreground">1 month ago</div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <SectionTitle>Teacher Notes</SectionTitle>
              <div className="space-y-4">
                <div className="bg-saffron/10 p-3 rounded-xl">
                  <div className="text-xs font-semibold text-saffron-foreground mb-1">Observation · 2 weeks ago</div>
                  <div className="text-sm">Rohan enjoys drawing animals. Maybe incorporate this into reading practice.</div>
                </div>
                <button 
                  onClick={() => toast.info("Opening note editor...")}
                  className="w-full py-3 rounded-xl border border-dashed border-primary/50 text-primary font-medium text-sm flex items-center justify-center gap-2 hover:bg-secondary transition"
                >
                  <Edit3 size={16} /> Add a new note
                </button>
              </div>
            </Card>
           </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
