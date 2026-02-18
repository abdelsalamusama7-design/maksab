import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLang } from "@/contexts/LanguageContext";
import {
  Zap, Shield, Users, TrendingUp, DollarSign, Gift,
  Star, ChevronRight, Lock, Globe, Award
} from "lucide-react";

export default function Landing() {
  const { t } = useLang();

  const features = [
    { icon: DollarSign, title: t("feat.earn.title"), desc: t("feat.earn.desc"), color: "text-success" },
    { icon: Users, title: t("feat.referral.title"), desc: t("feat.referral.desc"), color: "text-primary" },
    { icon: Shield, title: t("feat.fraud.title"), desc: t("feat.fraud.desc"), color: "text-info" },
    { icon: Zap, title: t("feat.vip.title"), desc: t("feat.vip.desc"), color: "text-warning" },
    { icon: Gift, title: t("feat.bonus.title"), desc: t("feat.bonus.desc"), color: "text-success" },
    { icon: TrendingUp, title: t("feat.withdraw.title"), desc: t("feat.withdraw.desc"), color: "text-primary" },
  ];

  const stats = [
    { value: "50K+", label: t("stats.users") },
    { value: "$2M+", label: t("stats.paid") },
    { value: "500+", label: t("stats.offers") },
    { value: "99.9%", label: t("stats.uptime") },
  ];

  const steps = [
    { step: "01", title: t("how.step1.title"), desc: t("how.step1.desc") },
    { step: "02", title: t("how.step2.title"), desc: t("how.step2.desc") },
    { step: "03", title: t("how.step3.title"), desc: t("how.step3.desc") },
  ];

  const trust = [
    { icon: Lock, text: t("trust.ssl") },
    { icon: Shield, text: t("trust.fraud") },
    { icon: Globe, text: t("trust.vodafone") },
    { icon: Award, text: t("trust.verified") },
  ];

  const vipBenefits = [
    { icon: TrendingUp, text: t("vip.boost") },
    { icon: Zap, text: t("vip.priority") },
    { icon: Gift, text: t("vip.exclusive") },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl" style={{ background: "hsl(var(--background) / 0.85)" }}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl gold-text">ZainCash Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">{t("nav.features")}</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">{t("nav.howItWorks")}</a>
            <a href="#vip" className="hover:text-foreground transition-colors">{t("nav.vip")}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">{t("nav.login")}</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 shadow-gold">
                {t("nav.getStarted")} <ChevronRight className="w-4 h-4 ms-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-3xl" style={{ background: "hsl(42 95% 55%)" }} />
        <div className="container relative text-center">
          <Badge className="mb-6 badge-gold inline-flex items-center gap-1.5 text-sm">
            <Star className="w-3.5 h-3.5" /> {t("hero.badge")}
          </Badge>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t("hero.title1")}<br />
            <span className="gold-text">{t("hero.title2")}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold text-lg px-8 py-6 shadow-gold hover:opacity-90 animate-pulse-gold">
                {t("hero.cta")} <Zap className="ms-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-border text-foreground font-semibold text-lg px-8 py-6 hover:bg-surface">
                {t("hero.loginDash")}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-6 text-center">
                <div className="font-heading font-bold text-3xl gold-text mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 badge-gold">{t("feat.badge")}</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">{t("feat.title")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t("feat.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20" style={{ background: "hsl(var(--background-secondary))" }}>
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 badge-gold">{t("how.badge")}</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">{t("how.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 start-[60%] end-[-40%] h-px bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6 shadow-gold">
                  <span className="font-heading font-bold text-xl text-primary-foreground">{s.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Section */}
      <section id="vip" className="py-20">
        <div className="container max-w-4xl">
          <div className="glass-card-elevated p-8 md:p-12 text-center border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ background: "var(--gradient-glow)" }} />
            <Badge className="mb-4 badge-gold inline-flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5" /> {t("vip.badge")}
            </Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">{t("vip.title")}</h2>
            <div className="text-5xl font-heading font-bold gold-text mb-2">$5<span className="text-2xl text-muted-foreground font-normal">{t("vip.month")}</span></div>
            <p className="text-muted-foreground mb-8">{t("vip.subtitle")}</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8 text-start">
              {vipBenefits.map((b) => (
                <div key={b.text} className="flex items-start gap-3 glass-card p-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{b.text}</span>
                </div>
              ))}
            </div>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold px-10 shadow-gold hover:opacity-90">
                {t("vip.cta")} <Star className="ms-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm">
            {trust.map((t_) => (
              <div key={t_.text} className="flex items-center gap-2">
                <t_.icon className="w-4 h-4 text-primary" />
                <span>{t_.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border" style={{ background: "hsl(var(--background-secondary))" }}>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-gold flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">ZainCash Pro</span>
          </div>
          <span>{t("footer.rights")}</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.terms")}</a>
            <a href="#" className="hover:text-foreground transition-colors">{t("footer.support")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
