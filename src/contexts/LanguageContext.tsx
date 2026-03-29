import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "ar" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<string, Record<Lang, string>> = {
  // NAV
  "nav.features": { ar: "المميزات", en: "Features" },
  "nav.howItWorks": { ar: "كيف يعمل", en: "How It Works" },
  "nav.vip": { ar: "VIP", en: "VIP" },
  "nav.login": { ar: "تسجيل الدخول", en: "Login" },
  "nav.getStarted": { ar: "ابدأ الآن", en: "Get Started" },

  // HERO
  "hero.badge": { ar: "منصة المكافآت الأولى في مصر", en: "Egypt's #1 GPT Rewards Platform" },
  "hero.title1": { ar: "اكسب أموالاً حقيقية", en: "Earn Real Money" },
  "hero.title2": { ar: "من هاتفك", en: "From Your Phone" },
  "hero.subtitle": { ar: "أكمل العروض والاستطلاعات والمهام. اسحب عبر USDT أو فودافون كاش. انضم لأكثر من 50,000 مصري يكسبون يومياً.", en: "Complete offers, surveys & tasks. Withdraw via USDT or Vodafone Cash. Join 50,000+ Egyptians already earning daily." },
  "hero.cta": { ar: "ابدأ الكسب الآن", en: "Start Earning Now" },
  "hero.loginDash": { ar: "تسجيل الدخول للوحة التحكم", en: "Login to Dashboard" },

  // STATS
  "stats.users": { ar: "مستخدم نشط", en: "Active Users" },
  "stats.paid": { ar: "إجمالي المدفوعات", en: "Total Paid Out" },
  "stats.offers": { ar: "عرض يومي", en: "Daily Offers" },
  "stats.uptime": { ar: "وقت التشغيل", en: "Uptime" },

  // FEATURES
  "feat.badge": { ar: "مميزات المنصة", en: "Platform Features" },
  "feat.title": { ar: "كل ما تحتاجه للكسب", en: "Everything You Need to Earn" },
  "feat.subtitle": { ar: "منظومة متكاملة مصممة للمستخدم المصري مع طرق سحب محلية.", en: "A complete ecosystem built for Egyptian users with local withdrawal methods." },
  "feat.earn.title": { ar: "اكسب أموالاً حقيقية", en: "Earn Real Money" },
  "feat.earn.desc": { ar: "أكمل العروض والمهام، اكسب دولارات تُضاف فوراً لرصيدك.", en: "Complete offers & tasks, earn USD credited instantly to your balance." },
  "feat.referral.title": { ar: "نظام الإحالات", en: "Referral System" },
  "feat.referral.desc": { ar: "إحالة من مستويين بعمولة 10% + 3% مدى الحياة على كل الأرباح.", en: "2-level referral with 10% + 3% lifetime commissions on all earnings." },
  "feat.fraud.title": { ar: "حماية من الاحتيال", en: "Anti-Fraud Protected" },
  "feat.fraud.desc": { ar: "كشف VPN متقدم، تتبع بصمة الجهاز وتتبع عنوان IP.", en: "Advanced VPN detection, device fingerprinting & IP tracking." },
  "feat.vip.title": { ar: "عضوية VIP", en: "VIP Membership" },
  "feat.vip.desc": { ar: "زيادة الأرباح 10%+، سحب أولوية وعروض حصرية.", en: "+10% earnings boost, priority withdrawals & exclusive offers." },
  "feat.bonus.title": { ar: "مكافآت يومية", en: "Daily Bonuses" },
  "feat.bonus.desc": { ar: "سلاسل تسجيل الدخول، شارات الإنجاز ومكافآت قائمة المتصدرين.", en: "Login streaks, achievement badges & leaderboard rewards." },
  "feat.withdraw.title": { ar: "طرق سحب متعددة", en: "Multiple Withdrawals" },
  "feat.withdraw.desc": { ar: "USDT TRC20 وفودافون كاش بحد أدنى 10 دولار.", en: "USDT TRC20 & Vodafone Cash with $10 minimum threshold." },

  // HOW IT WORKS
  "how.badge": { ar: "عملية بسيطة", en: "Simple Process" },
  "how.title": { ar: "كيف يعمل", en: "How It Works" },
  "how.step1.title": { ar: "سجّل وتحقق", en: "Register & Verify" },
  "how.step1.desc": { ar: "أنشئ حسابك بالبريد الإلكتروني مع التحقق بـ OTP في أقل من دقيقتين.", en: "Create your account with email OTP verification in under 2 minutes." },
  "how.step2.title": { ar: "أكمل العروض", en: "Complete Offers" },
  "how.step2.desc": { ar: "تصفح جدار العروض وأكمل الاستطلاعات والتثبيتات والمهام.", en: "Browse our offerwall and complete surveys, installs & tasks." },
  "how.step3.title": { ar: "اكسب واسحب", en: "Earn & Withdraw" },
  "how.step3.desc": { ar: "اسحب عبر USDT أو فودافون كاش عند الوصول لـ 10 دولار.", en: "Withdraw via USDT or Vodafone Cash once you hit $10." },

  // VIP
  "vip.badge": { ar: "عضوية VIP", en: "VIP Membership" },
  "vip.title": { ar: "افتح مزايا VIP", en: "Unlock VIP Benefits" },
  "vip.month": { ar: "/شهر", en: "/month" },
  "vip.subtitle": { ar: "عظّم أرباحك بمزايا VIP الحصرية", en: "Maximize your earnings with exclusive VIP perks" },
  "vip.boost": { ar: "زيادة 10% على كل العروض", en: "+10% Earnings Boost on all offers" },
  "vip.priority": { ar: "معالجة سحب أولوية", en: "Priority withdrawal processing" },
  "vip.exclusive": { ar: "الوصول لعروض VIP الحصرية", en: "Access to exclusive VIP-only offers" },
  "vip.cta": { ar: "احصل على VIP", en: "Get VIP Access" },

  // TRUST
  "trust.ssl": { ar: "مشفر SSL 256-bit", en: "256-bit SSL Encrypted" },
  "trust.fraud": { ar: "محمي من الاحتيال", en: "Anti-Fraud Protected" },
  "trust.vodafone": { ar: "فودافون كاش مدعوم", en: "Vodafone Cash Supported" },
  "trust.verified": { ar: "مدفوعات موثقة", en: "Verified Payments" },

  // FOOTER
  "footer.rights": { ar: "© 2025 Maksab. جميع الحقوق محفوظة.", en: "© 2025 Maksab. All rights reserved." },
  "footer.privacy": { ar: "الخصوصية", en: "Privacy" },
  "footer.terms": { ar: "الشروط", en: "Terms" },
  "footer.support": { ar: "الدعم", en: "Support" },

  // LOGIN
  "login.welcome": { ar: "مرحباً بعودتك", en: "Welcome back" },
  "login.subtitle": { ar: "أدخل بيانات الدخول للوصول إلى لوحة التحكم", en: "Enter your credentials to access your dashboard" },
  "login.email": { ar: "البريد الإلكتروني", en: "Email Address" },
  "login.password": { ar: "كلمة المرور", en: "Password" },
  "login.forgot": { ar: "نسيت كلمة المرور؟", en: "Forgot password?" },
  "login.submit": { ar: "تسجيل الدخول", en: "Sign In" },
  "login.loading": { ar: "جارٍ الدخول...", en: "Signing in..." },
  "login.noAccount": { ar: "ليس لديك حساب؟", en: "Don't have an account?" },
  "login.createFree": { ar: "أنشئ حساباً مجانياً", en: "Create one free" },
  "login.security": { ar: "تسجيل دخولك محمي بتتبع بصمة الجهاز وعنوان IP للأمان.", en: "Your login is protected with device fingerprinting & IP tracking for security." },
  "login.earns": { ar: "اكسب كل يوم", en: "Earn Money Every Day" },
  "login.earnsSubtitle": { ar: "انضم لأكثر من 50,000 مصري يكملون العروض ويسحبون أموالاً حقيقية يومياً.", en: "Join 50,000+ Egyptians completing offers and withdrawing real money daily." },
  "login.feat1": { ar: "إضافة رصيد العرض فورياً بعد الإتمام", en: "Instant offer crediting after completion" },
  "login.feat2": { ar: "اسحب عبر USDT أو فودافون كاش", en: "Withdraw via USDT or Vodafone Cash" },
  "login.feat3": { ar: "نظام إحالة مستويين - اكسب من أصدقائك", en: "2-level referral system - earn from friends" },
  "login.review": { ar: "\"سحبت 45 دولار هذا الأسبوع! أفضل منصة GPT في مصر.\"", en: "\"Withdrew $45 this week! Best GPT platform in Egypt.\"" },

  // REGISTER
  "reg.title": { ar: "أنشئ حسابك", en: "Create your account" },
  "reg.subtitle": { ar: "ابدأ الكسب اليوم — مجاناً تماماً", en: "Start earning money today — it's completely free" },
  "reg.name": { ar: "الاسم الكامل", en: "Full Name" },
  "reg.email": { ar: "البريد الإلكتروني", en: "Email Address" },
  "reg.password": { ar: "كلمة المرور", en: "Password" },
  "reg.passwordPlaceholder": { ar: "8 أحرف على الأقل", en: "Min. 8 characters" },
  "reg.referral": { ar: "كود الإحالة", en: "Referral Code" },
  "reg.referralOpt": { ar: "(اختياري)", en: "(Optional)" },
  "reg.referralPlaceholder": { ar: "أدخل كود الإحالة", en: "Enter referral code" },
  "reg.terms": { ar: "بالتسجيل، أنت توافق على", en: "By registering, you agree to our" },
  "reg.termsLink": { ar: "شروط الخدمة", en: "Terms of Service" },
  "reg.and": { ar: "و", en: "and" },
  "reg.privacy": { ar: "سياسة الخصوصية", en: "Privacy Policy" },
  "reg.submit": { ar: "إنشاء حساب", en: "Create Account" },
  "reg.loading": { ar: "جارٍ الإرسال...", en: "Sending OTP..." },
  "reg.hasAccount": { ar: "لديك حساب بالفعل؟", en: "Already have an account?" },
  "reg.signin": { ar: "تسجيل الدخول", en: "Sign in" },
  "reg.joinFree": { ar: "انضم مجاناً.", en: "Join Free." },
  "reg.earnReal": { ar: "اكسب حقاً.", en: "Earn Real." },
  "reg.welcomeBonus": { ar: "مكافأة الترحيب", en: "Welcome Bonus" },
  "reg.dailyOffers": { ar: "عروض يومية", en: "Daily Offers" },
  "reg.referralBonus": { ar: "عمولة الإحالة", en: "Referral Bonus" },
  "reg.minWithdraw": { ar: "الحد الأدنى للسحب", en: "Min. Withdrawal" },

  // OTP
  "otp.title": { ar: "تحقق من بريدك الإلكتروني", en: "Check Your Email" },
  "otp.subtitle": { ar: "أرسلنا رمزاً مكوناً من 6 أرقام إلى", en: "We sent a 6-digit code to" },
  "otp.label": { ar: "أدخل رمز التحقق", en: "Enter Verification Code" },
  "otp.verify": { ar: "تحقق وأنشئ الحساب", en: "Verify & Create Account" },
  "otp.verifying": { ar: "جارٍ التحقق...", en: "Verifying..." },
  "otp.noCode": { ar: "لم تستلم الرمز؟", en: "Didn't receive the code?" },
  "otp.resend": { ar: "إعادة الإرسال", en: "Resend" },

  // DASHBOARD
  "dash.welcome": { ar: "مرحباً بعودتك، أحمد! 👋", en: "Welcome back, Ahmed! 👋" },
  "dash.newOffers": { ar: "لديك 6 عروض جديدة متاحة. واصل الكسب!", en: "You have 6 new offers available. Keep earning!" },
  "dash.streak": { ar: "سلسلة 7 أيام", en: "7-Day Streak" },
  "dash.claimBonus": { ar: "استلم المكافأة", en: "Claim Bonus" },
  "dash.balance": { ar: "الرصيد المتاح", en: "Available Balance" },
  "dash.pending": { ar: "أرباح معلقة", en: "Pending Earnings" },
  "dash.lifetime": { ar: "إجمالي الأرباح", en: "Lifetime Earnings" },
  "dash.points": { ar: "رصيد النقاط", en: "Points Balance" },
  "dash.withdrawable": { ar: "قابل للسحب", en: "Withdrawable" },
  "dash.processing": { ar: "قيد المعالجة", en: "Processing" },
  "dash.allTime": { ar: "كل الوقت", en: "All Time" },
  "dash.redeemable": { ar: "قابل للاستبدال", en: "Redeemable" },
  "dash.availableOffers": { ar: "العروض المتاحة", en: "Available Offers" },
  "dash.viewAll": { ar: "عرض الكل", en: "View All" },
  "dash.hot": { ar: "ساخن", en: "Hot" },
  "dash.start": { ar: "ابدأ", en: "Start" },
  "dash.offerwallTitle": { ar: "جدار عروض CPX Research", en: "CPX Research Offerwall" },
  "dash.offerwallDesc": { ar: "يتم تحميل جدار العروض الخارجي هنا عبر تكامل API آمن", en: "External offerwall loads here via secure API integration" },
  "dash.openOfferwall": { ar: "فتح جدار العروض كاملاً", en: "Open Full Offerwall" },
  "dash.vipTitle": { ar: "عضوية VIP", en: "VIP Membership" },
  "dash.vipDesc": { ar: "افتح زيادة 10% في الأرباح وسحب أولوية", en: "Unlock +10% earnings boost & priority withdrawals" },
  "dash.monthlyProgress": { ar: "التقدم الشهري", en: "Monthly progress" },
  "dash.upgradeVip": { ar: "الترقية مقابل 5$/شهر", en: "Upgrade for $5/mo" },
  "dash.referralLink": { ar: "رابط الإحالة", en: "Referral Link" },
  "dash.copyLink": { ar: "نسخ الرابط", en: "Copy Link" },
  "dash.copied": { ar: "تم النسخ!", en: "Copied!" },
  "dash.l1refs": { ar: "إحالة م1", en: "L1 Refs" },
  "dash.refEarnings": { ar: "أرباح الإحالة", en: "Ref Earnings" },
  "dash.recentActivity": { ar: "النشاط الأخير", en: "Recent Activity" },
  "dash.achievements": { ar: "الإنجازات", en: "Achievements" },
  "dash.badgesUnlocked": { ar: "4 من 6 شارات مفتوحة", en: "4 of 6 badges unlocked" },
  "dash.readyWithdraw": { ar: "جاهز للسحب؟", en: "Ready to Withdraw?" },
  "dash.withdrawDesc": { ar: "لديك متاح. الحد الأدنى للسحب 10$.", en: "available. Min. withdrawal is $10." },
  "dash.withdrawNow": { ar: "اسحب الآن", en: "Withdraw Now" },
  "dash.upgradeVipBtn": { ar: "ترقية VIP", en: "Upgrade VIP" },

  // TASK statuses
  "task.completed": { ar: "مكتمل", en: "completed" },
  "task.pending": { ar: "معلق", en: "pending" },

  // OFFER CATEGORIES
  "cat.survey": { ar: "استطلاع", en: "Survey" },
  "cat.install": { ar: "تثبيت", en: "Install" },
  "cat.registration": { ar: "تسجيل", en: "Registration" },
  "cat.video": { ar: "فيديو", en: "Video" },
  "cat.trial": { ar: "تجربة", en: "Trial" },

  // ACHIEVEMENTS
  "ach.streak": { ar: "سلسلة 7 أيام", en: "7-Day Streak" },
  "ach.firstWithdraw": { ar: "أول سحب", en: "First Withdrawal" },
  "ach.referrals": { ar: "5 إحالات", en: "5 Referrals" },
  "ach.top100": { ar: "أفضل 100", en: "Top 100" },
  "ach.vip": { ar: "عضو VIP", en: "VIP Member" },
  "ach.earned100": { ar: "ربحت 100$", en: "$100 Earned" },

  // RECENT TASKS
  "task.survey.electronics": { ar: "استطلاع - إلكترونيات", en: "Survey - Electronics" },
  "task.install.gaming": { ar: "تثبيت تطبيق - ألعاب", en: "App Install - Gaming" },
  "task.video.finance": { ar: "عرض فيديو - مالية", en: "Video Offer - Finance" },
  "task.survey.auto": { ar: "استطلاع - سيارات", en: "Survey - Automotive" },
  "task.referral.l1": { ar: "مكافأة إحالة - م1", en: "Referral Bonus - L1" },

  // ADMIN
  "admin.title": { ar: "لوحة الإدارة", en: "Admin Dashboard" },
  "admin.lastUpdated": { ar: "آخر تحديث: الآن", en: "Last updated: just now" },
  "admin.online": { ar: "متصل الآن", en: "online" },
  "admin.exportReport": { ar: "تصدير التقرير", en: "Export Report" },
  "admin.revenue": { ar: "إجمالي الإيرادات", en: "Total Revenue" },
  "admin.activeUsers": { ar: "المستخدمون النشطون", en: "Active Users" },
  "admin.pendingPayouts": { ar: "المدفوعات المعلقة", en: "Pending Payouts" },
  "admin.fraudAlerts": { ar: "تنبيهات الاحتيال", en: "Fraud Alerts" },
  "admin.revenueChart": { ar: "الإيرادات مقابل المدفوعات", en: "Revenue vs Payouts" },
  "admin.last7days": { ar: "آخر 7 أيام", en: "Last 7 days" },
  "admin.revenue2": { ar: "الإيرادات", en: "Revenue" },
  "admin.payouts": { ar: "المدفوعات", en: "Payouts" },
  "admin.offerCats": { ar: "فئات العروض", en: "Offer Categories" },
  "admin.earningsDist": { ar: "توزيع الأرباح", en: "Earnings distribution" },
  "admin.withdrawQueue": { ar: "قائمة انتظار السحب", en: "Withdrawal Queue" },
  "admin.pending3": { ar: "3 بانتظار الموافقة", en: "3 pending approval" },
  "admin.all": { ar: "الكل", en: "All" },
  "admin.fraudTitle": { ar: "تنبيهات الاحتيال", en: "Fraud Alerts" },
  "admin.fraudSubtitle": { ar: "4 علامات نشطة تتطلب المراجعة", en: "4 active flags require review" },
  "admin.active4": { ar: "4 نشط", en: "4 Active" },
  "admin.recentUsers": { ar: "المستخدمون الأخيرون", en: "Recent Users" },
  "admin.manageAll": { ar: "إدارة الكل", en: "Manage All" },
  "admin.user": { ar: "المستخدم", en: "User" },
  "admin.status": { ar: "الحالة", en: "Status" },
  "admin.joined": { ar: "تاريخ الانضمام", en: "Joined" },
  "admin.balance": { ar: "الرصيد", en: "Balance" },
  "admin.actions": { ar: "الإجراءات", en: "Actions" },
  "admin.flags": { ar: "علامات", en: "flags" },
  "admin.panel": { ar: "لوحة التحكم", en: "Control Panel" },

  // STATUS badges
  "status.pending": { ar: "معلق", en: "Pending" },
  "status.approved": { ar: "موافق عليه", en: "Approved" },
  "status.rejected": { ar: "مرفوض", en: "Rejected" },
  "status.active": { ar: "نشط", en: "Active" },
  "status.flagged": { ar: "مُعلَّم", en: "Flagged" },
  "status.banned": { ar: "محظور", en: "Banned" },

  // RISK
  "risk.low": { ar: "منخفض", en: "low" },
  "risk.medium": { ar: "متوسط", en: "medium" },
  "risk.high": { ar: "مرتفع", en: "high" },

  // SEVERITY
  "sev.high": { ar: "مرتفع", en: "high" },
  "sev.medium": { ar: "متوسط", en: "medium" },

  // LAYOUT
  "layout.management": { ar: "الإدارة", en: "Management" },
  "layout.analytics": { ar: "التحليلات", en: "Analytics" },
  "layout.users": { ar: "المستخدمون", en: "Users" },
  "layout.withdrawals": { ar: "السحوبات", en: "Withdrawals" },
  "layout.fraudFlags": { ar: "علامات الاحتيال", en: "Fraud Flags" },
  "layout.balanceAdjust": { ar: "تعديل الرصيد", en: "Balance Adjust" },
  "layout.offers": { ar: "العروض", en: "Offers" },
  "layout.systemLogs": { ar: "سجلات النظام", en: "System Logs" },
  "layout.settings": { ar: "الإعدادات", en: "Settings" },
  "layout.userDashboard": { ar: "لوحة المستخدم", en: "User Dashboard" },
  "layout.signOut": { ar: "تسجيل الخروج", en: "Sign Out" },
  "layout.adminPanel": { ar: "لوحة الإدارة", en: "Admin Panel" },
  "layout.systemOnline": { ar: "النظام يعمل", en: "System Online" },
  "layout.admin": { ar: "مدير", en: "Admin" },
  "layout.dashboard": { ar: "الرئيسية", en: "Dashboard" },
  "layout.offerwall": { ar: "جدار العروض", en: "Offerwall" },
  "layout.taskHistory": { ar: "سجل المهام", en: "Task History" },
  "layout.referrals": { ar: "الإحالات", en: "Referrals" },
  "layout.leaderboard": { ar: "المتصدرون", en: "Leaderboard" },
  "layout.vip": { ar: "VIP", en: "VIP" },

  // WITHDRAW
  "wd.title": { ar: "سحب الأرباح", en: "Withdraw Earnings" },
  "wd.subtitle": { ar: "اختر طريقة السحب وأدخل التفاصيل", en: "Choose a withdrawal method and enter details" },
  "wd.availableBalance": { ar: "الرصيد المتاح", en: "Available Balance" },
  "wd.minWithdrawal": { ar: "الحد الأدنى للسحب", en: "Min. Withdrawal" },
  "wd.withdrawalNumber": { ar: "رقم عملية السحب", en: "Withdrawal #" },
  "wd.firstBonus": { ar: "حد أدنى مخفض!", en: "Reduced minimum!" },
  "wd.tiersTitle": { ar: "مستويات الحد الأدنى للسحب", en: "Withdrawal Minimum Tiers" },
  "wd.tier1": { ar: "أول سحب: $1", en: "1st withdrawal: $1" },
  "wd.tier2": { ar: "ثاني سحب: $5", en: "2nd withdrawal: $5" },
  "wd.tier3": { ar: "من الثالث فما فوق: $100", en: "3rd+ withdrawal: $100" },
  "wd.selectMethod": { ar: "اختر طريقة السحب", en: "Select Withdrawal Method" },
  "wd.usdt": { ar: "USDT TRC20", en: "USDT TRC20" },
  "wd.usdtDesc": { ar: "تحويل إلى محفظة USDT على شبكة Tron", en: "Transfer to USDT wallet on Tron network" },
  "wd.vodafone": { ar: "فودافون كاش", en: "Vodafone Cash" },
  "wd.vodafoneDesc": { ar: "تحويل إلى رقم فودافون كاش المصري", en: "Transfer to Egyptian Vodafone Cash number" },
  "wd.instapay": { ar: "إنستا باي", en: "InstaPay" },
  "wd.instapayDesc": { ar: "تحويل فوري عبر إنستا باي", en: "Instant transfer via InstaPay" },
  "wd.visa": { ar: "فيزا / بطاقة بنكية", en: "Visa / Bank Card" },
  "wd.visaDesc": { ar: "تحويل إلى بطاقة فيزا أو ماستركارد", en: "Transfer to Visa or Mastercard" },
  "wd.crypto": { ar: "عملة رقمية أخرى", en: "Other Crypto" },
  "wd.cryptoDesc": { ar: "BTC, ETH, أو عملات رقمية أخرى", en: "BTC, ETH, or other cryptocurrencies" },
  "wd.walletAddress": { ar: "عنوان المحفظة", en: "Wallet Address" },
  "wd.phoneNumber": { ar: "رقم الهاتف", en: "Phone Number" },
  "wd.instapayId": { ar: "حساب إنستا باي", en: "InstaPay Account" },
  "wd.cardNumber": { ar: "رقم البطاقة", en: "Card Number" },
  "wd.placeholderUsdt": { ar: "أدخل عنوان محفظة TRC20", en: "Enter TRC20 wallet address" },
  "wd.placeholderVodafone": { ar: "أدخل رقم فودافون كاش (01x...)", en: "Enter Vodafone Cash number (01x...)" },
  "wd.placeholderInstapay": { ar: "أدخل حساب إنستا باي أو رقم الهاتف", en: "Enter InstaPay account or phone number" },
  "wd.placeholderVisa": { ar: "أدخل رقم البطاقة", en: "Enter card number" },
  "wd.placeholderCrypto": { ar: "أدخل عنوان المحفظة", en: "Enter wallet address" },
  "wd.amount": { ar: "المبلغ", en: "Amount" },
  "wd.minError": { ar: "الحد الأدنى للسحب", en: "Minimum withdrawal is" },
  "wd.maxError": { ar: "الحد الأقصى هو رصيدك", en: "Maximum is your balance:" },
  "wd.submitRequest": { ar: "إرسال طلب السحب", en: "Submit Withdrawal Request" },
  "wd.securityNote": { ar: "جميع عمليات السحب تتطلب موافقة الإدارة للأمان", en: "All withdrawals require admin approval for security" },
  "wd.history": { ar: "سجل السحوبات", en: "Withdrawal History" },
  "wd.successTitle": { ar: "تم إرسال طلب السحب!", en: "Withdrawal Request Submitted!" },
  "wd.successDesc": { ar: "سيتم مراجعة طلبك والموافقة عليه خلال 24-48 ساعة", en: "Your request will be reviewed and approved within 24-48 hours" },
  "wd.method": { ar: "الطريقة", en: "Method" },
  "wd.status": { ar: "الحالة", en: "Status" },
  "wd.newRequest": { ar: "طلب سحب جديد", en: "New Withdrawal Request" },

  // REFERRALS
  "ref.title": { ar: "نظام الإحالات", en: "Referral System" },
  "ref.subtitle": { ar: "ادعُ أصدقاءك واكسب عمولات مدى الحياة من أرباحهم", en: "Invite friends and earn lifetime commissions from their earnings" },
  "ref.totalReferrals": { ar: "إجمالي الإحالات", en: "Total Referrals" },
  "ref.totalEarnings": { ar: "إجمالي أرباح الإحالة", en: "Total Referral Earnings" },
  "ref.l1Earnings": { ar: "أرباح المستوى 1", en: "Level 1 Earnings" },
  "ref.thisMonth": { ar: "أرباح هذا الشهر", en: "This Month" },
  "ref.yourLink": { ar: "رابط الإحالة الخاص بك", en: "Your Referral Link" },
  "ref.shareVia": { ar: "شارك عبر:", en: "Share via:" },
  "ref.shareText": { ar: "انضم لمنصة Maksab واكسب أموالاً حقيقية من هاتفك! سجل من هنا:", en: "Join Maksab and earn real money from your phone! Register here:" },
  "ref.level1": { ar: "المستوى 1", en: "Level 1" },
  "ref.level2": { ar: "المستوى 2", en: "Level 2" },
  "ref.referral": { ar: "إحالة", en: "referrals" },
  "ref.earned": { ar: "الأرباح", en: "Earned" },
  "ref.tree": { ar: "شجرة الإحالات", en: "Referral Tree" },
  "ref.commission": { ar: "نسبة العمولة", en: "Commission rate" },
  "ref.lifetime": { ar: "مدى الحياة", en: "lifetime" },
  "ref.joined": { ar: "انضم", en: "Joined" },
  "ref.subRefs": { ar: "إحالات فرعية", en: "sub-referrals" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL: lang === "ar" }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
