"use client";

import React, {
    useEffect,
    useState,
} from "react";

import { useParams, useRouter } from "next/navigation";

import {
    getLocationBySlug,
    type LocationData,
} from "@/lib/locations";

import "../../getting-started/getting-started.css";

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

export default function GettingStartedPage() {
    const router =
        useRouter();

    const params = useParams<{ locationSlug: string }>();
    const locationSlug = params?.locationSlug;

    const [form, setForm] =
        useState<FormState>(
            initialForm
        );

    const [
        pageError,
        setPageError,
    ] =
        useState<string | null>(
            null
        );

    /*
    |--------------------------------------------------------------------------
    | Location From Current URL
    |--------------------------------------------------------------------------
    |
    | Each location page loads its own database record.
    |
    */

    const [
        location,
        setLocation,
    ] =
        useState<LocationData | null>(
            null
        );

    useEffect(() => {
        let cancelled = false;

        async function loadLocation() {
            try {
                if (!locationSlug) {
                    if (!cancelled) setLocation(null);
                    return;
                }

                const result =
                    await getLocationBySlug(
                        locationSlug
                    );

                if (!cancelled) {
                    setLocation(
                        result
                    );
                }
            } catch (error) {
                console.error(
                    "Getting Started failed to load location:",
                    error
                );

                if (!cancelled) {
                    setLocation(
                        null
                    );
                }
            }
        }

        loadLocation();

        return () => {
            cancelled = true;
        };
    }, [locationSlug]);

    /*
    |--------------------------------------------------------------------------
    | Local Phone Selection
    |--------------------------------------------------------------------------
    |
    | Use this location's regular phone and phoneHref first.
    | Fallback to its toll-free number only if needed.
    |
    */

    const phoneLabel =
        location?.phone?.trim() ||
        location?.tollFreePhone?.trim() ||
        "";

    const phoneHref =
        location?.phone?.trim()
            ? (location.phoneHref?.trim() || makePhoneHref(location.phone))
            : location?.tollFreePhone?.trim()
                ? (location.tollFreePhoneHref?.trim() || makePhoneHref(location.tollFreePhone))
                : "";

    /*
    |--------------------------------------------------------------------------
    | Form Change
    |--------------------------------------------------------------------------
    */

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const {
            name,
            value,
        } = e.target;

        setForm(
            (prev) => ({
                ...prev,
                [name]: value,
            })
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    function validateForm() {
        if (
            !form.fullName.trim()
        ) {
            return "Full Name is required.";
        }

        if (
            !form.zipCode.trim()
        ) {
            return "ZIP Code is required.";
        }

        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setPageError(
            null
        );

        const validationError =
            validateForm();

        if (
            validationError
        ) {
            setPageError(
                validationError
            );

            return;
        }

        if (!locationSlug) {
            setPageError("Could not identify your local Cerna office.");
            return;
        }

        sessionStorage.setItem(
            `gettingStarted:${locationSlug}:step1`,
            JSON.stringify(
                form
            )
        );

        router.push(
            `/${locationSlug}/getting-started/needs`
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
                    {/* ===================================================== */}
                    {/* LEFT SIDE */}
                    {/* ===================================================== */}

                    <div className="getting-started-left">
                        <p className="getting-started-eyebrow">
                            Getting Started
                        </p>

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

                            {phoneLabel ? (
                                <a
                                    href={
                                        phoneHref
                                    }
                                    className="getting-started-phone"
                                >
                                    {
                                        phoneLabel
                                    }
                                </a>
                            ) : null}
                        </div>
                    </div>

                    {/* ===================================================== */}
                    {/* FORM CARD */}
                    {/* ===================================================== */}

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
                            <span>*</span>{" "}
                            indicates required fields
                        </p>

                        <div className="getting-started-progress">
                            <div className="getting-started-progress-bar" />
                        </div>

                        <form
                            className="getting-started-form"
                            onSubmit={
                                handleSubmit
                            }
                        >
                            {/* ============================================= */}
                            {/* FULL NAME */}
                            {/* ============================================= */}

                            <div className="getting-started-field">
                                <label
                                    className="getting-started-label"
                                    htmlFor="fullName"
                                >
                                    Your Full Name{" "}
                                    <span>*</span>
                                </label>

                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    className="getting-started-input"
                                    value={
                                        form.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            {/* ============================================= */}
                            {/* ZIP CODE */}
                            {/* ============================================= */}

                            <div className="getting-started-field">
                                <label
                                    className="getting-started-label"
                                    htmlFor="zipCode"
                                >
                                    What is the zip code of the person who needs care?{" "}
                                    <span>*</span>
                                </label>

                                <input
                                    id="zipCode"
                                    name="zipCode"
                                    type="text"
                                    placeholder="ZIP Code"
                                    className="getting-started-input"
                                    value={
                                        form.zipCode
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            {/* ============================================= */}
                            {/* CARE FOR */}
                            {/* ============================================= */}

                            <div className="getting-started-field">
                                <div className="getting-started-legend">
                                    Who is the care for?
                                </div>

                                <div className="getting-started-radio-group">
                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="careFor"
                                            value="Myself"
                                            checked={
                                                form.careFor ===
                                                "Myself"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span>
                                            Myself
                                        </span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="careFor"
                                            value="A family member"
                                            checked={
                                                form.careFor ===
                                                "A family member"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span>
                                            A family member
                                        </span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="careFor"
                                            value="A friend / Associate"
                                            checked={
                                                form.careFor ===
                                                "A friend / Associate"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span>
                                            A friend / Associate
                                        </span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="careFor"
                                            value="Other"
                                            checked={
                                                form.careFor ===
                                                "Other"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span>
                                            Other
                                        </span>
                                    </label>
                                </div>

                                <p className="getting-started-optional">
                                    (this field is optional)
                                </p>
                            </div>

                            {/* ============================================= */}
                            {/* ERROR */}
                            {/* ============================================= */}

                            {pageError ? (
                                <p
                                    style={{
                                        color: "red",
                                        marginTop:
                                            "12px",
                                    }}
                                >
                                    {
                                        pageError
                                    }
                                </p>
                            ) : null}

                            {/* ============================================= */}
                            {/* CONTINUE */}
                            {/* ============================================= */}

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

/*
|--------------------------------------------------------------------------
| Phone Href Helper
|--------------------------------------------------------------------------
*/

function makePhoneHref(
    phone: string
) {
    return `tel:${phone.replace(
        /[^\d+]/g,
        ""
    )}`;
}