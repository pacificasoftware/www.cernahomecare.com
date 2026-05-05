"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const locations = [
    {
        city: "Orange County",
        state: "CA",
        title: "Orange County, CA",
        address: "2151 Michelson Dr, Irvine, CA 92612",
        phone: "(949) 298-3200",
        image: "/assets/cernaoffice.png",
    },
    {
        city: "Southlake",
        state: "TX",
        title: "Southlake, TX",
        address: "1560 E Southlake Blvd, Southlake, TX 76092",
        phone: "(682) 324-9800",
        image: "/assets/1560-E-Southlake-Blvd-Southlake-TX-Building-Photo-1-Large.jpg",
    },
    {
        city: "South Bay",
        state: "CA",
        title: "South Bay, CA",
        address: "3780 Kilroy Airport Way, Long Beach, CA 90806",
        phone: "(562) 242-1830",
        image: "/assets/3780-Kilroy-Airport-Way.jpg",
    },
    {
        city: "Marin County",
        state: "CA",
        title: "Marin County, CA",
        address: "700 Larkspur Landing Circle, Larkspur, CA 94939",
        phone: "(415) 799-2628",
        image: "/assets/700-Larkspur-Landing.jpg",
    },
    {
        city: "San Diego",
        state: "CA",
        title: "San Diego, CA",
        address: "12526 High Bluff Drive, San Diego, CA 92130",
        phone: "(877) 572-3762",
        image: "/assets/12526-High-Bluff-Dr.jpg",
    },
    {
        city: "Pasadena",
        state: "CA",
        title: "Pasadena, CA",
        address: "1055 E Colorado Blvd., 5th Floor, Pasadena, CA 91106",
        phone: "(818) 839-5602",
        image: "/assets/1055 E Colorado Blvd.jpg",
    },
    {
        city: "Dallas",
        state: "TX",
        title: "Dallas, TX",
        address: "101 E Park Blvd Suite 771, Plano, TX 75074",
        phone: "(972) 330-2005",
        image: "/assets/101-E-Park-Blvd-Plano-TX.jpg",
    },
    {
        city: "Las Vegas",
        state: "NV",
        title: "Las Vegas, NV",
        address: "8180 Rafael Rivera Way #305, Las Vegas, NV 89113",
        phone: "(702) 673-1900",
        image: "/assets/8180_rafael_rivera.png",
    },
];

export default function LocationsPage() {
    const [selectedState, setSelectedState] = useState("All");

    const states = useMemo(() => {
        return ["All", ...Array.from(new Set(locations.map((x) => x.state)))];
    }, []);

    const filteredLocations =
        selectedState === "All"
            ? locations
            : locations.filter((location) => location.state === selectedState);

    return (
        <main className="bg-slate-50">
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
                            Cerna Homecare is located across several states and in many
                            counties within each state. Please look below for the location
                            nearest you. If you cannot find a location, please contact our
                            corporate office directly as we may still be able to provide
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

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-10 flex flex-col justify-between gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-[#00456B]">
                            Find a Cerna Location Near You
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Filter by state to quickly view available service areas.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <label
                            htmlFor="state-filter"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Filter by state
                        </label>

                        <select
                            id="state-filter"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-[#00456B] outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                        >
                            {states.map((state) => (
                                <option key={state} value={state}>
                                    {state === "All" ? "All States" : state}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredLocations.map((location) => (
                        <article
                            key={`${location.title}-${location.address}`}
                            className="group overflow-hidden rounded-[28px] bg-white shadow-md ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-56 overflow-hidden bg-slate-100">
                                <Image
                                    src={location.image}
                                    alt={`${location.title} office map`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 300px"
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                    quality={100}
                                />

                                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#00456B] shadow">
                                    {location.state}
                                </div>
                            </div>

                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-bold text-[#00456B]">
                                    {location.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {location.address}
                                </p>

                                {location.phone && (
                                    <p className="mt-3 text-sm font-semibold text-[#00456B]">
                                        <a
                                            href={`tel:${location.phone.replace(/\D/g, "")}`}
                                            className="hover:text-[#DD8500]"
                                        >
                                            {location.phone}
                                        </a>
                                    </p>
                                )}

                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                        location.address
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-5 inline-flex rounded-full bg-[#DD8500] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                                >
                                    View Map
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredLocations.length === 0 && (
                    <div className="mt-12 rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
                        <h3 className="text-2xl font-bold text-[#00456B]">
                            No locations found
                        </h3>
                        <p className="mt-3 text-slate-600">
                            Please contact our corporate office directly as we may still be
                            able to provide services.
                        </p>
                    </div>
                )}
            </section>

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
                            <div>
                                <h3 className="text-lg font-bold text-[#0070c9]">
                                    Corporate Address:
                                </h3>
                                <p className="mt-2 text-base leading-7">
                                    2151 Michelson Dr. Suite# 105, Irvine, CA 92612
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#0070c9]">Office Hours:</h3>
                                <p className="mt-2 text-base leading-7">
                                    Monday – Saturday 6:00am to 9:00pm
                                    <br />
                                    Sunday 9:00am to 4:00pm
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#0070c9]">Direct Phone:</h3>
                                <p className="mt-2 text-base leading-7">
                                    Office:{" "}
                                    <a
                                        href="tel:18775776782"
                                        className="font-semibold text-[#00456B] hover:text-[#DD8500]"
                                    >
                                        (877) 577-6782
                                    </a>
                                    <br />
                                    Local:{" "}
                                    <a
                                        href="tel:19492983200"
                                        className="font-semibold text-[#00456B] hover:text-[#DD8500]"
                                    >
                                        (949) 298-3200
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative mx-auto h-[280px] w-full max-w-[560px] overflow-hidden rounded-[50px] bg-white shadow-2xl md:h-[360px]">
                        <Image
                            src="/assets/cernaoffice.png"
                            alt="Cerna Homecare corporate office"
                            fill
                            sizes="(max-width: 768px) 100vw, 560px"
                            className="object-cover"
                            quality={100}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}