import Image from "next/image";
import Link from "next/link";

const categories = [
    "Medications",
    "Diet",
    "Cardiovascular Activity",
    "Cognitive Activity",
];

const foods = ["Fresh Fish", "Nuts and Seeds", "Whole Grains", "Vegetables", "Fruits"];

export default function MemoryCarePage() {
    return (
        <main className="bg-white text-slate-800">
            <section className="bg-[#f5f7f8]">
                <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-16 md:grid-cols-2 lg:py-24">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f73d8]">
                            Memory Care
                        </p>

                        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#00456B] md:text-5xl">
                            Cognitive Care and Memory Care
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Cerna specializes in cognitive impairments including Alzheimer’s,
                            dementia, Parkinson’s, stroke, injuries, diabetes, and other
                            conditions. Our trained caregivers provide thoughtful in-home care
                            designed to support safety, comfort, independence, and quality of
                            life.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/contact-us"
                                className="inline-flex rounded-xl bg-[#DD8500] px-8 py-4 text-lg font-bold text-white transition hover:opacity-90"
                            >
                                Request a Consultation
                            </Link>
                        </div>
                    </div>

                    <div className="relative h-[240px] overflow-hidden rounded-[28px] shadow-xl md:h-[300px]">
                        <Image
                            src="/assets/memory-care2.webp"
                            alt="Cerna memory care services"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
                <h2 className="text-3xl font-extrabold text-[#00456B] md:text-4xl">
                    Specialized Support for Memory-Related Conditions
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                    We train our staff using Alzheimer’s Association CARES training to help
                    ensure they understand the special care requirements of someone with a
                    cognitive impairment. Our caregivers use stimulation tools, lifestyle
                    support, physical activity, and personalized routines to help clients
                    remain engaged and comfortable at home.
                </p>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                    Cerna works with leading neurologists and dementia specialists to
                    continue developing strong in-home care and stimulation programs.
                    Memory care allows people experiencing memory loss to maintain a level
                    of independence in the comfort, security, and familiarity of home.
                </p>

                <div className="mt-10 grid gap-5 md:grid-cols-4">
                    {categories.map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-lg font-bold text-[#1f73d8]">
                                ✓
                            </div>
                            <h3 className="text-lg font-bold text-[#00456B]">{item}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-[#f8fbfd]">
                <div className="mx-auto max-w-[1200px] px-6 py-16 lg:py-20">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-2xl font-extrabold text-[#00456B]">
                                Medications
                            </h3>
                            <p className="mt-4 leading-8 text-slate-600">
                                Physicians may prescribe medications that support people with
                                Alzheimer’s, dementia, depression, vascular risk factors, or
                                related symptoms. Medication plans should always be discussed
                                with the client’s doctor and care team.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-2xl font-extrabold text-[#00456B]">Diet</h3>
                            <p className="mt-4 leading-8 text-slate-600">
                                Research suggests that low-fat, low-sugar meals rich in omega-3
                                fatty acids may help support memory and cognition.
                            </p>

                            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                                {foods.map((food) => (
                                    <li key={food} className="font-semibold text-slate-700">
                                        ✓ {food}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-2xl font-extrabold text-[#00456B]">
                                Cardiovascular Activity
                            </h3>
                            <p className="mt-4 leading-8 text-slate-600">
                                Walking, stretching, chair exercises, counter exercises, dancing,
                                and other low-impact movement can increase blood oxygen to the
                                brain and help support vitality.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-2xl font-extrabold text-[#00456B]">
                                Cognitive Activity
                            </h3>
                            <p className="mt-4 leading-8 text-slate-600">
                                Music, art, recall exercises, and structured cognitive activities
                                help stimulate the mind. Cerna caregivers document performance
                                and adjust activities to the right difficulty level.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1400px] px-6 py-16">
                <div className="rounded-[28px] bg-[#00456B] px-8 py-12 text-white md:px-12">
                    <div className="grid items-center gap-8 md:grid-cols-[1.5fr_auto]">
                        <div>
                            <h2 className="text-3xl font-extrabold md:text-4xl">
                                Need memory care support at home?
                            </h2>
                            <p className="mt-4 max-w-2xl text-lg leading-8 text-sky-50">
                                Our team can help create a personalized care plan for your loved
                                one’s comfort, safety, and daily routine.
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