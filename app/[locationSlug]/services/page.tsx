import Image from "next/image";
import Link from "next/link";
import ServiceCardsSection from "../../../components/ServiceCardsSection";
import DutiesProvidedSection from "../../../components/DutiesProvidedSection";

const locations: Record<
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

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
};

export default async function LocalServicesPage({ params }: PageProps) {
    const { locationSlug } = await params;
    const location = locations[locationSlug];

    if (!location) {
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
                            Services in {location.areaName}
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-[#00456B] md:text-5xl">
                            Local Home Care Services Designed Around Your Family
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            {location.name} provides personalized in-home care services
                            for seniors and families throughout {location.areaName}. From
                            hourly care to memory support, Covered care, companion
                            care, and respite care, our team helps clients remain safe,
                            comfortable, and independent at home.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={`/${locationSlug}/contact-us`}
                                className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                            >
                                Request Care Information
                            </Link>

                            <a
                                href={location.phoneHref}
                                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#00456B] shadow-sm ring-1 ring-slate-200 transition hover:text-[#DD8500]"
                            >
                                Call {location.phone}
                            </a>
                        </div>
                    </div>

                    <div className="relative mx-auto h-[320px] w-full max-w-[560px] overflow-hidden rounded-[46px] bg-white shadow-xl md:h-[420px]">
                        <Image
                            src={location.image}
                            alt={`${location.name} office`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 560px"
                            className="object-cover"
                            quality={100}
                        />
                    </div>
                </div>
            </section>

            {/*Our Services*/}
            <ServiceCardsSection basePath={`/${locationSlug}`} /> 

            {/*Duties Provided*/}
            <DutiesProvidedSection
                eyebrow={`Care Services in ${location.areaName}`}
                description={`Our ${location.areaName} caregivers provide attentive support tailored to each client’s daily needs and comfort.`}
            />

            <section className="bg-white px-6 py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
                    <div className="rounded-[36px] bg-[#00456B] p-8 text-white shadow-xl md:p-10">
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F5B041]">
                            Personalized Care
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                            Not Sure Which Service You Need?
                        </h2>

                        <p className="mt-5 leading-8 text-white/85">
                            Many families are unsure where to start. That is completely
                            normal. Our {location.areaName} team can talk through your
                            situation, explain available options, and help recommend the
                            right level of care.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href={location.phoneHref}
                                className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c67600]"
                            >
                                Call {location.phone}
                            </a>

                            <Link
                                href={`/${locationSlug}/contact-us`}
                                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#00456B] transition hover:text-[#DD8500]"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[36px] bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
                        <h3 className="text-2xl font-bold text-[#00456B]">
                            Why Families Choose Cerna
                        </h3>

                        <ul className="mt-6 space-y-4 leading-7 text-slate-700">
                            <li>✓ Care plans tailored to each client and family</li>
                            <li>✓ Local team support in {location.areaName}</li>
                            <li>✓ Help with personal care, companionship, and safety</li>
                            <li>✓ Support after hospital stays or changes in condition</li>
                            <li>✓ Flexible care options for short-term or ongoing needs</li>
                            <li>✓ Respite support for family caregivers</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="rounded-[40px] bg-gradient-to-br from-[#e8f7fb] to-white p-8 text-center shadow-xl ring-1 ring-slate-200 md:p-14">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        {location.areaName} Care Team
                    </p>

                    <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-[#00456B] md:text-4xl">
                        Get help choosing the right home care service
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
                        Contact {location.name} to discuss your family’s care needs and
                        learn how we can help.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href={location.phoneHref}
                            className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c67600]"
                        >
                            Call {location.phone}
                        </a>

                        <Link
                            href={`/${locationSlug}/contact-us`}
                            className="rounded-full bg-[#00456B] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#003552]"
                        >
                            Request Care Information
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        {location.address}
                    </p>
                </div>
            </section>
        </main>
    );
}