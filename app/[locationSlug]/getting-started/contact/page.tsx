"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { locations } from "@/lib/locations";
import "../../../getting-started/getting-started.css";

type Props = {
    params: Promise<{
        locationSlug: string;
    }>;
};

type Step1State = {
    fullName: string;
    zipCode: string;
    careFor: string;
};

type Step2State = {
    condition: string;
    careNeeds: string;
};

type ContactFormState = {
    email: string;
    phone: string;
    preferredContact: string;
    consent: boolean;
};

const initialStep1: Step1State = {
    fullName: "",
    zipCode: "",
    careFor: "",
};

const initialStep2: Step2State = {
    condition: "",
    careNeeds: "",
};

const initialContactForm: ContactFormState = {
    email: "",
    phone: "",
    preferredContact: "",
    consent: false,
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

export default function LocalGettingStartedContactPage({ params }: Props) {
    const router = useRouter();
    const { locationSlug } = use(params);

    const location = locations[locationSlug as keyof typeof locations];

    const [step1, setStep1] = useState<Step1State>(initialStep1);
    const [step2, setStep2] = useState<Step2State>(initialStep2);
    const [form, setForm] = useState<ContactFormState>(initialContactForm);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [pageError, setPageError] = useState<string | null>(null);

    useEffect(() => {
        const savedStep1 = sessionStorage.getItem(
            `gettingStarted:${locationSlug}:step1`
        );

        const savedStep2 = sessionStorage.getItem(
            `gettingStarted:${locationSlug}:step2`
        );

        if (savedStep1) {
            try {
                setStep1(JSON.parse(savedStep1));
            } catch {
                sessionStorage.removeItem(
                    `gettingStarted:${locationSlug}:step1`
                );
            }
        }

        if (savedStep2) {
            try {
                setStep2(JSON.parse(savedStep2));
            } catch {
                sessionStorage.removeItem(
                    `gettingStarted:${locationSlug}:step2`
                );
            }
        }
    }, [locationSlug]);

    if (!location) {
        return null;
    }

    const primaryPhoneHref =
        location.phones?.[0]?.href ?? location.phoneHref;

    const primaryPhoneNumber =
        location.phones?.[0]?.number ?? location.phone;

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value, type, checked } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    function validateForm() {
        if (!form.email.trim()) {
            return "Email is required.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            return "Please enter a valid email address.";
        }

        if (!form.phone.trim()) {
            return "Phone number is required.";
        }

        const phoneDigits = form.phone.replace(/\D/g, "");

        if (phoneDigits.length !== 10) {
            return "Please enter a valid 10-digit phone number.";
        }

        if (!form.consent) {
            return "Please confirm that Cerna Home Care may contact you.";
        }

        return null;
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        setPageError(null);

        const validationError = validateForm();

        if (validationError) {
            setPageError(validationError);
            return;
        }

        const fullName = clean(step1.fullName);
        const nameParts = fullName.split(" ").filter(Boolean);

        const firstName = nameParts[0] || fullName || "Website";
        const lastName =
            nameParts.slice(1).join(" ") || "Visitor";

        const payload = {
            purpose: "contact",
            inquiryType: "Getting Started Consultation",

            name: fullName,
            firstName,
            lastName,

            email: clean(form.email),
            phone: clean(form.phone),
            zipCode: clean(step1.zipCode) || "Not provided",

            subject: `Getting Started Consultation - ${location.name}`,

            message: [
                `Location: ${location.name}`,
                `Location Slug: ${locationSlug}`,
                `Full Name: ${fullName || "Not provided"}`,
                `ZIP Code: ${clean(step1.zipCode) || "Not provided"}`,
                `Care For: ${clean(step1.careFor) || "Not provided"}`,
                `Condition: ${clean(step2.condition) || "Not provided"}`,
                `Care Goals / Needs: ${clean(step2.careNeeds) || "Not provided"
                }`,
                `Preferred Contact Method: ${clean(form.preferredContact) || "Not specified"
                }`,
            ].join("\n"),

            company: "",
            franchiseeId: null,
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

            let result: any = null;

            try {
                result = raw ? JSON.parse(raw) : null;
            } catch {
                result = null;
            }

            if (!response.ok) {
                const errorMessage =
                    result &&
                        typeof result === "object" &&
                        typeof result.message === "string"
                        ? result.message
                        : "We could not send your request. Please try again or call us directly.";

                setPageError(errorMessage);
                return;
            }

            sessionStorage.removeItem(
                `gettingStarted:${locationSlug}:step1`
            );

            sessionStorage.removeItem(
                `gettingStarted:${locationSlug}:step2`
            );

            setIsComplete(true);
        } catch {
            setPageError(
                "Sorry, we could not send your request right now. Please try again or call us directly."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isComplete) {
        return (
            <section className="getting-started-section">
                <div className="getting-started-bg">
                    <div className="getting-started-blob-left" />
                    <div className="getting-started-blob-right" />
                </div>

                <div className="getting-started-container">
                    <div className="getting-started-card">
                        <p className="getting-started-step">
                            Request Received
                        </p>

                        <h1 className="getting-started-card-title">
                            Thank you for contacting Cerna Home Care
                        </h1>

                        <div className="getting-started-progress">
                            <div
                                className="getting-started-progress-bar"
                                style={{ width: "100%" }}
                            />
                        </div>

                        <p className="getting-started-subcopy">
                            Your request was sent to our {location.name} team.
                            Someone will contact you shortly.
                        </p>

                        <p className="getting-started-subcopy">
                            For immediate assistance, call{" "}
                            <a
                                href={primaryPhoneHref}
                                className="getting-started-phone"
                            >
                                {primaryPhoneNumber}
                            </a>
                        </p>

                        <div className="getting-started-button-wrap">
                            <button
                                type="button"
                                className="getting-started-button"
                                onClick={() =>
                                    router.push(`/${locationSlug}`)
                                }
                            >
                                Return to {location.name}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="getting-started-section">
            <div className="getting-started-bg">
                <div className="getting-started-blob-left" />
                <div className="getting-started-blob-right" />
            </div>

            <div className="getting-started-container">
                <div className="getting-started-grid">
                    <div className="getting-started-left">
                        <p className="getting-started-eyebrow">
                            Getting Started
                        </p>

                        <h1 className="getting-started-title">
                            How can we contact you?
                        </h1>

                        <p className="getting-started-subtitle">
                            Complete the final step and our {location.name} team
                            will contact you to discuss your care needs.
                        </p>

                        <div className="getting-started-callout">
                            <p className="getting-started-callout-text">
                                Need help now? Contact our {location.name} team:
                            </p>

                            <a
                                href={primaryPhoneHref}
                                className="getting-started-phone"
                            >
                                {primaryPhoneNumber}
                            </a>
                        </div>
                    </div>

                    <div className="getting-started-card">
                        <div className="getting-started-card-header">
                            <div>
                                <p className="getting-started-step">
                                    Step 3 of 3 - Contact
                                </p>

                                <h2 className="getting-started-card-title">
                                    Tell us how to reach you
                                </h2>
                            </div>

                            <div className="getting-started-progress-pill">
                                66%
                            </div>
                        </div>

                        <p className="getting-started-required">
                            <span>*</span> indicates required fields
                        </p>

                        <div className="getting-started-progress">
                            <div
                                className="getting-started-progress-bar"
                                style={{ width: "66%" }}
                            />
                        </div>

                        <form
                            className="getting-started-form"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="getting-started-field">
                                <label
                                    className="getting-started-label"
                                    htmlFor="email"
                                >
                                    Email Address <span>*</span>
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className="getting-started-input"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="getting-started-field">
                                <label
                                    className="getting-started-label"
                                    htmlFor="phone"
                                >
                                    Phone Number <span>*</span>
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone Number"
                                    maxLength={14}
                                    className="getting-started-input"
                                    value={form.phone}
                                    onChange={(e) => {
                                        e.target.value = formatPhoneNumber(
                                            e.target.value
                                        );

                                        handleChange(e);
                                    }}
                                />
                            </div>

                            <div className="getting-started-field">
                                <div className="getting-started-legend">
                                    What is your preferred contact method?
                                </div>

                                <div className="getting-started-radio-group">
                                    {["Phone", "Email", "Either"].map(
                                        (option) => (
                                            <label
                                                key={option}
                                                className="getting-started-radio-card"
                                            >
                                                <input
                                                    type="radio"
                                                    name="preferredContact"
                                                    value={option}
                                                    checked={
                                                        form.preferredContact ===
                                                        option
                                                    }
                                                    onChange={handleChange}
                                                />

                                                <span>{option}</span>
                                            </label>
                                        )
                                    )}
                                </div>

                                <p className="getting-started-optional">
                                    (this field is optional)
                                </p>
                            </div>

                            <div className="getting-started-field">
                                <label className="getting-started-consent">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        checked={form.consent}
                                        onChange={handleChange}
                                    />

                                    <span>
                                        I agree that Cerna Home Care may contact
                                        me by phone or email regarding this
                                        consultation request. <strong>*</strong>
                                    </span>
                                </label>
                            </div>

                            {pageError ? (
                                <p
                                    style={{
                                        color: "#dc2626",
                                        marginTop: "12px",
                                    }}
                                >
                                    {pageError}
                                </p>
                            ) : null}

                            <div className="getting-started-actions">
                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    className="getting-started-button getting-started-button-secondary"
                                    onClick={() =>
                                        router.push(
                                            `/${locationSlug}/getting-started/needs`
                                        )
                                    }
                                >
                                    Previous
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="getting-started-button"
                                >
                                    {isSubmitting
                                        ? "Submitting..."
                                        : "Submit Request"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}