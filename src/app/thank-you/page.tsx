"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const t = {
  en: {
    title: "You're in!",
    subtitle: "We'll contact you when Bumpr is ready to launch in your area.",
    shareTitle: "Share with other villa owners",
    shareDesc: "so Bumpr can go live in your location faster.",
    copyLink: "Copy link",
    copied: "Copied!",
    whatsapp: "Share on WhatsApp",
    back: "Back to homepage",
  },
  id: {
    title: "Anda terdaftar!",
    subtitle: "Kami akan menghubungi Anda saat Bumpr siap diluncurkan di area Anda.",
    shareTitle: "Bagikan ke pemilik villa lain",
    shareDesc: "agar Bumpr bisa hadir di lokasi Anda lebih cepat.",
    copyLink: "Salin link",
    copied: "Tersalin!",
    whatsapp: "Bagikan di WhatsApp",
    back: "Kembali ke beranda",
  },
};

function ThankYouContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") === "id" ? "id" : "en") as keyof typeof t;
  const s = t[lang];
  const shareUrl = "https://www.bumpr.online";
  const waText = encodeURIComponent(
    lang === "en"
      ? "Hey, check out Bumpr — they fill your empty villa nights with temporary guests so you stop losing money. Sign up here: https://www.bumpr.online"
      : "Hei, cek Bumpr — mereka isi malam kosong villa kamu dengan tamu sementara biar gak rugi. Daftar di sini: https://www.bumpr.online"
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#2a2520] px-6">
      <div className="max-w-md w-full text-center">
        {/* Check icon */}
        <div className="w-20 h-20 bg-[#5e8a82] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0px_0px_40px_rgba(94,138,130,0.4)]">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-[36px] font-black text-white tracking-[-1.2px] leading-[1.1]">
          {s.title}
        </h1>
        <p className="text-[16px] font-medium text-white/60 mt-4 leading-[22px]">
          {s.subtitle}
        </p>

        {/* Share card */}
        <div className="bg-white/10 border border-white/15 rounded-2xl p-6 mt-10">
          <p className="text-[18px] font-black text-white tracking-[-0.4px]">
            {s.shareTitle}
          </p>
          <p className="text-[14px] font-medium text-white/60 mt-1">
            {s.shareDesc}
          </p>

          <div className="flex flex-col gap-3 mt-6">
            {/* WhatsApp share */}
            <a
              href={`https://wa.me/?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] transition-colors text-white font-bold text-[15px] py-3 rounded-full"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.716-1.244A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.319 0-4.47-.738-6.228-1.992l-.356-.264-3.011.793.808-2.953-.288-.458A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fillRule="evenodd"/></svg>
              {s.whatsapp}
            </a>

            {/* Copy link */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                const btn = document.getElementById("copy-btn");
                if (btn) { btn.textContent = s.copied; setTimeout(() => { btn.textContent = s.copyLink; }, 2000); }
              }}
              className="flex items-center justify-center gap-2 bg-white/10 border border-white/15 hover:bg-white/15 transition-colors text-white font-bold text-[15px] py-3 rounded-full"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              <span id="copy-btn">{s.copyLink}</span>
            </button>
          </div>
        </div>

        <a href="/" className="inline-block mt-8 text-[14px] font-medium text-white/40 hover:text-white/60 transition-colors">
          &larr; {s.back}
        </a>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="flex items-center justify-center min-h-screen bg-[#2a2520]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
