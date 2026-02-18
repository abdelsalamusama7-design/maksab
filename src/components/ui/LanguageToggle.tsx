import { useLang } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all ${className}`}
      title={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
    >
      <Globe className="w-3.5 h-3.5" />
      {lang === "ar" ? "EN" : "عربي"}
    </button>
  );
}
