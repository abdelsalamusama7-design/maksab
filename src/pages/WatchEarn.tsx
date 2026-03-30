import { useState, useEffect, useRef, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Play, Pause, CheckCircle, Clock, Gift, Shield,
  Award, DollarSign, AlertTriangle, Coins, Zap, Eye
} from "lucide-react";

const SAMPLE_VIDEOS = [
  { id: "vid-1", title: "How to Earn Online in Egypt", duration: 30, thumbnail: "🎬" },
  { id: "vid-2", title: "Mobile App Review - Finance", duration: 25, thumbnail: "📱" },
  { id: "vid-3", title: "Survey Tips & Tricks", duration: 20, thumbnail: "📋" },
  { id: "vid-4", title: "Crypto Basics Explained", duration: 35, thumbnail: "₿" },
  { id: "vid-5", title: "Top 5 Earning Apps 2025", duration: 28, thumbnail: "⭐" },
  { id: "vid-6", title: "VPN Setup Tutorial", duration: 22, thumbnail: "🔐" },
];

const POINTS_PER_VIDEO = 10;
const COOLDOWN_SECONDS = 60;
const POINTS_PER_DOLLAR = 1000;

export default function WatchEarn() {
  const { t } = useLang();
  const { user, profile, refreshProfile } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<typeof SAMPLE_VIDEOS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [converting, setConverting] = useState(false);
  const [todayWatches, setTodayWatches] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const points = profile?.points || 0;
  const convertibleDollars = Math.floor(points / POINTS_PER_DOLLAR);

  // Fetch today's watch count
  useEffect(() => {
    if (!user) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    supabase
      .from("video_watches")
      .select("id", { count: "exact" })
      .eq("user_id", user.id)
      .gte("created_at", today.toISOString())
      .then(({ count }) => setTodayWatches(count || 0));
  }, [user, claiming]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  const startVideo = useCallback((video: typeof SAMPLE_VIDEOS[0]) => {
    setSelectedVideo(video);
    setProgress(0);
    setVideoCompleted(false);
    setIsPlaying(true);

    if (timerRef.current) clearInterval(timerRef.current);
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const pct = Math.min((elapsed / video.duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        setVideoCompleted(true);
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 200);
  }, []);

  const claimReward = async () => {
    if (!user || !selectedVideo || claiming) return;
    setClaiming(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await supabase.functions.invoke("claim-video-reward", {
        body: { video_id: selectedVideo.id },
      });

      if (response.error) throw new Error(response.error.message);
      
      const result = response.data;
      if (result.error === "rate_limited") {
        setCooldown(result.remaining_seconds);
        startCooldownTimer(result.remaining_seconds);
        toast.error(t("watch.cooldown") || `انتظر ${result.remaining_seconds} ثانية`);
      } else if (result.success) {
        toast.success(t("watch.pointsEarned") || `🎉 حصلت على ${POINTS_PER_VIDEO} نقاط!`);
        await refreshProfile();
        setSelectedVideo(null);
        setVideoCompleted(false);
        setCooldown(COOLDOWN_SECONDS);
        startCooldownTimer(COOLDOWN_SECONDS);
      } else if (result.error) {
        toast.error(result.message || result.error);
      }
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ");
    } finally {
      setClaiming(false);
    }
  };

  const startCooldownTimer = (seconds: number) => {
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    let remaining = seconds;
    cooldownRef.current = setInterval(() => {
      remaining--;
      setCooldown(remaining);
      if (remaining <= 0) {
        if (cooldownRef.current) clearInterval(cooldownRef.current);
      }
    }, 1000);
  };

  const convertPoints = async () => {
    if (!user || converting || convertibleDollars < 1) return;
    setConverting(true);
    try {
      const pointsToConvert = convertibleDollars * POINTS_PER_DOLLAR;
      const response = await supabase.functions.invoke("convert-points", {
        body: { points: pointsToConvert },
      });

      if (response.error) throw new Error(response.error.message);
      
      const result = response.data;
      if (result.success) {
        toast.success(
          t("watch.converted") || `✅ تم تحويل ${pointsToConvert} نقطة إلى $${convertibleDollars}`
        );
        await refreshProfile();
      } else {
        toast.error(result.error || "فشل التحويل");
      }
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ");
    } finally {
      setConverting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" />
              {t("watch.title") || "شاهد واربح"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {t("watch.subtitle") || "شاهد الفيديوهات واكسب نقاط تتحول لأموال حقيقية"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm">
              <Coins className="w-4 h-4 text-warning" />
              <span className="font-semibold">{points.toLocaleString()} {t("watch.pts") || "نقطة"}</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-info" />
              <span className="font-semibold">{todayWatches} {t("watch.today") || "اليوم"}</span>
            </div>
          </div>
        </div>

        {/* Points Conversion Card */}
        <div className="glass-card p-5 border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-40" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-primary" />
                <span className="font-heading font-semibold">{t("watch.conversionTitle") || "تحويل النقاط إلى أموال"}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("watch.conversionRate") || `كل ${POINTS_PER_DOLLAR.toLocaleString()} نقطة = $1.00`}
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{t("watch.progress") || "التقدم نحو $1"}</span>
                  <span className="text-primary font-medium">{points % POINTS_PER_DOLLAR} / {POINTS_PER_DOLLAR}</span>
                </div>
                <Progress value={((points % POINTS_PER_DOLLAR) / POINTS_PER_DOLLAR) * 100} className="h-2" />
              </div>
            </div>
            <Button
              onClick={convertPoints}
              disabled={convertibleDollars < 1 || converting}
              className="bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 shrink-0 disabled:opacity-50"
            >
              <DollarSign className="w-4 h-4 me-1.5" />
              {converting
                ? "..."
                : convertibleDollars >= 1
                ? `${t("watch.convert") || "حوّل"} ${convertibleDollars * POINTS_PER_DOLLAR} ${t("watch.pts") || "نقطة"} → $${convertibleDollars}`
                : t("watch.notEnough") || "نقاط غير كافية"
              }
            </Button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="glass-card p-4 border-warning/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <div className="font-semibold text-foreground">{t("watch.securityTitle") || "نظام حماية متقدم"}</div>
              <div className="text-muted-foreground">
                {t("watch.securityDesc") || "• مكافأة كل دقيقة فقط • كشف البوتات والغش • التحقق من مشاهدة الفيديو كاملاً"}
              </div>
            </div>
          </div>
        </div>

        {/* Cooldown Warning */}
        {cooldown > 0 && (
          <div className="glass-card p-4 border-destructive/20 bg-destructive/5">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-destructive" />
              <div className="flex-1">
                <span className="text-sm font-medium text-destructive">
                  {t("watch.waitMessage") || "انتظر قبل المشاهدة التالية"}
                </span>
              </div>
              <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-lg font-mono px-3">
                {cooldown}s
              </Badge>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player Area */}
          <div className="lg:col-span-2 space-y-4">
            {selectedVideo ? (
              <div className="glass-card overflow-hidden">
                {/* Simulated Video Player */}
                <div className="aspect-video bg-surface-elevated flex flex-col items-center justify-center relative">
                  <div className="text-6xl mb-4">{selectedVideo.thumbnail}</div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{selectedVideo.title}</h3>
                  {isPlaying ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      {t("watch.playing") || "جارٍ المشاهدة..."}
                    </div>
                  ) : videoCompleted ? (
                    <div className="flex items-center gap-2 text-success font-medium">
                      <CheckCircle className="w-5 h-5" />
                      {t("watch.completed") || "تم الانتهاء!"}
                    </div>
                  ) : null}

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <Progress value={progress} className="h-1.5 rounded-none" />
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-warning" />
                      <span className="font-semibold text-sm">
                        +{POINTS_PER_VIDEO} {t("watch.pts") || "نقطة"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {selectedVideo.duration}s {t("watch.duration") || "مدة الفيديو"}
                    </span>
                  </div>

                  {videoCompleted ? (
                    <Button
                      onClick={claimReward}
                      disabled={claiming || cooldown > 0}
                      className="w-full bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 h-12 text-base disabled:opacity-50"
                    >
                      {claiming ? (
                        "..."
                      ) : cooldown > 0 ? (
                        <>{t("watch.wait") || "انتظر"} {cooldown}s</>
                      ) : (
                        <>
                          <Gift className="w-5 h-5 me-2" />
                          {t("watch.claimPoints") || "احصل على النقاط"}
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4 inline me-1" />
                      {t("watch.mustComplete") || "يجب مشاهدة الفيديو كاملاً للحصول على النقاط"}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="glass-card p-12 text-center border-dashed">
                <Play className="w-12 h-12 text-primary mx-auto mb-4 opacity-40" />
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {t("watch.selectVideo") || "اختر فيديو للمشاهدة"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("watch.selectDesc") || "اختر فيديو من القائمة وشاهده كاملاً لكسب النقاط"}
                </p>
              </div>
            )}
          </div>

          {/* Video List */}
          <div className="space-y-4">
            <h2 className="font-heading font-semibold text-lg">
              {t("watch.availableVideos") || "الفيديوهات المتاحة"}
            </h2>
            <div className="space-y-3">
              {SAMPLE_VIDEOS.map((video) => (
                <button
                  key={video.id}
                  onClick={() => {
                    if (cooldown > 0) {
                      toast.error(t("watch.cooldown") || `انتظر ${cooldown} ثانية`);
                      return;
                    }
                    startVideo(video);
                  }}
                  disabled={cooldown > 0 || (selectedVideo?.id === video.id && isPlaying)}
                  className={`w-full glass-card p-4 text-start hover:border-primary/30 transition-all duration-200 disabled:opacity-50 ${
                    selectedVideo?.id === video.id ? "border-primary/40 bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center text-2xl shrink-0">
                      {video.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{video.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{video.duration}s</span>
                        <Badge className="bg-success/20 text-success border-success/30 text-xs">
                          +{POINTS_PER_VIDEO} pts
                        </Badge>
                      </div>
                    </div>
                    <Play className="w-4 h-4 text-primary shrink-0" />
                  </div>
                </button>
              ))}
            </div>

            {/* Stats Card */}
            <div className="glass-card p-5">
              <h3 className="font-heading font-semibold mb-3">
                {t("watch.yourStats") || "إحصائياتك"}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("watch.totalPoints") || "إجمالي النقاط"}</span>
                  <span className="font-heading font-bold text-primary">{points.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("watch.pointsValue") || "القيمة بالدولار"}</span>
                  <span className="font-heading font-bold text-success">${(points / POINTS_PER_DOLLAR).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("watch.todayWatch") || "مشاهدات اليوم"}</span>
                  <span className="font-heading font-bold text-info">{todayWatches}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("watch.todayEarned") || "نقاط اليوم"}</span>
                  <span className="font-heading font-bold text-warning">{todayWatches * POINTS_PER_VIDEO}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
