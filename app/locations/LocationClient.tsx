"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type {
    LocationData,
    LocationState,
} from "@/lib/locations";

type Props = {
    locations: LocationData[];
    states: LocationState[];
};

export default function LocationsClient({
    locations,
    states,
}: Props) {
    const [selectedState, setSelectedState] =
        useState("All");

    const corporateLocation = locations.find(
        (location) => location.slug === "orange-county"
    );

    /*
    |--------------------------------------------------------------------------
    | State Name Lookup
    |--------------------------------------------------------------------------
    |
    | States now come from:
    | GET /api/public/locations/states
    |
    | Example:
    | { code: "CA", name: "California" }
    |
    */

    function getStateName(
        stateCode: string
    ): string {
        return (
            states.find(
                (state) =>
                    state.code === stateCode
            )?.name ?? stateCode
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Filter Locations
    |--------------------------------------------------------------------------
    */

    const filteredLocations =
        selectedState === "All"
            ? locations
            : locations.filter(
                (location) =>
                    location.state ===
                    selectedState
            );

    return (
        <main className="bg-slate-50">
            {/* ============================================================= */}
            {/* HERO */}
            {/* ============================================================= */}

            <section className="bg-[#d9f1f7]">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 lg:px-8">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#DD8500]">
                            Cerna Homecare
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-[#00456B] md:text-5xl">
                            Our Locations
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                            Cerna Homecare is located
                            across several states and in
                            many counties within each
                            state. Please look below for
                            the location nearest you. If
                            you cannot find a location,
                            please contact our corporate
                            office directly as we may
                            still be able to provide
                            services.
                        </p>
                    </div>

                    <div className="relative mx-auto h-[260px] w-full max-w-[520px] overflow-hidden rounded-[48px] bg-[#D9F1F7]">
                        <Image
                            src="/assets/maps.webp"
                            alt="Cerna Homecare locations map"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 520px"
                            className="object-contain"
                            quality={100}
                        />
                    </div>
                </div>
            </section>

            {/* ============================================================= */}
            {/* LOCATION FILTER + CARDS */}
            {/* ============================================================= */}

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                {/* --------------------------------------------------------- */}
                {/* State Filter */}
                {/* --------------------------------------------------------- */}

                <div className="mb-10 rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
                    <h2 className="text-2xl font-bold text-[#00456B]">
                        Find a Cerna Location Near You
                    </h2>

                    <p className="mx-auto mt-2 max-w-2xl text-slate-600">
                        Select a state to view available
                        Cerna Homecare locations.
                    </p>

                    <div className="mt-6 flex justify-center">
                        <div className="relative w-full max-w-xs">
                            <select
                                id="state-filter"
                                value={
                                    selectedState
                                }
                                onChange={(e) =>
                                    setSelectedState(
                                        e.target.value
                                    )
                                }
                                className="w-full appearance-none rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-center text-sm font-semibold text-[#00456B] outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                            >
                                <option value="All">
                                    All States
                                </option>

                                {states.map(
                                    (state) => (
                                        <option
                                            key={
                                                state.code
                                            }
                                            value={
                                                state.code
                                            }
                                        >
                                            {
                                                state.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#00456B]">
                                ▼
                            </span>
                        </div>
                    </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* Location Cards */}
                {/* --------------------------------------------------------- */}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredLocations.map(
                        (location) => (
                            <article
                                key={
                                    location.locationId
                                }
                                className="group overflow-hidden rounded-[28px] bg-white shadow-md ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Image */}

                                <Link
                                    href={`/${location.slug}`}
                                    className="relative block h-56 overflow-hidden bg-slate-100"
                                >
                                    <Image
                                        src={
                                            location.heroImage
                                        }
                                        alt={`${location.name}, ${location.state} Cerna Homecare location`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                        quality={
                                            100
                                        }
                                    />

                                    <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#00456B] shadow">
                                        {getStateName(
                                            location.state
                                        )}
                                    </div>
                                </Link>

                                {/* Card Content */}

                                <div className="p-6 text-center">
                                    <h3 className="text-2xl font-bold text-[#00456B]">
                                        {
                                            location.name
                                        }
                                        ,{" "}
                                        {
                                            location.state
                                        }
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
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

                                    {/* Phones */}

                                    <div className="mt-3 space-y-1 text-sm font-semibold text-[#00456B]">
                                        {location
                                            .phones
                                            ?.length ? (
                                            location.phones.map(
                                                (
                                                    phone
                                                ) => (
                                                    <p
                                                        key={
                                                            phone.href
                                                        }
                                                    >
                                                        <a
                                                            href={
                                                                phone.href
                                                            }
                                                            className="hover:text-[#DD8500]"
                                                        >
                                                            {
                                                                phone.number
                                                            }{" "}
                                                            <span className="font-medium text-slate-600">
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
                                        ) : location.phone ? (
                                            <p>
                                                <a
                                                    href={
                                                        location.phoneHref
                                                    }
                                                    className="hover:text-[#DD8500]"
                                                >
                                                    {
                                                        location.phone
                                                    }
                                                </a>
                                            </p>
                                        ) : null}
                                    </div>

                                    {/* View Map */}

                                    <a
                                        href={
                                            location.mapUrl
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 inline-flex rounded-full bg-[#DD8500] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                                    >
                                        View Map
                                    </a>
                                </div>
                            </article>
                        )
                    )}
                </div>

                {/* --------------------------------------------------------- */}
                {/* No Results */}
                {/* --------------------------------------------------------- */}

                {filteredLocations.length ===
                    0 && (
                        <div className="mt-12 rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
                            <h3 className="text-2xl font-bold text-[#00456B]">
                                No locations found
                            </h3>

                            <p className="mt-3 text-slate-600">
                                Please contact our corporate
                                office directly as we may
                                still be able to provide
                                services.
                            </p>
                        </div>
                    )}
            </section>

            {/* ============================================================= */}
            {/* CORPORATE OFFICE */}
            {/* ============================================================= */}

            {corporateLocation && (
                <section className="bg-white px-6 py-20 lg:px-8">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 rounded-[36px] bg-gradient-to-br from-[#e8f7fb] to-white p-8 shadow-xl ring-1 ring-slate-200 md:grid-cols-2 md:p-12">

                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                                Corporate Office
                            </p>

                            <h2 className="text-4xl font-bold tracking-tight text-[#00456B]">
                                Corporate Office
                            </h2>

                            <div className="mt-8 space-y-6 text-slate-700">

                                {/* Corporate Address */}
                                <div>
                                    <h3 className="text-lg font-bold text-[#0070c9]">
                                        Corporate Address:
                                    </h3>

                                    <p className="mt-2 text-base leading-7">
                                        {corporateLocation.addressLine1}

                                        {corporateLocation.addressLine2 && (
                                            <>
                                                <br />
                                                {corporateLocation.addressLine2}
                                            </>
                                        )}
                                    </p>
                                </div>

                                {/* Office Hours */}
                                <div>
                                    <h3 className="text-lg font-bold text-[#0070c9]">
                                        Office Hours:
                                    </h3>

                                    <p className="mt-2 text-base leading-7">
                                        Monday – Saturday 6:00am to 9:00pm
                                        <br />
                                        Sunday 9:00am to 4:00pm
                                    </p>
                                </div>

                                {/* Phones */}
                                <div>
                                    <h3 className="text-lg font-bold text-[#0070c9]">
                                        Direct Phone:
                                    </h3>

                                    <p className="mt-2 text-base leading-7">

                                        {corporateLocation.tollFreePhone &&
                                            corporateLocation.tollFreePhoneHref && (
                                                <>
                                                    Office:{" "}
                                                    <a
                                                        href={
                                                            corporateLocation.tollFreePhoneHref
                                                        }
                                                        className="font-semibold text-[#00456B] hover:text-[#DD8500]"
                                                    >
                                                        {
                                                            corporateLocation.tollFreePhone
                                                        }
                                                    </a>

                                                    <br />
                                                </>
                                            )}

                                        {corporateLocation.phone &&
                                            corporateLocation.phoneHref && (
                                                <>
                                                    Local:{" "}
                                                    <a
                                                        href={
                                                            corporateLocation.phoneHref
                                                        }
                                                        className="font-semibold text-[#00456B] hover:text-[#DD8500]"
                                                    >
                                                        {corporateLocation.phone}
                                                    </a>
                                                </>
                                            )}
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Corporate Image */}
                        <div className="relative mx-auto h-[280px] w-full max-w-[560px] overflow-hidden rounded-[50px] bg-white shadow-2xl md:h-[360px]">
                            <Image
                                src={
                                    corporateLocation.heroImage ||
                                    "/assets/cernaoffice.png"
                                }
                                alt="Cerna Homecare corporate office"
                                fill
                                sizes="(max-width: 768px) 100vw, 560px"
                                className="object-cover"
                                quality={100}
                            />
                        </div>

                    </div>
                </section>
            )}
        </main>
    );
}