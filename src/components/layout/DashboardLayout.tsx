import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Zap, ListChecks, Users, Wallet, Star,
  Trophy, LogOut, ChevronRight, Bell, Menu, X, Settings,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Zap, label: "Offerwall", path: "/dashboard/offers" },
  { icon: ListChecks, label: "Task History", path: "/dashboard/tasks" },
  { icon: Users, label: "Referrals", path: "/dashboard/referrals" },
  { icon: Wallet, label: "Withdrawals", path: "/dashboard/withdraw" },
  { icon: Trophy, label: "Leaderboard", path: "/dashboard/leaderboard" },
  { icon: Star, label: "VIP", path: "/dashboard/vip" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center shadow-gold">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg gold-text">ZainCash Pro</span>
        </Link>
      </div>

      {/* User Card */}
      <div className="p-4">
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center font-bold text-primary-foreground shadow-gold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">Ahmed Mohamed</div>
            <div className="text-xs text-muted-foreground truncate">ahmed@example.com</div>
          </div>
          <span className="badge-gold text-xs">VIP</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface"
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? "text-primary" : "group-hover:text-foreground"}`} />
              {item.label}
              {isActive && <ChevronRight className="w-3 h-3 ml-auto text-primary" />}
              {item.label === "VIP" && !isActive && <Star className="w-3 h-3 ml-auto text-warning" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-border space-y-2">
        <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-surface transition-colors">
          <ShieldCheck className="w-4 h-4" /> Admin Panel
        </Link>
        <Link to="/login" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-destructive hover:bg-destructive-dim transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border" style={{ background: "hsl(var(--background-secondary))" }}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 border-r border-border flex flex-col z-10" style={{ background: "hsl(var(--background-secondary))" }}>
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-border px-6 flex items-center gap-4" style={{ background: "hsl(var(--background-secondary))" }}>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground font-bold">3</span>
          </button>
          <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 hidden sm:flex">
            <Star className="w-3.5 h-3.5 mr-1.5" /> Upgrade VIP
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
