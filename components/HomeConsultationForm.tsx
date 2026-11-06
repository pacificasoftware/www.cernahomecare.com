
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { trackConsultationConversion } from "@/lib/google-ads";

type HomeConsultationFormProps = {
    locationSlug?: string | null;
    locationId?: number | null;
};

type SendEmailResponse = {
    success?: boolean;
    message?: string;
};

function clean(value: unknown): string {
    return String(value ?? "").trim();
}

export default function HomeConsultationForm({
    locationSlug = null,
    locationId = null,
}: HomeConsultationFormProps) {
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        const form = e.currentTarget;
        const formData = new FormData(form);

        const fullName = clean(formData.get("name"));
        const phone = clean(formData.get("phone"));
        const email = clean(formData.get("email"));
        const selectedPurpose = clean(formData.get("purpose"));
        const submittedMessage = clean(formData.get("message"));

        const nameParts = fullName.split(/\s+/).filter(Boolean);

        // Clear previous status
        setIsError(false);
        setStatusMessage("");

        // Validate required fields
        if (
            !fullName ||
            !phone ||
            !email ||
            !selectedPurpose ||
            !submittedMessage
        ) {
            setIsError(true);
            setStatusMessage("Please complete all required fields.");
            return;
        }

        // Validate phone number
        const phoneDigits = phone.replace(/\D/g, "");

        if (phoneDigits.length !== 10) {
            setIsError(true);
            setStatusMessage("Please enter a valid 10-digit phone number.");
            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setIsError(true);
            setStatusMessage("Please enter a valid email address.");
            return;
        }

        const firstName = nameParts[0] || fullName;
        const lastName = nameParts.slice(1).join(" ") || "N/A";

        const payload = {
            purpose: selectedPurpose,
            inquiryType: selectedPurpose,

            name: fullName,
            firstName,
            lastName,

            email,
            phone,

            // Contact inquiries do not require a ZIP
            zipCode: "",

            subject: "Home Page Consultation Request",

            message: [
                `Inquiry Type: ${selectedPurpose}`,
                "",
                submittedMessage,
            ].join("\n"),

            company: "",

            locationId,
            locationSlug,
        };

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/sendemail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const raw = await response.text();

            let result: SendEmailResponse | null = null;

            try {
                result = raw
                    ? (JSON.parse(raw) as SendEmailResponse)
                    : null;
            } catch {
                result = null;
            }

            // HTTP failures or explicit API failures
            // HTTP failures or explicit API failures
            if (!response.ok || result?.success === false) {

                console.log("Home consultation API failure:", {
                    status: response.status,
                    ok: response.ok,
                    responseBody: raw,
                    parsedResponse: result,
                });

                setIsError(true);

                const errorMessage =
                    result?.message ||
                    `Unable to send your request (HTTP ${response.status}). Please try again.`;

                setStatusMessage(errorMessage);

                return;
            }

            // Successful submission
            setIsError(false);

            setStatusMessage(
                "Thank you. We received your request and will be in touch shortly."
            );

            form.reset();

            // GOOGLE ADS CONVERSION
            // Fire only after successful API submission.
            // Never fire on page load, button click, or failure.
            try {
                trackConsultationConversion();
            } catch (trackingError) {
                // Tracking must never turn a successful
                // consultation into a form submission error.
                console.warn(
                    "Google Ads conversion tracking failed:",
                    trackingError
                );
            }

        } catch (error) {
            console.error(
                "Home consultation request failed:",
                error
            );

            setIsError(true);

            setStatusMessage(
                "Sorry, we could not send your message right now."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="pb-6"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="mb-5">
                <input
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                />
            </div>

            <div className="mb-5">
                <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone"
                    maxLength={14}
                    onChange={(e) => {
                        e.target.value = formatPhoneNumber(
                            e.target.value
                        );
                    }}
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                />
            </div>

            <div className="mb-5">
                <select
                    name="purpose"
                    required
                    defaultValue=""
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                >
                    <option value="" disabled>
                        Please Select...
                    </option>

                    <option
                        value="services"
                        className="text-slate-900"
                    >
                        I am looking for information on your services
                    </option>

                    <option
                        value="jobs"
                        className="text-slate-900"
                    >
                        I am looking for a job
                    </option>
                </select>
            </div>

            <div className="mb-5">
                <input
                    name="email"
                    required
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                />
            </div>

            <div className="mb-5">
                <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Your message"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-60"
            >
                {isSubmitting ? "Sending..." : "Submit Request"}
            </button>

            {statusMessage ? (
                <p
                    role={isError ? "alert" : "status"}
                    aria-live="polite"
                    className={`mt-4 text-center text-sm font-semibold ${isError
                            ? "text-red-300"
                            : "text-green-300"
                        }`}
                >
                    {statusMessage}
                </p>
            ) : null}
        </form>
    );
}
