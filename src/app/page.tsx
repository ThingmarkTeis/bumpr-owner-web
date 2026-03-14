"use client";

import { useState } from "react";
import Image from "next/image";

/* ───────────────────────── Translations ───────────────────────── */

type Lang = "en" | "id";

const t = {
  en: {
    heroH2: "You lose money every night your villa is empty..",
    heroAccent: "lose money",
    heroBefore: "You ",
    heroAfter: " every night your villa is empty..",
    heroSub: "An empty villa still eats your money",
    ctaTop: "Sign up — no commitment",
    commission: "No commission",
    commissionSub: "we charge the guest, not you",
    takeBack: "Take your villa back anytime",
    liveDemand: "Live Demand",
    liveDemandSub: "Travelers are already waiting to stay",
    // Costs section
    costsTitle: "An empty villa still eats your money",
    costs18h: "And when a full-price booking comes — 18 hours, your villa is yours again.",
    costsOut: "COSTS OUT",
    costItems: ["Staff", "Pool", "Garden", "Electricity", "Water", "Repairs"],
    standbyIn: "STANDBY IN",
    standbyDesc: "Bumpr guests cover it all.",
    // How you take villa back
    howTitle: "How You Take Your Villa Back",
    howStep1: "You get a full-price booking",
    howStep1Sub: "From Airbnb, Booking.com, or direct.",
    howStep2: "Press one button (or WhatsApp us)",
    howStep2Badge: "TAKE VILLA BACK",
    howStep3: "Guest gets notified instantly",
    howStep3Badge: "BEFORE",
    howStep3Time: "18h",
    howStep3Desc: "Guest has 18 hours to move. Bumpr finds them another villa.",
    howStep4: "Your villa is ready",
    howStep4Desc: "Guest has moved. Your villa is ready for your full-price guest.",
    // Calendar
    diffTitle: "See the Difference",
    withoutBumpr: "Without Bumpr",
    withBumpr: "With Bumpr",
    emptyNights: "18 empty nights",
    filledNights: "12 nights filled by Bumpr guests",
    legendFull: "Full-price booking",
    legendBumpr: "Bumpr guest",
    legendEmpty: "Empty",
    // No Commission
    noCommTitle: "No Commission. No Fees. No Contracts.",
    noCommDesc: "We charge guests a 15% service fee — not you. You receive 100% of the price you set.",
    otherPlatforms: "Other Platforms:",
    otherTake: "Take 15-25%",
    bumprLabel: "Bumpr:",
    bumprFree: "0% — Free for you",
    trustSecurity: "Security deposit from every guest",
    trustTerms: "All guests agree to terms before booking",
    // Who are bumpr guests
    whoTitle: "WHO ARE BUMPR GUESTS?",
    whoIntro: "There is a massive wave of flexible guests looking for somewhere affordable to stay in Bali.",
    whoDesc: "They prioritize reasonable pricing and are happy to adapt to your availability.",
    // Signup
    signupTitle: "Sign Up Now",
    signupDesc: "No commitment. We\u2019ll contact you when Bumpr is ready to launch.",
    namePlace: "Your name",
    emailPlace: "Your email",
    locationPlace: "Villa location (e.g. Canggu, Ubud)",
    villasLabel: "How many villas?",
    licensedLabel: "Is your villa licensed?",
    licensedYes: "Yes",
    licensedNo: "No",
    joinBtn: "Join Waitlist",
    sending: "Sending...",
    successMsg: "Thanks for signing up! We\u2019ll be in touch.",
    errorMsg: "Something went wrong. Please try again.",
  },
  id: {
    heroH2: "Anda rugi setiap malam villa Anda kosong..",
    heroAccent: "rugi",
    heroBefore: "Anda ",
    heroAfter: " setiap malam villa Anda kosong..",
    heroSub: "Villa kosong tetap menghabiskan uang Anda",
    ctaTop: "Daftar — tanpa komitmen",
    commission: "Tanpa komisi",
    commissionSub: "kami kenakan biaya ke tamu, bukan Anda",
    takeBack: "Ambil kembali villa kapan saja",
    liveDemand: "Permintaan Aktif",
    liveDemandSub: "Traveler sudah menunggu untuk menginap",
    costsTitle: "Villa kosong tetap menghabiskan uang Anda",
    costs18h: "Dan saat booking harga penuh datang — 18 jam, villa kembali milik Anda.",
    costsOut: "BIAYA KELUAR",
    costItems: ["Staf", "Kolam", "Taman", "Listrik", "Air", "Perbaikan"],
    standbyIn: "STANDBY MASUK",
    standbyDesc: "Tamu Bumpr menanggung semuanya.",
    howTitle: "Cara Mengambil Kembali Villa Anda",
    howStep1: "Anda dapat booking harga penuh",
    howStep1Sub: "Dari Airbnb, Booking.com, atau langsung.",
    howStep2: "Tekan satu tombol (atau WhatsApp kami)",
    howStep2Badge: "AMBIL VILLA",
    howStep3: "Tamu langsung diberitahu",
    howStep3Badge: "SEBELUM",
    howStep3Time: "18h",
    howStep3Desc: "Tamu punya 18 jam untuk pindah. Bumpr carikan villa lain.",
    howStep4: "Villa Anda siap",
    howStep4Desc: "Tamu sudah pindah. Villa siap untuk tamu harga penuh Anda.",
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
    trustSecurity: "Deposit keamanan dari setiap tamu",
    trustTerms: "Semua tamu setuju syarat sebelum booking",
    whoTitle: "SIAPA TAMU BUMPR?",
    whoIntro: "Ada gelombang besar tamu fleksibel yang mencari tempat tinggal terjangkau di Bali.",
    whoDesc: "Mereka mengutamakan harga wajar dan siap menyesuaikan dengan ketersediaan Anda.",
    signupTitle: "Daftar Sekarang",
    signupDesc: "Tanpa komitmen. Kami hubungi Anda saat Bumpr siap diluncurkan.",
    namePlace: "Nama Anda",
    emailPlace: "Email Anda",
    locationPlace: "Lokasi villa (misal Canggu, Ubud)",
    villasLabel: "Berapa villa?",
    licensedLabel: "Apakah villa Anda berlisensi?",
    licensedYes: "Ya",
    licensedNo: "Tidak",
    joinBtn: "Gabung Waitlist",
    sending: "Mengirim...",
    successMsg: "Terima kasih sudah daftar! Kami akan menghubungi Anda.",
    errorMsg: "Terjadi kesalahan. Silakan coba lagi.",
  },
};

/* ───────────────────────── Bumpr Logo ───────────────────────── */

function BumprLogo() {
  return (
    <div className="relative inline-block">
      <svg className="absolute left-[33%] top-[2px]" width="31" height="9" viewBox="0 0 31.1108 8.19128" fill="none">
        <path d="M12.549 7.14573C17.5576 1.17248 26.419 -5.38718 30.3819 7.14573C24.4375 -0.769782 16.9852 3.61608 12.549 7.14573C7.26523 3.18798 2.42174 6.70597 0 7.14573C6.60475 1.86874 9.24665 2.52836 12.549 7.14573Z" fill="#EC6D18" />
        <path d="M12.8374 7.60762C17.846 1.63437 26.7074 -4.92529 30.6703 7.60762C24.7259 -0.307893 17.2736 4.07797 12.8374 7.60762ZM12.8374 7.60762C9.53506 2.99025 6.89316 2.33063 0.288405 7.60762C2.71015 7.16786 7.55364 3.64987 12.8374 7.60762Z" stroke="#EC6D18" strokeWidth="0.924072" />
      </svg>
      <span className="text-[29.6px] font-black text-white tracking-[-0.9px] leading-none">Bumpr</span>
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
  const [form, setForm] = useState({ name: "", email: "", location: "", villas: "", licensed: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const s = t[lang];
  const villaOptions = ["1", "2", "3", "4+"];

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
      setForm({ name: "", email: "", location: "", villas: "", licensed: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="flex flex-col items-center bg-white min-h-screen">

      {/* ══════════════ HERO ══════════════ */}
      <section className="w-full bg-[#ffa314] relative overflow-hidden">
        <div className="max-w-lg mx-auto px-6 pt-6 pb-20 min-h-[780px] flex flex-col relative z-10">
          {/* Header */}
          <header className="flex items-center justify-between">
            <BumprLogo />
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full pl-3 pr-0.5 py-0.5">
              <button onClick={() => setLang("en")} className={`font-medium text-base transition-colors ${lang === "en" ? "text-white" : "text-white/50"}`}>EN</button>
              <span className="text-white/30 text-[15px] font-light">|</span>
              <button onClick={() => setLang("id")} className={`font-medium text-base transition-colors ${lang === "id" ? "text-white" : "text-white/50"}`}>ID</button>
            </div>
          </header>

          {/* Heading */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h2 className="text-[36px] font-black text-white leading-[44px] tracking-[-1.5px] relative">
              {s.heroBefore}
              <span className="relative inline-block">
                <span className="text-[#ff3b3b]">{s.heroAccent}</span>
                <span className="absolute -top-4 -right-6 text-[15px] font-black text-[#ff3b3b]/40 rotate-[10deg] select-none">Rp</span>
                <span className="absolute -top-3 -left-4 text-[18px] font-black text-[#ff3b3b]/30 rotate-[-12deg] select-none">$</span>
              </span>{" "}
              {s.heroAfter}
            </h2>

            <button className="mt-8 bg-[#fff9f0] text-[#ffa314] font-black text-base px-8 py-3.5 rounded-full shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">
              {s.ctaTop}
            </button>
          </div>

          {/* Value props — simple lines */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[32px] font-black text-white leading-none tracking-[-1px]">0%</span>
              <p className="text-[14px] font-semibold text-white/90">{s.commission} <span className="text-white/50 font-medium">— {s.commissionSub}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[20px]">🔄</span>
              <p className="text-[14px] font-semibold text-white/90">{s.takeBack}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[20px]">🟢</span>
              <p className="text-[14px] font-semibold text-white/90">{s.liveDemand} <span className="text-white/50 font-medium">— {s.liveDemandSub}</span></p>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 400 40" className="w-full block" preserveAspectRatio="none">
            <path d="M0 40 L0 20 Q200 -10 400 20 L400 40 Z" fill="#fffdf5" />
          </svg>
        </div>
      </section>

      {/* ══════════════ COSTS SECTION ══════════════ */}
      <section className="w-full bg-[#fffdf5] pt-8 pb-16">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-[28px] font-black text-[#2a2520] text-center leading-[34px] tracking-[-0.5px]">
            {s.costsTitle}
          </h2>

          {/* 18h callout */}
          <div className="relative mt-10 mb-8">
            <div className="text-center">
              <span className="text-[64px] font-black text-[#ffa314] leading-none tracking-[-3px]">18h</span>
            </div>
            <p className="text-[15px] font-medium text-[#6b655c] text-center leading-[22px] mt-3 max-w-[320px] mx-auto">
              {s.costs18h}
            </p>
          </div>

          {/* Costs grid */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {/* Costs OUT */}
            <div>
              <p className="text-[11px] font-bold text-[#ff3b3b] tracking-[1.5px] uppercase mb-3">{s.costsOut}</p>
              <div className="flex flex-col gap-2">
                {s.costItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b3b]/40" />
                    <span className="text-[14px] font-medium text-[#737373]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standby IN */}
            <div className="bg-[#ffa314]/8 rounded-2xl p-4">
              <p className="text-[11px] font-bold text-[#ffa314] tracking-[1.5px] uppercase mb-3">{s.standbyIn}</p>
              <p className="text-[15px] font-bold text-[#2a2520] leading-snug">{s.standbyDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ HOW YOU TAKE YOUR VILLA BACK ══════════════ */}
      <section className="w-full bg-[#fffdf5] pt-8 pb-20">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-[26px] font-black text-[#262626] text-center leading-[32px] tracking-[-0.5px] mb-12">
            {s.howTitle}
          </h2>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-[#d4d4d4]" />

            <div className="flex flex-col gap-10">
              {/* Step 1 */}
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 bg-[#fffdf5] rounded-full flex items-center justify-center z-10 relative">
                    <Image src="/icons/icon-booking.svg" alt="" width={48} height={48} className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-[-4px] right-[-4px] w-5 h-5 bg-[#171717] border-2 border-[#fffdf5] rounded-full flex items-center justify-center z-20">
                    <span className="text-[11px] font-bold text-white">1</span>
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-[17px] font-bold text-[#171717] tracking-[-0.5px]">{s.howStep1}</h3>
                  <p className="text-[14px] font-medium text-[#737373] mt-1">{s.howStep1Sub}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 bg-[#fffdf5] rounded-full flex items-center justify-center z-10 relative">
                    <Image src="/icons/icon-button.svg" alt="" width={48} height={48} className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-[-4px] right-[-4px] w-5 h-5 bg-[#171717] border-2 border-[#fffdf5] rounded-full flex items-center justify-center z-20">
                    <span className="text-[11px] font-bold text-white">2</span>
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-[17px] font-bold text-[#171717] tracking-[-0.5px]">{s.howStep2}</h3>
                  <div className="mt-2 inline-block bg-[#ffa314] text-white text-[11px] font-bold tracking-[1px] uppercase px-3 py-1.5 rounded-lg">
                    {s.howStep2Badge}
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 bg-[#fffdf5] rounded-full flex items-center justify-center z-10 relative">
                    <Image src="/icons/icon-notify.svg" alt="" width={48} height={48} className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-[-4px] right-[-4px] w-5 h-5 bg-[#171717] border-2 border-[#fffdf5] rounded-full flex items-center justify-center z-20">
                    <span className="text-[11px] font-bold text-white">3</span>
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-[17px] font-bold text-[#171717] tracking-[-0.5px]">{s.howStep3}</h3>
                  {/* 18h highlight */}
                  <div className="mt-3 bg-[#ffa314]/[0.06] rounded-xl p-4 relative overflow-hidden">
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[56px] font-black text-[#ffa314]/[0.08] leading-none tracking-[-3px] select-none">18h</span>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#737373] tracking-[1px] uppercase">{s.howStep3Badge}</span>
                      <span className="text-[11px] text-[#737373]">→</span>
                      <span className="text-[24px] font-black text-[#ffa314] leading-none tracking-[-1px]">{s.howStep3Time}</span>
                    </div>
                    <p className="text-[13px] font-medium text-[#737373] leading-snug relative z-10">{s.howStep3Desc}</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-5">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 bg-[#fffdf5] rounded-full flex items-center justify-center z-10 relative">
                    <Image src="/icons/icon-ready.svg" alt="" width={48} height={48} className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-[-4px] right-[-4px] w-5 h-5 bg-[#5e8a82] border-2 border-[#fffdf5] rounded-full flex items-center justify-center z-20">
                    <span className="text-[11px] font-bold text-white">✓</span>
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-[17px] font-bold text-[#5e8a82] tracking-[-0.5px]">{s.howStep4}</h3>
                  <p className="text-[14px] font-medium text-[#737373] mt-1">{s.howStep4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SEE THE DIFFERENCE ══════════════ */}
      <section className="w-full bg-[#fffdf5] pt-4 pb-16 overflow-hidden">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-2xl font-black text-[#262626] text-center tracking-[-0.53px] mb-16">
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

          <div className="bg-white/10 border border-white/20 rounded-[20px] px-5 py-5 mt-8">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-white/80">{s.otherPlatforms}</span>
              <span className="text-[15px] font-medium text-white/80">{s.otherTake}</span>
            </div>
            <div className="h-px bg-white/15 my-3" />
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white">{s.bumprLabel}</span>
              <span className="text-base font-bold text-white">{s.bumprFree}</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-10">
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image src="/icons/icon-security2.svg" alt="" width={28} height={28} className="shrink-0" />
              <p className="text-sm font-semibold text-white/95">{s.trustSecurity}</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image src="/icons/icon-terms2.svg" alt="" width={28} height={28} className="shrink-0" />
              <p className="text-sm font-semibold text-white/95">{s.trustTerms}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WHO ARE BUMPR GUESTS ══════════════ */}
      <section className="w-full bg-[#fff5e0]">
        <div className="max-w-lg mx-auto px-6 py-20">
          <p className="text-[11px] font-bold text-[#ffa314] tracking-[2px] uppercase text-center mb-4">{s.whoTitle}</p>

          <h2 className="text-[26px] font-black text-[#2a2520] text-center leading-[32px] tracking-[-0.4px]">
            {s.whoIntro}
          </h2>

          {/* Traveler photos */}
          <div className="flex justify-center gap-3 mt-10 mb-8">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md rotate-[-4deg]">
              <Image src="/traveler1.png" alt="" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md rotate-[2deg] -mt-2">
              <Image src="/traveler2.png" alt="" width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md rotate-[-2deg] mt-1">
              <Image src="/traveler3.png" alt="" width={80} height={80} className="w-full h-full object-cover" />
            </div>
          </div>

          <p className="text-[15px] font-medium text-[#6b655c] text-center leading-[22px]">
            {s.whoDesc}
          </p>
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

            {/* Licensed yes/no */}
            <div>
              <p className="text-sm font-medium text-[#948d85] mb-2">{s.licensedLabel}</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, licensed: "yes" })}
                  className={`flex-1 py-3.5 rounded-[10px] text-base font-bold transition-all flex items-center justify-center gap-2 ${
                    form.licensed === "yes"
                      ? "bg-[#5e8a82] text-white"
                      : "bg-[#fffdf5] border border-[#e8dfd2] text-[#2a2520]"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={form.licensed === "yes" ? "text-white" : "text-[#5e8a82]"}>
                    <path d="M15 4.5L6.75 12.75L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {s.licensedYes}
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, licensed: "no" })}
                  className={`flex-1 py-3.5 rounded-[10px] text-base font-bold transition-all flex items-center justify-center gap-2 ${
                    form.licensed === "no"
                      ? "bg-[#c4754a] text-white"
                      : "bg-[#fffdf5] border border-[#e8dfd2] text-[#2a2520]"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={form.licensed === "no" ? "text-white" : "text-[#c4754a]"}>
                    <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {s.licensedNo}
                </button>
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
