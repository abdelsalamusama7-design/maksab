import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  DollarSign, TrendingUp, Clock, Award, Zap, Copy, Users,
  ChevronRight, Star, Gift, Flame, ExternalLink, Wallet,
  CheckCircle, XCircle, AlertCircle, Trophy
} from "lucide-react";

export default function Dashboard() {
  const { t } = useLang();
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [referralStats, setReferralStats] = useState({ count: 0, earnings: 0 });

  useEffect(() => {
    if (!user) return;
    // Fetch recent transactions
    supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }) => setTransactions(data || []));

    // Fetch referral stats
    supabase
      .from("referrals")
      .select("*")
      .eq("referrer_id", user.id)
      .then(({ data }) => {
        const refs = data || [];
        setReferralStats({
          count: refs.filter(r => r.level === 1).length,
          earnings: refs.reduce((sum, r) => sum + Number(r.commission_earned), 0),
        });
      });
  }, [user]);

  const referralCode = profile?.referral_code || "MKSB-XXXXXXXX";
  const balance = Number(profile?.balance || 0);
  const pending = Number(profile?.pending_balance || 0);
  const lifetime = Number(profile?.lifetime_earnings || 0);
  const points = profile?.points || 0;

  const balanceCards = [
    { label: t("dash.balance"), value: balance, prefix: "$", color: "text-success", icon: DollarSign, glow: "shadow-green", gradient: "from-success/10 to-transparent", badge: t("dash.withdrawable") },
    { label: t("dash.pending"), value: pending, prefix: "$", color: "text-warning", icon: Clock, glow: "", gradient: "from-warning/10 to-transparent", badge: t("dash.processing") },
    { label: t("dash.lifetime"), value: lifetime, prefix: "$", color: "text-primary", icon: TrendingUp, glow: "shadow-gold", gradient: "from-primary/10 to-transparent", badge: t("dash.allTime") },
    { label: t("dash.points"), value: points, prefix: "", suffix: " pts", color: "text-info", decimals: 0, icon: Award, glow: "", gradient: "from-info/10 to-transparent", badge: t("dash.redeemable") },
  ];

  const offers = [
    { title: t("feat.earn.title"), reward: "$2.80", time: "10 min", category: t("cat.survey"), hot: true },
    { title: "Install VPN App + Use 5 min", reward: "$1.50", time: "5 min", category: t("cat.install"), hot: false },
    { title: "Sign up for Gaming Platform", reward: "$4.00", time: "15 min", category: t("cat.registration"), hot: true },
    { title: "Watch 10 Ads", reward: "$0.30", time: "3 min", category: t("cat.video"), hot: false },
    { title: "Answer Health Quiz", reward: "$1.10", time: "7 min", category: t("cat.survey"), hot: false },
    { title: "Premium App Trial", reward: "$6.50", time: "20 min", category: t("cat.trial"), hot: true },
  ];

  const achievements = [
    { icon: Flame, label: t("ach.streak"), unlocked: true },
    { icon: DollarSign, label: t("ach.firstWithdraw"), unlocked: (profile?.withdrawal_count || 0) > 0 },
    { icon: Users, label: t("ach.referrals"), unlocked: referralStats.count >= 3 },
    { icon: Trophy, label: t("ach.top100"), unlocked: false },
    { icon: Star, label: t("ach.vip"), unlocked: profile?.is_vip || false },
    { icon: Award, label: t("ach.earned100"), unlocked: lifetime >= 100 },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const copyReferral = () => {
    navigator.clipboard.writeText(`https://maksab.lovable.app/ref/${referralCode.toLowerCase()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusIcon = (s: string) => {
    if (s === "completed") return <CheckCircle className="w-3.5 h-3.5 text-success" />;
    if (s === "pending") return <AlertCircle className="w-3.5 h-3.5 text-warning" />;
    return <XCircle className="w-3.5 h-3.5 text-destructive" />;
  };

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "now";
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl">{t("dash.welcome")}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t("dash.newOffers")}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm">
              <Flame className="w-4 h-4 text-warning" />
              <span className="font-semibold">{t("dash.streak")}</span>
            </div>
            <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90">
              <Gift className="w-3.5 h-3.5 me-1.5" /> {t("dash.claimBonus")}
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
                  <span className="badge-gold text-xs">{card.badge}</span>
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
              <h2 className="font-heading font-semibold text-lg">{t("dash.availableOffers")}</h2>
              <Button variant="ghost" size="sm" className="text-primary text-xs gap-1">
                {t("dash.viewAll")} <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {offers.map((offer) => (
                <div key={offer.title} className="glass-card p-4 hover:border-primary/30 transition-all duration-200 cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <span className="badge-info text-xs">{offer.category}</span>
                    {offer.hot && <span className="badge-danger text-xs flex items-center gap-1"><Flame className="w-3 h-3" /> {t("dash.hot")}</span>}
                  </div>
                  <h3 className="font-medium text-sm mb-3 leading-snug group-hover:text-primary transition-colors">{offer.title}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-lg text-success">{offer.reward}</div>
                      <div className="text-xs text-muted-foreground">~{offer.time}</div>
                    </div>
                    <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold text-xs shadow-gold hover:opacity-90">
                      {t("dash.start")} <ExternalLink className="w-3 h-3 ms-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Offerwall iframe placeholder */}
            <div className="glass-card p-6 text-center border-dashed">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">{t("dash.offerwallTitle")}</h3>
              <p className="text-xs text-muted-foreground mb-3">{t("dash.offerwallDesc")}</p>
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                <ExternalLink className="w-3.5 h-3.5 me-1.5" /> {t("dash.openOfferwall")}
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
                  <span className="font-heading font-semibold">{t("dash.vipTitle")}</span>
                  {profile?.is_vip && <Badge className="bg-primary/20 text-primary text-xs">VIP</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mb-4">{t("dash.vipDesc")}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{t("dash.monthlyProgress")}</span>
                    <span className="text-primary font-medium">${Math.min(lifetime, 5).toFixed(2)} / $5.00</span>
                  </div>
                  <Progress value={Math.min((lifetime / 5) * 100, 100)} className="h-1.5" />
                </div>
                <Button className="w-full bg-gradient-gold text-primary-foreground font-semibold text-sm shadow-gold hover:opacity-90">
                  {t("dash.upgradeVip")}
                </Button>
              </div>
            </div>

            {/* Referral */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-info" />
                <span className="font-heading font-semibold">{t("dash.referralLink")}</span>
              </div>
              <div className="bg-surface rounded-lg p-3 text-xs font-mono text-muted-foreground mb-3 truncate">
                maksab.lovable.app/ref/{referralCode.toLowerCase()}
              </div>
              <Button
                onClick={copyReferral}
                variant="outline"
                className="w-full border-border hover:border-primary/30 hover:bg-primary/5 text-sm gap-2"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                {copied ? t("dash.copied") : t("dash.copyLink")}
              </Button>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-surface rounded-lg p-2 text-center">
                  <div className="font-heading font-bold text-lg text-primary">{referralStats.count}</div>
                  <div className="text-xs text-muted-foreground">{t("dash.l1refs")}</div>
                </div>
                <div className="bg-surface rounded-lg p-2 text-center">
                  <div className="font-heading font-bold text-lg text-info">${referralStats.earnings.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">{t("dash.refEarnings")}</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-semibold">{t("dash.recentActivity")}</span>
                <Button variant="ghost" size="sm" className="text-xs text-primary p-0 h-auto gap-1">
                  {t("dash.viewAll")} <ChevronRight className="w-3 h-3" />
                </Button>
              </div>
              {transactions.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">{t("dash.noActivity") || "No activity yet"}</p>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center gap-3">
                      {statusIcon(tx.status)}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{tx.description || tx.type}</div>
                        <div className="text-xs text-muted-foreground">{formatTimeAgo(tx.created_at)}</div>
                      </div>
                      <span className={`text-xs font-bold ${tx.status === "completed" ? "text-success" : "text-warning"}`}>
                        {tx.amount >= 0 ? "+" : ""}${Number(tx.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading font-semibold">{t("dash.achievements")}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{t("dash.badgesUnlocked")}</p>
            </div>
            <Progress value={(unlockedCount / achievements.length) * 100} className="w-24 h-1.5" />
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
              <h3 className="font-heading font-semibold text-lg mb-1">{t("dash.readyWithdraw")}</h3>
              <p className="text-sm text-muted-foreground">
                <span className="text-success font-semibold">${balance.toFixed(2)}</span> {t("dash.withdrawDesc")}
              </p>
            </div>
            <Button
              onClick={() => navigate("/dashboard/withdraw")}
              className="bg-gradient-green text-success-foreground font-semibold shadow-green hover:opacity-90 shrink-0"
            >
              <Wallet className="w-4 h-4 me-2" style={{ color: "inherit" }} />
              {t("dash.withdrawNow")}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
