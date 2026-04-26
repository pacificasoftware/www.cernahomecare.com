import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Fall Prevention | Cerna Home Care",
    description:
        "Cerna Home Care helps seniors and families reduce fall risk through awareness, support, home safety strategies, and personalized care.",
};

const riskFactors = [
    "Poor balance or muscle weakness",
    "Vision changes",
    "Medication side effects",
    "Cluttered walkways or loose rugs",
    "Poor lighting around stairs or hallways",
    "Difficulty getting in and out of chairs or beds",
];

const preventionSteps = [
    "Identify personal fall risk factors",
    "Review the home for safety hazards",
    "Improve lighting and remove tripping risks",
    "Use safe footwear and mobility support",
    "Build strength and balance through movement",
    "Ask for help before small risks become bigger concerns",
];

export default function FallPreventionPage() {
    return (
        <main className="bg-white">
            <section className="bg-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1fr_420px] lg:px-10 lg:py-20">
                    <div>
                        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-[#00456B] sm:text-5xl">
                            Minimize Your Risk
                        </h1>

                        <p className="mt-3 text-lg text-slate-600">
                            Exercises and Strategies to Prevent Falling
                        </p>

                        <h2 className="mt-5 text-xl font-extrabold uppercase leading-7 text-blue-700">
                            I am nervous about falling. Do falls “just happen” as we get older?
                        </h2>

                        <p className="mt-4 max-w-3xl text-lg leading-6 text-slate-700">
                            Most falls are preventable if you can know your risk, then minimize it.
                            The higher number of risk factors you have, the greater your risk of
                            falling. While no one can predict who will or will not fall, knowing your
                            risk factors can help identify areas of concern.
                        </p>

                        <p className="mt-2 text-lg font-bold text-slate-700">
                            Fall Prevention Guide Table of Contents:
                        </p>

                        <div className="mt-6 max-w-xl space-y-0 text-base leading-6 text-slate-600">
                            {[
                                ["Why are Falls Important?", "3"],
                                ["Risk Factor Check List", "4"],
                                ["What Can I Do Now?", "6"],
                                ["What Exercises Can I Do Now?", "7"],
                                ["Sample Exercises Level 1", "8"],
                                ["Sample Exercises Level 2", "12"],
                                ["Sample Exercise Level 3", "14"],
                                ["Sample Exercise Level 4", "16"],
                                ["Sample Exercises Level 5", "18"],
                            ].map(([label, page]) => (
                                <div key={label} className="grid grid-cols-[1fr_40px] gap-6">
                                    <span>{label}</span>
                                    <span className="font-bold text-slate-600">{page}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 h-auto w-full max-w-[520px]">
                            <a
                                href="/assets/CERNA_FALL_PREVENTION_GUIDE.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex whitespace-nowrap bg-[#DD8500] px-10 py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c87500]"
                            >
                                Download Fall Prevention Guide (PDF)
                            </a>
                        </div>
                    </div>

                    <div className="mt-8 h-auto w-[110px] lg:mt-12 lg:w-[150px]">
                        <Image
                            src="/assets/cerna-strategy.webp"
                            alt="Fall prevention guide"
                            width={260}
                            height={380}
                            priority
                            className="h-auto w-[220px] lg:w-[260px]"
                            quality={100}
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                    <div>
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                            A Common Concern
                        </p>
                        <div className="mt-3 h-1 w-12 rounded-full bg-[#DD8500]" />

                        <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[#00456B] sm:text-4xl">
                            Do falls just happen as we get older?
                        </h2>
                    </div>

                    <div className="space-y-5 text-lg leading-8 text-slate-700">
                        <p>
                            While no one can predict who will or will not fall, many falls
                            can be prevented. The more risk factors a person has, the
                            greater the chance of falling.
                        </p>

                        <p>
                            Knowing those risk factors helps families identify areas of
                            concern early, make safer choices at home, and bring in the
                            right support when needed.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#00456B] text-2xl text-white">
                                ⚠️
                            </div>

                            <h3 className="text-2xl font-extrabold text-[#00456B]">
                                Common fall risk factors
                            </h3>
                            <div className="mt-3 h-1 w-10 rounded-full bg-[#DD8500]" />

                            <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">
                                {riskFactors.map((item) => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#00456B] text-2xl text-white">
                                ✓
                            </div>

                            <h3 className="text-2xl font-extrabold text-[#00456B]">
                                Steps that may help prevent falls
                            </h3>
                            <div className="mt-3 h-1 w-10 rounded-full bg-[#DD8500]" />

                            <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">
                                {preventionSteps.map((item) => (
                                    <li key={item}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
                <div className="overflow-hidden rounded-[34px] bg-[#00456B] px-8 py-12 text-white shadow-xl sm:px-10 lg:px-14 lg:py-16">
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                        Family Support
                    </p>

                    <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Safer routines begin with awareness
                    </h2>

                    <p className="mt-6 max-w-4xl text-lg leading-8 text-white/90">
                        Fall prevention is not about fear. It is about confidence,
                        preparation, and having the right care plan in place. Cerna can
                        help families recognize risks and build safer routines around
                        daily living.
                    </p>

                    <div className="mt-8">
                        <Link
                            href="/contact-us"
                            className="inline-flex rounded-lg bg-[#DD8500] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c87500]"
                        >
                            Contact Cerna Home Care
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-6 pb-20 sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-[#00456B]">
                            Want help reducing fall risk at home?
                        </h2>
                        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                            Cerna Home Care can help review safety concerns, support daily
                            routines, and provide caring assistance that helps your loved one
                            feel more secure.
                        </p>
                    </div>

                    <Link
                        href="/contact-us"
                        className="inline-flex shrink-0 justify-center rounded-lg bg-[#00456B] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition hover:bg-[#003a5a]"
                    >
                        Request Fall Prevention Help
                    </Link>
                </div>
            </section>
        </main>
    );
}