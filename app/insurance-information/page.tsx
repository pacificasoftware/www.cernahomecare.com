import Link from "next/link";

const insurers = [
    ["Aetna Life Insurance Company", "800-872-3862"],
    ["American Fidelity Assurance Company", "800-654-8489"],
    ["American General Life Insurance Company", "800-231-3655"],
    ["Assurity Life Insurance Company", "800-869-0355"],
    ["Bankers Life and Casualty Company", "800-621-3724"],
    ["Berkshire Life Insurance Company of America", "800-925-2374"],
    ["Berkshire Life Insurance Company of America", "800-819-2468"],
    ["Continental Casualty Company", "877-262-2727"],
    ["Genworth Life Insurance Company", "888-436-9678"],
    ["Great American Life Insurance Company", "800-854-3649"],
    ["Guarantee Trust Life Insurance Company", "800-338-7452"],
    ["John Hancock Life Insurance Company", "800-732-5543"],
    ["John Hancock Life Insurance Company", "800-861-9264"],
    ["Knights of Columbus", "800-524-3611"],
    ["LifeSecure Insurance Company", "866-582-7702"],
    ["Massachusetts Mutual Life Insurance Company", "800-272-2216"],
    ["MedAmerica Insurance Company", "800-544-0327"],
    ["Minnesota Life Insurance Company", "888-505-9817"],
    ["Mutual of Omaha Insurance Company", "800-775-6000"],
    ["New York Life Insurance Company", "800-723-5555"],
    ["Northwestern Long Term Care Insurance Company", "800-890-6704"],
    ["Physicians Mutual Insurance Company", "800-228-9100"],
    ["Prudential Insurance Company of America", "877-301-1212"],
    ["Prudential Insurance Company of America", "800-346-3778"],
    ["Reserve National Insurance Company", "800-654-9106"],
    ["State Farm Mutual Automobile Insurance Company", "800-252-1932"],
    ["Sterling Life Insurance Company", "800-688-0010"],
    ["Transamerica Life Insurance Company", "800-247-3615"],
    ["Transamerica Life Insurance Company", "800-238-4302"],
    ["United of Omaha Life Insurance Company", "800-775-6000"],
    ["United Security Assurance Company of Pennsylvania", "800-872-3044"],
    ["United Teacher Associates Insurance Company", "800-880-8824"],
];

export default function InsuranceInformationPage() {
    return (
        <main className="bg-slate-50">
            <section className="bg-[#00456B] px-6 py-20 text-white">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        Cerna Home Care
                    </p>

                    <h1 className="text-5xl font-extrabold text-white md:text-6xl">
                        Insurance Information
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white/90">
                        Contact your insurance company to find out if your family is
                        covered for in-home care, or call one of our specialists and let
                        us do the work for you.
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
                    <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-3xl font-extrabold text-[#00456B]">
                            Common Long-Term Care Insurance Providers
                        </h2>

                        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600">
                            Below is a helpful list of insurance companies and contact
                            numbers. Coverage varies by policy, so we recommend calling
                            the insurer directly or contacting Cerna Home Care for help
                            reviewing your options.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {insurers.map(([name, phone]) => (
                            <div
                                key={`${name}-${phone}`}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <h3 className="text-lg font-extrabold uppercase leading-7 text-[#00456B]">
                                    {name}
                                </h3>

                                <a
                                    href={`tel:${phone.replace(/\D/g, "")}`}
                                    className="mt-4 inline-flex items-center gap-2 text-lg font-bold text-[#DD8500]"
                                >
                                    {phone}
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 rounded-[32px] bg-[#00456B] p-8 text-center text-white shadow-xl md:p-12">
                        <h2 className="text-3xl font-extrabold">
                            Need help understanding your coverage?
                        </h2>

                        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/85">
                            Our team can help you understand what questions to ask your
                            provider and how in-home care may fit into your family’s plan.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="tel:18775776782"
                                className="rounded-full bg-[#DD8500] px-8 py-4 text-lg font-extrabold text-white transition hover:opacity-90"
                            >
                                Call Now
                            </a>

                            <Link
                                href="/contact-us"
                                className="rounded-full bg-white px-8 py-4 text-lg font-extrabold text-[#00456B] transition hover:opacity-90"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}