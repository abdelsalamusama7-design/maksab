import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart2, Users, DollarSign, ShieldAlert, Wallet, Settings,
  Zap, LogOut, Menu, X, Bell, TrendingUp, Activity, ListChecks,
  ChevronRight, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  { icon: BarChart2, label: "Analytics", path: "/admin" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Wallet, label: "Withdrawals", path: "/admin/withdrawals" },
  { icon: ShieldAlert, label: "Fraud Flags", path: "/admin/fraud" },
  { icon: DollarSign, label: "Balance Adjust", path: "/admin/balance" },
  { icon: ListChecks, label: "Offers", path: "/admin/offers" },
  { icon: FileText, label: "System Logs", path: "/admin/logs" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export default function AdminLayout({ children, currentPath = "/admin" }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <span className="font-heading font-bold text-base gold-text block">ZainCash Pro</span>
            <span className="text-xs text-destructive font-semibold">Admin Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-1 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Management</div>
        {adminNavItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.label === "Fraud Flags" && (
                <span className="ml-auto w-5 h-5 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground font-bold">4</span>
              )}
              {isActive && <ChevronRight className="w-3 h-3 ml-auto text-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-surface transition-colors">
          <Activity className="w-4 h-4" /> User Dashboard
        </Link>
        <Link to="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-destructive hover:bg-destructive-dim transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border" style={{ background: "hsl(var(--background-secondary))" }}>
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 border-r border-border flex flex-col z-10" style={{ background: "hsl(var(--background-secondary))" }}>
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border px-6 flex items-center gap-4" style={{ background: "hsl(var(--background-secondary))" }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Admin</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium">Control Panel</span>
          </div>
          <div className="flex-1" />
          <button className="relative text-muted-foreground hover:text-foreground">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground font-bold">4</span>
          </button>
          <div className="glass-card px-3 py-1.5 flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-muted-foreground">System Online</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
