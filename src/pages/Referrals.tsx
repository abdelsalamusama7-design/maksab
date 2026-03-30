import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Users, Copy, CheckCircle, Share2, ChevronRight,
  TrendingUp, Award, Link2, UserPlus, DollarSign,
  MessageCircle, Send, Globe
} from "lucide-react";

interface ReferralWithProfile {
  id: string;
  referred_id: string;
  level: number;
  commission_earned: number;
  created_at: string;
  // joined profile data
  name: string;
  avatar: string;
  status: "active" | "inactive";
}

export default function Referrals() {
  const { t } = useLang();
  const { profile, user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"l1" | "l2">("l1");
  const [referrals, setReferrals] = useState<ReferralWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const referralCode = profile?.referral_code || "MKSB-XXXXXXXX";
  const referralLink = `https://maksab.lovable.app/ref/${referralCode.toLowerCase()}`;

  useEffect(() => {
    if (!user) return;
    const fetchReferrals = async () => {
      setLoading(true);
      const { data: refs } = await supabase
        .from("referrals")
        .select("*")
        .eq("referrer_id", user.id)
        .order("created_at", { ascending: false });

      if (!refs || refs.length === 0) {
        setReferrals([]);
        setLoading(false);
        return;
      }

      // Get profile info for each referred user
      const referredIds = refs.map(r => r.referred_id);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, created_at")
        .in("user_id", referredIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      const enriched: ReferralWithProfile[] = refs.map(r => {
        const p = profileMap.get(r.referred_id);
        const name = p?.full_name || "User";
        return {
          id: r.id,
          referred_id: r.referred_id,
          level: r.level,
          commission_earned: Number(r.commission_earned),
          created_at: r.created_at,
          name,
          avatar: name.charAt(0),
          status: "active" as const,
        };
      });

      setReferrals(enriched);
      setLoading(false);
    };
    fetchReferrals();
  }, [user]);

  const l1Referrals = referrals.filter(r => r.level === 1);
  const l2Referrals = referrals.filter(r => r.level === 2);
  const l1Earnings = l1Referrals.reduce((s, r) => s + r.commission_earned, 0);
  const l2Earnings = l2Referrals.reduce((s, r) => s + r.commission_earned, 0);
  const totalEarnings = l1Earnings + l2Earnings;

  const stats = {
    totalReferrals: referrals.length,
    l1Count: l1Referrals.length,
    l2Count: l2Referrals.length,
    totalEarnings,
    l1Earnings,
    l2Earnings,
  };

  const currentReferrals = activeTab === "l1" ? l1Referrals : l2Referrals;
  const commissionRate = activeTab === "l1" ? "10%" : "3%";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    { icon: MessageCircle, label: "WhatsApp", color: "text-success", url: `https://wa.me/?text=${encodeURIComponent(t("ref.shareText") + " " + referralLink)}` },
    { icon: Send, label: "Telegram", color: "text-info", url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(t("ref.shareText"))}` },
    { icon: Globe, label: "Facebook", color: "text-primary", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}` },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="font-heading font-bold text-2xl flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            {t("ref.title")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{t("ref.subtitle")}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: t("ref.totalReferrals"), value: stats.totalReferrals, icon: UserPlus, color: "text-primary", gradient: "from-primary/10" },
            { label: t("ref.totalEarnings"), value: `$${stats.totalEarnings.toFixed(2)}`, icon: DollarSign, color: "text-success", gradient: "from-success/10" },
            { label: t("ref.l1Earnings"), value: `$${stats.l1Earnings.toFixed(2)}`, icon: TrendingUp, color: "text-info", gradient: "from-info/10" },
            { label: t("ref.thisMonth"), value: `$${stats.l2Earnings.toFixed(2)}`, icon: Award, color: "text-warning", gradient: "from-warning/10" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-5 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} to-transparent opacity-40`} />
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-surface-elevated flex items-center justify-center mb-3">
                  <s.icon className={`w-[18px] h-[18px] ${s.color}`} />
                </div>
                <div className={`font-heading font-bold text-2xl ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Referral Link + Share */}
        <div className="glass-card p-5 border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="w-5 h-5 text-primary" />
              <span className="font-heading font-semibold">{t("ref.yourLink")}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-surface rounded-xl p-3 font-mono text-sm text-muted-foreground truncate border border-border">
                {referralLink}
              </div>
              <Button
                onClick={copyLink}
                className="bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 gap-2 shrink-0"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t("dash.copied") : t("dash.copyLink")}
              </Button>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs text-muted-foreground">{t("ref.shareVia")}</span>
              {shareLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center hover:border-primary/30 transition-colors ${s.color}`}
                  title={s.label}
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Commission Tiers */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass-card p-5 border-info/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-info/10 to-transparent opacity-40" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-semibold">{t("ref.level1")}</span>
                <Badge className="bg-info/20 text-info border-info/30">10%</Badge>
              </div>
              <div className="font-heading font-bold text-2xl text-info mb-1">{stats.l1Count} {t("ref.referral")}</div>
              <div className="text-sm text-muted-foreground">{t("ref.earned")}: <span className="text-info font-semibold">${stats.l1Earnings.toFixed(2)}</span></div>
              <Progress value={stats.l1Count > 0 ? Math.min(stats.l1Count * 10, 100) : 0} className="h-1.5 mt-3" />
            </div>
          </div>
          <div className="glass-card p-5 border-warning/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-warning/10 to-transparent opacity-40" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-semibold">{t("ref.level2")}</span>
                <Badge className="bg-warning/20 text-warning border-warning/30">3%</Badge>
              </div>
              <div className="font-heading font-bold text-2xl text-warning mb-1">{stats.l2Count} {t("ref.referral")}</div>
              <div className="text-sm text-muted-foreground">{t("ref.earned")}: <span className="text-warning font-semibold">${stats.l2Earnings.toFixed(2)}</span></div>
              <Progress value={stats.l2Count > 0 ? Math.min(stats.l2Count * 10, 100) : 0} className="h-1.5 mt-3" />
            </div>
          </div>
        </div>

        {/* Referral Tree */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-lg">{t("ref.tree")}</h2>
            <div className="flex bg-surface rounded-xl p-1 border border-border">
              <button
                onClick={() => setActiveTab("l1")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "l1" ? "bg-primary/15 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("ref.level1")} ({stats.l1Count})
              </button>
              <button
                onClick={() => setActiveTab("l2")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "l2" ? "bg-primary/15 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("ref.level2")} ({stats.l2Count})
              </button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" />
            {t("ref.commission")}: <span className="text-primary font-semibold">{commissionRate}</span> {t("ref.lifetime")}
          </div>

          {currentReferrals.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-sm text-muted-foreground">
                {activeTab === "l1" ? "No direct referrals yet" : "No level 2 referrals yet"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Share your link to start earning!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentReferrals.map((ref) => (
                <div key={ref.id} className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center font-bold text-primary-foreground text-sm shadow-gold shrink-0">
                    {ref.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">{ref.name}</span>
                      <Badge
                        variant="outline"
                        className="text-xs border-success/30 text-success"
                      >
                        {t("status.active")}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {t("ref.joined")}: {new Date(ref.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-end shrink-0">
                    <div className="font-heading font-bold text-success text-sm">${ref.commission_earned.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">{t("ref.earned")}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
