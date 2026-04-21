"use client";

import React, { useState } from "react";
import "../getting-started.css";

type FormState = {
    email: string;
    phone: string;
    consent: boolean;
};

const initialForm: FormState = {
    email: "",
    phone: "",
    consent: false,
};

export default function GettingStartedContactPage() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [pageMsg, setPageMsg] = useState<string | null>(null);
    const [pageError, setPageError] = useState<string | null>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setForm((prev) => ({ ...prev, [name]: checked }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function validateForm() {
        if (!form.email.trim()) return "Email is required.";
        if (!form.phone.trim()) return "Phone is required.";
        if (!form.consent) return "You must agree before submitting.";
        return null;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPageMsg(null);
        setPageError(null);

        const validationError = validateForm();
        if (validationError) {
            setPageError(validationError);
            return;
        }

        setSubmitting(true);

        try {
            const payload = {
                city: "",
                capitalRequirement: "0",
                name: "Getting Started - Step 3",
                email: form.email,
                phone: form.phone,
                message: `Getting Started submission - Step 3

Email: ${form.email}
Phone: ${form.phone}
Consent Accepted: ${form.consent ? "Yes" : "No"}`,
            };

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                throw new Error(
                    data?.message || "Failed to send your request. Please try again."
                );
            }

            setPageMsg("Thank you. Your request has been submitted successfully.");
            setForm(initialForm);
        } catch (error: any) {
            setPageError(
                error?.message || "Server error while sending your request."
            );
        } finally {
            setSubmitting(false);
        }
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
                        <p className="getting-started-eyebrow">Getting Started</p>

                        <h1 className="getting-started-title">
                            What are your primary care goals?
                        </h1>

                        <p className="getting-started-subtitle">
                            Cerna Home Care is here to help you or a loved one today.
                        </p>

                        <div className="getting-started-callout">
                            <p className="getting-started-callout-text">
                                Contact us now for your complimentary in-home consultation:
                            </p>

                            <a href="tel:18775776782" className="getting-started-phone">
                                1 (877) 577-6782
                            </a>
                        </div>
                    </div>

                    <div className="getting-started-card">
                        <div className="getting-started-card-header">
                            <div>
                                <p className="getting-started-step">Step 3 of 3 - Condition</p>
                                <h2 className="getting-started-card-title">
                                    Please provide your contact information
                                </h2>
                            </div>

                            <div className="getting-started-progress-pill">66%</div>
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

                        <p className="getting-started-subcopy">
                            Please provide your contact information and hit submit.
                            We'll call you within 24 hours to set up your free phone
                            consultation and email a summary of your care needs.
                        </p>

                        <form className="getting-started-form" onSubmit={handleSubmit} noValidate>
                            <div className="getting-started-field">
                                <label className="getting-started-label" htmlFor="email">
                                    Email <span>*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="getting-started-input"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="getting-started-field">
                                <label className="getting-started-label" htmlFor="phone">
                                    Phone <span>*</span>
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone"
                                    className="getting-started-input"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
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
                                        By submitting this form, I agree to the Terms of
                                        Service and Privacy Policy, which I have read on this
                                        website. I agree Cerna Healthcare LLC, may contact me
                                        via email, telephone, to arrange a free care
                                        consultation. I understand I do not need to provide
                                        this consent to receive any goods or services.
                                    </span>
                                </label>
                            </div>

                            {pageError ? (
                                <p style={{ color: "red", marginTop: "12px" }}>{pageError}</p>
                            ) : null}

                            {pageMsg ? (
                                <p style={{ color: "green", marginTop: "12px" }}>{pageMsg}</p>
                            ) : null}

                            <div className="getting-started-actions">
                                <button
                                    type="button"
                                    className="getting-started-button getting-started-button-secondary"
                                    onClick={() => window.history.back()}
                                >
                                    Previous
                                </button>

                                <button
                                    type="submit"
                                    className="getting-started-button"
                                    disabled={submitting}
                                >
                                    {submitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}