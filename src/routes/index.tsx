import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { useAuth, Role } from "@/contexts/AuthContext";
import { Users, School, MapPin, Building2, ArrowRight, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VidyaSetu AI — A daily companion for Indian schools" },
      { name: "description", content: "Offline-first, multilingual school intelligence and early intervention platform built for teachers, principals, and education officers across India." },
      { property: "og:title", content: "VidyaSetu AI" },
      { property: "og:description", content: "A warm, human-centered operating system for every Indian school." },
    ],
  }),
  component: Index,
});

const roles = [
  {
    id: "teacher",
    to: "/teacher",
    title: "Teacher",
    sub: "Your daily classroom companion",
    icon: Users,
    color: "from-saffron/90 to-saffron/60",
    note: "Anita Ma'am · Grade 5B",
  },
  {
    id: "principal",
    to: "/principal",
    title: "Principal",
    sub: "Feel the pulse of your school",
    icon: School,
    color: "from-emerald/90 to-emerald/60",
    note: "Sarojini Vidyalaya",
  },
  {
    id: "district",
    to: "/district",
    title: "District Officer",
    sub: "See every school on the map",
    icon: MapPin,
    color: "from-indigo-deep to-primary/70",
    note: "Pune Zilla · 412 schools",
  },
  {
    id: "state",
    to: "/state",
    title: "State Administrator",
    sub: "Stories of progress, district by district",
    icon: Building2,
    color: "from-primary to-saffron/80",
    note: "Maharashtra · 1.1 Cr students",
  },
];

function Index() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string, to: string) => {
    login({
      id: "mock-user-1",
      name: roleId === "teacher" ? "Anita Sharma" : roleId === "principal" ? "Principal" : "Admin",
      role: roleId as Role,
    });
    navigate({ to });
  };

  return (
    <AppShell title="Welcome">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-indigo text-primary-foreground p-8 md:p-12 mb-8 shadow-soft">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-saffron/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-emerald/30 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-4">
            <Sparkles size={14} className="text-saffron" />
            शिक्षा के लिए एक नया साथी
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">
            A calm, caring assistant for every classroom in India.
          </h1>
          <p className="text-base md:text-lg opacity-85 mb-6">
            VidyaSetu helps teachers spot students who need a little extra care, suggests gentle next steps, and works beautifully offline — in your language.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/teacher"
              className="inline-flex items-center gap-2 bg-saffron text-saffron-foreground px-5 py-3 rounded-2xl font-semibold hover:opacity-95 transition"
            >
              Start the day
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/student/anita-001"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 px-5 py-3 rounded-2xl font-semibold transition"
            >
              <Heart size={16} /> See a student story
            </Link>
          </div>
        </div>
      </section>

      <h2 className="text-lg font-semibold mb-4">Who is using VidyaSetu today?</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {roles.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.to}
              onClick={() => handleRoleSelect(r.id, r.to)}
              className="text-left group bg-card rounded-3xl p-6 shadow-card border border-border/60 hover:-translate-y-0.5 hover:shadow-soft transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-primary-foreground mb-4`}>
                <Icon size={26} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{r.title}</div>
                  <div className="text-sm text-muted-foreground">{r.sub}</div>
                  <div className="text-xs text-muted-foreground/80 mt-1">{r.note}</div>
                </div>
                <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
              </div>
            </button>
          );
        })}
      </div>

      <Card className="mt-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald/15 text-emerald flex items-center justify-center">
          <Sparkles size={22} />
        </div>
        <div className="flex-1">
          <div className="font-semibold">VidyaSetu noticed something today</div>
          <p className="text-sm text-muted-foreground">
            “Attendance in Grade 7 has dipped this week. Would you like to plan a parent outreach?”
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">Yes, help me</button>
      </Card>
    </AppShell>
  );
}
