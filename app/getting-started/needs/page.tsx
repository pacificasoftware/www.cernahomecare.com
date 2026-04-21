"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../getting-started.css";

type FormState = {
    condition: string;
    careNeeds: string;
};

const initialForm: FormState = {
    condition: "",
    careNeeds: "",
};

export default function GettingStartedNeedsPage() {
    const router = useRouter();

    const [form, setForm] = useState<FormState>(initialForm);
    const [pageError, setPageError] = useState<string | null>(null);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPageError(null);

        router.push("/getting-started/contact");
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
                                <p className="getting-started-step">Step 2 of 3 - Needs</p>
                                <h2 className="getting-started-card-title">
                                    Let us learn more about the care needed
                                </h2>
                            </div>

                            <div className="getting-started-progress-pill">33%</div>
                        </div>

                        <p className="getting-started-required">
                            <span>*</span> indicates required fields
                        </p>

                        <div className="getting-started-progress">
                            <div
                                className="getting-started-progress-bar"
                                style={{ width: "33%" }}
                            />
                        </div>

                        <form className="getting-started-form" onSubmit={handleSubmit}>
                            <div className="getting-started-field">
                                <div className="getting-started-legend">
                                    What is your loved ones condition?
                                </div>

                                <div className="getting-started-radio-group">
                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="General Aging"
                                            checked={form.condition === "General Aging"}
                                            onChange={handleChange}
                                        />
                                        <span>General Aging</span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Memory Loss"
                                            checked={form.condition === "Memory Loss"}
                                            onChange={handleChange}
                                        />
                                        <span>Memory Loss</span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Post Surgery"
                                            checked={form.condition === "Post Surgery"}
                                            onChange={handleChange}
                                        />
                                        <span>Post Surgery</span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Neurological Condition"
                                            checked={form.condition === "Neurological Condition"}
                                            onChange={handleChange}
                                        />
                                        <span>Neurological Condition</span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Post Stroke"
                                            checked={form.condition === "Post Stroke"}
                                            onChange={handleChange}
                                        />
                                        <span>Post Stroke</span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Other"
                                            checked={form.condition === "Other"}
                                            onChange={handleChange}
                                        />
                                        <span>Other</span>
                                    </label>
                                </div>

                                <p className="getting-started-optional">
                                    (this field is optional)
                                </p>
                            </div>

                            <div className="getting-started-field">
                                <label className="getting-started-label" htmlFor="careNeeds">
                                    Please describe any care goals, concerns or needs that you have...
                                </label>
                                <textarea
                                    id="careNeeds"
                                    name="careNeeds"
                                    rows={5}
                                    className="getting-started-input getting-started-textarea"
                                    value={form.careNeeds}
                                    onChange={handleChange}
                                />
                                <p className="getting-started-optional">
                                    (this field is optional)
                                </p>
                            </div>

                            {pageError ? (
                                <p style={{ color: "red", marginTop: "12px" }}>{pageError}</p>
                            ) : null}

                            <div className="getting-started-actions">
                                <button
                                    type="button"
                                    className="getting-started-button getting-started-button-secondary"
                                    onClick={() => router.push("/getting-started")}
                                >
                                    Previous
                                </button>

                                <button
                                    type="submit"
                                    className="getting-started-button"
                                >
                                    Continue to Step 3
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}