import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Zap, Lock, Mail, User, Gift, ArrowRight } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", referral: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = "/dashboard"; }, 1500);
  };

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg gold-text">ZainCash Pro</span>
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-heading font-bold text-3xl mb-2">Check Your Email</h1>
            <p className="text-muted-foreground">We sent a 6-digit code to <span className="text-foreground font-medium">{form.email}</span></p>
          </div>

          <form onSubmit={handleOtpVerify} className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block text-center">Enter Verification Code</Label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 text-center text-xl font-bold rounded-xl border bg-surface text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    style={{ borderColor: digit ? "hsl(var(--primary))" : "hsl(var(--border))" }}
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || otp.some(d => !d)}
              className="w-full h-12 bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Verifying...
                </div>
              ) : "Verify & Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Didn't receive the code?{" "}
            <button className="text-primary hover:underline font-medium">Resend</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
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
              Join Free.<br /><span className="gold-text">Earn Real.</span>
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Gift, label: "Welcome Bonus", value: "$0.50" },
                { icon: Zap, label: "Daily Offers", value: "500+" },
                { icon: User, label: "Referral Bonus", value: "10%" },
                { icon: Lock, label: "Min. Withdrawal", value: "$10" },
              ].map((s) => (
                <div key={s.label} className="glass-card p-4">
                  <s.icon className="w-5 h-5 text-primary mb-2" />
                  <div className="font-heading font-bold text-xl gold-text">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg gold-text">ZainCash Pro</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-heading font-bold text-3xl mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start earning money today — it's completely free</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Ahmed Mohamed"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="pl-10 bg-surface border-border focus:border-primary h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="pl-10 bg-surface border-border focus:border-primary h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="pl-10 pr-10 bg-surface border-border focus:border-primary h-12"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Referral Code <span className="text-muted-foreground font-normal">(Optional)</span></Label>
              <div className="relative">
                <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter referral code"
                  value={form.referral}
                  onChange={(e) => setForm({ ...form, referral: e.target.value })}
                  className="pl-10 bg-surface border-border focus:border-primary h-12"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By registering, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </p>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Sending OTP...
                </div>
              ) : (
                <>Create Account <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
