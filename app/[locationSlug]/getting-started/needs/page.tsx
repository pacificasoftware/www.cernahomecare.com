"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getLocationBySlug } from "@/lib/locations";
import "../../../getting-started/getting-started.css";

type Props = {
    params: Promise<{
        locationSlug: string;
    }>;
};

type FormState = {
    condition: string;
    careNeeds: string;
};

const initialForm: FormState = {
    condition: "",
    careNeeds: "",
};

export default function LocalGettingStartedNeedsPage({ params }: Props) {
    const router = useRouter();
    const { locationSlug } = use(params);

    const [location, setLocation] = useState<Awaited<
        ReturnType<typeof getLocationBySlug>
    >>(null);

    const [locationLoading, setLocationLoading] =
        useState(true);

    useEffect(() => {
        let cancelled = false;

        async function loadLocation() {
            try {
                setLocationLoading(true);

                const result =
                    await getLocationBySlug(locationSlug);

                if (!cancelled) {
                    setLocation(result);
                }
            } catch (error) {
                console.error(
                    "Failed to load location:",
                    error
                );

                if (!cancelled) {
                    setLocation(null);
                }
            } finally {
                if (!cancelled) {
                    setLocationLoading(false);
                }
            }
        }

        loadLocation();

        return () => {
            cancelled = true;
        };
    }, [locationSlug]);

    const [form, setForm] = useState<FormState>(initialForm);

    useEffect(() => {
        const saved = sessionStorage.getItem(
            `gettingStarted:${locationSlug}:step2`
        );

        if (!saved) {
            return;
        }

        try {
            setForm(JSON.parse(saved));
        } catch {
            sessionStorage.removeItem(
                `gettingStarted:${locationSlug}:step2`
            );
        }
    }, [locationSlug]);
    if (locationLoading) {
        return (
            <section className="getting-started-section">
                <div className="getting-started-container">
                    <p className="getting-started-subcopy">
                        Loading your local Cerna Home Care office...
                    </p>
                </div>
            </section>
        );
    }

    if (!location) {
        return (
            <section className="getting-started-section">
                <div className="getting-started-container">
                    <h1 className="getting-started-card-title">
                        Location Not Found
                    </h1>

                    <p className="getting-started-subcopy">
                        We could not find this Cerna Home Care location.
                    </p>

                    <div className="getting-started-button-wrap">
                        <button
                            type="button"
                            className="getting-started-button"
                            onClick={() =>
                                router.push("/locations")
                            }
                        >
                            View All Locations
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    const primaryPhoneHref =
        location.phones?.[0]?.href ?? location.phoneHref;

    const primaryPhoneNumber =
        location.phones?.[0]?.number ?? location.phone;

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        sessionStorage.setItem(
            `gettingStarted:${locationSlug}:step2`,
            JSON.stringify(form)
        );

        router.push(`/${locationSlug}/getting-started/contact`);
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
                            What are your primary care goals?
                        </h1>

                        <p className="getting-started-subtitle">
                            Cerna Home Care {location.name} is here to help you
                            or a loved one today.
                        </p>

                        <div className="getting-started-callout">
                            <p className="getting-started-callout-text">
                                Contact our {location.name} team now for your
                                complimentary in-home consultation:
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
                                    Step 2 of 3 — Needs
                                </p>

                                <h2 className="getting-started-card-title">
                                    Let us learn more about the care needed
                                </h2>
                            </div>

                            <div className="getting-started-progress-pill">
                                33%
                            </div>
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

                        <form
                            className="getting-started-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="getting-started-field">
                                <div className="getting-started-legend">
                                    What is your loved one’s condition?
                                </div>

                                <div className="getting-started-radio-group">
                                    {[
                                        "General Aging",
                                        "Memory Loss",
                                        "Post Surgery",
                                        "Neurological Condition",
                                        "Post Stroke",
                                        "Other",
                                    ].map((option) => (
                                        <label
                                            key={option}
                                            className="getting-started-radio-card"
                                        >
                                            <input
                                                type="radio"
                                                name="condition"
                                                value={option}
                                                checked={
                                                    form.condition === option
                                                }
                                                onChange={handleChange}
                                            />

                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>

                                <p className="getting-started-optional">
                                    (this field is optional)
                                </p>
                            </div>

                            <div className="getting-started-field">
                                <label
                                    className="getting-started-label"
                                    htmlFor="careNeeds"
                                >
                                    Please describe any care goals, concerns,
                                    or needs that you have...
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

                            <div className="getting-started-actions">
                                <button
                                    type="button"
                                    className="getting-started-button getting-started-button-secondary"
                                    onClick={() =>
                                        router.push(
                                            `/${locationSlug}/getting-started`
                                        )
                                    }
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