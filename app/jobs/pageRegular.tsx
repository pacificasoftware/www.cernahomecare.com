"use client";

import { useState } from "react";
import Image from "next/image";

const CORPORATE_LOCATION_SLUG = "orange-county";

function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) return digits;

    if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function JobsPage() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
                            Start your application
                        </h3>

                        <p className="mt-3 text-base leading-7 text-white/85">
                            Send us your contact information and our team will follow up with you.
                        </p>


                        <form
                            className="mt-6 grid gap-4"
                            onSubmit={async (e) => {
                                e.preventDefault();

                                if (isSubmitting) {
                                    return;
                                }

                                const form = e.currentTarget;
                                const formData = new FormData(form);

                                const payload = {
                                    purpose: "job_apply",
                                    locationSlug: CORPORATE_LOCATION_SLUG,
                                    firstName: String(
                                        formData.get("firstName") || ""
                                    ).trim(),
                                    lastName: String(
                                        formData.get("lastName") || ""
                                    ).trim(),
                                    phone: String(
                                        formData.get("phone") || ""
                                    ).trim(),
                                    email: String(
                                        formData.get("email") || ""
                                    ).trim(),
                                    zipCode: String(
                                        formData.get("zipCode") || ""
                                    ).trim(),
                                    subject: "Cerna Home Care Job Application!",
                                    message: "I am looking for a caregiver job opportunity with Cerna Home Care. Please contact me with more information. Thank you!",                                         
                                    company: "",
                                };

                                try {
                                    setIsSubmitting(true);
                                    setSuccessMessage("");
                                    setErrorMessage("");

                                    const response = await fetch("/api/sendemail", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(payload),
                                    });

                                    const raw = await response.text();

                                    let result: any = null;

                                    try {
                                        result = raw ? JSON.parse(raw) : null;
                                    } catch {
                                        result = {
                                            message: raw,
                                        };
                                    }

                                    if (!response.ok) {
                                        console.error(
                                            "Apply form failed:",
                                            response.status,
                                            result || raw
                                        );

                                        setErrorMessage(
                                            result?.message ||
                                            `We could not submit your information. Status: ${response.status}`
                                        );

                                        return;
                                    }

                                    form.reset();

                                    setSuccessMessage(
                                        "Thank you! Your information has been submitted."
                                    );
                                } catch (error) {
                                    console.error("Apply form failed:", error);

                                    setErrorMessage(
                                        "Something went wrong submitting your information. Please try again."
                                    );
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}
                        >
                            <input
                                name="firstName"
                                required
                                placeholder="First Name"
                                className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#DD8500]"
                            />

                            <input
                                name="lastName"
                                required
                                placeholder="Last Name"
                                className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#DD8500]"
                            />

                            <input
                                name="phone"
                                required
                                placeholder="Phone"
                                inputMode="tel"
                                maxLength={14}
                                onChange={(e) => {
                                    e.currentTarget.value = formatPhone(
                                        e.currentTarget.value
                                    );
                                }}
                                className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#DD8500]"
                            />

                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#DD8500]"
                            />

                            <input
                                name="zipCode"
                                required
                                placeholder="Zip Code"
                                inputMode="numeric"
                                maxLength={5}
                                pattern="[0-9]{5}"
                                onChange={(e) => {
                                    e.currentTarget.value =
                                        e.currentTarget.value
                                            .replace(/\D/g, "")
                                            .slice(0, 5);
                                }}
                                className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#DD8500]"
                            />

                            {errorMessage ? (
                                <div
                                    role="alert"
                                    className="rounded-xl border border-red-300/40 bg-red-950/35 px-4 py-3 text-sm font-semibold text-white"
                                >
                                    {errorMessage}
                                </div>
                            ) : null}

                            {successMessage ? (
                                <div
                                    role="status"
                                    className="rounded-xl border border-emerald-300/40 bg-emerald-950/35 px-4 py-3 text-sm font-semibold text-white"
                                >
                                    {successMessage}
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 rounded-lg bg-[#DD8500] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c87500] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </form>

                        
                    </aside>

                    {/* RIGHT PANEL */}
                    <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
                        <div className="relative h-[260px] w-full">
                            <Image
                                src="/assets/love-work-400x269.webp"
                                alt="Caregiver team"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
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