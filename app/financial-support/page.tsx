import Link from "next/link";

const supportOptions = [
    {
        title: "Long-Term Care Insurance",
        text: "Some private health insurance plans and life insurance policies may offer coverage for home care services. Long-term care insurance is specifically designed for home care, assisted living, and related support.",
    },
    {
        title: "VA Homemaker & Home Health Aide Program",
        text: "This VA program provides eligible veterans with in-home assistance for personal care and household support, helping them maintain independence and quality of life.",
    },
    {
        title: "VA Aid & Attendance",
        text: "Aid and Attendance is a pension benefit for qualifying veterans or surviving spouses who need assistance with daily activities or ongoing care.",
    },
    {
        title: "Medicaid",
        text: "Medicaid may cover in-home care for low-income individuals, especially those needing long-term care. Eligibility and coverage vary by state.",
    },
    {
        title: "Reverse Mortgages",
        text: "For homeowners age 62 or older, a reverse mortgage may allow access to home equity to help pay for care while remaining in the home.",
    },
];

const eligibilityItems = [
    "Eligible veteran enrolled in the VA healthcare system",
    "Clinical need shown through a geriatric evaluation",
    "Need for help with daily living tasks such as bathing, dressing, meals, or mobility",
    "Possible eligibility for veterans with cognitive impairment or multiple ADL dependencies",
];

export default function VaFinancialSupportPage() {
    return (
        <main className="bg-slate-50">
            <section className="bg-[#00456B] px-6 py-20 text-white">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        Cerna Home Care
                    </p>

                    <h1 className="text-5xl font-extrabold text-white md:text-6xl">
                        VA & Financial Support
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white/90">
                        Learn about common ways families may pay for home care,
                        including private funds, long-term care insurance, VA programs,
                        Medicaid, and reverse mortgage options.
                    </p>

                    <a
                        href="tel:18775776782"
                        className="mt-8 inline-flex rounded-full bg-[#DD8500] px-8 py-4 text-lg font-extrabold text-white shadow-lg transition hover:opacity-90"
                    >
                        Call (877) 577-6782
                    </a>
                </div>
            </section>

            <section className="px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                            <h2 className="text-4xl font-extrabold text-[#00456B]">
                                How Do I Pay for Home Care?
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-700">
                                Paying for home care services can involve a mix of
                                private funds, insurance such as long-term care policies,
                                and government assistance such as VA programs, Homemaker
                                and Home Health Aide services, Aid & Attendance, Medicaid,
                                or other financial options.
                            </p>

                            <div className="mt-10 grid gap-5 md:grid-cols-2">
                                {supportOptions.map((item) => (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                    >
                                        <h3 className="text-xl font-extrabold text-[#00456B]">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 text-base leading-7 text-slate-600">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside className="rounded-[32px] bg-[#00456B] p-8 text-white shadow-xl">
                            <h2 className="text-3xl font-extrabold">
                                Need help understanding options?
                            </h2>

                            <p className="mt-4 text-lg leading-8 text-white/85">
                                Cerna Home Care can help families understand what
                                questions to ask and which programs may be worth exploring.
                            </p>

                            <div className="mt-8 space-y-4">
                                <a
                                    href="tel:18775776782"
                                    className="block rounded-full bg-[#DD8500] px-6 py-4 text-center text-lg font-extrabold text-white transition hover:opacity-90"
                                >
                                    Call Now
                                </a>

                                <Link
                                    href="/contact-us"
                                    className="block rounded-full bg-white px-6 py-4 text-center text-lg font-extrabold text-[#00456B] transition hover:opacity-90"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </aside>
                    </div>

                    <section className="mt-12 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                        <h2 className="text-3xl font-extrabold text-[#00456B]">
                            VA Homemaker & Home Health Aide Program
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            The VA Homemaker and Home Health Aide Program provides
                            eligible veterans with assistance in their homes with
                            personal care and household support. This program helps
                            veterans who need support with daily living tasks maintain
                            independence and quality of life.
                        </p>

                        <h3 className="mt-8 text-2xl font-extrabold text-[#00456B]">
                            Common Eligibility Considerations
                        </h3>

                        <ul className="mt-6 grid gap-4 md:grid-cols-2">
                            {eligibilityItems.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-2xl bg-slate-50 p-5 text-base font-semibold leading-7 text-slate-700"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-12 grid gap-8 lg:grid-cols-2">
                        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-3xl font-extrabold text-[#00456B]">
                                VA Aid & Attendance
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-700">
                                VA Aid and Attendance is a pension benefit. Veterans may
                                need qualifying service history, honorable discharge, and
                                financial eligibility. A service-related disability is not
                                always required.
                            </p>

                            <p className="mt-6 text-lg leading-8 text-slate-700">
                                Unreimbursed medical expenses may help reduce countable
                                income for eligibility purposes. These can include
                                insurance premiums, medications, assisted living costs,
                                nursing home fees, and in-home care expenses.
                            </p>
                        </div>

                        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-3xl font-extrabold text-[#00456B]">
                                Medicaid & Reverse Mortgages
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-700">
                                Medicaid may help cover in-home care for qualifying
                                individuals, though programs vary by state.
                            </p>

                            <p className="mt-6 text-lg leading-8 text-slate-700">
                                A reverse mortgage may be an option for homeowners age 62
                                or older who have sufficient equity and want to access
                                funds to help pay for care while remaining in their home.
                            </p>
                        </div>
                    </section>

                    <section className="mt-14 rounded-[32px] bg-[#00456B] p-8 text-center text-white shadow-xl md:p-12">
                        <h2 className="text-3xl font-extrabold">
                            Have questions about paying for care?
                        </h2>

                        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/85">
                            Contact Cerna Home Care and we can help point you in the
                            right direction.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="tel:18775776782"
                                className="rounded-full bg-[#DD8500] px-8 py-4 text-lg font-extrabold text-white transition hover:opacity-90"
                            >
                                Call (877) 577-6782
                            </a>

                            <Link
                                href="/contact-us"
                                className="rounded-full bg-white px-8 py-4 text-lg font-extrabold text-[#00456B] transition hover:opacity-90"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}