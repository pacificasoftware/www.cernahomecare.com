import Image from "next/image";
import Link from "next/link";

const benefits = [
    {
        title: "Comprehensive Assessment",
        text: "We evaluate each client’s unique needs, home environment, routines, and care goals.",
    },
    {
        title: "Personalized Care Plan",
        text: "A care plan is created around each individual’s circumstances and can be adjusted as needs change.",
    },
    {
        title: "Local Resource Coordination",
        text: "We help identify and connect families with local, cost-effective care resources when needed.",
    },
    {
        title: "Ongoing Family Support",
        text: "We help families feel more confident, especially when they cannot be present every day.",
    },
];

export default function CareManagementPage() {
    return (
        <main className="bg-white text-slate-800">
            <section className="bg-[#f5f8fb]">
                <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-16 md:grid-cols-2 lg:py-24">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f73d8]">
                            Care Management
                        </p>

                        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#00456B] md:text-5xl">
                            Support When Care Becomes More Complex
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            If you do not live near your aging parent, or if your loved one’s
                            needs are becoming more complex, Cerna Home Care can help oversee,
                            organize, and support their care with a thoughtful plan.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/contact-us"
                                className="inline-flex rounded-xl bg-[#DD8500] px-8 py-4 text-lg font-bold text-white transition hover:opacity-90"
                            >
                                Request a Consultation
                            </Link>

                            <Link
                                href="tel:8775776782"
                                className="inline-flex rounded-xl bg-[#005685] px-8 py-4 text-lg font-bold text-white transition hover:opacity-90"
                            >
                                Call (877) 577-6782
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="relative h-[300px] w-full max-w-[520px] overflow-hidden rounded-[28px] shadow-xl md:h-[380px]">
                            <Image
                                src="/assets/cerna-care-1.webp"
                                alt="Cerna care management services"
                                fill
                                sizes="(max-width: 768px) 100vw, 520px"
                                className="object-cover"
                                quality={100}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-extrabold text-[#00456B] md:text-4xl">
                        Helping Families Navigate Care With Confidence
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        Even families who live nearby can feel overwhelmed when health,
                        safety, appointments, home needs, and family responsibilities all
                        need attention. Our care management services help bring structure,
                        clarity, and support to the process.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {benefits.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-xl font-bold text-[#1f73d8]">
                                ✓
                            </div>

                            <h3 className="text-2xl font-bold text-[#00456B]">
                                {item.title}
                            </h3>

                            <p className="mt-3 leading-8 text-slate-600">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-[#f8fbfd]">
                <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-16 md:grid-cols-2 lg:py-20">
                    <div className="rounded-[28px] bg-white p-8 shadow-sm">
                        <h2 className="text-3xl font-extrabold text-[#00456B]">
                            A Plan Built Around Your Loved One
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600">
                            A care plan tailored for each individual’s circumstances is
                            prepared after a comprehensive assessment. The plan may be modified
                            in consultation with the client and family as circumstances change.
                        </p>
                    </div>

                    <div className="rounded-[28px] bg-[#00456B] p-8 text-white shadow-sm">
                        <h2 className="text-3xl font-extrabold">
                            Local Help, Practical Solutions
                        </h2>

                        <p className="mt-5 leading-8 text-sky-50">
                            Local, cost-effective resources are identified and engaged as
                            needed, helping families access the right support at the right
                            time.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1400px] px-6 py-16">
                <div className="rounded-[28px] bg-[#00456B] px-8 py-12 text-white md:px-12">
                    <div className="grid items-center gap-8 md:grid-cols-[1.5fr_auto]">
                        <div>
                            <h2 className="text-3xl font-extrabold md:text-4xl">
                                Need help managing care for a loved one?
                            </h2>
                            <p className="mt-4 max-w-2xl text-lg leading-8 text-sky-50">
                                Cerna Home Care can help create a plan, coordinate resources,
                                and provide the support your family needs.
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