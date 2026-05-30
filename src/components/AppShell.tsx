import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  Users,
  MapPin,
  Heart,
  Sparkles,
  Globe,
  Wifi,
  WifiOff,
  CloudCheck,
  School,
  Building2,
  Activity,
  Settings,
  Bell,
  ShieldAlert,
  MessageCircle
} from "lucide-react";
import { SaarthiChat } from "./SaarthiChat";

const getNavLinks = (role: string | null | undefined) => {
  const common = [
    { to: "/", label: "Roles", icon: Home },
  ];
  if (!role) return common;
  
  if (role === "teacher") {
    return [
      ...common,
      { to: "/teacher", label: "Teacher", icon: Users },
      { to: "/student/anita-001", label: "Student", icon: Heart },
      { to: "/early-warnings", label: "Early Warnings", icon: ShieldAlert },
      { to: "/interventions", label: "Interventions", icon: Activity },
    ];
  }
  if (role === "principal") {
    return [
      ...common,
      { to: "/principal", label: "Principal", icon: School },
      { to: "/early-warnings", label: "Early Warnings", icon: ShieldAlert },
      { to: "/interventions", label: "Interventions", icon: Activity },
    ];
  }
  if (role === "district") {
    return [
      ...common,
      { to: "/district", label: "District", icon: MapPin },
      { to: "/early-warnings", label: "Early Warnings", icon: ShieldAlert },
      { to: "/interventions", label: "Interventions", icon: Activity },
    ];
  }
  if (role === "state") {
    return [
      ...common,
      { to: "/state", label: "State", icon: Building2 },
      { to: "/early-warnings", label: "Early Warnings", icon: ShieldAlert },
      { to: "/interventions", label: "Interventions", icon: Activity },
    ];
  }
  return common;
};

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const nav = getNavLinks(user?.role);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar text-sidebar-foreground p-5 sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-gradient-saffron flex items-center justify-center text-saffron-foreground font-bold">
            वि
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">VidyaSetu</div>
            <div className="text-xs opacity-70">AI for every school</div>
          </div>
        </Link>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => {
            const Icon = n.icon;
            const active =
              n.to === "/"
                ? loc.pathname === "/"
                : loc.pathname.startsWith(n.to.split("/").slice(0, 2).join("/"));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                }`}
              >
                <Icon size={18} />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-sidebar-border space-y-2">
          {user ? (
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="font-semibold truncate">{user.name}</div>
                <div className="text-xs opacity-70 capitalize truncate">{user.role}</div>
              </div>
              <button onClick={() => { logout(); navigate({ to: "/" }); }} className="text-xs underline opacity-70">Logout</button>
            </div>
          ) : null}
          <button 
            onClick={() => setChatOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent transition"
          >
            <Sparkles size={18} className="text-saffron" />
            Ask VidyaSetu
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <TopBar title={title} onOpenChat={() => setChatOpen(true)} />
        <main className="p-5 md:p-8 max-w-7xl mx-auto relative">
          {children}
        </main>
      </div>

      {chatOpen && <SaarthiChat onClose={() => setChatOpen(false)} />}
      
      {/* Floating Action Button for mobile */}
      {!chatOpen && (
        <button 
          onClick={() => setChatOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-saffron text-saffron-foreground rounded-full shadow-lg flex items-center justify-center z-40 hover:scale-105 transition-transform"
        >
          <Sparkles size={24} />
        </button>
      )}
    </div>
  );
}

export function TopBar({ title, onOpenChat }: { title?: string, onOpenChat?: () => void }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-background/80 border-b border-border">
      <div className="flex items-center justify-between px-5 md:px-8 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link to="/" className="lg:hidden w-9 h-9 rounded-xl bg-gradient-saffron flex items-center justify-center text-saffron-foreground font-bold text-sm">
            वि
          </Link>
          <h1 className="font-semibold text-lg text-foreground">{title ?? "VidyaSetu"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <OfflineBadge status="updated" />
          <LangPill />
          <button onClick={onOpenChat} className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-saffron hover:bg-secondary transition relative">
            <MessageCircle size={18} />
          </button>
          <Link to="/notifications" className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-muted-foreground hover:bg-secondary transition relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive"></span>
          </Link>
          <Link to="/settings" className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-muted-foreground hover:bg-secondary transition">
            <Settings size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function LangPill() {
  return (
    <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition">
      <Globe size={14} />
      <span className="hidden sm:inline">हिं</span>
      <span className="hidden md:inline opacity-60">/ EN</span>
    </button>
  );
}

export function OfflineBadge({
  status,
}: {
  status: "offline" | "syncing" | "updated" | "no-internet";
}) {
  const map = {
    offline: { icon: WifiOff, label: "Available offline", cls: "bg-accent text-accent-foreground" },
    syncing: { icon: CloudCheck, label: "Syncing…", cls: "bg-secondary text-secondary-foreground" },
    updated: { icon: CloudCheck, label: "All updated", cls: "bg-emerald/15 text-emerald" },
    "no-internet": { icon: WifiOff, label: "No internet", cls: "bg-saffron/20 text-foreground" },
  } as const;
  const item = map[status];
  const Icon = item.icon;
  return (
    <span className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${item.cls}`}>
      <Icon size={12} />
      {item.label}
    </span>
  );
}

export function HealthDot({
  tone,
  pulse,
}: {
  tone: "good" | "watch" | "urgent";
  pulse?: boolean;
}) {
  const cls = {
    good: "bg-health-good",
    watch: "bg-health-watch",
    urgent: "bg-health-urgent",
  }[tone];
  return (
    <span className={`relative inline-flex w-2.5 h-2.5 rounded-full ${cls} ${pulse && tone !== "good" ? "animate-pulse-ring" : ""}`} />
  );
}

export function Ring({ value, tone = "good", size = 64 }: { value: number; tone?: "good" | "watch" | "urgent"; size?: number }) {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  const color = tone === "good" ? "var(--health-good)" : tone === "watch" ? "var(--health-watch)" : "var(--health-urgent)";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--border)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          fill="none"
          style={{ transition: "stroke-dashoffset 600ms" }}
        />
      </svg>
      <span className="absolute text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-card rounded-3xl p-5 shadow-card border border-border/60 ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <h2 className="text-base font-semibold text-foreground">{children}</h2>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

export function AppleHealthRings({ 
  learning, 
  attendance, 
  engagement, 
  support, 
  size = 140 
}: { 
  learning: number; 
  attendance: number; 
  engagement: number; 
  support: number;
  size?: number;
}) {
  const stroke = size * 0.08;
  const gap = stroke * 0.4;
  
  // Calculate radii
  const r1 = (size - stroke) / 2;
  const r2 = r1 - stroke - gap;
  const r3 = r2 - stroke - gap;
  const r4 = r3 - stroke - gap;

  // Colors mapping to tones
  const colors = [
    { value: learning, color: "var(--health-watch)", bg: "oklch(0.78 0.16 65 / 0.15)" }, // Saffron for Learning
    { value: attendance, color: "var(--health-good)", bg: "oklch(0.65 0.14 155 / 0.15)" }, // Emerald for Attendance
    { value: engagement, color: "var(--primary)", bg: "oklch(0.4 0.25 280 / 0.15)" }, // Primary for Engagement
    { value: support, color: "var(--health-urgent)", bg: "oklch(0.62 0.21 25 / 0.15)" }, // Destructive for Support
  ];

  const rings = [r1, r2, r3, r4].map((r, i) => {
    const c = 2 * Math.PI * r;
    const off = c - (colors[i].value / 100) * c;
    return { r, c, off, ...colors[i] };
  });

  return (
    <div className="relative inline-flex items-center justify-center bg-card rounded-full p-2 shadow-inner border border-border/40" style={{ width: size + 16, height: size + 16 }}>
      <svg width={size} height={size} className="-rotate-90 drop-shadow-sm">
        {rings.map((ring, i) => (
          <g key={i}>
            {/* Background track */}
            <circle cx={size / 2} cy={size / 2} r={ring.r} stroke={ring.bg} strokeWidth={stroke} fill="none" />
            {/* Progress track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={ring.r}
              stroke={ring.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={ring.c}
              strokeDashoffset={ring.off}
              fill="none"
              style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
