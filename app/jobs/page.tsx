import Link from "next/link";

export const metadata = {
    title: "Current Employment Openings | Cerna Home Care",
    description:
        "View current Cerna Home Care caregiver job openings and apply for roles in California, Texas, and Nevada.",
};

const caregiverOpenings = [
    "Newport Beach – 7am to 7pm FRI THRU SUN",
    "Irvine – 9am to 7pm SAT THRU SUN",
    "Rancho Mission Viejo – 7am to 7pm FRI THRU SUN",
    "Orange – 8am to 2pm FRI THRU SUN",
    "Newport Beach – 7am to 3pm WED, SAT",
    "Laguna Woods – 4pm to 9pm SAT, SUN",
    "Los Alamitos – 1pm to 5pm MON THRU THUR",
];

export default function JobsPage() {
    return (
        <main className="bg-white">
            <section className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:px-8 lg:px-10">
                    <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#DD8500]">
                        Careers at Cerna
                    </p>
                    <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-[#DD8500]" />

                    <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-[#00456B] sm:text-5xl">
                        Current Employment Openings
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-700">
                        Cerna Home Care is hiring compassionate caregivers who want to make
                        a meaningful difference for seniors and families.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
                <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-3xl font-extrabold text-[#00456B]">
                            Caregivers
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-slate-700">
                            Current available caregiver shifts include:
                        </p>

                        <div className="mt-8 grid gap-4">
                            {caregiverOpenings.map((opening) => (
                                <div
                                    key={opening}
                                    className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200"
                                >
                                    <p className="font-semibold leading-7 text-slate-800">
                                        {opening}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="rounded-3xl bg-[#00456B] p-8 text-white shadow-xl">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                            Apply Today
                        </p>

                        <h3 className="mt-5 text-3xl font-extrabold">
                            Where are you looking to work?
                        </h3>

                        <div className="mt-8 grid gap-4">
                            {["Texas", "California", "Nevada"].map((state) => (
                                <div
                                    key={state}
                                    className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15"
                                >
                                    <p className="font-bold">{state}</p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-8 text-base leading-7 text-white/90">
                            For more information or help applying, please call us at{" "}
                            <a
                                href="tel:18775776782"
                                className="font-extrabold text-white underline underline-offset-4"
                            >
                                1 (877) 577-6782
                            </a>
                            .
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/jobs"
                                className="inline-flex w-full justify-center rounded-lg bg-[#DD8500] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c87500]"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-slate-50 px-6 py-16 sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#00456B]">
                            Join a care team that values compassion
                        </h2>
                        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                            We are always looking for caring, dependable people who want to
                            provide excellent support to clients and families.
                        </p>
                    </div>

                    <Link
                        href="/cerna-home-care-jobs"
                        className="inline-flex shrink-0 justify-center rounded-lg bg-[#00456B] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition hover:bg-[#003a5a]"
                    >
                        Back to Careers
                    </Link>
                </div>
            </section>
        </main>
    );
}