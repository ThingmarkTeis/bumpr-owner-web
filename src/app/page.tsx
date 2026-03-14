"use client";

import { useState } from "react";
import Image from "next/image";

/* ───────────────────────── Translations ───────────────────────── */

type Lang = "en" | "id";

const t = {
  en: {
    heroBefore: "You ",
    heroAccent: "lose money",
    heroAfter: " every night your villa is empty..",
    ctaTop: "Sign up — no commitment",
    // Hero cards
    noCommLabel: "No commission",
    noCommSub: "we charge the guest, not you",
    takeBack: "Take your villa back anytime",
    liveDemand: "Live Demand",
    liveDemandSub: "Travelers are already waiting to stay",
    // Costs section
    costsTitle: "An empty villa still eats your money",
    costsOut: "COSTS OUT",
    costItems: ["Staff", "Pool", "Garden", "Electricity", "Water", "Repairs"],
    standbyIn: "STANDBY IN",
    standbyDesc: "Bumpr guests cover it all.",
    costsDesc: "Bumpr guests pay nightly. Enough to cover your villa\u2019s running costs \u2014 which you were paying yourself for an empty villa.",
    costs18h: "And when a full-price booking comes \u2014 18 hours, your villa is yours again.",
    // How you take villa back
    howTitle: "How You Take Your Villa Back",
    howStep1: "You get a full-price booking",
    howStep1Sub: "From Airbnb, Booking.com, or direct.",
    howStep2: "Press one button (or WhatsApp us)",
    howStep2Desc: "Open the Bumpr app and press one button. Or just shoot us a WhatsApp message and we\u2019ll handle it for you.",
    howStep2Btn: "TAKE VILLA BACK",
    howStep2WA: "Or just text us \u201CAirbnb guest booked Aug 24\u201D",
    howStep3: "Guest gets notified instantly",
    howStep3Card: "They already agreed to these terms",
    howStep3Before: "BEFORE",
    howStep3After: " they booked.",
    how18h: "Guest has 18 hours to move. Bumpr finds them another villa.",
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
    noCommDesc: "We charge guests a 15% service fee \u2014 not you. You receive 100% of the price you set.",
    otherPlatforms: "Other Platforms:",
    otherTake: "Take 15-25%",
    bumprLabel: "Bumpr:",
    bumprFree: "0% \u2014 Free for you",
    trustSecurity: "Security deposit from every guest",
    trustTerms: "All guests agree to terms before booking",
    trustMove: "We handle the guest move \u2014 you don\u2019t have to worry",
    // Who are bumpr guests
    whoLabel: "WHO ARE BUMPR GUESTS?",
    whoQuote: "\u201CThere is a massive wave of flexible guests looking for reasonably priced stays in Bali.\u201D",
    whoSub: "They want medium-term living, and they\u2019re highly willing to work around your schedule to get it.",
    whoCard1Title: "Highly adaptable & flexible",
    whoCard1Desc: "They prioritize reasonable pricing and are happy to adapt to your availability.",
    whoCard2Title: "Respectful & low-impact",
    whoCard2Desc: "Bumpr guests are quiet, responsible travelers who treat your villa with care.",
    whoCard3Title: "Already in Bali",
    whoCard3Desc: "Digital nomads, remote workers, and long-stay travelers already living on the island.",
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
    heroBefore: "Anda ",
    heroAccent: "rugi",
    heroAfter: " setiap malam villa Anda kosong..",
    ctaTop: "Daftar \u2014 tanpa komitmen",
    noCommLabel: "Tanpa komisi",
    noCommSub: "kami kenakan biaya ke tamu, bukan Anda",
    takeBack: "Ambil kembali villa kapan saja",
    liveDemand: "Permintaan Aktif",
    liveDemandSub: "Traveler sudah menunggu untuk menginap",
    costsTitle: "Villa kosong tetap menghabiskan uang Anda",
    costsOut: "BIAYA KELUAR",
    costItems: ["Staf", "Kolam", "Taman", "Listrik", "Air", "Perbaikan"],
    standbyIn: "STANDBY MASUK",
    standbyDesc: "Tamu Bumpr menanggung semuanya.",
    costsDesc: "Tamu Bumpr membayar per malam. Cukup untuk menutupi biaya operasional villa Anda \u2014 yang sebelumnya Anda bayar sendiri untuk villa kosong.",
    costs18h: "Dan saat booking harga penuh datang \u2014 18 jam, villa kembali milik Anda.",
    howTitle: "Cara Mengambil Kembali Villa Anda",
    howStep1: "Anda dapat booking harga penuh",
    howStep1Sub: "Dari Airbnb, Booking.com, atau langsung.",
    howStep2: "Tekan satu tombol (atau WhatsApp kami)",
    howStep2Desc: "Buka aplikasi Bumpr dan tekan satu tombol. Atau kirim pesan WhatsApp dan kami yang urus.",
    howStep2Btn: "AMBIL VILLA",
    howStep2WA: "Atau kirim pesan \u201CTamu Airbnb booking 24 Agt\u201D",
    howStep3: "Tamu langsung diberitahu",
    howStep3Card: "Mereka sudah setuju dengan syarat ini",
    howStep3Before: "SEBELUM",
    howStep3After: " mereka booking.",
    how18h: "Tamu punya 18 jam untuk pindah. Bumpr carikan villa lain.",
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
    noCommDesc: "Kami kenakan biaya layanan 15% ke tamu \u2014 bukan Anda. Anda terima 100% dari harga yang Anda tetapkan.",
    otherPlatforms: "Platform Lain:",
    otherTake: "Ambil 15-25%",
    bumprLabel: "Bumpr:",
    bumprFree: "0% \u2014 Gratis untuk Anda",
    trustSecurity: "Deposit keamanan dari setiap tamu",
    trustTerms: "Semua tamu setuju syarat sebelum booking",
    trustMove: "Kami urus perpindahan tamu \u2014 Anda tidak perlu khawatir",
    whoLabel: "SIAPA TAMU BUMPR?",
    whoQuote: "\u201CAda gelombang besar tamu fleksibel yang mencari tempat tinggal terjangkau di Bali.\u201D",
    whoSub: "Mereka ingin tinggal menengah, dan sangat bersedia menyesuaikan dengan jadwal Anda.",
    whoCard1Title: "Sangat adaptif & fleksibel",
    whoCard1Desc: "Mereka mengutamakan harga wajar dan siap menyesuaikan dengan ketersediaan Anda.",
    whoCard2Title: "Sopan & berdampak rendah",
    whoCard2Desc: "Tamu Bumpr adalah traveler tenang dan bertanggung jawab yang merawat villa Anda.",
    whoCard3Title: "Sudah di Bali",
    whoCard3Desc: "Digital nomad, pekerja remote, dan traveler jangka panjang yang sudah tinggal di pulau ini.",
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
    booked: "bg-[#5e8a82] shadow-[0px_1px_3px_rgba(0,0,0,0.1)]",
    bumpr: "bg-[#ffa314] shadow-[0px_1px_3px_rgba(0,0,0,0.1)]",
    empty: "bg-[#eae4d8] border border-[rgba(224,216,202,0.6)] opacity-60",
  };
  return (
    <div className="grid grid-cols-5 gap-[6px]">
      {days.map((d, i) => (
        <div key={i} className={`aspect-square rounded-[6px] ${colorMap[d]}`} />
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
        <div className="max-w-lg mx-auto px-6 pt-6 pb-16 min-h-[850px] flex flex-col relative z-10">
          {/* Header */}
          <header className="flex items-center justify-between">
            <BumprLogo />
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full pl-3 pr-1 py-0.5">
              <button onClick={() => setLang("en")} className={`font-medium text-base transition-colors ${lang === "en" ? "text-white" : "text-white/50"}`}>EN</button>
              <span className="text-white/30 text-[15px] font-light">|</span>
              <button onClick={() => setLang("id")} className={`font-medium text-base transition-colors ${lang === "id" ? "text-white" : "text-white/50"}`}>ID</button>
            </div>
          </header>

          {/* Floating currency symbols background */}
          <div className="absolute inset-0 opacity-30 pointer-events-none select-none overflow-hidden">
            <span className="absolute text-[120px] font-black text-[#d92d20]/60 -rotate-[15deg] -left-4 top-[70px] leading-none">$</span>
            <span className="absolute text-[110px] font-black text-[#d92d20]/60 -rotate-[20deg] right-4 top-[50px] leading-none">$</span>
            <span className="absolute text-[90px] font-black text-[#d92d20]/60 rotate-[12deg] right-8 top-[250px] leading-none">Rp</span>
            <span className="absolute text-[70px] font-black text-[#d92d20]/60 rotate-[25deg] left-8 bottom-[280px] leading-none">$</span>
          </div>

          {/* Heading */}
          <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 -mt-8">
            <h1 className="text-[38px] font-black text-white leading-[40px] tracking-[-1.5px] max-w-[270px]">
              {s.heroBefore}
              <span className="text-[#d92d20]">{s.heroAccent}</span>
              {s.heroAfter}
            </h1>
          </div>

          {/* Value prop cards */}
          <div className="flex flex-col gap-3 relative z-10">
            {/* Card 1: No Commission */}
            <div className="bg-white border border-white/40 rounded-full shadow-[0px_20px_25px_rgba(0,0,0,0.1)] flex items-center gap-4 pl-2 pr-6 py-2">
              <div className="w-14 h-14 rounded-full border border-[#e8920e]/30 flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #fff9f0, #ffe8c4)" }}>
                <span className="text-[26px] font-black text-[#e8920e] tracking-[-1px]">0%</span>
              </div>
              <div>
                <p className="text-[11px] font-black text-[#e8920e] uppercase tracking-[0.6px]">{s.noCommLabel}</p>
                <p className="text-[14px] font-bold text-[#2a2520] leading-[17px]">{s.noCommSub}</p>
              </div>
            </div>

            {/* Card 2: Take Villa Back */}
            <div className="bg-[#5e8a82] border-t border-white/20 rounded-l-full rounded-r-[30px] shadow-[0px_8px_30px_rgba(0,0,0,0.2)] flex items-center justify-between pl-5 pr-2 py-3 ml-10">
              <p className="text-[14px] font-semibold text-white/95">{s.takeBack}</p>
              <div className="bg-black/20 border border-white/10 rounded-full flex items-center justify-end pl-0.5 pr-1 py-0.5 w-14 h-8">
                <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L4.5 7.5L3 6" stroke="#5e8a82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Card 3: Live Demand */}
            <div className="bg-white/10 border border-white/20 rounded-[28px] shadow-[0px_10px_15px_rgba(0,0,0,0.1)] flex items-center gap-4 pl-4 pr-5 py-4">
              {/* Traveler avatars */}
              <div className="flex -space-x-3 shrink-0">
                <Image src="/traveler3.png" alt="" width={38} height={38} className="w-[38px] h-[38px] rounded-full border-2 border-[#e8920e] object-cover" />
                <Image src="/traveler2.png" alt="" width={38} height={38} className="w-[38px] h-[38px] rounded-full border-2 border-[#e8920e] object-cover" />
                <Image src="/traveler1.png" alt="" width={38} height={38} className="w-[38px] h-[38px] rounded-full border-2 border-[#e8920e] object-cover" />
                <div className="w-[31px] h-[19px] bg-[#d92d20] border border-white rounded-full flex items-center justify-center self-end -ml-2 opacity-55 shadow-sm">
                  <span className="text-[9px] font-black text-white">+12</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="relative">
                    <div className="w-2 h-2 bg-[#00c950] rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-[#05df72] rounded-full opacity-30 -m-0.5" />
                  </div>
                  <span className="text-[10px] font-black text-white/90 uppercase tracking-[1.1px]">{s.liveDemand}</span>
                </div>
                <p className="text-[14px] font-semibold text-white leading-[17px]">{s.liveDemandSub}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════ COSTS SECTION ══════════════ */}
      <section className="w-full bg-[#fffdf5] py-20">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-[32px] font-black text-[#2a2520] text-center leading-[37px] tracking-[-0.4px] max-w-[270px] mx-auto">
            {s.costsTitle}
          </h2>

          {/* Costs vs Standby cards */}
          <div className="flex gap-0 mt-10 relative">
            {/* Vertical divider */}
            <div className="absolute left-1/2 top-[12%] bottom-[12%] w-px bg-[#e5e5e5]" />

            {/* Costs OUT card */}
            <div className="flex-1">
              <div className="bg-white border border-[rgba(217,45,32,0.2)] rounded-t-2xl rounded-b-lg shadow-md overflow-hidden">
                <p className="text-[12px] font-black text-[#d92d20] tracking-[1.2px] uppercase text-center pt-4 pb-3 opacity-80">{s.costsOut}</p>
                <div className="flex flex-col gap-2 px-3 pb-4">
                  {s.costItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-[rgba(217,45,32,0.1)] pb-2">
                      <span className="text-[14px] font-bold text-[#2a2520]/80">{item}</span>
                      <span className="text-[12px] font-bold text-[#d92d20] opacity-60">&bull;&bull;&bull;</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Down arrow */}
              <div className="flex justify-center mt-3 opacity-60">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m0 0l-5-5m5 5l5-5" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>

            {/* Standby IN card */}
            <div className="flex-1 mt-8">
              {/* Arrows pointing down into card */}
              <div className="flex justify-center mb-2">
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                  <path d="M12 0v24m0 0l-4-4m4 4l4-4" stroke="#e8920e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16v24m0 0l-4-4m4 4l4-4" stroke="#e8920e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
                </svg>
              </div>
              <div className="rounded-2xl border border-[#e8920e] shadow-[0px_20px_25px_rgba(0,0,0,0.1)] overflow-hidden" style={{ background: "linear-gradient(180deg, #e8920e, #ffa314)" }}>
                <div className="relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-bl-[40px]" />
                  <p className="text-[12px] font-black text-white tracking-[1.2px] uppercase text-center pt-4 pb-3">{s.standbyIn}</p>
                  <div className="mx-4 mb-4 bg-white/20 border border-white/30 rounded-[14px] p-3">
                    <p className="text-[14px] font-bold text-white leading-[17px]">{s.standbyDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description card */}
          <div className="bg-white border border-[#eae4d8] rounded-2xl shadow-sm p-6 mt-8">
            <p className="text-[16px] font-semibold text-[#6b655c] text-center leading-[22px] tracking-[-0.3px]">
              {s.costsDesc}
            </p>
          </div>

          {/* 18h badge + text */}
          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 bg-[#eae4d8] border-2 border-white rounded-full shadow-sm flex items-center justify-center shrink-0">
              <span className="text-[15px] font-black text-[#2a2520] tracking-[-1px]">18h</span>
            </div>
            <p className="text-[13px] font-bold text-[#6b655c] leading-[16px] tracking-[-0.08px] opacity-80">
              {s.costs18h}
            </p>
          </div>

          {/* CTA */}
          <a href="#signup" className="block mt-10 w-full bg-[#ffa314] text-white font-black text-[16px] text-center py-4 rounded-full shadow-[0px_8px_30px_rgba(0,0,0,0.08)] hover:brightness-110 transition-all">
            {s.ctaTop}
          </a>
        </div>
      </section>

      {/* ══════════════ HOW YOU TAKE YOUR VILLA BACK ══════════════ */}
      <section className="w-full bg-[#2a2520] overflow-hidden">
        <div className="max-w-lg mx-auto px-6 py-24">
          <h2 className="text-[32px] font-black text-white text-center leading-[35px] tracking-[-0.4px] max-w-[220px] mx-auto mb-16">
            {s.howTitle}
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[26px] top-10 bottom-10 w-1 bg-white/10 rounded-full" />

            <div className="flex flex-col gap-10">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-[52px] h-[52px] bg-[#5e8a82] border-4 border-[#2a2520] rounded-full shadow-lg flex items-center justify-center shrink-0 relative z-10">
                  <Image src="/icons/icon-booking.svg" alt="" width={24} height={24} />
                </div>
                <div className="pt-2 flex-1">
                  <h3 className="text-[18px] font-black text-white tracking-[-0.9px]">{s.howStep1}</h3>
                  <div className="mt-2 bg-white/5 border border-white/10 rounded-[14px] px-3 py-3">
                    <p className="text-[14px] font-medium text-white/70">{s.howStep1Sub}</p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-[52px] h-[52px] bg-[#e8920e] border-4 border-[#2a2520] rounded-full shadow-lg flex items-center justify-center shrink-0 relative z-10">
                  <Image src="/icons/icon-button.svg" alt="" width={24} height={24} />
                </div>
                <div className="pt-2 flex-1">
                  <h3 className="text-[18px] font-black text-white tracking-[-0.9px]">{s.howStep2}</h3>
                  {/* App mockup card */}
                  <div className="mt-2 bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="px-4 pt-4">
                      <p className="text-[14px] font-medium text-white/70 leading-[19px]">{s.howStep2Desc}</p>
                    </div>
                    <div className="px-4 py-3">
                      <div className="bg-[#d92d20] rounded-[14px] shadow-[0px_0px_20px_rgba(217,45,32,0.4)] flex items-center justify-center gap-2 py-3">
                        <span className="text-[16px] font-black text-white tracking-[-0.3px]">{s.howStep2Btn}</span>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.75 9h10.5m0 0L9.75 4.5M14.25 9l-4.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </div>
                  {/* WhatsApp option */}
                  <div className="mt-2 bg-[rgba(37,211,102,0.1)] border border-[rgba(37,211,102,0.3)] rounded-2xl flex items-center gap-3 px-3 py-3">
                    <div className="w-10 h-10 bg-[#25d366] rounded-full flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.716-1.244A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.319 0-4.47-.738-6.228-1.992l-.356-.264-3.011.793.808-2.953-.288-.458A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fillRule="evenodd"/></svg>
                    </div>
                    <p className="text-[13px] font-semibold text-white/90 leading-[16px]">{s.howStep2WA}</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-[52px] h-[52px] bg-[#404040] border-4 border-[#2a2520] rounded-full shadow-lg flex items-center justify-center shrink-0 relative z-10">
                  <Image src="/icons/icon-notify.svg" alt="" width={20} height={20} />
                </div>
                <div className="pt-2 flex-1">
                  <h3 className="text-[18px] font-black text-white tracking-[-0.9px]">{s.howStep3}</h3>
                  {/* Tilted card */}
                  <div className="mt-3 -rotate-1">
                    <div className="bg-white rounded-[14px] shadow-[0px_10px_15px_rgba(0,0,0,0.1)] px-4 py-3">
                      <p className="text-[14px] font-bold text-[#2a2520] leading-[19px]">
                        {s.howStep3Card}{" "}
                        <span className="bg-[#ffe8c4] text-[#d92d20] font-black uppercase underline px-1">{s.howStep3Before}</span>
                        {s.howStep3After}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 18h big circle + description */}
              <div className="flex items-center gap-4 -ml-4">
                <div className="w-[84px] h-[84px] bg-[#e8920e] border-[6px] border-[#2a2520] rounded-full shadow-[0px_0px_30px_rgba(232,146,14,0.3)] flex items-center justify-center shrink-0 relative z-10">
                  <span className="text-[36px] font-black text-white tracking-[-1.4px]">18h</span>
                </div>
                <div className="flex-1 pl-2">
                  <div className="bg-[rgba(232,146,14,0.1)] border border-[rgba(232,146,14,0.3)] rounded-[14px] px-4 py-4">
                    <p className="text-[15px] font-bold text-white leading-[21px] tracking-[-0.2px]">{s.how18h}</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="w-[52px] h-[52px] bg-[#5e8a82] border-4 border-[#2a2520] rounded-full shadow-lg flex items-center justify-center shrink-0 relative z-10">
                  <Image src="/icons/icon-ready.svg" alt="" width={24} height={24} />
                </div>
                <div className="pt-2 flex-1">
                  <h3 className="text-[18px] font-black text-[#5e8a82] tracking-[-0.9px]">{s.howStep4}</h3>
                  <p className="text-[14px] font-medium text-white/70 mt-1 leading-[19px]">{s.howStep4Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SEE THE DIFFERENCE ══════════════ */}
      <section className="w-full bg-[#fffdf5] pt-10 pb-16 overflow-hidden">
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
              <div className="bg-white border border-[rgba(255,163,20,0.2)] rounded-2xl shadow-sm p-3 w-full">
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

          <div className="bg-white border border-[#f5f5f5] rounded-full shadow-sm mt-12 px-4 py-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-[3px] bg-[#5e8a82]" />
              <span className="text-xs font-bold text-[#525252] uppercase tracking-[0.6px]">{s.legendFull}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-[3px] bg-[#ffa314]" />
              <span className="text-xs font-bold text-[#525252] uppercase tracking-[0.6px]">{s.legendBumpr}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-[3px] bg-[#eae4d8] border border-[#e0d8ca]" />
              <span className="text-xs font-bold text-[#525252] uppercase tracking-[0.6px]">{s.legendEmpty}</span>
            </div>
          </div>

          {/* CTA */}
          <a href="#signup" className="block mt-10 w-full bg-[#ffa314] text-white font-black text-[16px] text-center py-4 rounded-full shadow-[0px_8px_30px_rgba(0,0,0,0.08)] hover:brightness-110 transition-all">
            {s.ctaTop}
          </a>
        </div>
      </section>

      {/* ══════════════ NO COMMISSION ══════════════ */}
      <section className="w-full bg-[#ffa314]">
        <div className="max-w-lg mx-auto px-6 py-20">
          <h2 className="text-[34px] font-black text-white text-center leading-[37px] tracking-[-1.3px] max-w-[245px] mx-auto">
            {s.noCommTitle}
          </h2>
          <p className="text-base font-medium text-white/90 text-center leading-[22px] tracking-[-0.3px] mt-6 max-w-[320px] mx-auto">
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

          <div className="flex flex-col gap-6 mt-10">
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image src="/icons/icon-security2.svg" alt="" width={28} height={28} className="shrink-0" />
              <p className="text-sm font-semibold text-white/95">{s.trustSecurity}</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image src="/icons/icon-terms2.svg" alt="" width={28} height={28} className="shrink-0" />
              <p className="text-sm font-semibold text-white/95">{s.trustTerms}</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image src="/icons/icon-villa-back.svg" alt="" width={28} height={28} className="shrink-0" />
              <p className="text-sm font-semibold text-white/95">{s.trustMove}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WHO ARE BUMPR GUESTS ══════════════ */}
      <section className="w-full bg-[#fff5e0] relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute -right-16 -top-32 w-64 h-64 bg-[rgba(255,163,20,0.05)] rounded-full blur-[64px]" />
        <div className="absolute -left-24 bottom-0 w-80 h-80 bg-[rgba(94,138,130,0.05)] rounded-full blur-[64px]" />

        <div className="max-w-lg mx-auto px-6 py-24 relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-white/60 border border-[#eae4d8] rounded-full shadow-sm px-4 py-2">
              <span className="text-[13px] font-black text-[#e8920e] uppercase tracking-[0.6px]">{s.whoLabel}</span>
            </div>
          </div>

          <h2 className="text-[28px] font-black text-[#2a2520] text-center leading-[32px] tracking-[-0.3px] max-w-[299px] mx-auto">
            {s.whoQuote}
          </h2>

          <p className="text-base font-medium text-[#6b655c] text-center leading-[22px] tracking-[-0.3px] mt-6 max-w-[244px] mx-auto">
            {s.whoSub}
          </p>

          {/* Feature cards */}
          <div className="flex flex-col gap-5 mt-12">
            {/* Card 1 */}
            <div className="bg-white border border-[#f5f5f5] rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="relative">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-[rgba(232,146,14,0.1)] rounded-full" />
                <div className="flex flex-col items-center pt-6 pb-6 px-6">
                  <div className="w-16 h-16 bg-[#fff9f0] border border-[rgba(255,163,20,0.2)] rounded-2xl flex items-center justify-center mb-4 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]">
                    <Image src="/icons/icon-who1.svg" alt="" width={28} height={28} />
                  </div>
                  <h3 className="text-[18px] font-black text-[#2a2520] text-center tracking-[-0.4px]">{s.whoCard1Title}</h3>
                  <p className="text-[14px] font-medium text-[#737373] text-center leading-[21px] mt-2 max-w-[274px]">{s.whoCard1Desc}</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#f5f5f5] rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="flex flex-col items-center pt-6 pb-6 px-6">
                <div className="w-14 h-14 bg-[#f4f7f6] border border-[rgba(94,138,130,0.2)] rounded-full flex items-center justify-center mb-4">
                  <Image src="/icons/icon-who2.svg" alt="" width={24} height={24} />
                </div>
                <h3 className="text-[18px] font-black text-[#2a2520] text-center tracking-[-0.4px]">{s.whoCard2Title}</h3>
                <p className="text-[14px] font-medium text-[#737373] text-center leading-[21px] mt-2 max-w-[274px]">{s.whoCard2Desc}</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#f5f5f5] rounded-3xl shadow-[0px_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="flex flex-col items-center pt-6 pb-6 px-6">
                <div className="flex -space-x-2 mb-4">
                  <Image src="/traveler1.png" alt="" width={44} height={44} className="w-11 h-11 rounded-full border-2 border-[#e8920e] object-cover" />
                  <Image src="/traveler2.png" alt="" width={44} height={44} className="w-11 h-11 rounded-full border-2 border-[#e8920e] object-cover" />
                  <Image src="/traveler3.png" alt="" width={44} height={44} className="w-11 h-11 rounded-full border-2 border-[#e8920e] object-cover" />
                </div>
                <h3 className="text-[18px] font-black text-[#2a2520] text-center tracking-[-0.4px]">{s.whoCard3Title}</h3>
                <p className="text-[14px] font-medium text-[#737373] text-center leading-[21px] mt-2 max-w-[274px]">{s.whoCard3Desc}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a href="#signup" className="block mt-12 w-full bg-[#ffa314] text-white font-black text-[16px] text-center py-4 rounded-full shadow-[0px_8px_30px_rgba(0,0,0,0.08)] hover:brightness-110 transition-all">
            {s.ctaTop}
          </a>
        </div>
      </section>

      {/* ══════════════ SIGN UP / WAITLIST ══════════════ */}
      <section id="signup" className="w-full bg-[#2a2520] scroll-mt-4">
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

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="w-full bg-[#221e1a] py-10">
        <div className="max-w-lg mx-auto px-6 flex flex-col items-center gap-4">
          <BumprLogo />
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25d366] hover:bg-[#20bd5a] transition-colors text-white font-bold text-[15px] px-6 py-3 rounded-full shadow-[0px_4px_15px_rgba(37,211,102,0.3)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.716-1.244A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.319 0-4.47-.738-6.228-1.992l-.356-.264-3.011.793.808-2.953-.288-.458A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fillRule="evenodd"/></svg>
            WhatsApp us
          </a>
          <p className="text-[13px] text-white/30 mt-2">Bumpr {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
