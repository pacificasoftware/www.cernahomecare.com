import Link from "next/link";

export const metadata = {
    title: "Personalized Services & Wellness Visits | Cerna Home Care",
    description:
        "Cerna Home Care provides personalized wellness visits, care coordination, advocacy, family coaching, and ongoing support for seniors and families.",
};

const visitServices = [
    "Assessment and monitoring",
    "Planning and problem-solving",
    "Education and advocacy",
    "Family caregiver coaching",
    "Medication, exercise, and care instruction reminders",
    "Communication with family members and professionals",
    "Home care service planning and monitoring",
    "Housing and residential care guidance",
    "Social, recreational, and cultural activity support",
    "Safety, security, and risk monitoring",
];

export default function PersonalizedServicesPage() {
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
                            Personalized Care & Wellness
                        </p>
                        <div className="mt-3 h-1 w-20 rounded-full bg-[#DD8500]" />

                        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Wellness Visits
                        </h1>

                        <p className="mt-7 max-w-3xl text-xl leading-9 text-white/95">
                            Cerna takes a customized approach to each individual,
                            helping seniors and families stay informed, supported, and
                            confident in their care plan.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-8 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:pb-20">
                <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                        About Visits
                    </p>
                    <div className="mt-3 h-1 w-12 rounded-full bg-[#DD8500]" />

                    <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[#00456B] sm:text-4xl">
                        Care coordination built around the individual
                    </h2>

                    <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
                        <p>
                            We weren’t made on an assembly line. Every person is
                            different, and every care plan should reflect that. Cerna
                            Home Care customizes wellness visits to the needs of each care
                            recipient.
                        </p>

                        <p>
                            From attending doctor appointments and improving communication
                            between doctors, seniors, and family members, to monitoring
                            adherence to medical instructions, medications, and exercise
                            routines, our team helps support better outcomes.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/contact-us"
                            className="inline-flex rounded-lg bg-[#DD8500] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition hover:bg-[#c87500]"
                        >
                            Request a Consultation
                        </Link>

                        <a
                            href="tel:18775776782"
                            className="inline-flex rounded-lg border-2 border-[#00456B] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#00456B] transition hover:bg-[#00456B] hover:text-white"
                        >
                            Call (877) 577-6782
                        </a>
                    </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#00456B] text-2xl text-white">
                        ✓
                    </div>

                    <h3 className="text-2xl font-extrabold text-[#00456B]">
                        A collaborative care process
                    </h3>
                    <div className="mt-3 h-1 w-10 rounded-full bg-[#DD8500]" />

                    <p className="mt-6 text-lg leading-8 text-slate-700">
                        Our team helps with assessments, planning, facilitation, care
                        coordination, evaluation, and advocacy. The goal is to promote
                        quality care, wellness, quality of life, and cost-effective
                        outcomes.
                    </p>
                </div>
            </section>

            <section className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
                    <div className="max-w-3xl">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                            Things We Do During a Visit
                        </p>
                        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#00456B] sm:text-4xl">
                            Practical support for daily wellness
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {visitServices.map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                            >
                                <div className="mb-4 h-2 w-10 rounded-full bg-[#DD8500]" />
                                <p className="text-base font-semibold leading-7 text-slate-800">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="rounded-3xl bg-[#00456B] p-8 text-white shadow-sm">
                            <h3 className="text-2xl font-extrabold">
                                Dietary and condition-specific support
                            </h3>
                            <p className="mt-5 text-lg leading-8 text-white/90">
                                Special dietary needs for conditions like diabetes,
                                hypertension, or heart disease can be managed through
                                clear shopping guidelines and proper food preparation by
                                our skilled care team.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-[#DD8500]/10 p-8 shadow-sm ring-1 ring-[#DD8500]/20">
                            <h3 className="text-2xl font-extrabold text-[#00456B]">
                                Family communication and advocacy
                            </h3>
                            <p className="mt-5 text-lg leading-8 text-slate-700">
                                We help keep family members and professionals informed
                                about changing needs, safety concerns, care options, and
                                wellness goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-6 pb-20 sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#00456B]">
                            Personalized care starts with a conversation
                        </h2>
                        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                            Whether your loved one needs wellness monitoring, care
                            coordination, family coaching, or help navigating next steps,
                            Cerna is here to support your family.
                        </p>
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