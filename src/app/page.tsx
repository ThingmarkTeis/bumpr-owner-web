"use client";

import { useState } from "react";
import Image from "next/image";

/* ───────────────────────── Translations ───────────────────────── */

type Lang = "en" | "id";

const t = {
  en: {
    heroH2Before: "You ",
    heroHighlight: "lose money",
    heroH2After: " every night your villa is empty",
    commission: "Zero commission",
    commissionSub: "we charge the guest, not you",
    takeBack: "Take it back",
    takeBackLine2: "anytime",
    takeBackSub: " — guest moves out",
    guestsReady: "Guests are",
    guestsReadyLine2: "waiting",
    guestsReadySub: "travelers ready to book tonight",
    cta: "Sign up — no commitment",
    quoteH2: "\u201CEmpty nights earn nothing. Bumpr fills them.\u201D",
    quoteP1: "Your villa has empty nights. Instead of losing money on them, fill them with ",
    quoteHighlight: "temporary",
    quoteP2: " guests who pay nightly. When you get a full-price booking — the guest moves out, your villa is yours again. Like a standby seat on a plane: empty earns nothing. Filled earns money.",
    howTitle: "How It Works",
    step1Title: "Empty Villa",
    step1Desc: "You pay costs every day. Earning nothing.",
    step2Title: "Fill Your Villa",
    step2Desc: "Set a temporary price while you wait for a full-price booking.",
    step3Title: "Guests Pay Nightly",
    step3Desc: "Earn every night instead of nothing.",
    step4Title: "Take It Back",
    step4Desc: "Full-price booking? One tap. We handle everything.",
    step5Title: "Full Price Guest Arrives",
    step5Desc: "You got both. Temporary income + full-price booking.",
    cycleRepeats: "Cycle Repeats",
    diffTitle: "See the Difference",
    withoutBumpr: "Without Bumpr",
    withBumpr: "With Bumpr",
    emptyNights: "18 empty nights",
    filledNights: "12 nights filled by Bumpr guests",
    legendFull: "Full-price booking",
    legendBumpr: "Bumpr guest",
    legendEmpty: "Empty",
    noCommTitle: "No Commission. No Fees. No Contracts.",
    noCommDesc: "We charge guests a 15% service fee — not you. You receive 100% of the price you set.",
    otherPlatforms: "Other Platforms:",
    otherTake: "Take 15-25%",
    bumprLabel: "Bumpr:",
    bumprFree: "0% — Free for you",
    pullQuote: "Not 18 days. Your villa is yours",
    pullQuoteLine2: "again by tomorrow morning.",
    trustSecurity: "Security deposit from every guest",
    trustTerms: "All guests agree to terms before booking",
    trustHandle: "We handle the guest move — you don\u2019t have to worry",
    travelersH2: "\u201CThousands of digital nomads and travelers are already looking for affordable villas in Bali.\u201D",
    travelersP: "They agree to Bumpr\u2019s terms — stay temporarily, move when you need.",
    traveler1: "Remote workers who need wifi and quiet",
    traveler2: "They stay for weeks, not just weekends",
    traveler3: "They agree to security deposit and move-out terms",
    signupTitle: "Sign Up Now",
    signupDesc: "No commitment. We\u2019ll contact you when Bumpr is ready to launch.",
    namePlace: "Your name",
    emailPlace: "Your email",
    locationPlace: "Villa location (e.g. Canggu, Ubud)",
    villasLabel: "How many villas?",
    joinBtn: "Join Waitlist",
    sending: "Sending...",
    successMsg: "Thanks for signing up! We\u2019ll be in touch.",
    errorMsg: "Something went wrong. Please try again.",
  },
  id: {
    heroH2Before: "Anda ",
    heroHighlight: "rugi setiap malam",
    heroH2After: " villa Anda kosong",
    commission: "Nol komisi",
    commissionSub: "kami kenakan biaya ke tamu, bukan Anda",
    takeBack: "Ambil kembali",
    takeBackLine2: "kapan saja",
    takeBackSub: " — tamu pindah",
    guestsReady: "Tamu sudah",
    guestsReadyLine2: "menunggu",
    guestsReadySub: "traveler siap booking malam ini",
    cta: "Daftar — tanpa komitmen",
    quoteH2: "\u201CMalam kosong tidak menghasilkan apa-apa. Bumpr mengisinya.\u201D",
    quoteP1: "Villa Anda punya malam kosong. Daripada rugi, isi dengan tamu ",
    quoteHighlight: "sementara",
    quoteP2: " yang bayar per malam. Saat Anda dapat booking harga penuh — tamu pindah, villa kembali milik Anda. Seperti kursi standby di pesawat: kosong tidak menghasilkan. Terisi menghasilkan uang.",
    howTitle: "Cara Kerja",
    step1Title: "Villa Kosong",
    step1Desc: "Anda bayar biaya setiap hari. Tidak menghasilkan apa-apa.",
    step2Title: "Isi Villa Anda",
    step2Desc: "Tetapkan harga sementara sambil menunggu booking harga penuh.",
    step3Title: "Tamu Bayar Per Malam",
    step3Desc: "Hasilkan uang setiap malam, bukan nol.",
    step4Title: "Ambil Kembali",
    step4Desc: "Booking harga penuh? Satu tap. Kami urus semuanya.",
    step5Title: "Tamu Harga Penuh Tiba",
    step5Desc: "Anda dapat keduanya. Pendapatan sementara + booking harga penuh.",
    cycleRepeats: "Siklus Berulang",
    diffTitle: "Lihat Perbedaannya",
    withoutBumpr: "Tanpa Bumpr",
    withBumpr: "Dengan Bumpr",
    emptyNights: "18 malam kosong",
    filledNights: "12 malam terisi oleh tamu Bumpr",
    legendFull: "Booking harga penuh",
    legendBumpr: "Tamu Bumpr",
    legendEmpty: "Kosong",
    noCommTitle: "Tanpa Komisi. Tanpa Biaya. Tanpa Kontrak.",
    noCommDesc: "Kami kenakan biaya layanan 15% ke tamu — bukan Anda. Anda terima 100% dari harga yang Anda tetapkan.",
    otherPlatforms: "Platform Lain:",
    otherTake: "Ambil 15-25%",
    bumprLabel: "Bumpr:",
    bumprFree: "0% — Gratis untuk Anda",
    pullQuote: "18 jam — bukan 18 hari. Villa",
    pullQuoteLine2: "kembali milik Anda besok pagi.",
    trustSecurity: "Deposit keamanan dari setiap tamu",
    trustTerms: "Semua tamu setuju syarat sebelum booking",
    trustHandle: "Kami urus perpindahan tamu — Anda tidak perlu khawatir",
    travelersH2: "\u201CRibuan digital nomad dan traveler sudah mencari villa terjangkau di Bali.\u201D",
    travelersP: "Mereka setuju dengan syarat Bumpr — tinggal sementara, pindah saat Anda butuhkan.",
    traveler1: "Pekerja remote yang butuh wifi dan ketenangan",
    traveler2: "Mereka tinggal berminggu-minggu, bukan hanya weekend",
    traveler3: "Mereka setuju dengan deposit dan syarat pindah",
    signupTitle: "Daftar Sekarang",
    signupDesc: "Tanpa komitmen. Kami hubungi Anda saat Bumpr siap diluncurkan.",
    namePlace: "Nama Anda",
    emailPlace: "Email Anda",
    locationPlace: "Lokasi villa (misal Canggu, Ubud)",
    villasLabel: "Berapa villa?",
    joinBtn: "Gabung Waitlist",
    sending: "Mengirim...",
    successMsg: "Terima kasih sudah daftar! Kami akan menghubungi Anda.",
    errorMsg: "Terjadi kesalahan. Silakan coba lagi.",
  },
};

/* ───────────────────────── Bumpr Logo ───────────────────────── */

function BumprLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        className="absolute left-[33%] top-[2px]"
        width="31"
        height="9"
        viewBox="0 0 31.1108 8.19128"
        fill="none"
      >
        <path
          d="M12.549 7.14573C17.5576 1.17248 26.419 -5.38718 30.3819 7.14573C24.4375 -0.769782 16.9852 3.61608 12.549 7.14573C7.26523 3.18798 2.42174 6.70597 0 7.14573C6.60475 1.86874 9.24665 2.52836 12.549 7.14573Z"
          fill="#EC6D18"
        />
        <path
          d="M12.8374 7.60762C17.846 1.63437 26.7074 -4.92529 30.6703 7.60762C24.7259 -0.307893 17.2736 4.07797 12.8374 7.60762ZM12.8374 7.60762C9.53506 2.99025 6.89316 2.33063 0.288405 7.60762C2.71015 7.16786 7.55364 3.64987 12.8374 7.60762Z"
          stroke="#EC6D18"
          strokeWidth="0.924072"
        />
      </svg>
      <span className="text-[29.6px] font-black text-white tracking-[-0.9px] leading-none">
        Bumpr
      </span>
    </div>
  );
}

/* ───────────────────────── Calendar Grid ───────────────────────── */

type DayStatus = "booked" | "bumpr" | "empty";

function CalendarGrid({ days }: { days: DayStatus[] }) {
  const colorMap: Record<DayStatus, string> = {
    booked: "bg-[#5e8a82] shadow-sm",
    bumpr: "bg-[#ffa314] shadow-sm",
    empty: "bg-[#eae4d8]/60 border border-[#e0d8ca]/60",
  };
  return (
    <div className="grid grid-cols-5 gap-[6px]">
      {days.map((d, i) => (
        <div key={i} className={`aspect-square rounded-md ${colorMap[d]}`} />
      ))}
    </div>
  );
}

/* ──────────────────────────── Page ──────────────────────────── */

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [form, setForm] = useState({ name: "", email: "", location: "", villas: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const s = t[lang];
  const villaOptions = ["1", "2", "3", "4+"];

  const steps: { icon: string; title: string; desc: string; highlight?: boolean }[] = [
    { icon: "/icons/icon-empty-villa.svg", title: s.step1Title, desc: s.step1Desc },
    { icon: "/icons/icon-fill-villa.svg", title: s.step2Title, desc: s.step2Desc },
    { icon: "/icons/icon-guests-pay.svg", title: s.step3Title, desc: s.step3Desc },
    { icon: "/icons/icon-take-back.svg", title: s.step4Title, desc: s.step4Desc, highlight: true },
    { icon: "/icons/icon-full-price.svg", title: s.step5Title, desc: s.step5Desc },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", location: "", villas: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="flex flex-col items-center bg-white min-h-screen">
      {/* ══════════════ HERO ══════════════ */}
      <section className="w-full bg-[#ffa314]">
        <div className="max-w-lg mx-auto px-6 pt-6 pb-12 min-h-[852px] flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between">
            <BumprLogo />
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full pl-3 pr-0.5 py-0.5">
              <button
                onClick={() => setLang("en")}
                className={`font-medium text-base transition-colors ${lang === "en" ? "text-white" : "text-white/50"}`}
              >
                EN
              </button>
              <span className="text-white/30 text-[15px] font-light">|</span>
              <button
                onClick={() => setLang("id")}
                className={`font-medium text-base transition-colors ${lang === "id" ? "text-white" : "text-white/50"}`}
              >
                ID
              </button>
            </div>
          </header>

          {/* Main heading */}
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-[38px] font-black text-white text-center leading-[48px] tracking-[-1.53px]">
              {s.heroH2Before}
              <span className="relative inline-block">
                <span className="relative z-10">{s.heroHighlight}</span>
                <span className="absolute inset-x-[-6px] bottom-[2px] h-[40%] bg-[#e0700a] rounded-sm -skew-x-2 z-0" />
              </span>
              {s.heroH2After}
            </h2>
          </div>

          {/* Value props */}
          <div className="flex flex-col gap-3">
            <div className="backdrop-blur-sm bg-white/12 border border-white/15 rounded-2xl px-5 py-5">
              <div className="flex items-center gap-4">
                <span className="text-[48px] font-black text-white leading-none tracking-[-2px]">0%</span>
                <div className="h-10 w-px bg-white/20" />
                <div>
                  <p className="text-base font-bold text-white tracking-[-0.3px]">{s.commission}</p>
                  <p className="text-sm text-white/60 mt-0.5">{s.commissionSub}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="backdrop-blur-sm bg-white/12 border border-white/15 rounded-2xl px-4 py-4 flex flex-col justify-between min-h-[100px] relative overflow-hidden">
                <span className="absolute -right-1 -bottom-3 text-[64px] font-black text-white/[0.07] leading-none tracking-[-3px] select-none">18h</span>
                <p className="text-[20px] font-black text-white leading-tight tracking-[-0.5px] relative z-10">{s.takeBack}<br />{s.takeBackLine2}</p>
                <p className="text-[12px] text-white/50 mt-2 leading-snug relative z-10"><span className="font-bold text-white/80">18h</span>{s.takeBackSub}</p>
              </div>
              <div className="backdrop-blur-sm bg-white/12 border border-white/15 rounded-2xl px-4 py-4 flex flex-col justify-between min-h-[100px]">
                <p className="text-[20px] font-black text-white leading-tight tracking-[-0.5px]">{s.guestsReady}<br />{s.guestsReadyLine2}</p>
                <p className="text-[12px] text-white/50 mt-2 leading-snug">{s.guestsReadySub}</p>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full bg-[#fff9f0] text-[#ffa314] font-black text-lg py-4 rounded-full shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">
            {s.cta}
          </button>
        </div>
      </section>

      {/* ══════════════ QUOTE SECTION ══════════════ */}
      <section className="w-full bg-[#fffdf5] py-24 relative overflow-hidden">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-black text-[#ffa314]/[0.04] leading-none tracking-[-8px] select-none pointer-events-none">18h</span>
        <div className="max-w-lg mx-auto px-6 flex flex-col gap-10 relative z-10">
          <h2 className="text-[32px] font-black text-[#2a2520] text-center leading-[36.8px] tracking-[-0.39px]">
            {s.quoteH2}
          </h2>
          <p className="text-[17px] font-medium text-[#6b655c] text-center leading-[27.6px] tracking-[-0.43px]">
            {s.quoteP1}
            <span className="font-bold italic text-[#ffa314]">{s.quoteHighlight}</span>
            {s.quoteP2}
          </p>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="w-full bg-[#fffdf5] pt-20 pb-20 overflow-hidden">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-2xl font-black text-[#262626] text-center tracking-[-0.53px] mb-14">
            {s.howTitle}
          </h2>

          <div className="relative">
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-[#d4d4d4]" />

            <div className="flex flex-col gap-12">
              {steps.map((step, i) => (
                <div key={i} className={`flex items-start gap-6 ${step.highlight ? "relative bg-[#ffa314]/[0.06] -mx-4 px-4 py-5 rounded-2xl" : ""}`}>
                  {step.highlight && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[72px] font-black text-[#ffa314]/[0.1] leading-none tracking-[-3px] select-none pointer-events-none">18h</span>
                  )}

                  <div className="relative shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${step.highlight ? "bg-[#ffa314]/10" : "bg-[#fffdf5]"}`}>
                      <Image src={step.icon} alt="" width={56} height={56} className="w-14 h-14" />
                    </div>
                    <div className={`absolute bottom-[-4px] right-[-4px] w-5 h-5 border-2 rounded-full flex items-center justify-center z-20 ${step.highlight ? "bg-[#ffa314] border-[#fffdf5]" : "bg-[#171717] border-[#fffdf5]"}`}>
                      <span className="text-[11px] font-bold text-white">{i + 1}</span>
                    </div>
                  </div>

                  <div className="pt-1 relative z-10">
                    <h3 className={`text-lg font-bold tracking-[-0.89px] leading-[27px] ${step.highlight ? "text-[#ffa314]" : "text-[#171717]"}`}>
                      {step.title}
                    </h3>
                    <p className="text-[15px] font-medium text-[#737373] leading-[20.6px] tracking-[-0.23px] mt-1.5 max-w-[220px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center mt-8 ml-1">
              <Image src="/icons/icon-cycle.svg" alt="" width={36} height={120} className="opacity-60" />
              <span className="text-xs font-bold text-[#a1a1a1] opacity-60 -rotate-90 origin-left ml-8">
                {s.cycleRepeats}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SEE THE DIFFERENCE ══════════════ */}
      <section className="w-full bg-[#fffdf5] pt-10 pb-10 overflow-hidden">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-2xl font-black text-[#262626] text-center tracking-[-0.53px] mb-20">
            {s.diffTitle}
          </h2>

          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4 w-[280px]">
              <span className="text-base font-bold text-[#262626] tracking-[-0.71px]">{s.withoutBumpr}</span>
              <div className="bg-white border border-[#f5f5f5] rounded-2xl shadow-sm p-3 w-full">
                <CalendarGrid days={[
                  "booked","booked","booked","booked","booked",
                  "empty","empty","empty","empty","booked",
                  "booked","booked","empty","empty","empty",
                  "empty","empty","empty","empty","booked",
                  "booked","empty","empty","empty","empty",
                  "empty","empty","empty","empty","empty",
                ]} />
              </div>
              <span className="text-sm font-medium text-[#737373] tracking-[-0.15px]">{s.emptyNights}</span>
            </div>

            <div className="flex flex-col items-center gap-4 w-[280px]">
              <span className="text-base font-bold text-[#ffa314] tracking-[-0.71px]">{s.withBumpr}</span>
              <div className="bg-white border border-[#ffa314]/20 rounded-2xl shadow-sm p-3 w-full">
                <CalendarGrid days={[
                  "booked","booked","booked","booked","booked",
                  "bumpr","bumpr","bumpr","empty","booked",
                  "booked","booked","empty","bumpr","bumpr",
                  "bumpr","bumpr","bumpr","empty","booked",
                  "booked","empty","bumpr","bumpr","bumpr",
                  "bumpr","empty","empty","empty","empty",
                ]} />
              </div>
              <span className="text-sm font-bold text-[#ffa314] tracking-[-0.15px]">{s.filledNights}</span>
            </div>
          </div>

          <div className="bg-white border border-[#f5f5f5] rounded-full shadow-sm mt-12 px-4 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#5e8a82]" />
              <span className="text-xs font-bold text-[#525252] uppercase tracking-[0.6px]">{s.legendFull}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#ffa314]" />
              <span className="text-xs font-bold text-[#525252] uppercase tracking-[0.6px]">{s.legendBumpr}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#eae4d8] border border-[#e0d8ca]" />
              <span className="text-xs font-bold text-[#525252] uppercase tracking-[0.6px]">{s.legendEmpty}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ NO COMMISSION ══════════════ */}
      <section className="w-full bg-[#ffa314]">
        <div className="max-w-lg mx-auto px-6 py-20">
          <h2 className="text-[34px] font-black text-white text-center leading-[37.4px] tracking-[-1.31px]">
            {s.noCommTitle}
          </h2>
          <p className="text-base font-medium text-white/90 text-center leading-[22px] tracking-[-0.31px] mt-6">
            {s.noCommDesc}
          </p>

          <div className="bg-white/10 border border-white/20 rounded-[20px] px-5 pt-5 pb-5 mt-8">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-white/80 tracking-[-0.23px]">{s.otherPlatforms}</span>
              <span className="text-[15px] font-medium text-white/80 tracking-[-0.23px]">{s.otherTake}</span>
            </div>
            <div className="h-px bg-white/15 my-3" />
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white tracking-[-0.31px]">{s.bumprLabel}</span>
              <span className="text-base font-bold text-white tracking-[-0.31px]">{s.bumprFree}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <span className="text-[40px] font-black text-white leading-none tracking-[-2px]">18h</span>
            <div className="h-8 w-px bg-white/25" />
            <p className="text-[15px] font-medium text-white/80 leading-snug">
              {s.pullQuote}<br />{s.pullQuoteLine2}
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-8">
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image src="/icons/icon-security.svg" alt="" width={28} height={28} className="shrink-0" />
              <p className="text-sm font-semibold text-white/95 tracking-[-0.15px]">{s.trustSecurity}</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image src="/icons/icon-terms.svg" alt="" width={28} height={28} className="shrink-0" />
              <p className="text-sm font-semibold text-white/95 tracking-[-0.15px]">{s.trustTerms}</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image src="/icons/icon-handle-move.svg" alt="" width={28} height={28} className="shrink-0" />
              <p className="text-sm font-semibold text-white/95 tracking-[-0.15px]">{s.trustHandle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TRAVELERS SECTION ══════════════ */}
      <section className="w-full bg-[#fff5e0]">
        <div className="max-w-lg mx-auto px-6 py-20">
          <h2 className="text-[28px] font-black text-[#262626] text-center leading-[32.2px] tracking-[-0.32px]">
            {s.travelersH2}
          </h2>
          <p className="text-base font-medium text-[#525252] text-center leading-[22px] tracking-[-0.31px] mt-6">
            {s.travelersP}
          </p>

          <div className="flex flex-col gap-6 mt-12">
            {[
              { icon: "/icons/icon-wifi.svg", text: s.traveler1 },
              { icon: "/icons/icon-weeks.svg", text: s.traveler2 },
              { icon: "/icons/icon-deposit-terms.svg", text: s.traveler3 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                  <Image src={item.icon} alt="" width={24} height={24} />
                </div>
                <p className="text-[15px] font-bold text-[#262626] leading-[18.75px] tracking-[-0.23px]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SIGN UP / WAITLIST ══════════════ */}
      <section className="w-full bg-[#2a2520]">
        <div className="max-w-lg mx-auto px-6 py-24">
          <h2 className="text-4xl font-black text-white text-center leading-[54px] tracking-[-1.43px]">
            {s.signupTitle}
          </h2>
          <p className="text-base font-medium text-[#948d85] text-center leading-6 tracking-[-0.31px] mt-4">
            {s.signupDesc}
          </p>

          {status === "success" && (
            <div className="bg-[#5e8a82] text-white font-semibold text-center rounded-xl px-4 py-4 mt-10">
              {s.successMsg}
            </div>
          )}
          {status === "error" && (
            <div className="bg-red-500/20 text-red-300 font-semibold text-center rounded-xl px-4 py-3 mt-10">
              {s.errorMsg}
            </div>
          )}

          <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={s.namePlace}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#fffdf5] border border-[#e8dfd2] rounded-[10px] px-4 py-4 text-base font-medium text-[#2a2520] placeholder:text-[#948d85] tracking-[-0.31px] outline-none focus:border-[#ffa314] transition-colors"
            />
            <input
              type="email"
              placeholder={s.emailPlace}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[#fffdf5] border border-[#e8dfd2] rounded-[10px] px-4 py-4 text-base font-medium text-[#2a2520] placeholder:text-[#948d85] tracking-[-0.31px] outline-none focus:border-[#ffa314] transition-colors"
            />
            <input
              type="text"
              placeholder={s.locationPlace}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full bg-[#fffdf5] border border-[#e8dfd2] rounded-[10px] px-4 py-4 text-base font-medium text-[#2a2520] placeholder:text-[#948d85] tracking-[-0.31px] outline-none focus:border-[#ffa314] transition-colors"
            />
            <div>
              <p className="text-sm font-medium text-[#948d85] mb-2">{s.villasLabel}</p>
              <div className="flex gap-2">
                {villaOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm({ ...form, villas: opt })}
                    className={`flex-1 py-3 rounded-[10px] text-base font-bold transition-all ${
                      form.villas === opt
                        ? "bg-[#ffa314] text-white"
                        : "bg-[#fffdf5] border border-[#e8dfd2] text-[#2a2520]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#ffa314] text-white font-black text-lg py-4 rounded-[10px] shadow-sm mt-4 hover:brightness-110 transition-all disabled:opacity-60"
            >
              {status === "sending" ? s.sending : s.joinBtn}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
