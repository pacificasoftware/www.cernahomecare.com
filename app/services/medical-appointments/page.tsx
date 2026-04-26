import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Transportation Services | Cerna Home Care",
    description:
        "Cerna Home Care provides dependable transportation support for seniors, individuals with disabilities, and families who need more than just a ride.",
};

export default function TransportationServicesPage() {
    return (
        <main className="bg-white">
            <section className="relative overflow-hidden bg-[#00456B]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_35%),linear-gradient(135deg,#00456B_0%,#00385a_55%,#005f8f_100%)]" />

                <div className="absolute bottom-[-1px] left-0 right-0">
                    <svg
                        viewBox="0 0 1440 220"
                        className="h-[150px] w-full sm:h-[190px]"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,90 C220,145 360,40 590,95 C795,145 985,30 1440,45 L1440,220 L0,220 Z"
                            fill="rgba(255,255,255,0.38)"
                        />
                        <path
                            d="M0,120 C240,55 420,155 650,120 C900,82 1080,5 1440,85 L1440,220 L0,220 Z"
                            fill="rgba(255,255,255,0.55)"
                        />
                        <path
                            d="M0,155 C220,80 410,150 650,160 C920,172 1050,90 1440,110 L1440,220 L0,220 Z"
                            fill="#ffffff"
                        />
                    </svg>
                </div>

                <div className="relative mx-auto max-w-7xl px-6 pb-40 pt-24 sm:px-8 lg:px-10 lg:pb-48 lg:pt-28">
                    <div className="max-w-4xl">
                        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#DD8500]">
                            Safe & Caring Transportation
                        </p>
                        <div className="mt-3 h-1 w-20 rounded-full bg-[#DD8500]" />

                        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Transportation Services
                        </h1>

                        <p className="mt-7 max-w-3xl text-xl leading-9 text-white/95">
                            Cerna provides dependable transportation support for seniors,
                            individuals with disabilities, and families who need more than
                            just a ride.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-8 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:pb-20">
                <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                        More Than Transportation
                    </p>
                    <div className="mt-3 h-1 w-12 rounded-full bg-[#DD8500]" />

                    <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[#00456B] sm:text-4xl">
                        Thoughtful support from door to door
                    </h2>

                    <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
                        <p>
                            At Cerna, our drivers do more than transport clients. They can
                            accompany clients into the home, stop to pick up medication,
                            groceries, food, or supplies, and help make the transition after
                            a trip safer and more comfortable.
                        </p>

                        <p>
                            Our transportation staff understands the needs of seniors and
                            individuals with mobility challenges. Every detail is handled
                            with patience, respect, and a caring attitude.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/contact-us"
                            className="inline-flex rounded-lg bg-[#DD8500] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition hover:bg-[#c87500]"
                        >
                            Request Transportation Help
                        </Link>

                        <a
                            href="tel:18775776782"
                            className="inline-flex rounded-lg border-2 border-[#00456B] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#00456B] transition hover:bg-[#00456B] hover:text-white"
                        >
                            Call (877) 577-6782
                        </a>
                    </div>
                </div>

                <div className="relative mx-auto h-[260px] w-full max-w-[460px] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 sm:h-[310px] lg:h-[340px] lg:max-w-[520px]">
                    <Image
                        src="/assets/transportation.webp"
                        alt="Cerna transportation van"
                        fill
                        sizes="(max-width: 1024px) 92vw, 520px"
                        className="object-contain"
                        quality={100}
                        priority
                    />
                </div>
            </section>

            <section className="bg-slate-50">
                <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-10">
                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#00456B] text-2xl text-white">
                            🚐
                        </div>

                        <h3 className="text-2xl font-extrabold text-[#00456B]">
                            Our vehicle may include
                        </h3>
                        <div className="mt-3 h-1 w-10 rounded-full bg-[#DD8500]" />

                        <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">
                            <li>• Late model minivan</li>
                            <li>• Large interior for larger wheelchairs</li>
                            <li>• Several wheelchair sizes available</li>
                            <li>• Hoyer lift, power scooter, and Barton chair available</li>
                            <li>• Power lift and extendable ramp for easier entry</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#00456B] text-2xl text-white">
                            👥
                        </div>

                        <h3 className="text-2xl font-extrabold text-[#00456B]">
                            Transportation support for
                        </h3>
                        <div className="mt-3 h-1 w-10 rounded-full bg-[#DD8500]" />

                        <ul className="mt-6 grid gap-3 text-base leading-7 text-slate-700 sm:grid-cols-2">
                            <li>• Paralysis</li>
                            <li>• Dementia</li>
                            <li>• Spinal cord injuries</li>
                            <li>• Alzheimer’s</li>
                            <li>• Bone fractures</li>
                            <li>• General aging</li>
                            <li>• Post-surgery needs</li>
                            <li>• Stroke recovery</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-6 pb-20 sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex gap-6">
                        <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#DD8500]/15 text-4xl sm:flex">
                            ♡
                        </div>

                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-[#00456B]">
                                Flexible transportation with a caring touch
                            </h2>
                            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                                Whether your loved one needs help getting to an appointment,
                                returning home safely, or making a stop for essentials, Cerna
                                is here to help make transportation easier and more
                                comfortable.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/contact-us"
                        className="inline-flex shrink-0 justify-center rounded-lg bg-[#00456B] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition hover:bg-[#003a5a]"
                    >
                        Contact Cerna Home Care
                    </Link>
                </div>
            </section>
        </main>
    );
}