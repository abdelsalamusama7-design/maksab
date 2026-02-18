import DashboardLayout from "@/components/layout/DashboardLayout";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign, TrendingUp, Clock, Award, Zap, Copy, Users,
  ChevronRight, Star, Gift, Flame, ExternalLink, Wallet,
  CheckCircle, XCircle, AlertCircle, Trophy
} from "lucide-react";
import { useState } from "react";

const balanceCards = [
  { label: "Available Balance", value: 47.82, prefix: "$", color: "text-success", icon: DollarSign, glow: "shadow-green", gradient: "from-success/10 to-transparent", badge: "Withdrawable" },
  { label: "Pending Earnings", value: 8.45, prefix: "$", color: "text-warning", icon: Clock, glow: "", gradient: "from-warning/10 to-transparent", badge: "Processing" },
  { label: "Lifetime Earnings", value: 312.60, prefix: "$", color: "text-primary", icon: TrendingUp, glow: "shadow-gold", gradient: "from-primary/10 to-transparent", badge: "All Time" },
  { label: "Points Balance", value: 12450, prefix: "", suffix: " pts", color: "text-info", decimals: 0, icon: Award, glow: "", gradient: "from-info/10 to-transparent", badge: "Redeemable" },
];

const recentTasks = [
  { name: "Survey - Electronics", amount: "+$1.20", status: "completed", time: "2h ago" },
  { name: "App Install - Gaming", amount: "+$0.85", status: "completed", time: "5h ago" },
  { name: "Video Offer - Finance", amount: "+$2.50", status: "pending", time: "8h ago" },
  { name: "Survey - Automotive", amount: "+$0.60", status: "completed", time: "1d ago" },
  { name: "Referral Bonus - L1", amount: "+$0.45", status: "completed", time: "2d ago" },
];

const offers = [
  { title: "Complete Finance Survey", reward: "$2.80", time: "10 min", category: "Survey", hot: true },
  { title: "Install VPN App + Use 5 min", reward: "$1.50", time: "5 min", category: "Install", hot: false },
  { title: "Sign up for Gaming Platform", reward: "$4.00", time: "15 min", category: "Registration", hot: true },
  { title: "Watch 10 Ads", reward: "$0.30", time: "3 min", category: "Video", hot: false },
  { title: "Answer Health Quiz", reward: "$1.10", time: "7 min", category: "Survey", hot: false },
  { title: "Premium App Trial", reward: "$6.50", time: "20 min", category: "Trial", hot: true },
];

const achievements = [
  { icon: Flame, label: "7-Day Streak", unlocked: true },
  { icon: DollarSign, label: "First Withdrawal", unlocked: true },
  { icon: Users, label: "5 Referrals", unlocked: true },
  { icon: Trophy, label: "Top 100", unlocked: false },
  { icon: Star, label: "VIP Member", unlocked: false },
  { icon: Award, label: "$100 Earned", unlocked: true },
];

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const referralCode = "ZAINCASH-AHMED2025";

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://zaincash.pro/ref/${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusIcon = (s: string) => {
    if (s === "completed") return <CheckCircle className="w-3.5 h-3.5 text-success" />;
    if (s === "pending") return <AlertCircle className="w-3.5 h-3.5 text-warning" />;
    return <XCircle className="w-3.5 h-3.5 text-destructive" />;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl">Welcome back, Ahmed! 👋</h1>
            <p className="text-muted-foreground text-sm mt-1">You have 6 new offers available. Keep earning!</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm">
              <Flame className="w-4 h-4 text-warning" />
              <span className="font-semibold">7-Day Streak</span>
            </div>
            <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90">
              <Gift className="w-3.5 h-3.5 mr-1.5" /> Claim Bonus
            </Button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {balanceCards.map((card) => (
            <div key={card.label} className={`glass-card p-5 relative overflow-hidden ${card.glow}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-40`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-surface-elevated flex items-center justify-center">
                    <card.icon className={`w-4.5 h-4.5 ${card.color}`} style={{ width: 18, height: 18 }} />
                  </div>
                  <span className={`badge-gold text-xs`}>{card.badge}</span>
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
          {/* Offerwall */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-lg">Available Offers</h2>
              <Button variant="ghost" size="sm" className="text-primary text-xs gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {offers.map((offer) => (
                <div key={offer.title} className="glass-card p-4 hover:border-primary/30 transition-all duration-200 cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <span className="badge-info text-xs">{offer.category}</span>
                    {offer.hot && <span className="badge-danger text-xs flex items-center gap-1"><Flame className="w-3 h-3" /> Hot</span>}
                  </div>
                  <h3 className="font-medium text-sm mb-3 leading-snug group-hover:text-primary transition-colors">{offer.title}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-lg text-success">{offer.reward}</div>
                      <div className="text-xs text-muted-foreground">~{offer.time}</div>
                    </div>
                    <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold text-xs shadow-gold hover:opacity-90">
                      Start <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Offerwall iframe placeholder */}
            <div className="glass-card p-6 text-center border-dashed">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">CPX Research Offerwall</h3>
              <p className="text-xs text-muted-foreground mb-3">External offerwall loads here via secure API integration</p>
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Open Full Offerwall
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* VIP Card */}
            <div className="glass-card p-5 border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="font-heading font-semibold">VIP Membership</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Unlock +10% earnings boost & priority withdrawals</p>
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Monthly progress</span>
                    <span className="text-primary font-medium">$3.20 / $5.00</span>
                  </div>
                  <Progress value={64} className="h-1.5" />
                </div>
                <Button className="w-full bg-gradient-gold text-primary-foreground font-semibold text-sm shadow-gold hover:opacity-90">
                  Upgrade for $5/mo
                </Button>
              </div>
            </div>

            {/* Referral */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-info" />
                <span className="font-heading font-semibold">Referral Link</span>
              </div>
              <div className="bg-surface rounded-lg p-3 text-xs font-mono text-muted-foreground mb-3 truncate">
                zaincash.pro/ref/{referralCode.toLowerCase()}
              </div>
              <Button
                onClick={copyReferral}
                variant="outline"
                className="w-full border-border hover:border-primary/30 hover:bg-primary/5 text-sm gap-2"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-surface rounded-lg p-2 text-center">
                  <div className="font-heading font-bold text-lg text-primary">12</div>
                  <div className="text-xs text-muted-foreground">L1 Refs</div>
                </div>
                <div className="bg-surface rounded-lg p-2 text-center">
                  <div className="font-heading font-bold text-lg text-info">$18.40</div>
                  <div className="text-xs text-muted-foreground">Ref Earnings</div>
                </div>
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-semibold">Recent Activity</span>
                <Button variant="ghost" size="sm" className="text-xs text-primary p-0 h-auto gap-1">
                  All <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.name} className="flex items-center gap-3">
                    {statusIcon(task.status)}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{task.name}</div>
                      <div className="text-xs text-muted-foreground">{task.time}</div>
                    </div>
                    <span className={`text-xs font-bold ${task.status === "completed" ? "text-success" : "text-warning"}`}>
                      {task.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading font-semibold">Achievements</h2>
              <p className="text-xs text-muted-foreground mt-0.5">4 of 6 badges unlocked</p>
            </div>
            <Progress value={66} className="w-24 h-1.5" />
          </div>
          <div className="flex flex-wrap gap-3">
            {achievements.map((a) => (
              <div
                key={a.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                  a.unlocked
                    ? "border-primary/20 bg-primary/10 text-primary"
                    : "border-border bg-surface text-muted-foreground opacity-50"
                }`}
              >
                <a.icon className="w-4 h-4" />
                {a.label}
                {!a.unlocked && <span className="text-xs opacity-60">🔒</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal CTA */}
        <div className="glass-card p-5 border-success/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-transparent" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-1">Ready to Withdraw?</h3>
              <p className="text-sm text-muted-foreground">You have <span className="text-success font-semibold">$47.82</span> available. Min. withdrawal is $10.</p>
            </div>
            <Button className="bg-gradient-green text-success-foreground font-semibold shadow-green hover:opacity-90 shrink-0">
              <Wallet className="w-4 h-4 mr-2" style={{ color: "inherit" }} />
              Withdraw Now
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
