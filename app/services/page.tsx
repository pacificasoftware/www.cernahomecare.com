import Image from "next/image";
import Link from "next/link";

const services = [
    "Companionship",
    "Appointments",
    "Bathing",
    "Cooking",
    "Dressing",
    "Errands",
    "Exercise",
    "Grooming",
    "Laundry",
    "Medical Help",
    "Mobility",
    "Pets",
    "Showering",
    "Toileting",
    "Transfering",
    "Transportation",
];

export default function ServicesPage() {
    return (
        <main className="bg-white text-slate-800">
            <section className="bg-[#f5f7f8]">
                <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-10 lg:px-12 lg:py-24">
                    <div className="max-w-xl">
                        <h1 className="text-4xl font-extrabold tracking-tight text-[#00456B] md:text-5xl">
                            Are you ready to get started?
                        </h1>

                        <p className="mt-6 text-2xl font-semibold text-[#1f73d8]">
                            The Cerna Care Way
                        </p>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Cerna Homecare is here to help you or a loved one today.
                            Contact us now for your complimentary in-home consultation.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="tel:8775723762"
                                className="inline-flex rounded-xl bg-[#1f69b3] px-8 py-4 text-lg font-bold text-white shadow-sm transition hover:opacity-90"
                            >
                                (877) 572-3762
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="relative h-[320px] w-[320px] overflow-hidden rounded-full shadow-xl md:h-[460px] md:w-[460px]">
                            <Image
                                src="/assets/cerna-services.webp"
                                alt="Cerna Home Care services"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 lg:px-12 lg:py-20">
                <div className="max-w-3xl">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f73d8]">
                        Our Care Services
                    </p>
                    <h2 className="mt-3 text-4xl font-extrabold text-[#00456B]">
                        Our Services
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        We provide compassionate, personalized support to help clients stay
                        safe, comfortable, and independent at home.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => (
                        <div
                            key={service}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-xl font-bold text-[#1f73d8]">
                                ✓
                            </div>
                            <h3 className="text-xl font-bold text-[#00456B]">{service}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Professional, attentive support tailored to each client’s daily
                                needs and comfort.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-[#f8fbfd]">
                <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 lg:px-12 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1f73d8]">
                            Support Levels
                        </p>
                        <h2 className="mt-3 text-4xl font-extrabold text-[#00456B]">
                            Our Levels of Service and Duties
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                            From light daily assistance to more hands-on personal support,
                            Cerna Home Care offers flexible services based on each client’s
                            needs, goals, and routine.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-2xl font-bold text-[#00456B]">
                                Personal Care
                            </h3>
                            <p className="mt-4 leading-8 text-slate-600">
                                Help with bathing, dressing, grooming, toileting, showering, and
                                mobility support.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-2xl font-bold text-[#00456B]">
                                Daily Living Support
                            </h3>
                            <p className="mt-4 leading-8 text-slate-600">
                                Assistance with meals, laundry, errands, companionship,
                                transportation, and appointments.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <h3 className="text-2xl font-bold text-[#00456B]">
                                Wellness & Safety
                            </h3>
                            <p className="mt-4 leading-8 text-slate-600">
                                Support for exercise, fall prevention, medication reminders, and
                                promoting a safer home environment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 lg:px-12 lg:py-20">
                <div className="rounded-[28px] bg-[#00456B] px-8 py-12 text-white md:px-12 md:py-14">
                    <div className="grid items-center gap-8 md:grid-cols-[1.5fr_auto]">
                        <div>
                            <h2 className="text-3xl font-extrabold md:text-4xl">
                                Ready to speak with our care team?
                            </h2>
                            <p className="mt-4 max-w-2xl text-lg leading-8 text-sky-50">
                                We are here to help you find the right level of care for you or
                                your loved one. Contact Cerna Home Care today for a complimentary
                                in-home consultation.
                            </p>
                        </div>

                        <div>
                            <Link
                                href="/contact-us"
                                className="inline-flex rounded-xl bg-[#DD8500] px-8 py-4 text-lg font-bold text-white transition hover:opacity-90"
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