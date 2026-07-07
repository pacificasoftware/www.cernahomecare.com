"use client";

import { useState } from "react";

function clean(value: unknown) {
    return String(value ?? "").trim();
}

export default function HomeConsultationForm() {
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

        const fullName = clean(formData.get("name"));
        const nameParts = fullName.split(" ").filter(Boolean);

        const selectedPurpose = clean(formData.get("purpose"));

        const payload = {
            purpose: "contact",
            inquiryType: selectedPurpose,
            name: fullName,
            firstName: nameParts[0] || fullName,
            lastName: nameParts.slice(1).join(" ") || "N/A",
            email: clean(formData.get("email")),
            phone: clean(formData.get("phone")),
            zipCode: "Not provided",
            subject: "Home Page Consultation Request",
            message:
                [
                    `Inquiry Type: ${selectedPurpose}`,
                    "",
                    clean(formData.get("message")) || "Home page consultation request.",
                ]
                    .filter(Boolean)
                    .join("\n"),
            company: "",
        };

        if (
            !payload.firstName ||
            !payload.lastName ||
            !payload.email ||
            !payload.phone ||
            !selectedPurpose ||
            !payload.message
        ) {
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const raw = await response.text();

            let result: any = null;

            try {
                result = raw ? JSON.parse(raw) : null;
            } catch {
                result = null;
            }

            if (!response.ok) {
                setIsError(true);

                const cleanMessage =
                    result && typeof result === "object" && "message" in result
                        ? result.message
                        : "We could not send your message right now. Please try again later or call us directly.";

                setStatusMessage(cleanMessage);
                return;
            }

            setIsError(false);
            setStatusMessage("Thank you. We received your request and will be in touch shortly.");
            form.reset();
        } catch {
            setIsError(true);
            setStatusMessage("Sorry, we could not send your message right now.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="pb-6" onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                />
            </div>

            <div className="mb-5">
                <input
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    maxLength={14}
                    onChange={(e) => {
                        e.target.value = formatPhoneNumber(e.target.value);
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
                    <option value="services" className="text-slate-900">
                        I am looking for information on your services
                    </option>
                    <option value="jobs" className="text-slate-900">
                        I am looking for a job
                    </option>
                </select>
            </div>

            <div className="mb-5">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                />
            </div>

            <div className="mb-5">
                <textarea
                    name="message"
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
                    className={`mt-4 text-center text-sm font-semibold ${isError ? "text-red-300" : "text-green-300"
                        }`}
                >
                    {statusMessage}
                </p>
            ) : null}
        </form>
    );
}