import Image from "next/image";
import Link from "next/link";

import ServiceCardsSection from "../../components/ServiceCardsSection";
import DutiesProvidedSection from "../../components/DutiesProvidedSection";

import {
    getLocationBySlug,
} from "@/lib/locations";

const CORPORATE_LOCATION_SLUG =
    "orange-county";

export default async function ServicesPage() {
    /*
    |--------------------------------------------------------------------------
    | Corporate Location
    |--------------------------------------------------------------------------
    */

    const location =
        await getLocationBySlug(
            CORPORATE_LOCATION_SLUG
        );

    /*
    |--------------------------------------------------------------------------
    | Phone
    |--------------------------------------------------------------------------
    |
    | 1. Toll-Free Phone
    | 2. Regular Phone if Toll-Free is blank
    |
    */

    const tollFreePhone =
        location
            ?.tollFreePhone
            ?.trim() || "";

    const regularPhone =
        location
            ?.phone
            ?.trim() || "";

    const phoneLabel =
        tollFreePhone ||
        regularPhone;

    const phoneHref =
        tollFreePhone
            ? (
                location
                    ?.tollFreePhoneHref
                    ?.trim() ||
                makePhoneHref(
                    tollFreePhone
                )
            )
            : regularPhone
                ? (
                    location
                        ?.phoneHref
                        ?.trim() ||
                    makePhoneHref(
                        regularPhone
                    )
                )
                : "";

    return (
        <main className="bg-white text-slate-800">
            {/* ============================================================= */}
            {/* HERO */}
            {/* ============================================================= */}

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

                        {phoneLabel ? (
                            <div className="mt-8">
                                <a
                                    href={phoneHref}
                                    className="inline-flex rounded-xl bg-[#1f69b3] px-8 py-4 text-lg font-bold text-white shadow-sm transition hover:opacity-90"
                                >
                                    {phoneLabel}
                                </a>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="relative h-[240px] w-[240px] overflow-hidden rounded-full shadow-xl md:h-[340px] md:w-[340px]">
                            <Image
                                src="/assets/cerna-services.png"
                                alt="Cerna Home Care services"
                                fill
                                sizes="(min-width: 768px) 340px, 240px"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================= */}
            {/* OUR SERVICES */}
            {/* ============================================================= */}

            <ServiceCardsSection
                basePath="/services"
            />

            {/* ============================================================= */}
            {/* DUTIES PROVIDED */}
            {/* ============================================================= */}

            <DutiesProvidedSection />

            {/* ============================================================= */}
            {/* SUPPORT LEVELS */}
            {/* ============================================================= */}

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
                                Help with bathing, dressing, grooming, toileting, showering,
                                and mobility support.
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
                                Support for exercise, fall prevention, medication reminders,
                                and promoting a safer home environment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================= */}
            {/* FINAL CTA */}
            {/* ============================================================= */}

            <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 lg:px-12 lg:py-20">
                <div className="rounded-[28px] bg-[#00456B] px-8 py-12 text-white md:px-12 md:py-14">
                    <div className="grid items-center gap-8 md:grid-cols-[1.5fr_auto]">
                        <div>
                            <h2 className="text-3xl font-extrabold md:text-4xl">
                                Ready to speak with our care team?
                            </h2>

                            <p className="mt-4 max-w-2xl text-lg leading-8 text-sky-50">
                                We are here to help you find the right level of care for you
                                or your loved one. Contact Cerna Home Care today for a
                                complimentary in-home consultation.
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

/*
|--------------------------------------------------------------------------
| Phone Href Helper
|--------------------------------------------------------------------------
*/

function makePhoneHref(
    phone: string
) {
    return `tel:${phone.replace(
        /[^\d+]/g,
        ""
    )}`;
}