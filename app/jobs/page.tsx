"use client";

import { useState } from "react";
import Image from "next/image";

const APPLY_URL =
    "https://cerna.clearcareonline.com/apply/?eid=8l7%2BoECKgmhFZnOI7D%2BdBsxIsPickzn0qSECv7JcoJYiafllaB6G%2BPYHwVNwlVkwnwus1zIOfDNbAWij1Txz2XimNt1yFy7MVUGgHLMwg1UTvi87";

const states = ["Texas", "California", "Nevada", "Florida"];

export default function JobsPage() {
    const [selectedState, setSelectedState] = useState("California");

    return (
        <main className="bg-white">
            {/* HERO */}
            <section className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 py-8 text-center sm:px-8 lg:px-10">
                    <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#DD8500]">
                        Careers at Cerna
                    </p>

                    <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-[#DD8500]" />

                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#00456B] sm:text-4xl">
                        Current Employment Openings
                    </h1>

                    <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-700">
                        Cerna Home Care is hiring compassionate caregivers who want to make
                        a meaningful difference for seniors and families.
                    </p>
                </div>
            </section>

            {/* MAIN PANELS */}
            <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* LEFT PANEL */}
                    <aside className="rounded-3xl bg-[#00456B] p-8 text-white shadow-xl">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                            Apply Today
                        </p>

                        <h3 className="mt-4 text-3xl font-extrabold">
                            Where are you looking to work?
                        </h3>

                        <div className="mt-6 grid gap-4">
                            {states.map((state) => {
                                const isSelected = selectedState === state;

                                return (
                                    <button
                                        key={state}
                                        type="button"
                                        onClick={() => setSelectedState(state)}
                                        className={`rounded-2xl p-5 text-left font-bold ring-1 transition ${isSelected
                                                ? "bg-[#DD8500] text-white ring-[#DD8500]"
                                                : "bg-white/10 text-white ring-white/15 hover:bg-white/20"
                                            }`}
                                    >
                                        {state}
                                    </button>
                                );
                            })}
                        </div>

                        <p className="mt-5 text-sm font-semibold text-white/80">
                            Selected state:{" "}
                            <span className="text-white">{selectedState}</span>
                        </p>

                        <p className="mt-6 text-base leading-7 text-white/90">
                            For more information or help applying, please call us at{" "}
                            <a
                                href="tel:18775776782"
                                className="font-extrabold text-white underline underline-offset-4"
                            >
                                1 (877) 577-6782
                            </a>
                            .
                        </p>

                        <div className="mt-8">
                            <a
                                href={APPLY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full justify-center rounded-lg bg-[#DD8500] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c87500]"
                            >
                                Apply Now for {selectedState}
                            </a>
                        </div>
                    </aside>

                    {/* RIGHT PANEL */}
                    <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
                        <div className="relative h-[260px] w-full">
                            <Image
                                src="/assets/love-work-400x269.webp"
                                alt="Caregiver team"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="p-8">
                            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                                Join Our Team
                            </p>

                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#00456B]">
                                Join a care team that values compassion
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-700">
                                We are always looking for caring, dependable people who want
                                to provide excellent support to clients and families.
                            </p>
                                   

                                    <div className="mt-8 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DD8500]/15 text-[#DD8500]">
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="h-7 w-7"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M7 3v3M17 3v3M4.5 9.5h15M6.5 21h11A2.5 2.5 0 0 0 20 18.5v-11A2.5 2.5 0 0 0 17.5 5h-11A2.5 2.5 0 0 0 4 7.5v11A2.5 2.5 0 0 0 6.5 21Z"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M8 14l2.2 2.2L16 10.8"
                                                        stroke="currentColor"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-extrabold text-[#00456B]">
                                                    Flexible Schedules
                                                </h3>

                                                <p className="mt-2 text-base leading-7 text-slate-700">
                                                    Flexible schedules, rewarding work, supportive leadership,
                                                    and opportunities to grow your caregiving career with
                                                    Cerna Home Care.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                               
                         
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}