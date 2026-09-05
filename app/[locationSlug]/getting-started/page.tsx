"use client";

import React, {
    useEffect,
    useState,
} from "react";

import { useRouter } from "next/navigation";

import {
    getLocationBySlug,
    type LocationData,
} from "@/lib/locations";

import "./getting-started.css";

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

const CORPORATE_LOCATION_SLUG =
    "orange-county";

export default function GettingStartedPage() {
    const router =
        useRouter();

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
    | Corporate Location
    |--------------------------------------------------------------------------
    |
    | Corporate Getting Started pages use
    | the Orange County database record.
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

        async function loadCorporateLocation() {
            try {
                const result =
                    await getLocationBySlug(
                        CORPORATE_LOCATION_SLUG
                    );

                if (!cancelled) {
                    setLocation(
                        result
                    );
                }
            } catch (error) {
                console.error(
                    "Getting Started failed to load corporate location:",
                    error
                );

                if (!cancelled) {
                    setLocation(
                        null
                    );
                }
            }
        }

        loadCorporateLocation();

        return () => {
            cancelled = true;
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Phone Selection
    |--------------------------------------------------------------------------
    |
    | 1. Toll-Free Phone
    | 2. Regular Phone if Toll-Free is blank
    |
    | No Cerna phone numbers are hard-coded.
    |
    */

    const tollFreePhone =
        location
            ?.tollFreePhone
            ?.trim() ?? "";

    const regularPhone =
        location
            ?.phone
            ?.trim() ?? "";

    const phoneLabel =
        tollFreePhone ||
        regularPhone;

    const phoneHref =
        tollFreePhone
            ? (
                location
                    ?.tollFreePhoneHref
                    ?.trim() ||
                makePhoneHref(
                    tollFreePhone
                )
            )
            : regularPhone
                ? (
                    location
                        ?.phoneHref
                        ?.trim() ||
                    makePhoneHref(
                        regularPhone
                    )
                )
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

        sessionStorage.setItem(
            "gettingStarted:corporate:step1",
            JSON.stringify(
                form
            )
        );

        router.push(
            "/getting-started/needs"
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