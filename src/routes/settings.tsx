import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, SectionTitle } from "@/components/AppShell";
import { Bell, Shield, User, Globe, Moon, Monitor } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("system");
  const [lang, setLang] = useState("en");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <AppShell title="Settings">
      <div className="max-w-3xl space-y-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-secondary flex items-center justify-center text-2xl font-bold">
              {user?.name.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name || "Guest User"}</h2>
              <p className="text-sm text-muted-foreground capitalize">{user?.role || "No Role"} · vidyasetu@example.com</p>
            </div>
          </div>
          <div className="mt-6">
            <button className="text-sm font-medium text-primary hover:underline" onClick={() => logout()}>Log out of all devices</button>
          </div>
        </Card>

        <Card>
          <SectionTitle>Preferences</SectionTitle>
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center">
                  <Globe size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">Language</div>
                  <div className="text-xs text-muted-foreground">Select your preferred app language</div>
                </div>
              </div>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-secondary rounded-xl px-4 py-2 text-sm focus:outline-none">
                <option value="en">English (EN)</option>
                <option value="hi">Hindi (HI)</option>
                <option value="mr">Marathi (MR)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary text-primary flex items-center justify-center">
                  <Moon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">Theme</div>
                  <div className="text-xs text-muted-foreground">Choose dark mode or light mode</div>
                </div>
              </div>
              <select value={theme} onChange={(e) => setTheme(e.target.value)} className="bg-secondary rounded-xl px-4 py-2 text-sm focus:outline-none">
                <option value="system">System Default</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
