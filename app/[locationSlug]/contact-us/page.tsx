import Image from "next/image";
import Link from "next/link";
import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import { getLocationBySlug } from "@/lib/locations";
import LocalContactForm from "./LocalContactForm";

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
};

const officeHours = [
    "Monday – Saturday: 6:00am to 9:00pm",
    "Sunday: 9:00am to 4:00pm",
];

export default async function LocalContactUsPage({
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

    const fullAddress = [
        location.addressLine1,
        location.addressLine2,
    ]
        .filter(Boolean)
        .join(", ");

    const primaryPhoneHref =
        location.phones?.[0]?.href ??
        location.phoneHref;

    const primaryPhoneNumber =
        location.phones?.[0]?.number ??
        location.phone;

    return (
        <main className="bg-slate-50">
            {/* ============================================================= */}
            {/* HERO */}
            {/* ============================================================= */}

            <section className="bg-[#d9f1f7]">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 lg:px-8">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#DD8500]">
                            Contact {areaName}
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-[#00456B] md:text-5xl">
                            Speak with Your Local Cerna
                            Home Care Team
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            Whether you are exploring care
                            for yourself, a parent, or a
                            loved one, {locationBrandName}{" "}
                            is here to help. Contact our
                            local team to discuss care
                            options, availability, and the
                            right level of support for
                            your family.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href={primaryPhoneHref}
                                className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                            >
                                Call {primaryPhoneNumber}
                            </a>

                            {location.email && (
                                <a
                                    href={`mailto:${location.email}?subject=${encodeURIComponent(
                                        `Care Inquiry - ${areaName}`
                                    )}`}
                                    className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#00456B] shadow-sm ring-1 ring-slate-200 transition hover:text-[#DD8500]"
                                >
                                    Email Our Team
                                </a>
                            )}
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
            {/* CONTACT CARDS */}
            {/* ============================================================= */}

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Call */}

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9f1f7]">
                            <Phone
                                className="h-6 w-6 text-[#00456B]"
                                strokeWidth={1.8}
                            />
                        </div>

                        <h2 className="text-xl font-bold text-[#00456B]">
                            Call Us
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Speak directly with our local{" "}
                            {areaName} care team.
                        </p>

                        <div className="mt-5 space-y-2">
                            {location.phones?.length ? (
                                location.phones.map(
                                    (phone) => (
                                        <p key={phone.href}>
                                            <a
                                                href={
                                                    phone.href
                                                }
                                                className="font-bold text-[#DD8500]"
                                            >
                                                {
                                                    phone.number
                                                }{" "}
                                                <span className="font-medium text-slate-500">
                                                    (
                                                    {
                                                        phone.label
                                                    }
                                                    )
                                                </span>
                                            </a>
                                        </p>
                                    )
                                )
                            ) : (
                                <a
                                    href={
                                        location.phoneHref
                                    }
                                    className="font-bold text-[#DD8500]"
                                >
                                    {location.phone}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Email */}

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9f1f7]">
                            <Mail
                                className="h-6 w-6 text-[#00456B]"
                                strokeWidth={1.8}
                            />
                        </div>

                        <h2 className="text-xl font-bold text-[#00456B]">
                            Email Us
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Send us a message and our team
                            will follow up with you.
                        </p>

                        {location.email && (
                            <a
                                href={`mailto:${location.email}?subject=${encodeURIComponent(
                                    `Care Inquiry - ${areaName}`
                                )}`}
                                className="mt-5 inline-block break-all font-bold text-[#DD8500]"
                            >
                                {location.email}
                            </a>
                        )}
                    </div>

                    {/* Office */}

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9f1f7]">
                            <MapPin
                                className="h-6 w-6 text-[#00456B]"
                                strokeWidth={1.8}
                            />
                        </div>

                        <h2 className="text-xl font-bold text-[#00456B]">
                            Local Office
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            {location.addressLine1}

                            {location.addressLine2 && (
                                <>
                                    <br />
                                    {
                                        location.addressLine2
                                    }
                                </>
                            )}
                        </p>

                        <a
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-block font-bold text-[#DD8500]"
                        >
                            View Map
                        </a>
                    </div>
                </div>
            </section>

            {/* ============================================================= */}
            {/* CONTACT FORM + SIDEBAR */}
            {/* ============================================================= */}

            <section className="bg-white px-6 py-20 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Contact Form */}

                    <div className="rounded-[36px] bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                            Send a Message
                        </p>

                        <h2 className="text-3xl font-bold text-[#00456B]">
                            Request Care Information
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Complete the form below and
                            our local {areaName} team will
                            contact you to learn more
                            about your care needs.
                        </p>

                        <LocalContactForm
                            locationSlug={locationSlug}
                            locationName={
                                locationBrandName
                            }
                            locationAreaName={areaName}
                            locationState={
                                location.state
                            }
                        />
                    </div>

                    {/* Sidebar */}

                    <aside className="space-y-8">
                        {/* Office Hours */}

                        <div className="rounded-[36px] bg-[#00456B] p-8 text-white shadow-xl">
                            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F5B041]">
                                Office Hours
                            </p>

                            <h2 className="mt-3 text-3xl font-bold">
                                We&apos;re Here to Help
                            </h2>

                            <div className="mt-6 space-y-3 text-white/85">
                                {officeHours.map(
                                    (hour) => (
                                        <p key={hour}>
                                            {hour}
                                        </p>
                                    )
                                )}
                            </div>

                            <a
                                href={primaryPhoneHref}
                                className="mt-8 inline-flex rounded-full bg-[#DD8500] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c67600]"
                            >
                                Call {primaryPhoneNumber}
                            </a>
                        </div>

                        {/* Local Services */}

                        <div className="rounded-[36px] bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200">
                            <h2 className="text-2xl font-bold text-[#00456B]">
                                Local Services
                            </h2>

                            <p className="mt-3 leading-7 text-slate-600">
                                Explore care options
                                available through{" "}
                                {locationBrandName}.
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
                                    href={`/${locationSlug}/covered-care`}
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

            {/* ============================================================= */}
            {/* VISIT US */}
            {/* ============================================================= */}

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="overflow-hidden rounded-[40px] bg-white shadow-xl ring-1 ring-slate-200">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-8 md:p-12">
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                                Visit Us
                            </p>

                            <h2 className="text-3xl font-bold text-[#00456B]">
                                {areaName} Office
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                {
                                    location.addressLine1
                                }

                                {location.addressLine2 && (
                                    <>
                                        <br />
                                        {
                                            location.addressLine2
                                        }
                                    </>
                                )}
                            </p>

                            <a
                                href={location.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex rounded-full bg-[#00456B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#003552]"
                            >
                                Open in Google Maps
                            </a>
                        </div>

                        <div className="relative min-h-[320px] bg-slate-100">
                            <Image
                                src={
                                    location.heroImage
                                }
                                alt={`${locationBrandName} office location`}
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