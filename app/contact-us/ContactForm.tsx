"use client";

import { useState } from "react";

function clean(value: unknown) {
    return String(value ?? "").trim();
}

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const selectedPurpose = clean(formData.get("purpose"));

        const payload = {
            purpose: "contact",
            inquiryType: selectedPurpose,
            firstName: clean(formData.get("firstName")),
            lastName: clean(formData.get("lastName")),
            email: clean(formData.get("email")),
            phone: clean(formData.get("phone")),
            zipCode: "Not provided",
            subject: clean(formData.get("subject")) || "Cerna Home Care Contact Form",
            message: clean(formData.get("message")) || "Contact form inquiry",
            company: clean(formData.get("company")),
            franchiseeId: null,
        };

        console.log("Sending contact form payload:", payload);

        if (
            !payload.firstName ||
            !payload.lastName ||
            !payload.email ||
            !payload.phone ||
            !payload.message ||
            !selectedPurpose
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

                const cleanMessage =
                    result && typeof result === "object" && "message" in result
                        ? result.message
                        : "We could not send your message right now. Please try again later or call us directly.";

                setStatusMessage(cleanMessage);
                return;
            }

            setIsError(false);
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
                <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                />
                <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                />
                <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                />
            </div>

            <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
            />

            <input
                name="subject"
                type="text"
                placeholder="Subject"
                className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
            />

            <select
                name="purpose"
                required
                defaultValue=""
                className="w-full border border-slate-300 px-4 py-3 text-lg text-slate-700 outline-none focus:border-[#00456B]"
            >
                <option value="" disabled>
                    Please Select
                </option>
                <option value="services">
                    I am looking for information on your services
                </option>
                <option value="jobs">
                    I am looking for a job
                </option>
            </select>

            <textarea
                name="message"
                placeholder="How can we help?"
                rows={6}
                className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
            />

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
                <p
                    className={`text-center text-lg ${isError ? "text-red-700" : "text-green-700"
                        }`}
                >
                    {statusMessage}
                </p>
            ) : null}
        </form>
    );
}