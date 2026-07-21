import styles from "./home.module.css";
import Image from "next/image";
import Link from "next/link";  
import HomeConsultationForm from "@/components/HomeConsultationForm";

const services = [
    {
        title: "Companionship",
        icon: "/assets/icons/Companionship.webp",
        description:
            "Friendly support and meaningful conversation to help clients feel connected, engaged, and cared for at home.",
    },
    {
        title: "Appointments",
        icon: "/assets/icons/Appointments.webp",
        description:
            "Reliable assistance with getting ready for appointments, transportation coordination, and helpful reminders.",
    },
    {
        title: "Bathing",
        icon: "/assets/icons/Bathing.webp",
        description:
            "Respectful personal care support that helps clients bathe safely while maintaining comfort and dignity.",
    },
    {
        title: "Cooking",
        icon: "/assets/icons/Cooking.webp",
        description:
            "Help with preparing nutritious meals and snacks based on each client’s preferences and daily routine.",
    },
    {
        title: "Dressing",
        icon: "/assets/icons/Dressing.webp",
        description:
            "Gentle assistance with choosing clothing and getting dressed so clients can start the day with confidence.",
    },
    {
        title: "Errands",
        icon: "/assets/icons/Errands.webp",
        description:
            "Support with everyday errands such as groceries, pharmacy visits, and other important household needs.",
    },
    {
        title: "Exercise",
        icon: "/assets/icons/Exersize.webp",
        description:
            "Encouragement and assistance with light movement and safe activity to support strength and well-being.",
    },
    {
        title: "Grooming",
        icon: "/assets/icons/Grooming.webp",
        description:
            "Help with daily grooming routines so clients can feel refreshed, comfortable, and their best.",
    },
    {
        title: "Laundry",
        icon: "/assets/icons/Laundry.webp",
        description:
            "Assistance with washing, drying, folding, and organizing laundry to keep the home running smoothly.",
    },
    {
        title: "Medical Help",
        icon: "/assets/icons/Medical-Help.webp",
        description:
            "Helpful reminders and support with wellness routines, medications, and non-medical care needs.",
    },
    {
        title: "Mobility",
        icon: "/assets/icons/Mobility.webp",
        description:
            "Safe assistance with walking, transfers, and moving around the home to promote independence.",
    },
    {
        title: "Pets",
        icon: "/assets/icons/Pets.webp",
        description:
            "Light support with pet care routines so clients can continue enjoying the companionship of their animals.",
    },
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
                    <div
                        style={{
                            position: "relative",
                            height: "680px",
                            width: "100%",
                        }}
                    >
                        <Image
                            src="/assets/cerna-homecareV2.png"
                            alt="Cerna — caring for seniors"
                            fill
                            priority
                            sizes="100vw"
                            quality={100}
                            style={{
                                objectFit: "cover",
                                objectPosition: "center 65%",
                            }}
                        />

                        <Link
                            href="https://www.cernafranchising.com/"
                            target="_blank"
                            className="absolute right-6 top-6 z-20 rounded-full bg-white/95 px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-[#00456B] shadow-xl ring-2 ring-[#DD8500] backdrop-blur transition hover:bg-[#DD8500] hover:text-white md:right-10 md:top-10"
                        >
                            ★ Become a Franchishee
                        </Link>

                        <div className="absolute inset-0 bg-black/[0.08]" />

                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pt-[16rem] text-center md:pt-[20rem]">
                            <div className="max-w-5xl">
                                <h1
                                    className="text-2xl font-extralight uppercase tracking-[0.06em] text-white md:text-4xl lg:text-5xl"
                                    style={{
                                        textShadow: "0 2px 10px rgba(0,0,0,0.40)",
                                    }}
                                >
                                    THE HOME CARE JOURNEY
                                </h1>

                                <p
                                    className="mt-3 text-sm font-light tracking-[0.02em] text-white md:text-lg lg:text-xl"
                                    style={{
                                        textShadow: "0 2px 10px rgba(0,0,0,0.40)",
                                    }}
                                >
                                    Providing Home Care Services for Over 20 Years
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="relative py-12 md:py-14"
                    style={{
                        backgroundImage: 'url("/assets/hands_blueV2-300x300.webp")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="absolute inset-0 bg-slate-900/45" />

                    <div className="relative mx-auto grid max-w-7xl gap-8 px-6 md:gap-10 md:px-8 lg:grid-cols-[minmax(520px,560px)_minmax(520px,560px)] lg:justify-center lg:gap-40 lg:px-10">
                        <div className="rounded-[28px] bg-gradient-to-br from-sky-700 to-slate-900 p-6 text-white shadow-sm md:p-8">
                            <div className="mb-5">
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
                            </div>

                       <HomeConsultationForm />
                        </div>

                        <div className="flex items-center">
                            <div className="overflow-hidden rounded-[28px] bg-white shadow-xl ring-1 ring-slate-200">
                                <div className="relative h-[220px] w-full md:h-[280px] md:w-[560px]">
                                    <Image
                                        src="/assets/caregiver-helping-elderly-patient-hero.png"
                                        alt="Cerna Homecare caregiver helping a senior at home"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 560px"
                                        className="object-cover"
                                        quality={100}
                                    />
                                </div>

                                <div className="p-5 md:p-6">
                                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                                        Peace of Mind at Home
                                    </p>

                                    <h2 className="mt-3 text-2xl font-bold leading-tight text-[#00456B] md:text-3xl">
                                        Compassionate care for the people who matter most
                                    </h2>

                                    <p className="mt-4 text-sm leading-7 text-slate-600">
                                        Choosing home care can feel overwhelming. Our team helps families
                                        navigate the process with compassion, clear communication, and
                                        dependable support tailored to each individual situation.
                                    </p>

                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        Whether your loved one needs companionship, daily assistance, or
                                        more involved care, Cerna Homecare is here to help provide comfort,
                                        dignity, and peace of mind at home.
                                    </p>

                                    <div className="mt-5 flex justify-center">
                                        <Link
                                            href="/getting-started"
                                            className="inline-flex rounded-full bg-[#DD8500] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#c67600]"
                                        >
                                            Request a Free Consultation
                                        </Link>
                                    </div>
                                </div>
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
                            What We Do
                            </h2>
                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Flexible support for everyday living
                            </p>
                        </div>

                        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {services.map(({ title, icon, description }) => (
                                <div
                                    key={title}
                                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#D9F1F7]" />

                                    <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00456B] shadow-md">
                                        <Image
                                            src={icon}
                                            alt={`${title} icon`}
                                            width={38}
                                            height={38}
                                            className="object-contain brightness-0 invert"
                                        />
                                    </div>

                                    <h3 className="relative text-xl font-bold text-[#00456B]">
                                        {title}
                                    </h3>

                                    <p className="relative mt-3 text-sm leading-7 text-slate-600">
                                        {description}
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
                                target="_blank"
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
                        </div>s
                    </div>
                </section> 

            </main>
        </div>
    );
}