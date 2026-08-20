import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Assisted Living & Senior Assistance | Cerna Home Care",
    description:
        "Cerna Home Care helps families navigate assisted living, senior housing, memory care, respite care, and senior assistance options.",
};

const careOptions = [
    "Assisted Living",
    "Residential Care Homes",
    "Memory Care",
    "Covered Care",
    "Skilled Nursing",
    "Senior Housing",
];

const advisorBenefits = [
    "Free assistance from a dedicated advisor",
    "Face-to-face consultation",
    "24/7 assistance",
    "Guided tours",
    "A home option for almost any budget",
];

const communityServices = [
    "Around-the-clock care managers",
    "Medication management",
    "Safety and emergency call systems",
    "Licensed nursing staff",
    "Housekeeping and laundry service",
    "Dedicated concierge",
    "Nutritious meals and snacks",
    "Scheduled transportation",
];

const amenities = [
    "Formal dining and private dining options",
    "Daily social and recreational activities",
    "Live entertainment and music",
    "Chair yoga, Pilates, balance, and stretching classes",
    "Cards, games, book clubs, and special interest groups",
    "Art, crafts, flower arranging, and creative activities",
    "Massage therapy, beauty salon, movie theater, pets, and transportation",
];

export default function AssistedLivingPage() {
    return (
        <main className="bg-white">
            <section className="relative overflow-hidden bg-slate-50">
                <div className="absolute right-0 top-0 hidden h-full w-1/3 bg-[#00456B] lg:block" />

                <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
                    <div className="flex flex-col justify-center">
                        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#DD8500]">
                            Assisted Living
                        </p>
                        <div className="mt-3 h-1 w-20 rounded-full bg-[#DD8500]" />

                        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-[#00456B] sm:text-6xl">
                            Senior assistance with confidence
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            Cerna understands that selecting a home is one of the most
                            important decisions you can make as you continue life’s
                            journey. We help families find a balance of health, assistance,
                            comfort, and a wonderful home environment.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/contact-us"
                                className="rounded-lg bg-[#DD8500] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition hover:bg-[#c87500]"
                            >
                                Request Guidance
                            </Link>

                            <a
                                href="tel:18775776782"
                                className="rounded-lg border-2 border-[#00456B] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-[#00456B] transition hover:bg-[#00456B] hover:text-white"
                            >
                                Call (877) 577-6782
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-end">
                        <div className="rounded-[28px] bg-white p-4 shadow-2xl ring-1 ring-slate-200">
                            <Image
                                src="/assets/assisted-living.webp"
                                alt="Assisted living and senior assistance"
                                width={420}
                                height={360}
                                priority
                                sizes="420px"
                                className="h-auto w-[320px] rounded-[20px] object-contain sm:w-[360px] lg:w-[420px]"
                                quality={100}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/*<section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">*/}
            {/*    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">*/}
            {/*        {careOptions.map((item) => (*/}
            {/*            <div*/}
            {/*                key={item}*/}
            {/*                className="rounded-2xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200"*/}
            {/*            >*/}
            {/*                <div className="mb-4 h-2 w-10 rounded-full bg-[#DD8500]" />*/}
            {/*                <p className="text-lg font-extrabold text-[#00456B]">*/}
            {/*                    {item}*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section className="bg-slate-50">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
                    <div>
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                            Dedicated Advisor
                        </p>
                        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#00456B] sm:text-4xl">
                            Guidance from the first conversation
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            Our advisor meets with you personally. Together, we determine
                            the most successful living environment based on your loved
                            one’s needs, preferences, location, and budget.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <ul className="space-y-4 text-base leading-7 text-slate-700">
                            {advisorBenefits.map((item) => (
                                <li key={item} className="flex gap-3">
                                    <span className="font-extrabold text-[#DD8500]">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
                <div className="rounded-[34px] bg-[#00456B] p-8 text-white shadow-xl sm:p-10 lg:p-12">
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                        Community Care
                    </p>

                    <h2 className="mt-5 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Supportive environments designed around safety, care, and connection
                    </h2>

                    <p className="mt-6 max-w-5xl text-lg leading-8 text-white/90">
                        Professional and friendly staff can assist with meals, household
                        chores, personal care needs, daily activities, and ongoing safety.
                        The goal is peace of mind, comfort, and engagement for every
                        resident.
                    </p>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {communityServices.map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15"
                            >
                                <p className="text-sm font-bold leading-6 text-white">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
                    <div className="max-w-3xl">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                            Luxury Amenities
                        </p>
                        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#00456B] sm:text-4xl">
                            Comfort, activity, and daily enrichment
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-5 lg:grid-cols-2">
                        {amenities.map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                            >
                                <p className="text-base font-semibold leading-7 text-slate-800">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-6 py-16 sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-3xl bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#00456B]">
                            Need help choosing the right senior living option?
                        </h2>
                        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                            Contact Cerna and see what the difference really means. We
                            don’t just talk the talk; we walk the walk, right beside you.
                        </p>
                    </div>

                    <Link
                        href="/contact-us"
                        className="inline-flex shrink-0 justify-center rounded-lg bg-[#00456B] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition hover:bg-[#003a5a]"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </main>
    );
}