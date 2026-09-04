import Image from "next/image";
import Link from "next/link";

import ServiceCardsSection from "../../../components/ServiceCardsSection";
import DutiesProvidedSection from "../../../components/DutiesProvidedSection";

import { getLocationBySlug } from "@/lib/locations";

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
};

export default async function LocalServicesPage({
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

    const locationBrandName =
        `Cerna Home Care ${areaName}`;

    const primaryPhoneHref =
        location.phones?.[0]?.href ??
        location.phoneHref;

    const primaryPhoneNumber =
        location.phones?.[0]?.number ??
        location.phone;

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
                            Services in {areaName}
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-[#00456B] md:text-5xl">
                            Local Home Care Services
                            Designed Around Your Family
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            {locationBrandName} provides
                            personalized in-home care
                            services for seniors and
                            families throughout{" "}
                            {areaName}. From hourly care
                            to memory support, covered
                            care, companion care, and
                            respite care, our team helps
                            clients remain safe,
                            comfortable, and independent
                            at home.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={`/${locationSlug}/contact-us`}
                                className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                            >
                                Request Care Information
                            </Link>

                            <a
                                href={primaryPhoneHref}
                                className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#00456B] shadow-sm ring-1 ring-slate-200 transition hover:text-[#DD8500]"
                            >
                                Call {primaryPhoneNumber}
                            </a>
                        </div>
                    </div>

                    <div className="relative mx-auto h-[320px] w-full max-w-[560px] overflow-hidden rounded-[46px] bg-white shadow-xl md:h-[420px]">
                        <Image
                            src={location.heroImage}
                            alt={`${locationBrandName} office`}
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
            {/* OUR SERVICES */}
            {/* ============================================================= */}

            <ServiceCardsSection
                basePath={`/${locationSlug}`}
            />

            {/* ============================================================= */}
            {/* DUTIES PROVIDED */}
            {/* ============================================================= */}

            <DutiesProvidedSection
                eyebrow={`Care Services in ${areaName}`}
                description={`Our ${areaName} caregivers provide attentive support tailored to each client’s daily needs and comfort.`}
            />

            {/* ============================================================= */}
            {/* HELP CHOOSING A SERVICE */}
            {/* ============================================================= */}

            <section className="bg-white px-6 py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
                    <div className="rounded-[36px] bg-[#00456B] p-8 text-white shadow-xl md:p-10">
                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F5B041]">
                            Personalized Care
                        </p>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                            Not Sure Which Service You
                            Need?
                        </h2>

                        <p className="mt-5 leading-8 text-white/85">
                            Many families are unsure
                            where to start. That is
                            completely normal. Our{" "}
                            {areaName} team can talk
                            through your situation,
                            explain available options,
                            and help recommend the right
                            level of care.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href={primaryPhoneHref}
                                className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c67600]"
                            >
                                Call {primaryPhoneNumber}
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
                            <li>
                                ✓ Care plans tailored to
                                each client and family
                            </li>

                            <li>
                                ✓ Local team support in{" "}
                                {areaName}
                            </li>

                            <li>
                                ✓ Help with personal care,
                                companionship, and safety
                            </li>

                            <li>
                                ✓ Support after hospital
                                stays or changes in
                                condition
                            </li>

                            <li>
                                ✓ Flexible care options
                                for short-term or ongoing
                                needs
                            </li>

                            <li>
                                ✓ Respite support for
                                family caregivers
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ============================================================= */}
            {/* FINAL CTA */}
            {/* ============================================================= */}

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="rounded-[40px] bg-gradient-to-br from-[#e8f7fb] to-white p-8 text-center shadow-xl ring-1 ring-slate-200 md:p-14">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        {areaName} Care Team
                    </p>

                    <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-[#00456B] md:text-4xl">
                        Get help choosing the right home
                        care service
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
                        Contact {locationBrandName} to
                        discuss your family&apos;s care
                        needs and learn how we can help.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href={primaryPhoneHref}
                            className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#c67600]"
                        >
                            Call {primaryPhoneNumber}
                        </a>

                        <Link
                            href={`/${locationSlug}/contact-us`}
                            className="rounded-full bg-[#00456B] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#003552]"
                        >
                            Request Care Information
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        {fullAddress}
                    </p>
                </div>
            </section>
        </main>
    );
}