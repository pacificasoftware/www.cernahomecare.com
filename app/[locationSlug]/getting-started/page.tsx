"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getLocationBySlug } from "@/lib/locations";
import "../../getting-started/getting-started.css";

type Props = {
    params: Promise<{
        locationSlug: string;
    }>;
};

type FormState = {
    fullName: string;
    zipCode: string;
    careFor: string;
};

const initialForm: FormState = {
    fullName: "",
    zipCode: "",
    careFor: "",
};

export default function LocalGettingStartedPage({ params }: Props) {
    const router = useRouter();
    const { locationSlug } = use(params);

    const [location, setLocation] = useState<Awaited<
        ReturnType<typeof getLocationBySlug>
    >>(null);

    const [locationLoading, setLocationLoading] = useState(true);

    const [form, setForm] = useState<FormState>(initialForm);
    const [pageError, setPageError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadLocation() {
            try {
                setLocationLoading(true);

                const result = await getLocationBySlug(locationSlug);

                if (!cancelled) {
                    setLocation(result);
                }
            } catch (error) {
                console.error("Failed to load location:", error);

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

    if (locationLoading) {
        return (
            <section className="getting-started-section">
                <div className="getting-started-container">
                    <p>Loading your local Cerna Home Care office...</p>
                </div>
            </section>
        );
    }

    if (!location) {
        return (
            <section className="getting-started-section">
                <div className="getting-started-container">
                    <h1>Location Not Found</h1>

                    <button
                        type="button"
                        onClick={() => router.push("/locations")}
                    >
                        View All Locations
                    </button>
                </div>
            </section>
        );
    }

    const primaryPhoneHref =
        location.phones?.[0]?.href ?? location.phoneHref;

    const primaryPhoneNumber =
        location.phones?.[0]?.number ?? location.phone;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function validateForm() {
        if (!form.fullName.trim()) {
            return "Full Name is required.";
        }

        if (!form.zipCode.trim()) {
            return "ZIP Code is required.";
        }

        if (!/^\d{5}$/.test(form.zipCode.trim())) {
            return "Please enter a valid 5-digit ZIP Code.";
        }

        return null;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPageError(null);

        const validationError = validateForm();

        if (validationError) {
            setPageError(validationError);
            return;
        }

        sessionStorage.setItem(
            `gettingStarted:${locationSlug}:step1`,
            JSON.stringify(form)
        );

        router.push(`/${locationSlug}/getting-started/needs`);
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
                                    Step 1 of 3
                                </p>

                                <h2 className="getting-started-card-title">
                                    Let’s start with some basic information
                                </h2>
                            </div>

                            <div className="getting-started-progress-pill">
                                0%
                            </div>
                        </div>

                        <p className="getting-started-required">
                            <span>*</span> indicates required fields
                        </p>

                        <div className="getting-started-progress">
                            <div className="getting-started-progress-bar" />
                        </div>

                        <form
                            className="getting-started-form"
                            onSubmit={handleSubmit}
                        >
                            <div className="getting-started-field">
                                <label
                                    className="getting-started-label"
                                    htmlFor="fullName"
                                >
                                    Your Full Name <span>*</span>
                                </label>

                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    className="getting-started-input"
                                    value={form.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="getting-started-field">
                                <label
                                    className="getting-started-label"
                                    htmlFor="zipCode"
                                >
                                    What is the ZIP code of the person who
                                    needs care? <span>*</span>
                                </label>

                                <input
                                    id="zipCode"
                                    name="zipCode"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={5}
                                    placeholder="ZIP Code"
                                    className="getting-started-input"
                                    value={form.zipCode}
                                    onChange={(e) => {
                                        e.target.value = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 5);

                                        handleChange(e);
                                    }}
                                />
                            </div>

                            <div className="getting-started-field">
                                <div className="getting-started-legend">
                                    Who is the care for?
                                </div>

                                <div className="getting-started-radio-group">
                                    {[
                                        "Myself",
                                        "A family member",
                                        "A friend / Associate",
                                        "Other",
                                    ].map((option) => (
                                        <label
                                            key={option}
                                            className="getting-started-radio-card"
                                        >
                                            <input
                                                type="radio"
                                                name="careFor"
                                                value={option}
                                                checked={
                                                    form.careFor === option
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

                            <div className="getting-started-button-wrap">
                                <button
                                    type="submit"
                                    className="getting-started-button"
                                >
                                    Continue to Step 2
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}