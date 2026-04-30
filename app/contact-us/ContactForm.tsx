"use client";

import { useState } from "react";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload = {
            name: `${String(formData.get("firstName") || "").trim()} ${String(formData.get("lastName") || "").trim()}`.trim(),
            firstName: String(formData.get("firstName") || "").trim(),
            lastName: String(formData.get("lastName") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            subject: String(formData.get("subject") || "").trim(),
            message: String(formData.get("message") || "").trim(),
            purpose: "General",
        };

        if (
            !payload.firstName ||
            !payload.lastName ||
            !payload.email ||
            !payload.phone ||
            !payload.message || 
            !payload.purpose
        ) {
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
                throw new Error(result?.message || raw || "Request failed.");
            }

            setStatusMessage(
                "Thank you for contacting Cerna Home Care. We have received your message and a member of our team will be in touch shortly."
            );

            form.reset();
        } catch (error: any) {
            setIsError(true);
            setStatusMessage(
                error?.message || "Sorry, we could not send your message right now."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="grid gap-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 md:grid-cols-2">
                <input name="firstName" type="text" placeholder="First Name" className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]" />
                <input name="lastName" type="text" placeholder="Last Name" className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <input name="email" type="email" placeholder="Email Address" className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]" />
                <input name="phone" type="tel" placeholder="Phone Number" className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]" />
            </div>

            <input name="subject" type="text" placeholder="Subject" className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]" />

            <textarea name="message" placeholder="How can we help?" rows={6} className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]" />

            <div className="pt-2 text-center">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "#DD8500" }}
                >
                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
            </div>

            {statusMessage ? (
                <p className={`text-center text-lg ${isError ? "text-red-700" : "text-green-700"}`}>
                    {statusMessage}
                </p>
            ) : null}
        </form>
    );
}