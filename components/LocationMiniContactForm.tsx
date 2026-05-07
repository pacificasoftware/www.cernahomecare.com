"use client";

import { useState } from "react";

export default function LocationMiniContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const fullName = String(formData.get("fullName") || "").trim();
        const [firstName = "", ...lastParts] = fullName.split(" ");
        const lastName = lastParts.join(" ") || "N/A";

        const payload = {
            name: fullName,
            firstName,
            lastName,
            email: String(formData.get("email") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            subject: "Location Page Inquiry",
            message: `Location page mini form submission. Interest: ${String(
                formData.get("interest") || ""
            ).trim()}`,
            company: String(formData.get("company") || "").trim(),
            purpose:
                String(formData.get("interest") || "").trim() === "Employment"
                    ? "jobs"
                    : "services",
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
            const response = await fetch("/api/contact", {
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
                <p className={`mt-4 text-center text-sm font-semibold ${isError ? "text-red-700" : "text-green-700"}`}>
                    {statusMessage}
                </p>
            ) : null}
        </form>
    );
}