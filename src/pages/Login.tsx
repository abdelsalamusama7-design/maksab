import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { useLang } from "@/contexts/LanguageContext";
import { Eye, EyeOff, Zap, Lock, Mail, ArrowRight, Shield } from "lucide-react";

export default function Login() {
  const { t } = useLang();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col w-[45%] relative overflow-hidden" style={{ background: "hsl(var(--background-secondary))" }}>
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "hsl(42 95% 55%)" }} />

        <div className="relative p-10 flex flex-col h-full">
          <Link to="/" className="flex items-center gap-2 mb-auto">
            <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl gold-text">ZainCash Pro</span>
          </Link>

          <div className="mb-auto">
            <h2 className="font-heading font-bold text-5xl mb-6 leading-tight">
              {t("login.earns")}<br /><span className="gold-text">{t("hero.title1")}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("login.earnsSubtitle")}
            </p>
            <div className="space-y-3">
              {[t("login.feat1"), t("login.feat2"), t("login.feat3")].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-success" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shrink-0 shadow-gold">
              <span className="font-heading font-bold text-sm text-primary-foreground">A</span>
            </div>
            <div>
              <div className="font-semibold text-sm">Ahmed M.</div>
              <div className="text-xs text-muted-foreground">{t("login.review")}</div>
            </div>
            <div className="ms-auto text-primary font-bold text-sm">★★★★★</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg gold-text">ZainCash Pro</span>
            </Link>
            <LanguageToggle />
          </div>

          <div className="hidden lg:flex justify-end mb-4">
            <LanguageToggle />
          </div>

          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl mb-2">{t("login.welcome")}</h1>
            <p className="text-muted-foreground">{t("login.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">{t("login.email")}</Label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ps-10 bg-surface border-border focus:border-primary h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">{t("login.password")}</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">{t("login.forgot")}</Link>
              </div>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ps-10 pe-10 bg-surface border-border focus:border-primary h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  {t("login.loading")}
                </div>
              ) : (
                <>{t("login.submit")} <ArrowRight className="ms-2 w-4 h-4" /></>
              )}
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="glass-card p-4 flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <Shield className="w-4 h-4 text-success shrink-0" />
            <span>{t("login.security")}</span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {t("login.noAccount")}{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">{t("login.createFree")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
