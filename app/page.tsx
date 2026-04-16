

import { Roboto } from "next/font/google";
import styles from "./home.module.css";
import Image from "next/image";
import Link from "next/link";

const services = [
    { title: "Companionship", icon: "💙" },
    { title: "Appointments", icon: "📅" },
    { title: "Bathing", icon: "🛁" },
    { title: "Cooking", icon: "🍽️" },
    { title: "Dressing", icon: "👕" },
    { title: "Errands", icon: "🚗" },
    { title: "Exercise", icon: "🏃" },
    { title: "Grooming", icon: "✨" },
    { title: "Laundry", icon: "🧺" },
    { title: "Medical Help", icon: "🛡️" },
    { title: "Mobility", icon: "🤝" },
    { title: "Pets", icon: "🐾" },
];

const carePlanItems = [
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
    "Transferring",
    "Transportation",
];

const testimonials = [
    {
        quoteTitle: "I Sing Your Praises!",
        body: "Johnna has been doing really good. She has only had 1 or maybe 2 small meltdowns during quarantine. She's doing her homework without asking, cleaning her room and making 85% of her own food. All in all she's been better than I ever could have imagined. You were so right.",
        name: "Johnna Haynes",
    },
    {
        quoteTitle: "Best Company to work for",
        body: "I love working for cerna. I love how they care not just for caregivers but for their clients. They always do the best to fit caregivers with the right clients. My clients are pleased with them and how they have the best caregivers to send. We love cerna. A 10 star rating.",
        name: "Shirley Rose",
    },
    {
        quoteTitle: "You are so great!",
        body: "You did a great job teaching me about what's really going on with Johnna. Nobody was able to figure it out. We all as a team continue to work with Johnna. I actually finally enjoy coming home and spending time with her. You are amazing! I started giving her allowance once a week a while back with light chores.",
        name: "DeAnn and Johnna King",
    },
];

const steps = [
    {
        title: "Contact Us for a Consultation",
        body: "",
    },
    {
        title: "We Design a Custom Care Plan",
        body: "Tailored To Your Needs",
    },
    {
        title: "Meet Your Professional Caregiver",
        body: "Courteous & Punctual",
    },
];

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            {eyebrow ? (
                <p className="mb-3 text-base md:text-lg font-semibold uppercase tracking-[0.24em] ...">
                    {eyebrow}
                </p>
            ) : null}
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {title}
            </h2>
            {description ? (
                <p className="mt-5 text-lg leading-8 text-white/80">{description}</p>
            ) : null}
        </div>
    );
}

export default function CernaHomePage() {
    return (

        <div className="flex min-h-screen flex-col">
            <main className="flex-1 bg-white text-slate-900">


                <section>
                    <div style={{ position: "relative", height: "820px", width: "100%" }}>
                        <Image
                            src="/assets/cerna-homecare.jpg"
                            alt="Cerna — caring for seniors"
                            fill
                            priority
                            sizes="100vw"
                            quality={100}
                            style={{
                                objectFit: "cover",
                                objectPosition: "center top"
                            }}
                        />

                        {/* Much brighter overlay */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(0, 0, 0, 0.08)",   // Very light overlay
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center",
                                textAlign: "center",
                                padding: "0 24px 70px 24px",
                            }}
                        >
                            <div style={{ maxWidth: "1100px", color: "white" }}>
                                <h1
                                    style={{
                                        margin: 0,
                                        fontSize: "48px",
                                        fontWeight: 300,
                                        lineHeight: 1.05,
                                        letterSpacing: "0.02em",
                                        textTransform: "uppercase",
                                        textShadow: "0 3px 15px rgba(0,0,0,0.5)",   // Stronger shadow for better readability
                                    }}
                                >
                                    The Home Care Journey
                                </h1>
                                <p
                                    style={{
                                        marginTop: "24px",
                                        fontSize: "24px",
                                        fontWeight: 700,
                                        lineHeight: 1.25,
                                        color: "white",
                                        textShadow: "0 3px 12px rgba(0,0,0,0.5)",
                                    }}
                                >
                                    Providing Home Care Services for Over 20 Years
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="relative py-20 md:py-24"
                    style={{
                        backgroundImage: 'url("/assets/hands_blueV2-300x300.webp")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="absolute inset-0 bg-slate-900/45" />

                    <div className="relative mx-auto grid max-w-7xl gap-8 lg:gap-16 px-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">

                        <div className="rounded-[28px] bg-gradient-to-br from-sky-700 to-slate-900 p-8 text-white shadow-sm md:p-10">
                            <div className="mb-6">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                                    We are here to help
                                </p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                    Request a free consultation
                                </h2>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
                                    Please feel free to contact us anytime at{" "}
                                    <a
                                        href="tel:18775776782"
                                        className="font-semibold text-orange-300 underline decoration-orange-200 underline-offset-4 transition hover:text-orange-200"
                                    >
                                        (877) 577-6782
                                    </a>
                                    . We’ll help you understand the next best step.
                                </p>
                                <p className="mt-4 mb-8 max-w-2xl text-base leading-7 text-slate-200"/>
                            </div>

                            <form className="pb-6">
                                <div className="mb-5">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                                    />
                                </div>

                                <div className="mb-5">
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                                    />
                                </div>

                                <div className="mb-5">
                                    <select className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300">
                                        <option className="text-slate-900">I am looking for information on your services</option>
                                        <option className="text-slate-900">I am looking for a job</option>
                                    </select>
                                </div>

                                <div className="mb-5">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                                    />
                                </div>

                                <div className="mb-5">
                                    <textarea
                                        rows={4}
                                        placeholder="Your message"
                                        className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                                    />
                                </div>

                                {/*<div className="mb-5 rounded-2xl border border-white/20 bg-white/10 px-4 py-4">*/}
                                {/*    <p className="text-sm text-slate-200">CAPTCHA goes here</p>*/}
                                {/*</div>*/}

                                <button
                                    type="submit"
                                    className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                                >
                                    Submit Request
                                </button>
                            </form>

                        </div>

                        <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                                Care plans
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                                Tailored to your specific needs
                            </h2>
                            <p className="mt-5 text-base leading-8 text-slate-600">
                                Before starting care, we spend time getting to know you or your
                                loved one as a person, learning the routines, preferences, and
                                support needs that shape each day.
                            </p>
                            <p className="mt-4 text-base leading-8 text-slate-600">
                                Then we design a personalized care plan built around comfort,
                                dignity, and dependable support.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                {carePlanItems.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-900"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-8">
                                <Link
                                    href="/getting-started"
                                    className="inline-flex items-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>

                <div className={styles.fullWidthDivider} />

                <section className="bg-white py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
                   <div className="relative overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-100 px-6 pt-14 pb-10 text-center shadow-sm md:px-12 md:pt-16 md:pb-12">
                            <div className="absolute left-0 top-0 h-full w-2 bg-sky-600" />
                            <div className="absolute right-0 top-0 h-full w-2 bg-sky-600" />

                            <p className="mt-6 text-base font-semibold uppercase tracking-[0.28em] text-sky-700 md:text-lg">
                                Free In-Home Consultation
                            </p>

                            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                                Call us at{" "}
                                <a
                                    href="tel:18775776782"
                                    className="text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-800"
                                >
                                    (877) 577-6782
                                </a>{" "}
                                for a FREE In-Home Consultation!
                            </h3>

                            <div className="mx-auto mt-1 h-px w-32 bg-sky-300" />

                            {/*<p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">*/}
                            {/*    Our team is here to answer your questions, understand your needs,*/}
                            {/*    and help you take the next step with confidence.*/}
                            {/*</p>*/}
                        </div>
                    </div>
                </section>
                <div className={styles.fullWidthDivider} />

                <section className="py-20 md:py-24">
                    <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
                        <div className="mx-auto max-w-3xl text-center">
                            <h2 className="text-5xl font-semibold tracking-tight text-slate-900 md:text-6xl">
                              OUR SERVICES
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Flexible support for everyday living
                            </p>
                        </div>

                        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {services.map(({ title, icon }) => (
                                <div
                                    key={title}
                                    className="group rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-2xl">
                                        <span aria-hidden="true">{icon}</span>
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-slate-900">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-7 text-slate-600">
                                        Compassionate assistance delivered with consistency,
                                        dignity, and attention to the individual.
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/downloads/fall-prevention-guide.pdf"
                                className="inline-flex min-w-[260px] items-center justify-center rounded-2xl px-6 py-3.5 text-base font-semibold text-white no-underline transition hover:opacity-90"
                                style={{ backgroundColor: "#DD8500" }}
                            >
                                Free Fall Prevention Guide
                            </Link>

                            <Link
                                href="/downloads/nutrition-guide.pdf"
                                className="inline-flex min-w-[260px] items-center justify-center rounded-2xl px-6 py-3.5 text-base font-semibold text-white no-underline transition hover:opacity-90"
                                style={{ backgroundColor: "#DD8500" }}
                            >
                                Free Nutrition Guide
                            </Link>
                        </div>
                    </div>
                </section>


                <section className="relative overflow-hidden py-20 md:py-24" >
                    <Image
                        src="/assets/cerna-reviews.jpg" 
                        alt="Cerna reviews background"
                        fill                                               
                        sizes="100vw"
                        className="object-contain object-top"
                    />

                    <div className="absolute inset-0 bg-white/85" />

                    <div className="relative mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
                        <SectionHeading
                            eyebrow="Here is what some of our beloved clients have to say"
                            title="Customer Testimonials"
                        />

                        <div className="mt-14 grid gap-6 lg:grid-cols-3">
                            {testimonials.map((item) => (
                                <blockquote
                                    key={item.name}
                                    className="rounded-[28px] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200"
                                >
                                    <div
                                        className="mb-5 text-3xl leading-none"
                                        style={{ color: "#DD8500" }}
                                    >
                                        ★★★★★
                                    </div>

                                    <h3 className="text-2xl font-medium text-sky-700">
                                        {item.quoteTitle}
                                    </h3>

                                    <p className="mt-6 text-lg italic leading-8 text-slate-500">
                                        {item.body}
                                    </p>

                                    <footer className="mt-8 text-base font-semibold text-slate-500">
                                        {item.name}
                                    </footer>
                                </blockquote>
                            ))}
                        </div>

                        <div className="mt-14 mb-24 flex justify-center">
                            <div className="flex flex-col items-center">
                                <h3 className="mb-3 text-center text-sm font-semibold text-slate-800">
                                    Watch Our Client Story
                                </h3>

                                <div className="overflow-hidden rounded-2xl border-4 border-white shadow-md ring-1 ring-slate-100">
                                    <iframe
                                        width="580"
                                        height="401"
                                        src="https://www.youtube.com/embed/SkdPyMf-qLA"
                                        title="Client Testimonial Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="block rounded-2xl"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-900 py-20 text-white md:py-24">
                    <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
                        <SectionHeading
                            eyebrow="A simple path to better care at home"
                            title="Three easy steps"
                            description="Help us understand your care needs so we can schedule a free assessment and recommend the right plan."
                        />

                        <div className="mt-14 grid gap-6 lg:grid-cols-3">
                            {steps.map((step, index) => {
                                const stepImages = [
                                    "/assets/1-2-150x150.webp",
                                    "/assets/2-2-150x150.webp",
                                    "/assets/3-2-150x150.webp",
                                ];

                                return (
                                    <div
                                        key={step.title}
                                        className="rounded-[28px] bg-white p-8 text-center text-slate-900 shadow-xl shadow-slate-950/20"
                                    >
                                        <div className="mb-6 flex justify-center">
                                            <img
                                                src={stepImages[index]}
                                                alt={`Step ${index + 1}`}
                                                width={96}
                                                height={96}
                                                className="h-24 w-24 rounded-full object-cover"
                                            />
                                        </div>

                                        <h3 className="text-2xl font-semibold">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 text-base leading-8 text-slate-600">
                                            {step.body}
                                            {index === 0 && (
                                                <> 
                                                    <a
                                                        href="tel:18775776782"
                                                        className="font-semibold text-sky-700 underline decoration-sky-300 underline-offset-4 transition hover:text-sky-800"
                                                    >
                                                        (877) 577-6782
                                                    </a>
                                                    .
                                                </>
                                            )}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-10 text-center">
                            <Link
                                href="/getting-started"
                                className="inline-flex items-center rounded-2xl px-6 py-3.5 text-base font-semibold text-white transition hover:opacity-90"
                                style={{ backgroundColor: "#DD8500" }}
                            >
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                </section> 

            </main>
        </div>
    );
}