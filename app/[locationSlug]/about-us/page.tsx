import Image from "next/image";
import Link from "next/link";

import { getLocationBySlug } from "@/lib/locations";

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
};

export default async function LocalAboutUsPage({
    params,
}: PageProps) {
    const { locationSlug } = await params;

    const location =
        await getLocationBySlug(locationSlug);

    if (!location) {
        return (
            <main className="px-6 py-20">
                <h1 className="text-3xl font-bold text-[#00456B]">
                    Location Not Found
                </h1>

                <p className="mt-4 text-slate-600">
                    Please visit our main locations page
                    to find a Cerna Home Care office near
                    you.
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

    const areaName = location.name;

    const fullAddress = [
        location.addressLine1,
        location.addressLine2,
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <main className="bg-slate-50">
            {/* ============================================================= */}
            {/* HERO */}
            {/* ============================================================= */}

            <section className="bg-[#d9f1f7]">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 lg:px-8">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#DD8500]">
                            About {areaName}
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-[#00456B] md:text-5xl">
                            Local Home Care with the Cerna
                            Standard of Excellence
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            At Cerna Home Care {areaName},
                            we provide compassionate,
                            reliable, and professional
                            in-home care for families
                            throughout {areaName}. Our
                            mission is to help seniors
                            remain safe, comfortable, and
                            independent at home while
                            giving families peace of mind.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={`/${locationSlug}/contact-us`}
                                className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                            >
                                Contact Our Local Team
                            </Link>

                            <a
                                href={
                                    location.phoneHref
                                }
                                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#00456B] shadow-sm ring-1 ring-slate-200 transition hover:text-[#DD8500]"
                            >
                                Call {location.phone}
                            </a>
                        </div>
                    </div>

                    <div className="relative mx-auto h-[320px] w-full max-w-[560px] overflow-hidden rounded-[46px] bg-white shadow-xl md:h-[420px]">
                        <Image
                            src={location.heroImage}
                            alt={`Cerna Home Care ${areaName} office`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 560px"
                            className="object-cover"
                            quality={100}
                        />
                    </div>
                </div>
            </section>

            {/* ============================================================= */}
            {/* CARE VALUES */}
            {/* ============================================================= */}

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-[#00456B]">
                            Compassionate Care
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            We treat every client with
                            dignity, patience, and respect.
                            Our caregivers are focused on
                            creating a safe, supportive,
                            and comfortable experience at
                            home.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-[#00456B]">
                            Local Support
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            Our {areaName} team
                            understands the local
                            community and works closely
                            with families to create care
                            plans that fit each
                            client&apos;s needs.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-[#00456B]">
                            Personalized Plans
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            From hourly personal care to
                            specialized care, memory
                            support, companion care,
                            respite care, and care
                            management, we tailor our
                            services around each family.
                        </p>
                    </div>
                </div>
            </section>

            {/* ============================================================= */}
            {/* OUR APPROACH */}
            {/* ============================================================= */}

            <section className="bg-white px-6 py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                            Our Approach
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-[#00456B] md:text-4xl">
                            Care Designed Around the
                            Individual
                        </h2>

                        <p className="mt-6 leading-8 text-slate-700">
                            We understand that every
                            family&apos;s situation is
                            different. Some clients need
                            a few hours of support each
                            week, while others need more
                            consistent care after a
                            hospital stay, during memory
                            loss, or when family
                            caregivers need respite.
                        </p>

                        <p className="mt-4 leading-8 text-slate-700">
                            Our local team takes time to
                            understand each
                            client&apos;s routines,
                            preferences, safety needs,
                            and goals. From there, we
                            help build a care plan that
                            supports independence while
                            giving loved ones confidence
                            and reassurance.
                        </p>
                    </div>

                    <div className="rounded-[36px] bg-[#f8fbfc] p-8 shadow-sm ring-1 ring-slate-200">
                        <h3 className="text-2xl font-bold text-[#00456B]">
                            Services Available in{" "}
                            {areaName}
                        </h3>

                        <ul className="mt-6 space-y-4 text-slate-700">
                            <li>✓ Specialized Care</li>
                            <li>✓ Memory Care</li>
                            <li>✓ Covered Care</li>
                            <li>✓ Companion Care</li>
                            <li>✓ Care Management</li>
                            <li>✓ Transportation</li>
                        </ul>

                        <Link
                            href={`/${locationSlug}/specialized-care`}
                            className="mt-8 inline-flex rounded-full bg-[#00456B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#003552]"
                        >
                            Explore Local Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================================= */}
            {/* CTA */}
            {/* ============================================================= */}

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="rounded-[40px] bg-gradient-to-br from-[#00456B] to-[#0070a8] p-8 text-center text-white shadow-xl md:p-14">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F5B041]">
                        {areaName} Home Care
                    </p>

                    <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
                        Speak with our local Cerna Home
                        Care team today
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/85">
                        Whether you are planning ahead
                        or need care soon, our team can
                        help you understand your options
                        and choose the right level of
                        support.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href={
                                location.phoneHref
                            }
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

                    <p className="mt-6 text-sm text-white/75">
                        {fullAddress}
                    </p>
                </div>
            </section>
        </main>
    );
}