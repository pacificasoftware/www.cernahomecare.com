"use client";

import { useState } from "react";

export default function HomeConsultationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const fullName = String(formData.get("name") || "").trim();
        const nameParts = fullName.split(" ");

        const payload = {
            name: fullName,
            firstName: nameParts[0] || fullName,
            lastName: nameParts.slice(1).join(" ") || "",
            email: String(formData.get("email") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            subject: "Home Page Consultation Request",
            message: String(formData.get("message") || "").trim(),
            purpose: String(formData.get("purpose") || "services").trim().toLowerCase(),
        };

        if (!payload.name || !payload.email || !payload.phone || !payload.message || !payload.purpose) {
            setIsError(true);
            setStatusMessage("Please complete all required fields.");
            return;
        }

        setIsSubmitting(true);
        setIsError(false);
        setStatusMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const raw = await response.text();
            const result = raw ? JSON.parse(raw) : null;

            if (!response.ok) {
                throw new Error(result?.message || "Request failed.");
            }

            setStatusMessage("Thank you. We received your request and will be in touch shortly.");
            form.reset();
        } catch (error: any) {
            setIsError(true);
            setStatusMessage(error?.message || "Sorry, we could not send your message right now.");
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
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-sky-300"
                />
            </div>

            <div className="mb-5">
                <select
                    name="purpose"
                    defaultValue="services"
                    required
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                >
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
                <p className={`mt-4 text-center text-sm font-semibold ${isError ? "text-red-300" : "text-green-300"}`}>
                    {statusMessage}
                </p>
            ) : null}
        </form>
    );
}