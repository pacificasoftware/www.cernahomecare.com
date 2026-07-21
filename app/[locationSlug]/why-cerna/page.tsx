import Image from "next/image";
import Link from "next/link";

const franchisees: Record<
    string,
    {
        name: string;
        city: string;
        state: string;
        areaName: string;
        phone: string;
        phoneHref: string;
        address: string;
        image: string;
    }
> = {
    "orange-county": {
        name: "Cerna Home Care Orange County",
        city: "Orange County",
        state: "CA",
        areaName: "Orange County",
        phone: "(949) 298-3200",
        phoneHref: "tel:19492983200",
        address: "2151 Michelson Dr, Irvine, CA 92612",
        image: "/assets/cernaoffice.png",
    },
    southlake: {
        name: "Cerna Home Care Southlake",
        city: "Southlake",
        state: "TX",
        areaName: "Southlake",
        phone: "(682) 324-9800",
        phoneHref: "tel:16823249800",
        address: "1560 E Southlake Blvd, Southlake, TX 76092",
        image: "/assets/1560-E-Southlake-Blvd-Southlake-TX-Building-Photo-1-Large.jpg",
    },
    "south-bay": {
        name: "Cerna Home Care South Bay",
        city: "South Bay",
        state: "CA",
        areaName: "South Bay",
        phone: "(562) 242-1830",
        phoneHref: "tel:15622421830",
        address: "3780 Kilroy Airport Way, Long Beach, CA 90806",
        image: "/assets/3780-Kilroy-Airport-Way.jpg",
    },
    "marin-county": {
        name: "Cerna Home Care Marin County",
        city: "Marin County",
        state: "CA",
        areaName: "Marin County",
        phone: "(415) 799-2628",
        phoneHref: "tel:14157992628",
        address: "700 Larkspur Landing Circle, Larkspur, CA 94939",
        image: "/assets/700-Larkspur-Landing.jpg",
    },
    "san-diego": {
        name: "Cerna Home Care San Diego",
        city: "San Diego",
        state: "CA",
        areaName: "San Diego",
        phone: "(877) 577-6782",
        phoneHref: "tel:18775776782",
        address: "12526 High Bluff Drive, San Diego, CA 92130",
        image: "/assets/12526-High-Bluff-Dr.jpg",
    },
    pasadena: {
        name: "Cerna Home Care Pasadena",
        city: "Pasadena",
        state: "CA",
        areaName: "Pasadena",
        phone: "(562) 242-1830",
        phoneHref: "tel:15622421830",
        address: "1055 E Colorado Blvd., 5th Floor, Pasadena, CA 91106",
        image: "/assets/1055 E Colorado Blvd.jpg",
    },
    dallas: {
        name: "Cerna Home Care Dallas",
        city: "Dallas",
        state: "TX",
        areaName: "Dallas",
        phone: "(972) 330-2005",
        phoneHref: "tel:19723302005",
        address: "101 E Park Blvd Suite 771, Plano, TX 75074",
        image: "/assets/101-E-Park-Blvd-Plano-TX.jpg",
    },
    "las-vegas": {
        name: "Cerna Home Care Las Vegas",
        city: "Las Vegas",
        state: "NV",
        areaName: "Las Vegas",
        phone: "(702) 673-1900",
        phoneHref: "tel:17026731900",
        address: "8180 Rafael Rivera Way #305, Las Vegas, NV 89113",
        image: "/assets/8180_rafael_rivera.png",
    },
    orlando: {
        name: "Cerna Home Care Orlando",
        city: "Orlando",
        state: "FL",
        areaName: "Orlando",
        phone: "(407) 495-4344",
        phoneHref: "tel:14074954344",
        address: "1741 Ocoee Apopka Rd, Suite 119, Apopka, FL 32703",
        image: "/assets/orlando.jpg",
    },
    tampa: {
        name: "Cerna Home Care Tampa",
        city: "Tampa",
        state: "FL",
        areaName: "Tampa",
        phone: "(813) 776-6099",
        phoneHref: "tel:18137766099",
        address: "3812 W Linebaugh Ave, Suite 108, Tampa, FL 33618",
        image: "/assets/tampa.jpg",
    },
};

const benefits = [
    {
        title: "Personalized Care Plans",
        description:
            "We take time to understand each client’s routines, preferences, safety needs, and family goals before recommending a care plan.",
        icon: "🧡",
    },
    {
        title: "Local Team Support",
        description:
            "Families work with a local Cerna team that understands the community and can help coordinate the right level of care.",
        icon: "📍",
    },
    {
        title: "Flexible Care Options",
        description:
            "From hourly care to live-in support, respite care, Covered care, and memory care, families can choose what fits their situation.",
        icon: "🏡",
    },
    {
        title: "Compassionate Caregivers",
        description:
            "Our caregivers provide respectful, patient, and dependable support that helps clients feel comfortable and safe at home.",
        icon: "🤝",
    },
    {
        title: "Family Peace of Mind",
        description:
            "We help families feel more confident knowing their loved one has support with daily routines, companionship, and safety.",
        icon: "🌿",
    },
    {
        title: "Cerna Standard of Care",
        description:
            "Each local office is backed by Cerna’s broader home care experience, service standards, and commitment to quality care.",
        icon: "⭐",
    },
];

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
};

export default async function LocalWhyCernaPage({ params }: PageProps) {
    const { locationSlug } = await params;
    const franchisee = franchisees[locationSlug];

    if (!franchisee) {
        return (
            <main className="px-6 py-20">
                <h1 className="text-3xl font-bold text-[#00456B]">
                    Location Not Found
                </h1>

                <p className="mt-4 text-slate-600">
                    Please visit our main locations page to find a Cerna Home Care office
                    near you.
                </p>

                <p className="mt-4 text-sm text-slate-500">
                    Current slug: {locationSlug}
                </p>

                <Link
                    href="/locations"
                    className="mt-6 inline-block font-bold text-[#DD8500]"
                >
                    View All Locations
                </Link>
            </main>
        );
    }

    return (
        <main className="bg-slate-50">
            <section className="bg-[#d9f1f7]">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 lg:px-8">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#DD8500]">
                            Why Cerna {franchisee.areaName}
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-[#00456B] md:text-5xl">
                            A Better Home Care Experience for Families in{" "}
                            {franchisee.areaName}
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            Choosing care for a loved one is a big decision. At{" "}
                            {franchisee.name}, we combine compassionate local support with
                            Cerna’s commitment to dependable, personalized, and professional
                            in-home care.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={`/${locationSlug}/contact-us`}
                                className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                            >
                                Talk to Our Local Team
                            </Link>

                            <a
                                href={franchisee.phoneHref}
                                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#00456B] shadow-sm ring-1 ring-slate-200 transition hover:text-[#DD8500]"
                            >
                                Call {franchisee.phone}
                            </a>
                        </div>
                    </div>

                    <div className="relative mx-auto h-[320px] w-full max-w-[560px] overflow-hidden rounded-[46px] bg-white shadow-xl md:h-[420px]">
                        <Image
                            src={franchisee.image}
                            alt={`${franchisee.name} office`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 560px"
                            className="object-cover"
                            quality={100}
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        The Cerna Difference
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-[#00456B] md:text-4xl">
                        Why Families Choose Cerna Home Care
                    </h2>

                    <p className="mt-4 leading-8 text-slate-600">
                        We help families navigate care with clarity, compassion, and
                        practical support. Our goal is to make home feel safer, more
                        comfortable, and more manageable.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d9f1f7] text-3xl">
                                {benefit.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-[#00456B]">
                                {benefit.title}
                            </h3>

                            <p className="mt-4 leading-7 text-slate-600">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white px-6 py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
                    <div className="rounded-[36px] bg-[#00456B] p-8 text-white shadow-xl md:p-10">
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F5B041]">
                            Our Approach
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                            Care That Starts with Listening
                        </h2>

                        <p className="mt-5 leading-8 text-white/85">
                            Every family has different needs. Some families need short-term
                            help after a hospital stay. Others need consistent support with
                            personal care, memory care, companionship, or respite for a
                            family caregiver.
                        </p>

                        <p className="mt-4 leading-8 text-white/85">
                            Our {franchisee.areaName} team starts by understanding your
                            loved one’s routine, personality, health concerns, home
                            environment, and family priorities. From there, we help recommend
                            a practical care plan.
                        </p>

                        <Link
                            href={`/${locationSlug}/services`}
                            className="mt-8 inline-flex rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c67600]"
                        >
                            Explore Services
                        </Link>
                    </div>

                    <div className="rounded-[36px] bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
                        <h3 className="text-2xl font-bold text-[#00456B]">
                            Services Available in {franchisee.areaName}
                        </h3>

                        <ul className="mt-6 space-y-4 leading-7 text-slate-700">
                            <li>✓ Specialized Care</li>
                            <li>✓ 24 Hour Care</li>
                            <li>✓ Memory & Dementia Care</li>
                            <li>✓ Covered Care</li>
                            <li>✓ Companion Care</li>
                            <li>✓ Respite Care</li>
                        </ul>

                        <p className="mt-6 leading-7 text-slate-600">
                            Whether care is needed for a few hours a week or on a more
                            consistent basis, our team can help explain the options and guide
                            the next step.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#DD8500]">
                            Step 1
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-[#00456B]">
                            Tell Us What’s Going On
                        </h3>

                        <p className="mt-4 leading-7 text-slate-600">
                            We listen to your situation, answer questions, and help you
                            understand what type of care may be appropriate.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#DD8500]">
                            Step 2
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-[#00456B]">
                            Build a Care Plan
                        </h3>

                        <p className="mt-4 leading-7 text-slate-600">
                            We help create a care plan around the client’s needs, schedule,
                            safety concerns, and family preferences.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#DD8500]">
                            Step 3
                        </p>

                        <h3 className="mt-3 text-2xl font-bold text-[#00456B]">
                            Start Local Care
                        </h3>

                        <p className="mt-4 leading-7 text-slate-600">
                            Our local team supports the transition into care and remains
                            available as needs change over time.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                <div className="rounded-[40px] bg-gradient-to-br from-[#e8f7fb] to-white p-8 text-center shadow-xl ring-1 ring-slate-200 md:p-14">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        Cerna Home Care {franchisee.areaName}
                    </p>

                    <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-[#00456B] md:text-4xl">
                        Ready to talk through care options?
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
                        Contact {franchisee.name} to discuss your family’s situation and
                        learn how our local team can help.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href={franchisee.phoneHref}
                            className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c67600]"
                        >
                            Call {franchisee.phone}
                        </a>

                        <Link
                            href={`/${locationSlug}/contact-us`}
                            className="rounded-full bg-[#00456B] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#003552]"
                        >
                            Contact Us
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        {franchisee.address}
                    </p>
                </div>
            </section>
        </main>
    );
}