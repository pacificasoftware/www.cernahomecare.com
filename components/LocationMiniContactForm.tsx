"use client";

import { useState } from "react";

type Props = {
    locationName?: string;
    locationState?: string;
    serviceTitle?: string;
    locationSlug: string;
    franchiseeId?: number | null;
};

function clean(value: unknown) {
    return String(value ?? "").trim();
}

export default function LocationMiniContactForm({
    locationName = "Cerna Home Care",
    locationState = "",
    serviceTitle = "Home Care",
    locationSlug,
    franchiseeId = null,
}: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const formatPhoneNumber = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 10);

        if (digits.length <= 3) {
            return digits;
        }

        if (digits.length <= 6) {
            return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        }

        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const fullName = clean(formData.get("fullName"));
        const [firstName = "", ...lastParts] = fullName.split(" ").filter(Boolean);
        const lastName = lastParts.join(" ") || "N/A";
        const interest = clean(formData.get("interest"));

       const payload = {
                purpose: "contact",
                inquiryType: interest,

                name: fullName,
                firstName,
                lastName,

                email: clean(formData.get("email")),
                phone: clean(formData.get("phone")),

                zipCode: "Not provided",

                subject: `${serviceTitle} Consultation Request - ${locationName}`,

                message: [
                    "Location page mini form submission.",
                    "",
                    `Interest: ${interest}`,
                    `Service: ${serviceTitle}`,
                    `Location: ${locationName}${locationState ? `, ${locationState}` : ""}`,
                ].join("\n"),

                company: clean(formData.get("company")),

                franchiseeId: franchiseeId ?? null,
                locationSlug,
            };

            if (!payload.name || !payload.email || !payload.phone) {
                setIsError(true);
                setStatusMessage("Please complete all required fields.");
                return;
            }

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
        <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-xl rounded-2xl border-2 border-[#DD8500]/40 bg-white p-5 shadow-lg"
        >
            <div className="grid gap-3">
                <select
                    name="interest"
                    defaultValue="Care for Family"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#00456B]"
                >
                    <option>Care for Self</option>
                    <option>Care for Family</option>
                    <option>Care for Other</option>
                    <option>Companionship</option>
                    <option>Employment</option>
                </select>

                <input
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#00456B]"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#00456B]"
                />

                <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    maxLength={14}
                    onChange={(e) => {
                        e.target.value = formatPhoneNumber(e.target.value);
                    }}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#00456B]"
                />

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
                    className="rounded-xl bg-[#DD8500] px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:opacity-90 disabled:opacity-60"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>

            {statusMessage ? (
                <p
                    className={`mt-4 text-center text-sm font-semibold ${isError ? "text-red-700" : "text-green-700"
                        }`}
                >
                    {statusMessage}
                </p>
            ) : null}
        </form>
    );
}