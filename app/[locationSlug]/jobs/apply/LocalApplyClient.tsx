"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type location = {
    locationId: number;
    slug: string;
    name: string;
    city: string;
    state: string;
    phone: string;
    phoneHref: string;
    jobsZip?: string | null;
};

type Props = {
    location: location;
};

type SendEmailResponse = {
    message?: string;
    statusMessage?: string;
};

function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) {
        return digits;
    }

    if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(
        3,
        6
    )}-${digits.slice(6)}`;
}

export default function LocalApplyClient({
    location,
}: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const locationName = [location.city, location.state]
        .filter(Boolean)
        .join(", ");

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        const form = event.currentTarget;
        const formData = new FormData(form);

        const firstName = String(
            formData.get("firstName") || ""
        ).trim();

        const lastName = String(
            formData.get("lastName") || ""
        ).trim();

        const phone = String(
            formData.get("phone") || ""
        ).trim();

        const email = String(
            formData.get("email") || ""
        ).trim();

        const zipCode = String(
            formData.get("zipCode") || ""
        ).trim();

        if (
            !firstName ||
            !lastName ||
            !phone ||
            !email ||
            !zipCode
        ) {
            setSuccessMessage("");
            setErrorMessage(
                "Please complete all required fields."
            );

            return;
        }

        if (!/^\d{5}$/.test(zipCode)) {
            setSuccessMessage("");
            setErrorMessage(
                "Please enter a valid five-digit ZIP code."
            );

            return;
        } 
       
        const payload = {
            purpose: "job_apply",

            firstName,
            lastName,
            phone,
            email,
            zipCode,

            locationId: location.locationId,
            locationName: location.name,

            locationSlug: location.slug,
            locationCity: location.city,
            locationState: location.state,
            locationZipCode: location.jobsZip ?? "",

            subject: `Cerna Home Care Job Application - ${location.name}`,

            message: [
                `New job application for ${location.name}.`,
                "",
                `Applicant: ${firstName} ${lastName}`,
                `Phone: ${phone}`,
                `Email: ${email}`,
                `Applicant ZIP Code: ${zipCode}`,
                `location: ${location.name}`,
                `location ID: ${location.locationId}`,
                `Location: ${locationName || "Not provided"}`,
                `Location Slug: ${location.slug}`,
            ].join("\n"),

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

            const responseText = await response.text();

            let result: SendEmailResponse | null = null;

            if (responseText.trim()) {
                try {
                    result = JSON.parse(responseText);
                } catch {
                    result = {
                        message: responseText,
                    };
                }
            }

            if (!response.ok) {
                throw new Error(
                    result?.statusMessage ||
                        result?.message ||
                        `Application failed with status ${response.status}.`
                );
            }

            form.reset();

            setSuccessMessage(
                `Thank you! Your information has been sent to ${location.name}.`
            );
        } catch (error) {
            console.error(
                "Localized job application failed:",
                error
            );

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Something went wrong submitting your information."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

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
                        Careers with {location.name}
                    </h1>

                    <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-700">
                        {location.name} is hiring compassionate
                        caregivers who want to make a meaningful
                        difference for seniors and families
                        {locationName
                            ? ` in ${locationName}`
                            : ""}.
                    </p>
                </div>
            </section>

            {/* MAIN PANELS */}
            <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* APPLICATION FORM */}
                    <aside className="rounded-3xl bg-[#00456B] p-8 text-white shadow-xl">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                            Apply Today
                        </p>

                        <h2 className="mt-4 text-3xl font-extrabold">
                            Start your application
                        </h2>

                        <p className="mt-3 text-base leading-7 text-white/85">
                            Send us your contact information and
                            our local team will follow up with you
                            about caregiver opportunities.
                        </p>

                        <form
                            className="mt-6 grid gap-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="hidden"
                                name="locationId"
                                value={location.locationId}
                            />

                            <input
                                type="hidden"
                                name="locationName"
                                value={location.name}
                            />

                            <input
                                type="hidden"
                                name="locationSlug"
                                value={location.slug}
                            />

                            <label className="grid gap-1.5">
                                <span className="text-sm font-bold">
                                    First Name
                                </span>

                                <input
                                    name="firstName"
                                    required
                                    autoComplete="given-name"
                                    placeholder="First Name"
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#DD8500]"
                                />
                            </label>

                            <label className="grid gap-1.5">
                                <span className="text-sm font-bold">
                                    Last Name
                                </span>

                                <input
                                    name="lastName"
                                    required
                                    autoComplete="family-name"
                                    placeholder="Last Name"
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#DD8500]"
                                />
                            </label>

                            <label className="grid gap-1.5">
                                <span className="text-sm font-bold">
                                    Phone
                                </span>

                                <input
                                    name="phone"
                                    required
                                    autoComplete="tel"
                                    placeholder="(714) 555-1212"
                                    inputMode="tel"
                                    maxLength={14}
                                    onChange={(event) => {
                                        event.currentTarget.value =
                                            formatPhone(
                                                event.currentTarget.value
                                            );
                                    }}
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#DD8500]"
                                />
                            </label>

                            <label className="grid gap-1.5">
                                <span className="text-sm font-bold">
                                    Email
                                </span>

                                <input
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Email Address"
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#DD8500]"
                                />
                            </label>

                            <label className="grid gap-1.5">
                                <span className="text-sm font-bold">
                                    ZIP Code
                                </span>

                                <input
                                    name="zipCode"
                                    required
                                    autoComplete="postal-code"
                                    placeholder="ZIP Code"
                                    inputMode="numeric"
                                    maxLength={5}
                                    pattern="[0-9]{5}"
                                    onChange={(event) => {
                                        event.currentTarget.value =
                                            event.currentTarget.value
                                                .replace(/\D/g, "")
                                                .slice(0, 5);
                                    }}
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#DD8500]"
                                />
                            </label>

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
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit"}
                            </button>
                        </form>
                    </aside>

                    {/* RIGHT PANEL */}
                    <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
                        <div className="relative h-[260px] w-full">
                            <Image
                                src="/assets/love-work-400x269.webp"
                                alt={`Caregiver team at ${location.name}`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div className="p-8">
                            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                                Join Our Local Team
                            </p>

                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#00456B]">
                                Join a care team that values
                                compassion
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-700">
                                {location.name} is always looking
                                for caring, dependable people who
                                want to provide excellent support to
                                clients and families
                                {location.city
                                    ? ` throughout ${location.city} and nearby communities`
                                    : ""}.
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
                                            Flexible schedules,
                                            rewarding work, supportive
                                            leadership, and
                                            opportunities to grow your
                                            caregiving career with{" "}
                                            {location.name}.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {location.phone ? (
                                <a
                                    href={location.phoneHref}
                                    className="mt-8 inline-flex rounded-lg bg-[#00456B] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#003a5a]"
                                >
                                    Call {location.phone}
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}