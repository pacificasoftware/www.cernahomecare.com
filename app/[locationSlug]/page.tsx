import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationBySlug } from "@/lib/locations";
import HomeConsultationForm from "@/components/HomeConsultationForm";
 
import FloridaCoverageSelector from "@/components/FloridaCoverageSelector";
import ServiceCardsSection from "../../components/ServiceCardsSection";

type Props = {
    params: Promise<{
        locationSlug: string;
    }>;
};

type HomeConsultationFormProps = {
    locationSlug?: string;
    locationName?: string;
    locationState?: string;
};

//const services = [
//    { name: "Companionship", icon: "/assets/icons/Companionship.webp" },
//    { name: "Appointments", icon: "/assets/icons/Appointments.webp" },
//    { name: "Bathing", icon: "/assets/icons/Bathing.webp" },
//    { name: "Cooking", icon: "/assets/icons/Cooking.webp" },
//    { name: "Dressing", icon: "/assets/icons/Dressing.webp" },
//    { name: "Errands", icon: "/assets/icons/Errands.webp" },
//    { name: "Exercise", icon: "/assets/icons/Exersize.webp" },
//    { name: "Grooming", icon: "/assets/icons/Grooming.webp" },
//    { name: "Laundry", icon: "/assets/icons/Laundry.webp" },
//    { name: "Medical Help", icon: "/assets/icons/Medical-Help.webp" },
//    { name: "Mobility", icon: "/assets/icons/Mobility.webp" },
//    { name: "Pets", icon: "/assets/icons/Pets.webp" },
//    { name: "Showering", icon: "/assets/icons/Shoering.webp" },
//    { name: "Toileting", icon: "/assets/icons/Toileting.webp" },
//    { name: "Transfering", icon: "/assets/icons/Transfering.webp" },
//    { name: "Transportation", icon: "/assets/icons/Transportation.webp" },
//];

//const serviceCategories = [
//    {
//        title: "Specialized Care",
//        slug: "specialized-care",
//        description:
//            "Flexible in-home support with bathing, dressing, grooming, meal preparation, mobility assistance, and daily routines.",
//        image: "/assets/specialized-care.webp",
//    },
//    {
//        title: "Covered Care",
//        slug: "24hr-care",
//        description:
//            "More consistent care and companionship for clients who need extended support at home throughout the day and evening.",
//        image: "/assets/respite-care.webp",
//    },
//    {
//        title: "Memory & Dementia Care",
//        slug: "memory-dementia-care",
//        description:
//            "Patient, compassionate support for clients living with Alzheimer’s, dementia, memory loss, or cognitive changes.",
//        image: "/assets/group.png",
//    },
//    {
//        title: "Covered Care",
//        slug: "covered-care",
//        description:
//            "Help after a hospital stay, surgery, rehab discharge, or illness so clients can recover safely and comfortably at home.",
//        image: "/assets/caretaker_with_lady.png",
//    },
//    {
//        title: "Companion Care",
//        slug: "companion-care",
//        description:
//            "Friendly support, conversation, errands, light activities, appointments, meal support, and help reducing isolation.",
//        image: "/assets/man_with_caretaker.png",
//    },
//    {
//        title: "Respite Care",
//        slug: "respite-care",
//        description:
//            "Temporary relief for family caregivers who need time to rest, travel, work, or recharge while their loved one is cared for.",
//        image: "/assets/lady_on_couch.png",
//    },
//    {
//        title: "Transportation",
//        slug: "transportation",
//        description:
//            "We assist with all of your transportation needs, which includes a caregiver so your loved one is not simply picked up and dropped off.",
//        image: "/assets/caretakers.png",
//    },
//];


export default async function LocationPage({ params }: Props) {
    const { locationSlug } = await params;
    const location =
        await getLocationBySlug(locationSlug);

    if (!location) {
        notFound();
    }

    const primaryPhoneHref = location.phones?.[0]?.href ?? location.phoneHref;
    const primaryPhoneNumber = location.phones?.[0]?.number ?? location.phone;

    return (
        <main className="bg-white">
        
            {/* Corporate-style localized hero */}
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

            {/* Localized consultation form and care information */}
            <section
                id="free-consultation"
                className="relative py-12 md:py-14"
                style={{
                    backgroundImage:
                        'url("/assets/hands_blueV2-300x300.webp")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-slate-900/45" />

                <div className="relative mx-auto grid max-w-7xl gap-8 px-6 md:gap-10 md:px-8 lg:grid-cols-[minmax(520px,560px)_minmax(520px,560px)] lg:justify-center lg:gap-40 lg:px-10">
                    {/* Consultation form */}
                    <div className="rounded-[28px] bg-gradient-to-br from-sky-700 to-slate-900 p-6 text-white shadow-sm md:p-8">
                        <div className="mb-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
                                We are here to help
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Request a free consultation
                            </h2>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">
                                Please feel free to contact our {location.name} team anytime at{" "}
                                <a
                                    href={primaryPhoneHref}
                                    className="font-semibold text-orange-300 underline decoration-orange-200 underline-offset-4 transition hover:text-orange-200"
                                >
                                    {primaryPhoneNumber}
                                </a>
                                . We’ll help you understand the next best step.
                            </p>
                        </div>

                        <HomeConsultationForm locationSlug={locationSlug} />
                    </div> 

                    {/* Compassionate care information */}
                    <div className="flex items-center">
                        <div className="overflow-hidden rounded-[28px] bg-white shadow-xl ring-1 ring-slate-200">
                            <div className="relative h-[220px] w-full md:h-[280px] md:w-[560px]">
                                <Image
                                    src="/assets/caregiver-helping-elderly-patient-hero.png"
                                    alt={`Cerna Homecare caregiver helping a senior in ${location.name}`}
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
                                    Choosing home care can feel overwhelming. Our{" "}
                                    {location.name} team helps families navigate the
                                    process with compassion, clear communication, and
                                    dependable support tailored to each individual
                                    situation.
                                </p>

                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    Whether your loved one needs companionship, daily
                                    assistance, or more involved care, Cerna Homecare is
                                    here to provide comfort, dignity, and peace of mind
                                    at home.
                                </p>

                                <div className="mt-5 flex justify-center">
                                    <Link
                                        href={`/${locationSlug}/getting-started`}
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

            {/* Localized phone consultation banner */}
            <section className="bg-white py-12 md:py-16">
                <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
                    <div className="relative overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-100 px-6 pb-10 pt-14 text-center shadow-sm md:px-12 md:pb-12 md:pt-16">
                        <div className="absolute left-0 top-0 h-full w-2 bg-sky-600" />
                        <div className="absolute right-0 top-0 h-full w-2 bg-sky-600" />

                        <p className="mt-6 text-base font-semibold uppercase tracking-[0.28em] text-sky-700 md:text-lg">
                            Free In-Home Consultation
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                            Call us at{" "}
                            <a
                                href={primaryPhoneHref}
                                className="text-sky-700 underline decoration-sky-300 underline-offset-4 transition hover:text-sky-800"
                            >
                                {primaryPhoneNumber}
                            </a>{" "}
                            for a FREE In-Home Consultation!
                        </h2>

                        <div className="mx-auto mt-8 h-px w-32 bg-sky-300" />
                    </div>
                </div>
            </section> 


            {/*Our Services*/}
            <ServiceCardsSection basePath={`/${locationSlug}`} /> 

            {/*Duties Provided*/}
            {/*<DutiesProvidedSection />*/} 

            {/* Location image */}
            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="relative h-[280px] overflow-hidden rounded-[40px] bg-slate-100 shadow-xl md:h-[460px]">
                        <Image
                            src={location.heroImage}
                            alt={`${location.name} Cerna Homecare`}
                            fill
                            sizes="(max-width: 768px) 100vw, 1200px"
                            className="object-cover"
                            quality={100}
                        />
                    </div>
                </div>
            </section>

            {/* Leadership and contact details */}
            <section className="bg-white px-6 pb-16">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        Local Leadership
                    </p>

                    <h2 className="text-4xl font-extrabold text-[#00456B] md:text-5xl">
                        Your {location.name} Leadership
                    </h2>

                    <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-700">
                        The {location.name} leadership team has a history of compassion, care,
                        and attention to detail. We strive to provide the best care possible in
                        every situation. By understanding your needs and learning your family,
                        we create a nurturing and long-lasting relationship with each family we
                        serve.
                    </p>

                    <div className="mt-10">
                        <h3 className="text-3xl font-extrabold text-[#00456B]">
                            {location.addressLine1}
                        </h3>

                        <h3 className="mt-2 text-3xl font-extrabold text-[#00456B]">
                            {location.addressLine2}
                        </h3>

                        <div className="mt-8 space-y-2">
                            {location.phones?.length ? (
                                location.phones.map((phone) => (
                                    <a
                                        key={phone.href}
                                        href={phone.href}
                                        className="block text-3xl font-extrabold text-[#00456B] hover:text-[#DD8500]"
                                    >
                                        {phone.number}{" "}
                                        <span className="text-xl font-bold text-slate-600">
                                            ({phone.label})
                                        </span>
                                    </a>
                                ))
                            ) : (
                                <a
                                    href={location.phoneHref}
                                    className="block text-3xl font-extrabold text-[#00456B] hover:text-[#DD8500]"
                                >
                                    {location.phone}
                                </a>
                            )}
                        </div>

                        <a
                            href={`mailto:${location.email}`}
                            className="mt-3 block text-xl font-bold text-[#DD8500]"
                        >
                            {location.email}
                        </a>

                        <a
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 font-bold text-white"
                        >
                            View Map
                        </a>
                    </div>
                </div>
            </section>

            {/* Coverage areas */}
            <section className="bg-slate-50 px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <aside className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-extrabold uppercase text-[#00456B]">
                            {location.coverageTitle}
                        </h2>

                        {location.state === "FL" ? (
                            <FloridaCoverageSelector locationSlug={location.slug} />
                        ) : (
                            <div className="grid gap-x-8 gap-y-2 text-[17px] leading-7 text-slate-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {location.coverageAreas.map((area) => (
                                    <div key={area}>{area}</div>
                                ))}
                            </div>
                        )}

                        <p className="mt-8 text-base leading-7 text-slate-700">
                            This office covers all of {location.name}, {location.state}. For a
                            more comprehensive list of coverage{" "}
                            <Link href="/locations" className="font-bold text-[#DD8500]">
                                click here
                            </Link>
                            .
                        </p>
                    </aside>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white">
                <div
                    className="h-[90px] bg-cover bg-center"
                    style={{ backgroundImage: 'url("/assets/banner.webp")' }}
                />

                <div className="mx-auto max-w-7xl px-6 py-16 text-center">
                    <h2 className="text-3xl font-extrabold text-black md:text-4xl">
                        Both our Clients and their Families Love Us!
                    </h2>

                    <div className="mt-12 grid gap-10 md:grid-cols-3">
                        <div className="bg-slate-100 px-8 py-12">
                            <div className="text-2xl text-[#DD8500]">★★★★★</div>

                            <h3 className="mt-4 text-xl font-bold text-[#00456B]">
                                I Sing Your Praises!
                            </h3>

                            <p className="mt-4 text-base italic leading-7 text-slate-600">
                                Johnna has been doing really good. She has only had 1 or maybe 2
                                small meltdowns during quarantine. She’s doing her homework without
                                asking, cleaning her room and making 85% of her own food. All in all
                                she’s been better than I ever could have imagined. You were so right.
                            </p>

                            <p className="mt-8 font-bold text-slate-600">Johnna Haynes</p>
                        </div>

                        <div className="bg-slate-100 px-8 py-12">
                            <div className="text-2xl text-[#DD8500]">★★★★★</div>

                            <h3 className="mt-4 text-xl font-bold text-[#00456B]">
                                Best Company to work for
                            </h3>

                            <p className="mt-4 text-base italic leading-7 text-slate-600">
                                I love working for Cerna. I love how they care not just for
                                caregivers but for their clients. They always do the best to fit
                                caregivers with the right clients. My clients are pleased with them
                                and how they have the best caregivers to send.
                            </p>

                            <p className="mt-8 font-bold text-slate-600">Shirley Rose</p>
                        </div>

                        <div className="bg-slate-100 px-8 py-12">
                            <div className="text-2xl text-[#DD8500]">★★★★★</div>

                            <h3 className="mt-4 text-xl font-bold text-[#00456B]">
                                You are so great!
                            </h3>

                            <p className="mt-4 text-base italic leading-7 text-slate-600">
                                You did a great job teaching me about what’s really going on with
                                Johnna. Nobody was able to figure it out. We all as a team continue
                                to work with Johnna. I actually finally enjoy coming home and
                                spending time with her.
                            </p>

                            <p className="mt-8 font-bold text-slate-600">
                                DeAnn and Johnna King
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}