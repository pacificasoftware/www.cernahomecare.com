"use client";

import { useState } from "react";

type LocalJobApplicationFormProps = {
    locationName: string;
    locationCity: string;
    locationState: string;
    jobsZip?: string;
};

function clean(value: unknown) {
    return String(value ?? "").trim();
}

function formatPhoneNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) {
        return digits;
    }

    if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function LocalJobApplicationForm({
    locationName,
    locationCity,
    locationState,
    jobsZip = "Not provided",
}: LocalJobApplicationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const firstName = clean(formData.get("firstName"));
        const lastName = clean(formData.get("lastName"));
        const phone = clean(formData.get("phone"));
        const email = clean(formData.get("email"));
        const zipCode = clean(formData.get("zipCode")) || jobsZip;
        const experience = clean(formData.get("experience"));
        const availability = clean(formData.get("availability"));
        const messageText = clean(formData.get("message"));
        const company = clean(formData.get("company"));

        if (!firstName || !lastName || !phone || !email) {
            setIsError(true);
            setStatusMessage("Please complete all required fields.");
            return;
        }

        if (!/^\d{5}$/.test(zipCode)) {
            setIsError(true);
            setStatusMessage("Please enter a valid 5-digit ZIP code.");
            return;
        }

        const payload = {
            purpose: "job_apply",
            inquiryType: "employment",
            firstName,
            lastName,
            phone,
            email,
            zipCode,
            subject: `Caregiver Application - ${locationCity}, ${locationState}`,
            message: `
New Local Job Application

Location: ${locationName}
City: ${locationCity}, ${locationState}
Applicant ZIP Code: ${zipCode}

Experience:
${experience || "Not provided"}

Availability:
${availability || "Not provided"}

Message:
${messageText || "Job application inquiry."}
            `.trim(),
            company,
        };

        setIsSubmitting(true);
        setIsError(false);
        setStatusMessage("");

        try {
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
                result = { message: raw };
            }

            if (!response.ok) {
                setIsError(true);
                setStatusMessage(
                    result?.message ||
                    "We could not submit your application right now. Please try again later or call us directly."
                );
                return;
            }

            setIsError(false);
            setStatusMessage("Thank you. We received your application and will be in touch shortly.");
            form.reset();
        } catch (error: any) {
            setIsError(true);
            setStatusMessage(
                error?.message ||
                "We could not submit your application right now. Please try again later or call us directly."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-10 grid gap-5 text-left" noValidate>
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-bold text-[#00456B]"
                    >
                        First Name
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                    />
                </div>

                <div>
                    <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-bold text-[#00456B]"
                    >
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                    />
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-bold text-[#00456B]"
                    >
                        Phone
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        maxLength={14}
                        onChange={(e) => {
                            e.currentTarget.value = formatPhoneNumber(e.currentTarget.value);
                        }}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-bold text-[#00456B]"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="zipCode"
                    className="mb-2 block text-sm font-bold text-[#00456B]"
                >
                    ZIP Code
                </label>
                <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    defaultValue={jobsZip}
                    onChange={(e) => {
                        e.currentTarget.value = e.currentTarget.value
                            .replace(/\D/g, "")
                            .slice(0, 5);
                    }}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                />
            </div>

            <div>
                <label
                    htmlFor="experience"
                    className="mb-2 block text-sm font-bold text-[#00456B]"
                >
                    Caregiving Experience
                </label>
                <select
                    id="experience"
                    name="experience"
                    defaultValue=""
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="No experience yet">No experience yet</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3+ years">3+ years</option>
                    <option value="CNA / HCA / Professional caregiver">
                        CNA / HCA / Professional caregiver
                    </option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="availability"
                    className="mb-2 block text-sm font-bold text-[#00456B]"
                >
                    Availability
                </label>
                <select
                    id="availability"
                    name="availability"
                    defaultValue=""
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Evenings">Evenings</option>
                    <option value="Overnights">Overnights</option>
                    <option value="Live-in care">Live-in care</option>
                    <option value="Flexible">Flexible</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-[#00456B]"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us a little about your background or the type of schedule you are looking for."
                    className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                />
            </div>

            <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600] disabled:opacity-60"
            >
                {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>

            {statusMessage ? (
                <p
                    className={`text-center text-sm font-semibold ${isError ? "text-red-700" : "text-green-700"
                        }`}
                >
                    {statusMessage}
                </p>
            ) : null}
        </form>
    );
}