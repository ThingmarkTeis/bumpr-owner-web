"use client";

import { useState } from "react";
import Image from "next/image";

/* ───────────────────────── Bumpr Logo ───────────────────────── */

function BumprLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Wave elements positioned above "mp" */}
      <svg
        className="absolute left-[33%] top-[2px]"
        width="31"
        height="9"
        viewBox="0 0 31.1108 8.19128"
        fill="none"
      >
        {/* Filled wave */}
        <path
          d="M12.549 7.14573C17.5576 1.17248 26.419 -5.38718 30.3819 7.14573C24.4375 -0.769782 16.9852 3.61608 12.549 7.14573C7.26523 3.18798 2.42174 6.70597 0 7.14573C6.60475 1.86874 9.24665 2.52836 12.549 7.14573Z"
          fill="#EC6D18"
        />
        {/* Outline wave */}
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

/* ───────────────────────── Calendar Grid Helper ───────────────────────── */

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

/* ──────────────────── How-it-works step data ──────────────────── */

const steps = [
  {
    icon: "/icons/icon-empty-villa.svg",
    title: "Empty Villa",
    desc: "You pay costs every day. Earning nothing.",
  },
  {
    icon: "/icons/icon-fill-villa.svg",
    title: "Fill Your Villa",
    desc: "Set a temporary price while you wait for a full-price booking.",
  },
  {
    icon: "/icons/icon-guests-pay.svg",
    title: "Guests Pay Nightly",
    desc: "Earn every night instead of nothing.",
  },
  {
    icon: "/icons/icon-take-back.svg",
    title: "Take It Back",
    desc: "Full-price booking? One tap. We handle everything.",
  },
  {
    icon: "/icons/icon-full-price.svg",
    title: "Full Price Guest Arrives",
    desc: "You got both. Temporary income + full-price booking.",
  },
];

/* ──────────────────────────── Page ──────────────────────────── */

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    villas: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const villaOptions = ["1", "2", "3", "4+"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
              <button className="text-white font-medium text-base">EN</button>
              <span className="text-white/30 text-[15px] font-light">|</span>
              <button className="text-white/50 font-medium text-base">
                ID
              </button>
            </div>
          </header>

          {/* Main heading */}
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-[38px] font-black text-white text-center leading-[48px] tracking-[-1.53px]">
              You{" "}
              <span className="relative inline-block">
                <span className="relative z-10">lose money</span>
                <span className="absolute inset-x-[-6px] bottom-[2px] h-[40%] bg-[#e0700a] rounded-sm -skew-x-2 z-0" />
              </span>{" "}
              every night your villa is empty
            </h2>
          </div>

          {/* Value props */}
          <div className="flex flex-col gap-3">
            {/* 0% commission — big number lead */}
            <div className="backdrop-blur-sm bg-white/12 border border-white/15 rounded-2xl px-5 py-5">
              <div className="flex items-center gap-4">
                <span className="text-[48px] font-black text-white leading-none tracking-[-2px]">0%</span>
                <div className="h-10 w-px bg-white/20" />
                <div>
                  <p className="text-base font-bold text-white tracking-[-0.3px]">Zero commission</p>
                  <p className="text-sm text-white/60 mt-0.5">we charge the guest, not you</p>
                </div>
              </div>
            </div>

            {/* Two-column row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="backdrop-blur-sm bg-white/12 border border-white/15 rounded-2xl px-4 py-4 flex flex-col justify-between min-h-[100px]">
                <p className="text-[20px] font-black text-white leading-tight tracking-[-0.5px]">Take it back<br/>anytime</p>
                <p className="text-[12px] text-white/50 mt-2 leading-snug">18h — Bumpr guest moves out</p>
              </div>
              <div className="backdrop-blur-sm bg-white/12 border border-white/15 rounded-2xl px-4 py-4 flex flex-col justify-between min-h-[100px]">
                <p className="text-[20px] font-black text-white leading-tight tracking-[-0.5px]">Guests are<br/>waiting</p>
                <p className="text-[12px] text-white/50 mt-2 leading-snug">travelers ready to book tonight</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="mt-6 w-full bg-[#fff9f0] text-[#ffa314] font-black text-lg py-4 rounded-full shadow-[0px_8px_30px_rgba(0,0,0,0.12)]">
            Sign up — no commitment
          </button>
        </div>
      </section>

      {/* ══════════════ QUOTE SECTION ══════════════ */}
      <section className="w-full bg-[#fffdf5] py-24">
        <div className="max-w-lg mx-auto px-6 flex flex-col gap-10">
          <h2 className="text-[32px] font-black text-[#2a2520] text-center leading-[36.8px] tracking-[-0.39px]">
            &ldquo;Empty nights earn nothing. Bumpr fills them.&rdquo;
          </h2>
          <p className="text-[17px] font-medium text-[#6b655c] text-center leading-[27.6px] tracking-[-0.43px]">
            Your villa has empty nights. Instead of losing money on them, fill
            them with{" "}
            <span className="font-bold italic text-[#ffa314]">temporary</span>{" "}
            guests who pay nightly. When you get a full-price booking — the
            guest moves out, your villa is yours again. Like a standby seat on a
            plane: empty earns nothing. Filled earns money.
          </p>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="w-full bg-[#fffdf5] pt-20 pb-20 overflow-hidden">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-2xl font-black text-[#262626] text-center tracking-[-0.53px] mb-14">
            How It Works
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-[#d4d4d4]" />

            <div className="flex flex-col gap-12">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-6">
                  {/* Icon + number badge */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 bg-[#fffdf5] rounded-full flex items-center justify-center relative z-10">
                      <Image
                        src={step.icon}
                        alt=""
                        width={56}
                        height={56}
                        className="w-14 h-14"
                      />
                    </div>
                    <div className="absolute bottom-[-4px] right-[-4px] w-5 h-5 bg-[#171717] border-2 border-[#fffdf5] rounded-full flex items-center justify-center z-20">
                      <span className="text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="pt-1">
                    <h3 className="text-lg font-bold text-[#171717] tracking-[-0.89px] leading-[27px]">
                      {step.title}
                    </h3>
                    <p className="text-[15px] font-medium text-[#737373] leading-[20.6px] tracking-[-0.23px] mt-1.5 max-w-[220px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cycle repeats indicator */}
            <div className="flex items-center mt-8 ml-1">
              <Image
                src="/icons/icon-cycle.svg"
                alt=""
                width={36}
                height={120}
                className="opacity-60"
              />
              <span className="text-xs font-bold text-[#a1a1a1] opacity-60 -rotate-90 origin-left ml-8">
                Cycle Repeats
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SEE THE DIFFERENCE ══════════════ */}
      <section className="w-full bg-[#fffdf5] pt-10 pb-10 overflow-hidden">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-2xl font-black text-[#262626] text-center tracking-[-0.53px] mb-20">
            See the Difference
          </h2>

          <div className="flex flex-col items-center gap-12">
            {/* Without Bumpr */}
            <div className="flex flex-col items-center gap-4 w-[280px]">
              <span className="text-base font-bold text-[#262626] tracking-[-0.71px]">
                Without Bumpr
              </span>
              <div className="bg-white border border-[#f5f5f5] rounded-2xl shadow-sm p-3 w-full">
                <CalendarGrid
                  days={[
                    "booked","booked","booked","booked","booked",
                    "empty","empty","empty","empty","booked",
                    "booked","booked","empty","empty","empty",
                    "empty","empty","empty","empty","booked",
                    "booked","empty","empty","empty","empty",
                    "empty","empty","empty","empty","empty",
                  ]}
                />
              </div>
              <span className="text-sm font-medium text-[#737373] tracking-[-0.15px]">
                18 empty nights
              </span>
            </div>

            {/* With Bumpr */}
            <div className="flex flex-col items-center gap-4 w-[280px]">
              <span className="text-base font-bold text-[#ffa314] tracking-[-0.71px]">
                With Bumpr
              </span>
              <div className="bg-white border border-[#ffa314]/20 rounded-2xl shadow-sm p-3 w-full">
                <CalendarGrid
                  days={[
                    "booked","booked","booked","booked","booked",
                    "bumpr","bumpr","bumpr","empty","booked",
                    "booked","booked","empty","bumpr","bumpr",
                    "bumpr","bumpr","bumpr","empty","booked",
                    "booked","empty","bumpr","bumpr","bumpr",
                    "bumpr","empty","empty","empty","empty",
                  ]}
                />
              </div>
              <span className="text-sm font-bold text-[#ffa314] tracking-[-0.15px]">
                12 nights filled by Bumpr guests
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white border border-[#f5f5f5] rounded-full shadow-sm mt-12 px-4 py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#5e8a82]" />
              <span className="text-xs font-bold text-[#525252] uppercase tracking-[0.6px]">
                Full-price booking
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#ffa314]" />
              <span className="text-xs font-bold text-[#525252] uppercase tracking-[0.6px]">
                Bumpr guest
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-sm bg-[#eae4d8] border border-[#e0d8ca]" />
              <span className="text-xs font-bold text-[#525252] uppercase tracking-[0.6px]">
                Empty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ NO COMMISSION ══════════════ */}
      <section className="w-full bg-[#ffa314]">
        <div className="max-w-lg mx-auto px-6 py-20">
          <h2 className="text-[34px] font-black text-white text-center leading-[37.4px] tracking-[-1.31px]">
            No Commission. No Fees. No Contracts.
          </h2>
          <p className="text-base font-medium text-white/90 text-center leading-[22px] tracking-[-0.31px] mt-6">
            We charge guests a 15% service fee — not you. You receive 100% of
            the price you set.
          </p>

          {/* Comparison box */}
          <div className="bg-white/10 border border-white/20 rounded-[20px] px-5 pt-5 pb-5 mt-8">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium text-white/80 tracking-[-0.23px]">
                Other Platforms:
              </span>
              <span className="text-[15px] font-medium text-white/80 tracking-[-0.23px]">
                Take 15-25%
              </span>
            </div>
            <div className="h-px bg-white/15 my-3" />
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white tracking-[-0.31px]">
                Bumpr:
              </span>
              <span className="text-base font-bold text-white tracking-[-0.31px]">
                0% — Free for you
              </span>
            </div>
          </div>

          {/* Trust items */}
          <div className="flex flex-col gap-6 mt-10">
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image
                src="/icons/icon-security.svg"
                alt=""
                width={28}
                height={28}
                className="shrink-0"
              />
              <p className="text-sm font-semibold text-white/95 tracking-[-0.15px]">
                Security deposit from every guest
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image
                src="/icons/icon-terms.svg"
                alt=""
                width={28}
                height={28}
                className="shrink-0"
              />
              <p className="text-sm font-semibold text-white/95 tracking-[-0.15px]">
                All guests agree to terms before booking
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl px-4 py-4">
              <Image
                src="/icons/icon-handle-move.svg"
                alt=""
                width={28}
                height={28}
                className="shrink-0"
              />
              <p className="text-sm font-semibold text-white/95 tracking-[-0.15px]">
                We handle the guest move — you don&apos;t have to worry
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TRAVELERS SECTION ══════════════ */}
      <section className="w-full bg-[#fff5e0]">
        <div className="max-w-lg mx-auto px-6 py-20">
          <h2 className="text-[28px] font-black text-[#262626] text-center leading-[32.2px] tracking-[-0.32px]">
            &ldquo;Thousands of digital nomads and travelers are already looking
            for affordable villas in Bali.&rdquo;
          </h2>
          <p className="text-base font-medium text-[#525252] text-center leading-[22px] tracking-[-0.31px] mt-6">
            They agree to Bumpr&apos;s terms — stay temporarily, move when you
            need.
          </p>

          <div className="flex flex-col gap-6 mt-12">
            {[
              {
                icon: "/icons/icon-wifi.svg",
                text: "Remote workers who need wifi and quiet",
              },
              {
                icon: "/icons/icon-weeks.svg",
                text: "They stay for weeks, not just weekends",
              },
              {
                icon: "/icons/icon-deposit-terms.svg",
                text: "They agree to security deposit and move-out terms",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                  <Image src={item.icon} alt="" width={24} height={24} />
                </div>
                <p className="text-[15px] font-bold text-[#262626] leading-[18.75px] tracking-[-0.23px]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SIGN UP / WAITLIST ══════════════ */}
      <section className="w-full bg-[#2a2520]">
        <div className="max-w-lg mx-auto px-6 py-24">
          <h2 className="text-4xl font-black text-white text-center leading-[54px] tracking-[-1.43px]">
            Sign Up Now
          </h2>
          <p className="text-base font-medium text-[#948d85] text-center leading-6 tracking-[-0.31px] mt-4">
            No commitment. We&apos;ll contact you when Bumpr is ready to
            launch.
          </p>

          {status === "success" && (
            <div className="bg-[#5e8a82] text-white font-semibold text-center rounded-xl px-4 py-4 mt-10">
              Thanks for signing up! We&apos;ll be in touch.
            </div>
          )}
          {status === "error" && (
            <div className="bg-red-500/20 text-red-300 font-semibold text-center rounded-xl px-4 py-3 mt-10">
              Something went wrong. Please try again.
            </div>
          )}

          <form
            className="flex flex-col gap-4 mt-10"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#fffdf5] border border-[#e8dfd2] rounded-[10px] px-4 py-4 text-base font-medium text-[#2a2520] placeholder:text-[#948d85] tracking-[-0.31px] outline-none focus:border-[#ffa314] transition-colors"
            />
            <input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[#fffdf5] border border-[#e8dfd2] rounded-[10px] px-4 py-4 text-base font-medium text-[#2a2520] placeholder:text-[#948d85] tracking-[-0.31px] outline-none focus:border-[#ffa314] transition-colors"
            />
            <input
              type="text"
              placeholder="Villa location (e.g. Canggu, Ubud)"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full bg-[#fffdf5] border border-[#e8dfd2] rounded-[10px] px-4 py-4 text-base font-medium text-[#2a2520] placeholder:text-[#948d85] tracking-[-0.31px] outline-none focus:border-[#ffa314] transition-colors"
            />
            <div>
              <p className="text-sm font-medium text-[#948d85] mb-2">How many villas?</p>
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
              {status === "sending" ? "Sending..." : "Join Waitlist"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
