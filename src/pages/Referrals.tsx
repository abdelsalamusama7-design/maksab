import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/contexts/LanguageContext";
import {
  Users, Copy, CheckCircle, Share2, ChevronRight,
  TrendingUp, Award, Link2, UserPlus, DollarSign,
  MessageCircle, Send, Globe
} from "lucide-react";

interface Referral {
  name: string;
  email: string;
  date: string;
  earnings: number;
  status: "active" | "inactive";
  avatar: string;
  subRefs?: number;
}

export default function Referrals() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"l1" | "l2">("l1");
  const referralCode = "MAKSAB-AHMED2025";
  const referralLink = `https://maksab.lovable.app/ref/${referralCode.toLowerCase()}`;

  const stats = {
    totalReferrals: 12,
    l1Count: 8,
    l2Count: 14,
    totalEarnings: 86.40,
    l1Earnings: 72.30,
    l2Earnings: 14.10,
    pendingEarnings: 5.20,
    thisMonth: 18.60,
  };

  const l1Referrals: Referral[] = [
    { name: "محمد علي", email: "m.ali@email.com", date: "2025-01-10", earnings: 14.20, status: "active", avatar: "م", subRefs: 3 },
    { name: "فاطمة أحمد", email: "f.ahmed@email.com", date: "2025-01-08", earnings: 11.50, status: "active", avatar: "ف", subRefs: 2 },
    { name: "عمر حسن", email: "o.hassan@email.com", date: "2024-12-28", earnings: 18.90, status: "active", avatar: "ع", subRefs: 4 },
    { name: "سارة محمود", email: "s.mahmoud@email.com", date: "2024-12-15", earnings: 8.40, status: "active", avatar: "س", subRefs: 1 },
    { name: "يوسف خالد", email: "y.khaled@email.com", date: "2024-12-01", earnings: 6.70, status: "inactive", avatar: "ي", subRefs: 2 },
    { name: "نور الدين", email: "n.din@email.com", date: "2024-11-20", earnings: 5.30, status: "active", avatar: "ن", subRefs: 1 },
    { name: "هدى سمير", email: "h.samir@email.com", date: "2024-11-10", earnings: 4.80, status: "inactive", avatar: "ه", subRefs: 0 },
    { name: "كريم وليد", email: "k.walid@email.com", date: "2024-10-25", earnings: 2.50, status: "active", avatar: "ك", subRefs: 1 },
  ];

  const l2Referrals: Referral[] = [
    { name: "أحمد رضا", email: "a.reda@email.com", date: "2025-01-12", earnings: 1.80, status: "active", avatar: "أ" },
    { name: "ليلى فوزي", email: "l.fawzy@email.com", date: "2025-01-05", earnings: 1.50, status: "active", avatar: "ل" },
    { name: "طارق مصطفى", email: "t.mostafa@email.com", date: "2024-12-30", earnings: 2.10, status: "active", avatar: "ط" },
    { name: "منى سيد", email: "m.sayed@email.com", date: "2024-12-22", earnings: 0.90, status: "inactive", avatar: "م" },
    { name: "حسام جمال", email: "h.gamal@email.com", date: "2024-12-18", earnings: 1.40, status: "active", avatar: "ح" },
    { name: "رنا عادل", email: "r.adel@email.com", date: "2024-12-10", earnings: 1.20, status: "active", avatar: "ر" },
    { name: "إبراهيم علاء", email: "i.alaa@email.com", date: "2024-12-05", earnings: 0.80, status: "inactive", avatar: "إ" },
    { name: "دينا حسين", email: "d.hussein@email.com", date: "2024-11-28", earnings: 1.60, status: "active", avatar: "د" },
    { name: "وائل أشرف", email: "w.ashraf@email.com", date: "2024-11-20", earnings: 0.70, status: "active", avatar: "و" },
    { name: "مريم طلعت", email: "m.talaat@email.com", date: "2024-11-15", earnings: 0.60, status: "inactive", avatar: "م" },
    { name: "خالد نبيل", email: "k.nabil@email.com", date: "2024-11-08", earnings: 0.50, status: "active", avatar: "خ" },
    { name: "ياسمين صلاح", email: "y.salah@email.com", date: "2024-10-30", earnings: 0.40, status: "inactive", avatar: "ي" },
    { name: "عمرو بكر", email: "a.bakr@email.com", date: "2024-10-25", earnings: 0.30, status: "active", avatar: "ع" },
    { name: "هبة فؤاد", email: "h.fouad@email.com", date: "2024-10-18", earnings: 0.20, status: "inactive", avatar: "ه" },
  ];

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

  const currentReferrals = activeTab === "l1" ? l1Referrals : l2Referrals;
  const commissionRate = activeTab === "l1" ? "10%" : "3%";

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
            { label: t("ref.thisMonth"), value: `$${stats.thisMonth.toFixed(2)}`, icon: Award, color: "text-warning", gradient: "from-warning/10" },
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
              <Progress value={75} className="h-1.5 mt-3" />
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
              <Progress value={45} className="h-1.5 mt-3" />
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

          <div className="space-y-3">
            {currentReferrals.map((ref, i) => (
              <div key={ref.email} className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center font-bold text-primary-foreground text-sm shadow-gold shrink-0">
                  {ref.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{ref.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${ref.status === "active" ? "border-success/30 text-success" : "border-border text-muted-foreground"}`}
                    >
                      {t(`status.${ref.status}`)}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {t("ref.joined")}: {ref.date}
                    {ref.subRefs !== undefined && ref.subRefs > 0 && (
                      <span className="ms-2 text-info">· {ref.subRefs} {t("ref.subRefs")}</span>
                    )}
                  </div>
                </div>
                <div className="text-end shrink-0">
                  <div className="font-heading font-bold text-success text-sm">${ref.earnings.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">{t("ref.earned")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
