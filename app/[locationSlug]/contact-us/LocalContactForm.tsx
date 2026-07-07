"use client";

import { useState } from "react";

type LocalContactFormProps = {
    locationName: string;
    locationAreaName: string;
    locationState: string;
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

export default function LocalContactForm({
    locationName,
    locationAreaName,
    locationState,
}: LocalContactFormProps) {
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
        const careType = clean(formData.get("careType"));
        const messageText = clean(formData.get("message"));
        const company = clean(formData.get("company"));

        if (!firstName || !lastName || !phone || !email) {
            setIsError(true);
            setStatusMessage("Please complete all required fields.");
            return;
        }

        const payload = {
            purpose: "services",
            inquiryType: careType || "General Contact",
            firstName,
            lastName,
            phone,
            email,
            zipCode: "Not provided",
            subject: `Care Inquiry - ${locationAreaName}`,
            message: `
New Local Contact Inquiry

Location: ${locationName}
Area: ${locationAreaName}, ${locationState}
Care Type: ${careType || "Not selected"}

Message:
${messageText || "Contact form inquiry"}
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
                    "We could not send your message right now. Please try again later or call us directly."
                );
                return;
            }

            setIsError(false);
            setStatusMessage("Thank you. A member of our team will be in touch shortly.");
            form.reset();
        } catch (error: any) {
            setIsError(true);
            setStatusMessage(
                error?.message ||
                "We could not send your message right now. Please try again later or call us directly."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 grid gap-5" noValidate>
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
                    htmlFor="careType"
                    className="mb-2 block text-sm font-bold text-[#00456B]"
                >
                    Type of Care Needed
                </label>
                <select
                    id="careType"
                    name="careType"
                    defaultValue=""
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    <option value="Hourly & Personal Care">Hourly & Personal Care</option>
                    <option value="Live-In Care">Live-In Care</option>
                    <option value="Memory & Dementia Care">Memory & Dementia Care</option>
                    <option value="Post Hospital Care">Post Hospital Care</option>
                    <option value="Companion Care">Companion Care</option>
                    <option value="Respite Care">Respite Care</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-[#00456B]"
                >
                    How Can We Help?
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={5}
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
                {isSubmitting ? "Submitting..." : "Submit Request"}
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