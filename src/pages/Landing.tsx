import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap, Shield, Users, TrendingUp, DollarSign, Gift,
  Star, ChevronRight, Check, Globe, Lock, Award
} from "lucide-react";

const features = [
  { icon: DollarSign, title: "Earn Real Money", desc: "Complete offers & tasks, earn USD credited instantly to your balance.", color: "text-success" },
  { icon: Users, title: "Referral System", desc: "2-level referral with 10% + 3% lifetime commissions on all earnings.", color: "text-primary" },
  { icon: Shield, title: "Anti-Fraud Protected", desc: "Advanced VPN detection, device fingerprinting & IP tracking.", color: "text-info" },
  { icon: Zap, title: "VIP Membership", desc: "+10% earnings boost, priority withdrawals & exclusive offers.", color: "text-warning" },
  { icon: Gift, title: "Daily Bonuses", desc: "Login streaks, achievement badges & leaderboard rewards.", color: "text-success" },
  { icon: TrendingUp, title: "Multiple Withdrawals", desc: "USDT TRC20 & Vodafone Cash with $10 minimum threshold.", color: "text-primary" },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "$2M+", label: "Total Paid Out" },
  { value: "500+", label: "Daily Offers" },
  { value: "99.9%", label: "Uptime" },
];

const steps = [
  { step: "01", title: "Register & Verify", desc: "Create your account with email OTP verification in under 2 minutes." },
  { step: "02", title: "Complete Offers", desc: "Browse our offerwall and complete surveys, installs & tasks." },
  { step: "03", title: "Earn & Withdraw", desc: "Withdraw via USDT or Vodafone Cash once you hit $10." },
];

export default function Landing() {
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
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#vip" className="hover:text-foreground transition-colors">VIP</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90 shadow-gold">
                Get Started <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 relative">
        {/* Glow bg */}
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-3xl" style={{ background: "hsl(42 95% 55%)" }} />

        <div className="container relative text-center">
          <Badge className="mb-6 badge-gold inline-flex items-center gap-1.5 text-sm">
            <Star className="w-3.5 h-3.5" /> Egypt's #1 GPT Rewards Platform
          </Badge>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Earn Real Money<br />
            <span className="gold-text">From Your Phone</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Complete offers, surveys & tasks. Withdraw via USDT or Vodafone Cash.
            Join 50,000+ Egyptians already earning daily.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground font-bold text-lg px-8 py-6 shadow-gold hover:opacity-90 animate-pulse-gold">
                Start Earning Now <Zap className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-border text-foreground font-semibold text-lg px-8 py-6 hover:bg-surface">
                Login to Dashboard
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
            <Badge className="mb-4 badge-gold">Platform Features</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">Everything You Need to Earn</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A complete ecosystem built for Egyptian users with local withdrawal methods.</p>
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
            <Badge className="mb-4 badge-gold">Simple Process</Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] right-[-40%] h-px bg-gradient-to-r from-primary/50 to-transparent" />
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
              <Star className="w-3.5 h-3.5" /> VIP Membership
            </Badge>
            <h2 className="font-heading text-4xl font-bold mb-4">Unlock VIP Benefits</h2>
            <div className="text-5xl font-heading font-bold gold-text mb-2">$5<span className="text-2xl text-muted-foreground font-normal">/month</span></div>
            <p className="text-muted-foreground mb-8">Maximize your earnings with exclusive VIP perks</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8 text-left">
              {[
                { icon: TrendingUp, text: "+10% Earnings Boost on all offers" },
                { icon: Zap, text: "Priority withdrawal processing" },
                { icon: Gift, text: "Access to exclusive VIP-only offers" },
              ].map((b) => (
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
                Get VIP Access <Star className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm">
            {[
              { icon: Lock, text: "256-bit SSL Encrypted" },
              { icon: Shield, text: "Anti-Fraud Protected" },
              { icon: Globe, text: "Vodafone Cash Supported" },
              { icon: Award, text: "Verified Payments" },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-2">
                <t.icon className="w-4 h-4 text-primary" />
                <span>{t.text}</span>
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
          <span>© 2025 ZainCash Pro. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
