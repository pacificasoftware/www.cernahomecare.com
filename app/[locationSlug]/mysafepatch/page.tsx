import Image from "next/image";
import Link from "next/link";

const highlights = [
    {
        title: "Convenient and Affordable",
        text: "A simple, practical wearable safety option designed for everyday use.",
    },
    {
        title: "Tested and Reliable",
        text: "Built to support dependable alerts and monitoring when safety matters most.",
    },
    {
        title: "Free Updates & Enhancements",
        text: "Designed to continue improving through app and service updates.",
    },
];

const features = [
    "24/7 fall detection",
    "Monitoring and alerts",
    "Activity information",
    "Fall information",
    "Location information",
    "Non-invasive wearable design",
];

export default function MySafePatchPage() {
    return (
        <main className="bg-white text-slate-800">
            {/* SECTION 1 */}
            {/* SECTION 1 — HERO */}
            <section
                className="relative min-h-[520px] overflow-hidden bg-cover bg-center bg-no-repeat md:min-h-[620px]"
                style={{ backgroundImage: "url('/assets/man_on_ground.webp')" }}
            >
                {/* Subtle image overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-black/15" />

                <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1400px] items-end justify-end px-6 py-10 md:min-h-[620px] md:items-center md:py-16">
                    {/* RIGHT-SIDE TRANSLUCENT PANEL */}
                    <div className="w-full max-w-[520px] rounded-[24px] border border-white/30 bg-[#002f49]/75 p-5 shadow-2xl backdrop-blur-md md:p-7">
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sky-200">
                            MySafePatch
                        </p>

                        <h1 className="mt-2 text-2xl font-extrabold leading-tight text-white drop-shadow-md md:text-3xl">
                            A New Non-Invasive and Reliable Safety Wearable
                        </h1>

                        <p className="mt-3 text-lg font-extrabold leading-snug text-[#ffc166] drop-shadow-sm">
                            24/7 Fall Detection with Monitoring and Alerts
                        </p>

                        <p className="mt-3 text-sm font-medium leading-6 text-white/95 md:text-base">
                            MySafePatch helps families stay connected with a discreet wearable
                            safety device and app-based monitoring designed around health,
                            safety, caring, and immediate alerts.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link
                                href="https://www.mysafepatch.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex rounded-lg bg-[#DD8500] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#c97700]"
                            >
                                Shop Now
                            </Link>

                            <Link
                                href="https://www.mysafepatch.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex rounded-lg border border-white/60 bg-white/15 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-white/25"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 1B — HIGHLIGHTS BELOW HERO */}
            <section className="bg-[#f8fbfd]">
                <div className="mx-auto max-w-[1200px] px-6 py-10 md:py-12">
                    <div className="grid gap-5 md:grid-cols-3">
                        {highlights.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-md"
                            >
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-lg font-extrabold text-[#1f73d8]">
                                    ✓
                                </div>

                                <h3 className="text-xl font-extrabold text-[#00456B]">
                                    {item.title}
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f73d8]">
                        Device, App & Monitoring
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold text-[#00456B] md:text-4xl">
                        Highly Advanced Device, App & Monitoring Service
                    </h2>

                    <p className="mt-5 text-xl font-semibold text-slate-700">
                        Keeps you alert and connected in a non-invasive manner.
                    </p>

                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        The SafePatch proprietary app has everything you need to monitor and
                        stay connected to those you care about. The app was built with
                        health, safety, caring, and immediate alerts in mind, displaying
                        detailed information about activity, falls, and location.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-lg font-bold text-[#1f73d8]">
                                ✓
                            </div>
                            <h3 className="text-lg font-bold text-[#00456B]">{feature}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 3 */}
            <section className="bg-[#f8fbfd]">
                <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-16 md:grid-cols-2 lg:py-20">
                    <div className="flex justify-center md:justify-start">
                        <div className="relative h-[220px] w-[220px] overflow-hidden rounded-[24px] bg-white shadow-xl md:h-[320px] md:w-[320px]">
                            <Image
                                src="/assets/SafePatch_patch.webp"
                                alt="MySafePatch safety and family care"
                                fill
                                sizes="(max-width: 768px) 220px, 320px"
                                className="object-contain"
                                quality={100}
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f73d8]">
                            Easy to Use
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold text-[#00456B] md:text-4xl">
                            Where Safety and Family Come Together Full Circle
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            MySafePatch is discreet and easy to use. Place it on the shoulder,
                            back, or chest. It is light, water-resistant, and durable. The
                            device disconnects from the patch when it needs to be charged and
                            can be easily removed and attached.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="https://www.mysafepatch.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex rounded-xl bg-[#DD8500] px-8 py-4 text-lg font-bold text-white transition hover:opacity-90"
                            >
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f73d8]">
                        Monitoring Services
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold text-[#00456B] md:text-4xl">
                        Connected Monitoring for Added Peace of Mind
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        MySafePatch monitoring services help families stay informed when it
                        matters most. With activity insights, fall alerts, and location support,
                        caregivers and loved ones can respond faster and feel more connected
                        throughout the day.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    <div className="rounded-[28px] bg-white p-6 shadow-xl">
                        <div className="relative h-[280px] overflow-hidden rounded-[22px] bg-slate-50 md:h-[360px]">
                            <Image
                                src="/assets/monitoring-pro.webp"
                                alt="MySafePatch professional monitoring services"
                                fill
                                sizes="(max-width: 768px) 100vw, 560px"
                                className="object-contain"
                                quality={100}
                            />
                        </div>

                        <h3 className="mt-6 text-2xl font-extrabold text-[#00456B]">
                            Professional Monitoring
                        </h3>

                        <p className="mt-3 leading-8 text-slate-600">
                            Optional professional monitoring can provide an added layer of support,
                            helping ensure alerts are reviewed and action can be taken when a fall
                            or safety event is detected.
                        </p>
                    </div>

                    <div className="rounded-[28px] bg-white p-6 shadow-xl">
                        <div className="relative h-[280px] overflow-hidden rounded-[22px] bg-slate-50 md:h-[360px]">
                            <Image
                                src="/assets/monitoring.webp"
                                alt="MySafePatch family monitoring app"
                                fill
                                sizes="(max-width: 768px) 100vw, 560px"
                                className="object-contain"
                                quality={100}
                            />
                        </div>

                        <h3 className="mt-6 text-2xl font-extrabold text-[#00456B]">
                            Family App Monitoring
                        </h3>

                        <p className="mt-3 leading-8 text-slate-600">
                            Family members can stay connected through easy-to-read updates and
                            alerts, giving everyone greater confidence while supporting independence
                            at home.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 4 */}
            <section className="mx-auto max-w-[1400px] px-6 py-16">
                <div className="rounded-[28px] bg-[#00456B] px-8 py-12 text-white md:px-12">
                    <div className="grid items-center gap-8 md:grid-cols-[1.5fr_auto]">
                        <div>
                            <h2 className="text-3xl font-extrabold md:text-4xl">
                                Interested in MySafePatch?
                            </h2>
                            <p className="mt-4 max-w-2xl text-lg leading-8 text-sky-50">
                                Learn how wearable fall detection, monitoring, and immediate
                                alerts can help support safety and peace of mind.
                            </p>
                        </div>

                        <Link
                            href="/contact-us"
                            className="inline-flex rounded-xl bg-[#DD8500] px-8 py-4 text-lg font-bold text-white transition hover:opacity-90"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}