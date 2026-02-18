import AdminLayout from "@/components/layout/AdminLayout";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter";
import { Button } from "@/components/ui/button";

import {
  Users, DollarSign, ShieldAlert, CheckCircle,
  XCircle, Clock, Eye, Ban, AlertTriangle, Activity,
  ArrowUpRight, ArrowDownRight, ChevronRight
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const kpiCards = [
  { label: "Total Revenue", value: 28450, prefix: "$", change: "+12.4%", up: true, icon: DollarSign, color: "text-success", gradient: "from-success/10" },
  { label: "Active Users", value: 48290, prefix: "", suffix: "", decimals: 0, change: "+8.1%", up: true, icon: Users, color: "text-info", gradient: "from-info/10" },
  { label: "Pending Payouts", value: 4820, prefix: "$", change: "-3.2%", up: false, icon: Clock, color: "text-warning", gradient: "from-warning/10" },
  { label: "Fraud Alerts", value: 4, prefix: "", suffix: " flags", decimals: 0, change: "+2 today", up: false, icon: ShieldAlert, color: "text-destructive", gradient: "from-destructive/10" },
];

const earningsData = [
  { day: "Mon", revenue: 1200, payouts: 780 },
  { day: "Tue", revenue: 1850, payouts: 1200 },
  { day: "Wed", revenue: 1400, payouts: 910 },
  { day: "Thu", revenue: 2100, payouts: 1365 },
  { day: "Fri", revenue: 2800, payouts: 1820 },
  { day: "Sat", revenue: 3200, payouts: 2080 },
  { day: "Sun", revenue: 2600, payouts: 1690 },
];

const withdrawals = [
  { user: "Ahmed M.", amount: "$45.00", method: "USDT TRC20", status: "pending", date: "2h ago", risk: "low" },
  { user: "Sara K.", amount: "$120.00", method: "Vodafone Cash", status: "pending", date: "4h ago", risk: "medium" },
  { user: "Omar F.", amount: "$18.50", method: "USDT TRC20", status: "approved", date: "5h ago", risk: "low" },
  { user: "Layla H.", amount: "$85.00", method: "Vodafone Cash", status: "rejected", date: "1d ago", risk: "high" },
  { user: "Karim A.", amount: "$32.00", method: "USDT TRC20", status: "pending", date: "2d ago", risk: "low" },
];

const fraudAlerts = [
  { user: "user_8821", issue: "VPN detected on login", severity: "high", time: "30m ago" },
  { user: "user_2340", issue: "Duplicate device fingerprint", severity: "high", time: "1h ago" },
  { user: "user_5510", issue: "Abnormal conversion rate: 98%", severity: "medium", time: "3h ago" },
  { user: "user_7731", issue: "IP shared with 3 accounts", severity: "medium", time: "5h ago" },
];

const recentUsers = [
  { name: "Ahmed Mohamed", email: "ahmed@ex.com", joined: "2h ago", status: "active", balance: "$47.82" },
  { name: "Sara Khalil", email: "sara@ex.com", joined: "5h ago", status: "active", balance: "$122.10" },
  { name: "Omar Farouk", email: "omar@ex.com", joined: "1d ago", status: "flagged", balance: "$8.50" },
  { name: "Layla Hassan", email: "layla@ex.com", joined: "2d ago", status: "banned", balance: "$0.00" },
];

const COLORS = ["hsl(42 95% 55%)", "hsl(142 71% 45%)", "hsl(211 85% 58%)", "hsl(4 86% 58%)"];
const pieData = [
  { name: "Surveys", value: 45 },
  { name: "Installs", value: 30 },
  { name: "Videos", value: 15 },
  { name: "Trials", value: 10 },
];

export default function AdminDashboard() {
  const statusBadge = (s: string) => {
    if (s === "pending") return <span className="badge-warning">Pending</span>;
    if (s === "approved") return <span className="badge-success">Approved</span>;
    if (s === "rejected") return <span className="badge-danger">Rejected</span>;
    return null;
  };

  const riskBadge = (r: string) => {
    if (r === "high") return <span className="badge-danger">{r}</span>;
    if (r === "medium") return <span className="badge-warning">{r}</span>;
    return <span className="badge-success">{r}</span>;
  };

  const userStatusBadge = (s: string) => {
    if (s === "active") return <span className="badge-success">Active</span>;
    if (s === "flagged") return <span className="badge-warning">Flagged</span>;
    return <span className="badge-danger">Banned</span>;
  };

  const severityIcon = (s: string) =>
    s === "high" ? <AlertTriangle className="w-4 h-4 text-destructive" /> : <AlertTriangle className="w-4 h-4 text-warning" />;

  return (
    <AdminLayout currentPath="/admin">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Platform overview — Last updated: just now</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-card px-3 py-1.5 text-xs flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-success" />
              <span className="text-muted-foreground">48,290 online</span>
            </div>
            <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 text-xs">
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiCards.map((card) => (
            <div key={card.label} className={`glass-card p-5 relative overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} to-transparent opacity-40`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-surface-elevated flex items-center justify-center">
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${card.up ? "text-success" : "text-destructive"}`}>
                    {card.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {card.change}
                  </div>
                </div>
                <div className={`font-heading font-bold text-2xl mb-1 ${card.color}`}>
                  <AnimatedCounter
                    value={card.value}
                    prefix={card.prefix}
                    suffix={(card as any).suffix || ""}
                    decimals={(card as any).decimals ?? 2}
                  />
                </div>
                <div className="text-xs text-muted-foreground">{card.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Earnings Chart */}
          <div className="lg:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-heading font-semibold">Revenue vs Payouts</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Last 7 days</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary" />Revenue</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-success" />Payouts</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(42 95% 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(42 95% 55%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="payouts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(42 95% 55%)" strokeWidth={2} fill="url(#revenue)" />
                <Area type="monotone" dataKey="payouts" stroke="hsl(142 71% 45%)" strokeWidth={2} fill="url(#payouts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Offer Categories Pie */}
          <div className="glass-card p-5">
            <h2 className="font-heading font-semibold mb-1">Offer Categories</h2>
            <p className="text-xs text-muted-foreground mb-4">Earnings distribution</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                  <span className="flex-1 text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Withdrawal Queue */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading font-semibold">Withdrawal Queue</h2>
                <p className="text-xs text-muted-foreground mt-0.5">3 pending approval</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">All <ChevronRight className="w-3 h-3" /></Button>
            </div>
            <div className="space-y-3">
              {withdrawals.map((w) => (
                <div key={w.user + w.amount} className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-surface-elevated transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0 shadow-gold">
                    {w.user[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{w.user}</span>
                      {riskBadge(w.risk)}
                    </div>
                    <div className="text-xs text-muted-foreground">{w.method} · {w.date}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-semibold text-sm text-success">{w.amount}</div>
                    {statusBadge(w.status)}
                  </div>
                  {w.status === "pending" && (
                    <div className="flex gap-1 shrink-0">
                      <button className="w-7 h-7 rounded-lg bg-success/20 flex items-center justify-center hover:bg-success/30 transition-colors">
                        <CheckCircle className="w-3.5 h-3.5 text-success" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-destructive/20 flex items-center justify-center hover:bg-destructive/30 transition-colors">
                        <XCircle className="w-3.5 h-3.5 text-destructive" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Fraud Alerts */}
          <div className="glass-card p-5 border-destructive/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-destructive" />
                  Fraud Alerts
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">4 active flags require review</p>
              </div>
              <span className="badge-danger">4 Active</span>
            </div>
            <div className="space-y-3">
              {fraudAlerts.map((alert) => (
                <div key={alert.user} className="p-3 rounded-xl bg-surface border border-border hover:border-destructive/30 transition-colors">
                  <div className="flex items-start gap-3">
                    {severityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium font-mono">{alert.user}</span>
                        <span className={alert.severity === "high" ? "badge-danger" : "badge-warning"}>{alert.severity}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{alert.issue}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-surface-elevated text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold">Recent Users</h2>
            <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">Manage All <ChevronRight className="w-3 h-3" /></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left pb-3 font-medium">User</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-left pb-3 font-medium hidden sm:table-cell">Joined</th>
                  <th className="text-right pb-3 font-medium">Balance</th>
                  <th className="text-right pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {recentUsers.map((user) => (
                  <tr key={user.email} className="border-b border-border/50 hover:bg-surface transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-xs font-bold shadow-gold">
                          {user.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">{userStatusBadge(user.status)}</td>
                    <td className="py-3 text-xs text-muted-foreground hidden sm:table-cell">{user.joined}</td>
                    <td className="py-3 text-right font-semibold text-success text-sm">{user.balance}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-surface-elevated text-muted-foreground hover:text-foreground transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

