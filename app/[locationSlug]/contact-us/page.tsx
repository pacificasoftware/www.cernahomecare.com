import Image from "next/image";
import Link from "next/link";
import LocalContactForm from "./LocalContactForm";

const locations: Record<
    string,
    {
        name: string;
        city: string;
        state: string;
        areaName: string;
        phone: string;
        phoneHref: string;
        email: string;
        address: string;
        image: string;
        mapQuery: string;
        officeHours: string[];
    }
> = {
    "orange-county": {
        name: "Cerna Home Care Orange County",
        city: "Orange County",
        state: "CA",
        areaName: "Orange County",
        phone: "(949) 298-3200",
        phoneHref: "tel:19492983200",
        email: "info@cernahomecare.com",
        address: "2151 Michelson Dr, Irvine, CA 92612",
        image: "/assets/cernaoffice.png",
        mapQuery: "2151 Michelson Dr, Irvine, CA 92612",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
    southlake: {
        name: "Cerna Home Care Southlake",
        city: "Southlake",
        state: "TX",
        areaName: "Southlake",
        phone: "(682) 324-9800",
        phoneHref: "tel:16823249800",
        email: "info@cernahomecare.com",
        address: "1560 E Southlake Blvd, Southlake, TX 76092",
        image: "/assets/1560-E-Southlake-Blvd-Southlake-TX-Building-Photo-1-Large.jpg",
        mapQuery: "1560 E Southlake Blvd, Southlake, TX 76092",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
    "south-bay": {
        name: "Cerna Home Care South Bay",
        city: "South Bay",
        state: "CA",
        areaName: "South Bay",
        phone: "(562) 242-1830",
        phoneHref: "tel:15622421830",
        email: "info@cernahomecare.com",
        address: "3780 Kilroy Airport Way, Long Beach, CA 90806",
        image: "/assets/3780-Kilroy-Airport-Way.jpg",
        mapQuery: "3780 Kilroy Airport Way, Long Beach, CA 90806",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
    "marin-county": {
        name: "Cerna Home Care Marin County",
        city: "Marin County",
        state: "CA",
        areaName: "Marin County",
        phone: "(415) 799-2628",
        phoneHref: "tel:14157992628",
        email: "info@cernahomecare.com",
        address: "700 Larkspur Landing Circle, Larkspur, CA 94939",
        image: "/assets/700-Larkspur-Landing.jpg",
        mapQuery: "700 Larkspur Landing Circle, Larkspur, CA 94939",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
    "san-diego": {
        name: "Cerna Home Care San Diego",
        city: "San Diego",
        state: "CA",
        areaName: "San Diego",
        phone: "(877) 577-6782",
        phoneHref: "tel:18775776782",
        email: "info@cernahomecare.com",
        address: "12526 High Bluff Drive, San Diego, CA 92130",
        image: "/assets/12526-High-Bluff-Dr.jpg",
        mapQuery: "12526 High Bluff Drive, San Diego, CA 92130",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
    pasadena: {
        name: "Cerna Home Care Pasadena",
        city: "Pasadena",
        state: "CA",
        areaName: "Pasadena",
        phone: "(562) 242-1830",
        phoneHref: "tel:15622421830",
        email: "info@cernahomecare.com",
        address: "1055 E Colorado Blvd., 5th Floor, Pasadena, CA 91106",
        image: "/assets/1055 E Colorado Blvd.jpg",
        mapQuery: "1055 E Colorado Blvd., 5th Floor, Pasadena, CA 91106",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
    dallas: {
        name: "Cerna Home Care Dallas",
        city: "Dallas",
        state: "TX",
        areaName: "Dallas",
        phone: "(972) 330-2005",
        phoneHref: "tel:19723302005",
        email: "info@cernahomecare.com",
        address: "101 E Park Blvd Suite 721, Plano, TX 75074",
        image: "/assets/101-E-Park-Blvd-Plano-TX.jpg",
        mapQuery: "101 E Park Blvd Suite 721, Plano, TX 75074",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
    "las-vegas": {
        name: "Cerna Home Care Las Vegas",
        city: "Las Vegas",
        state: "NV",
        areaName: "Las Vegas",
        phone: "(702) 673-1900",
        phoneHref: "tel:17026731900",
        email: "info@cernahomecare.com",
        address: "8180 Rafael Rivera Way #305, Las Vegas, NV 89113",
        image: "/assets/8180_rafael_rivera.png",
        mapQuery: "8180 Rafael Rivera Way #305, Las Vegas, NV 89113",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
    orlando: {
        name: "Cerna Home Care Orlando",
        city: "Orlando",
        state: "FL",
        areaName: "Orlando",
        phone: "(407) 495-4344",
        phoneHref: "tel:14074954344",
        email: "info@cernahomecare.com",
        address: "1741 Ocoee Apopka Rd, Suite 119, Apopka, FL 32703",
        image: "/assets/orlando.jpg",
        mapQuery: "1741 Ocoee Apopka Rd, Suite 119, Apopka, FL 32703",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
    tampa: {
        name: "Cerna Home Care Tampa",
        city: "Tampa",
        state: "FL",
        areaName: "Tampa",
        phone: "(813) 776-6099",
        phoneHref: "tel:18137766099",
        email: "info@cernahomecare.com",
        address: "3812 W Linebaugh Ave, Suite 108, Tampa, FL 33618",
        image: "/assets/tampa.jpg",
        mapQuery: "3812 W Linebaugh Ave, Suite 108, Tampa, FL 33618",
        officeHours: [
            "Monday – Saturday: 6:00am to 9:00pm",
            "Sunday: 9:00am to 4:00pm",
        ],
    },
};

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
};

export default async function LocalContactUsPage({ params }: PageProps) {
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
                            Contact {location.areaName}
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-[#00456B] md:text-5xl">
                            Speak with Your Local Cerna Home Care Team
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            Whether you are exploring care for yourself, a parent, or a
                            loved one, {location.name} is here to help. Contact our local
                            team to discuss care options, availability, and the right level
                            of support for your family.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href={location.phoneHref}
                                className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                            >
                                Call {location.phone}
                            </a>

                            <a
                                href={`mailto:${location.email}?subject=Care Inquiry - ${location.areaName}`}
                                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#00456B] shadow-sm ring-1 ring-slate-200 transition hover:text-[#DD8500]"
                            >
                                Email Our Team
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

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9f1f7] text-2xl">
                            ☎
                        </div>

                        <h2 className="text-xl font-bold text-[#00456B]">
                            Call Us
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Speak directly with our local {location.areaName} care team.
                        </p>

                        <a
                            href={location.phoneHref}
                            className="mt-5 inline-block font-bold text-[#DD8500]"
                        >
                            {location.phone}
                        </a>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9f1f7] text-2xl">
                            ✉
                        </div>

                        <h2 className="text-xl font-bold text-[#00456B]">
                            Email Us
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Send us a message and our team will follow up with you.
                        </p>

                        <a
                            href={`mailto:${location.email}?subject=Care Inquiry - ${location.areaName}`}
                            className="mt-5 inline-block break-all font-bold text-[#DD8500]"
                        >
                            {location.email}
                        </a>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9f1f7] text-2xl">
                            📍
                        </div>

                        <h2 className="text-xl font-bold text-[#00456B]">
                            Local Office
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            {location.address}
                        </p>

                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                location.mapQuery
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-block font-bold text-[#DD8500]"
                        >
                            View Map
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-white px-6 py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-[36px] bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                            Send a Message
                        </p>

                        <h2 className="text-3xl font-bold text-[#00456B]">
                            Request Care Information
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Complete the form below and our local {location.areaName} team
                            will contact you to learn more about your care needs.
                        </p>

                           <LocalContactForm
                        locationSlug={locationSlug}
                        locationName={location.name}
                        locationAreaName={location.areaName}
                        locationState={location.state}
                    />

                    </div>

                    <aside className="space-y-8">
                        <div className="rounded-[36px] bg-[#00456B] p-8 text-white shadow-xl">
                            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F5B041]">
                                Office Hours
                            </p>

                            <h2 className="mt-3 text-3xl font-bold">
                                We’re Here to Help
                            </h2>

                            <div className="mt-6 space-y-3 text-white/85">
                                {location.officeHours.map((hour) => (
                                    <p key={hour}>{hour}</p>
                                ))}
                            </div>

                            <a
                                href={location.phoneHref}
                                className="mt-8 inline-flex rounded-full bg-[#DD8500] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c67600]"
                            >
                                Call {location.phone}
                            </a>
                        </div>

                        <div className="rounded-[36px] bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200">
                            <h2 className="text-2xl font-bold text-[#00456B]">
                                Local Services
                            </h2>

                            <p className="mt-3 leading-7 text-slate-600">
                                Explore care options available through{" "}
                                {location.name}.
                            </p>

                            <div className="mt-6 grid gap-3">
                                <Link
                                    href={`/${locationSlug}/specialized-care`}
                                    className="rounded-2xl bg-white px-4 py-3 font-semibold text-[#00456B] shadow-sm ring-1 ring-slate-200 hover:text-[#DD8500]"
                                >
                                    Specialized Care
                                </Link>

                                <Link
                                    href={`/${locationSlug}/memory-care`}
                                    className="rounded-2xl bg-white px-4 py-3 font-semibold text-[#00456B] shadow-sm ring-1 ring-slate-200 hover:text-[#DD8500]"
                                >
                                    Memory Care
                                </Link>

                                <Link
                                    href={`/${locationSlug}/live-in-care`}
                                    className="rounded-2xl bg-white px-4 py-3 font-semibold text-[#00456B] shadow-sm ring-1 ring-slate-200 hover:text-[#DD8500]"
                                >
                                    Covered Care
                                </Link> 

                              

                                <Link
                                    href={`/${locationSlug}/companion-care`}
                                    className="rounded-2xl bg-white px-4 py-3 font-semibold text-[#00456B] shadow-sm ring-1 ring-slate-200 hover:text-[#DD8500]"
                                >
                                    Companion Care
                                </Link>

                                <Link
                                    href={`/${locationSlug}/care-management`}
                                    className="rounded-2xl bg-white px-4 py-3 font-semibold text-[#00456B] shadow-sm ring-1 ring-slate-200 hover:text-[#DD8500]"
                                >
                                    Care Management
                                </Link>

                                <Link
                                    href={`/${locationSlug}/transportation`}
                                    className="rounded-2xl bg-white px-4 py-3 font-semibold text-[#00456B] shadow-sm ring-1 ring-slate-200 hover:text-[#DD8500]"
                                >
                                    Transportation
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="overflow-hidden rounded-[40px] bg-white shadow-xl ring-1 ring-slate-200">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-8 md:p-12">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                                Visit Us
                            </p>

                            <h2 className="text-3xl font-bold text-[#00456B]">
                                {location.areaName} Office
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                {location.address}
                            </p>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    location.mapQuery
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex rounded-full bg-[#00456B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#003552]"
                            >
                                Open in Google Maps
                            </a>
                        </div>

                        <div className="relative min-h-[320px] bg-slate-100">
                            <Image
                                src={location.image}
                                alt={`${location.name} office location`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                quality={100}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}