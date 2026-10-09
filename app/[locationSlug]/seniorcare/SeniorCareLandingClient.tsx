"use client";


/**
 * Location-specific Cerna Home Care Google Ads landing page.
 * Save at app/[locationSlug]/seniorcare/page.tsx.
 * Save hero photo at public/seniorcare/caregiver.webp.
 */

const HERO_IMAGE = "/seniorcare/caregiver.webp";

function trackCall() {
  if (typeof window === "undefined") return;
  const win = window as Window & { dataLayer?: Record<string, unknown>[] };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ event: "cerna_seniorcare_call_click" });
}

export default function SeniorCareLandingClient({ locationSlug, phoneHref }: { locationSlug: string; phoneHref: string }) {
  const servicesHref = locationSlug
    ? `/${encodeURIComponent(locationSlug)}/services`
    : "/services";

  return (
    <>
      {/* Hide global header/navigation on the landing page only. */}
      <style jsx global>{`
        body:has(#cerna-seniorcare-landing) header,
        body:has(#cerna-seniorcare-landing) nav,
        body:has(#cerna-seniorcare-landing) [data-site-header],
        body:has(#cerna-seniorcare-landing) .site-header,
        body:has(#cerna-seniorcare-landing) .navbar {
          display: none !important;
        }
        body:has(#cerna-seniorcare-landing) { margin: 0; }
      `}</style>
      <main id="cerna-seniorcare-landing" className="min-h-screen overflow-hidden bg-[#F4F7FA] font-sans text-[#203A55]">
        <section className="relative mx-auto grid max-w-[1440px] min-h-[calc(100vh-70px)] items-center gap-10 px-6 pb-16 pt-5 md:px-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-5 lg:px-20 lg:pb-24 lg:pt-8">
          <div className="relative z-10 max-w-[670px] py-5 lg:py-16">
            <div className="mb-7 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.24em] text-[#517BA1]">
              <span className="h-px w-8 bg-[#80ABC6]" /> Compassionate In-Home Senior Care
            </div>
            <h1 className="font-serif text-[clamp(3.4rem,6.1vw,6.3rem)] leading-[1.02] tracking-[-0.055em]">
              Home is where<br />
              <em className="font-normal text-[#4D88B2]">care feels best.</em>
            </h1>
            <p className="mt-7 max-w-[490px] text-lg leading-[1.8] text-[#566B7F] md:text-xl">
              Personalized care, genuine companionship, and peace of mind for the people you love most.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href={phoneHref} onClick={trackCall} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#245A85] px-8 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(36,90,133,0.19)] transition hover:-translate-y-0.5 hover:bg-[#19486F]">
                Call for a Free Consultation
              </a>
              <a href={servicesHref} className="inline-flex min-h-14 items-center font-semibold text-[#245A85] underline decoration-[#80ABC6] decoration-2 underline-offset-8 hover:text-[#4D88B2]">
                Explore Our Services
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#D5E0E9] pt-6 text-sm text-[#61778A]">
              <span>Over 20 years of care</span>
              <span>Personalized care plans</span>
              <span>Dedicated support</span>
            </div>
          </div>

          <div className="relative mx-auto h-[350px] w-full max-w-[640px] sm:h-[500px] lg:h-[min(720px,74vh)] lg:max-w-none">
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-[#B9D5E7] opacity-70 lg:-right-12" aria-hidden="true" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#E0EDF6] lg:-left-12 lg:h-48 lg:w-48" aria-hidden="true" />
            <div className="relative h-full w-full overflow-hidden rounded-[140px_24px_140px_24px] bg-[#D8E8F1] shadow-[0_24px_70px_rgba(31,74,112,0.15)] sm:rounded-[220px_30px_200px_30px]">
              {/* Public-folder root path works on all nested routes, locally and in production. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO_IMAGE} alt="Caregiver sharing a warm moment with an older adult at home" className="h-full w-full object-cover object-center" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#173C60]/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 right-2 rounded-2xl border border-white/80 bg-white/95 px-6 py-4 shadow-xl sm:bottom-6 sm:-left-10 sm:right-auto sm:px-7">
              <p className="font-serif text-xl italic text-[#245A85]">Care that feels like family.</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#5885A6]">Cerna Home Care</p>
            </div>
          </div>
        </section>
        <footer className="relative z-10 mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 border-t border-[#D6E2ED] px-6 py-5 text-xs text-[#6C8092] md:px-12 lg:px-20">
          <span>© {new Date().getFullYear()} Cerna Home Care</span>
          <a href="/" className="hover:text-[#245A85]">cernahomecare.com</a>
        </footer>
      </main>
    </>
  );
}
