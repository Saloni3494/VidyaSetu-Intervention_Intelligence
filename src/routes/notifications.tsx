import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card } from "@/components/AppShell";
import { mockNotifications } from "@/lib/dummy-data";
import { CheckCircle2, AlertTriangle, Info, Bell } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <AppShell title="Notifications">
      <div className="max-w-3xl space-y-4">
        {mockNotifications.map(n => {
          const Icon = n.type === 'urgent' ? AlertTriangle : n.type === 'success' ? CheckCircle2 : Info;
          const color = n.type === 'urgent' ? 'text-destructive bg-destructive/10' : n.type === 'success' ? 'text-emerald bg-emerald/10' : 'text-primary bg-primary/10';
          return (
            <Card key={n.id} className={`flex gap-4 p-4 ${n.read ? 'opacity-75' : ''}`}>
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                 <Icon size={20} />
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-start">
                   <h3 className="font-semibold text-base">{n.title}</h3>
                   <span className="text-xs text-muted-foreground">{n.time}</span>
                 </div>
                 <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                 {!n.read && (
                   <div className="mt-3">
                     <button 
                       onClick={() => toast.success("Marked as read")}
                       className="text-xs font-semibold text-primary inline-flex items-center gap-1"
                     >
                       Mark as read
                     </button>
                   </div>
                 )}
               </div>
            </Card>
          )
        })}
        {mockNotifications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Bell size={48} className="mx-auto mb-4 opacity-20" />
            <p>You're all caught up!</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
