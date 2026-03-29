import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import {
  Wallet, AlertCircle, CheckCircle, Clock, ChevronRight,
  ArrowDownCircle, Shield, Info
} from "lucide-react";

type Method = "usdt" | "vodafone" | "instapay" | "visa" | "crypto";

interface WithdrawalHistory {
  id: string;
  amount: number;
  method: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  address: string;
}

export default function Withdraw() {
  const { t } = useLang();
  const [method, setMethod] = useState<Method>("usdt");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const balance = 47.82;
  // Simulated: 0 = first, 1 = second, 2+ = third+
  const withdrawalCount = 0;

  const getMinWithdrawal = () => {
    if (withdrawalCount === 0) return 1;
    if (withdrawalCount === 1) return 5;
    return 100;
  };

  const minAmount = getMinWithdrawal();

  const methods: { value: Method; label: string; icon: string; desc: string }[] = [
    { value: "usdt", label: t("wd.usdt"), icon: "₮", desc: t("wd.usdtDesc") },
    { value: "vodafone", label: t("wd.vodafone"), icon: "📱", desc: t("wd.vodafoneDesc") },
    { value: "instapay", label: t("wd.instapay"), icon: "🏦", desc: t("wd.instapayDesc") },
    { value: "visa", label: t("wd.visa"), icon: "💳", desc: t("wd.visaDesc") },
    { value: "crypto", label: t("wd.crypto"), icon: "₿", desc: t("wd.cryptoDesc") },
  ];

  const getPlaceholder = () => {
    switch (method) {
      case "usdt": return t("wd.placeholderUsdt");
      case "vodafone": return t("wd.placeholderVodafone");
      case "instapay": return t("wd.placeholderInstapay");
      case "visa": return t("wd.placeholderVisa");
      case "crypto": return t("wd.placeholderCrypto");
    }
  };

  const getAddressLabel = () => {
    switch (method) {
      case "usdt": return t("wd.walletAddress");
      case "vodafone": return t("wd.phoneNumber");
      case "instapay": return t("wd.instapayId");
      case "visa": return t("wd.cardNumber");
      case "crypto": return t("wd.walletAddress");
    }
  };

  const parsedAmount = parseFloat(amount) || 0;
  const isValidAmount = parsedAmount >= minAmount && parsedAmount <= balance;
  const isValidAddress = address.trim().length >= 5;
  const canSubmit = isValidAmount && isValidAddress;

  const history: WithdrawalHistory[] = [
    { id: "WD-001", amount: 15.00, method: "USDT TRC20", status: "approved", date: "2025-01-15", address: "TXk...9f2" },
    { id: "WD-002", amount: 10.00, method: "Vodafone Cash", status: "pending", date: "2025-01-18", address: "010****890" },
    { id: "WD-003", amount: 20.00, method: "InstaPay", status: "rejected", date: "2025-01-10", address: "ahmed@instapay" },
  ];

  const statusColor = (s: string) => {
    if (s === "approved") return "text-success";
    if (s === "pending") return "text-warning";
    return "text-destructive";
  };

  const statusIcon = (s: string) => {
    if (s === "approved") return <CheckCircle className="w-4 h-4 text-success" />;
    if (s === "pending") return <Clock className="w-4 h-4 text-warning" />;
    return <AlertCircle className="w-4 h-4 text-destructive" />;
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-2xl mx-auto">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="font-heading font-bold text-xl mb-2">{t("wd.successTitle")}</h2>
            <p className="text-muted-foreground text-sm mb-4">{t("wd.successDesc")}</p>
            <div className="glass-card p-4 text-start space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("wd.amount")}</span>
                <span className="font-bold text-success">${parsedAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("wd.method")}</span>
                <span className="font-medium">{methods.find(m => m.value === method)?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{getAddressLabel()}</span>
                <span className="font-mono text-xs">{address}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("wd.status")}</span>
                <Badge variant="outline" className="border-warning/30 text-warning text-xs">{t("status.pending")}</Badge>
              </div>
            </div>
            <Button onClick={() => { setSubmitted(false); setAmount(""); setAddress(""); }} variant="outline" className="border-primary/30 text-primary">
              {t("wd.newRequest")}
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="font-heading font-bold text-2xl flex items-center gap-2">
            <Wallet className="w-6 h-6 text-primary" />
            {t("wd.title")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{t("wd.subtitle")}</p>
        </div>

        {/* Balance + Min Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass-card p-5 border-success/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent" />
            <div className="relative">
              <div className="text-xs text-muted-foreground mb-1">{t("wd.availableBalance")}</div>
              <div className="font-heading font-bold text-3xl text-success">${balance.toFixed(2)}</div>
            </div>
          </div>
          <div className="glass-card p-5 border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="relative">
              <div className="text-xs text-muted-foreground mb-1">{t("wd.minWithdrawal")}</div>
              <div className="font-heading font-bold text-3xl text-primary">${minAmount.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {t("wd.withdrawalNumber")}: {withdrawalCount + 1}
                {withdrawalCount === 0 && <span className="text-success ms-1">({t("wd.firstBonus")})</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Min withdrawal tiers info */}
        <div className="glass-card p-4 border-info/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-info shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <div className="font-semibold text-foreground">{t("wd.tiersTitle")}</div>
              <div className="text-muted-foreground">
                <span className="text-success font-medium">{t("wd.tier1")}</span> · 
                <span className="text-warning font-medium ms-1">{t("wd.tier2")}</span> · 
                <span className="text-primary font-medium ms-1">{t("wd.tier3")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 space-y-5">
            {/* Method Selection */}
            <div className="glass-card p-5">
              <Label className="font-heading font-semibold text-base mb-4 block">{t("wd.selectMethod")}</Label>
              <RadioGroup value={method} onValueChange={(v) => setMethod(v as Method)} className="space-y-3">
                {methods.map((m) => (
                  <label
                    key={m.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      method === m.value
                        ? "border-primary/40 bg-primary/5"
                        : "border-border hover:border-primary/20 hover:bg-surface"
                    }`}
                  >
                    <RadioGroupItem value={m.value} />
                    <span className="text-2xl">{m.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{m.label}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </div>
                    {method === m.value && <ChevronRight className="w-4 h-4 text-primary" />}
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Address + Amount */}
            <div className="glass-card p-5 space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">{getAddressLabel()}</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="bg-surface border-border"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">{t("wd.amount")}</Label>
                <div className="relative">
                  <span className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={minAmount.toFixed(2)}
                    min={minAmount}
                    max={balance}
                    step="0.01"
                    className="bg-surface border-border ps-8"
                  />
                </div>
                {amount && !isValidAmount && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {parsedAmount < minAmount
                      ? `${t("wd.minError")} $${minAmount.toFixed(2)}`
                      : `${t("wd.maxError")} $${balance.toFixed(2)}`}
                  </p>
                )}
                <div className="flex gap-2 mt-2">
                  {[minAmount, Math.min(25, balance), Math.min(balance, balance)].filter((v, i, arr) => arr.indexOf(v) === i).map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val.toFixed(2))}
                      className="px-3 py-1 rounded-lg bg-surface border border-border text-xs font-medium hover:border-primary/30 hover:text-primary transition-colors"
                    >
                      ${val.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 disabled:opacity-50 h-12 text-base"
              >
                <ArrowDownCircle className="w-5 h-5 me-2" />
                {t("wd.submitRequest")}
              </Button>

              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <Shield className="w-3.5 h-3.5" />
                {t("wd.securityNote")}
              </div>
            </div>
          </div>

          {/* History */}
          <div className="lg:col-span-2">
            <div className="glass-card p-5">
              <h3 className="font-heading font-semibold mb-4">{t("wd.history")}</h3>
              <div className="space-y-3">
                {history.map((h) => (
                  <div key={h.id} className="p-3 rounded-xl bg-surface border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-muted-foreground">{h.id}</span>
                      <div className="flex items-center gap-1.5">
                        {statusIcon(h.status)}
                        <span className={`text-xs font-medium ${statusColor(h.status)}`}>
                          {t(`status.${h.status}`)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-heading font-bold text-success">${h.amount.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">{h.method}</div>
                      </div>
                      <div className="text-end">
                        <div className="text-xs text-muted-foreground">{h.date}</div>
                        <div className="text-xs font-mono text-muted-foreground">{h.address}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
