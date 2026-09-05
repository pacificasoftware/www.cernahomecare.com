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

import "../getting-started.css";

type FormState = {
    condition: string;
    careNeeds: string;
};

const initialForm: FormState = {
    condition: "",
    careNeeds: "",
};

const CORPORATE_LOCATION_SLUG =
    "orange-county";

export default function GettingStartedNeedsPage() {
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
    | This is the corporate Getting Started flow,
    | so contact information comes from the
    | Orange County database record.
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
                    setLocation(result);
                }
            } catch (error) {
                console.error(
                    "Getting Started failed to load corporate location:",
                    error
                );

                if (!cancelled) {
                    setLocation(null);
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
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
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
    | Submit
    |--------------------------------------------------------------------------
    */

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setPageError(null);

        sessionStorage.setItem(
            "gettingStarted:corporate:step2",
            JSON.stringify(form)
        );

        router.push(
            "/getting-started/contact"
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

                    <div className="getting-started-card">
                        <div className="getting-started-card-header">
                            <div>
                                <p className="getting-started-step">
                                    Step 2 of 3 - Needs
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
                            <span>*</span>{" "}
                            indicates required fields
                        </p>

                        <div className="getting-started-progress">
                            <div
                                className="getting-started-progress-bar"
                                style={{
                                    width: "33%",
                                }}
                            />
                        </div>

                        <form
                            className="getting-started-form"
                            onSubmit={
                                handleSubmit
                            }
                        >
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
                                            checked={
                                                form.condition ===
                                                "General Aging"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span>
                                            General Aging
                                        </span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Memory Loss"
                                            checked={
                                                form.condition ===
                                                "Memory Loss"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span>
                                            Memory Loss
                                        </span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Post Surgery"
                                            checked={
                                                form.condition ===
                                                "Post Surgery"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span>
                                            Post Surgery
                                        </span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Neurological Condition"
                                            checked={
                                                form.condition ===
                                                "Neurological Condition"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span>
                                            Neurological Condition
                                        </span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Post Stroke"
                                            checked={
                                                form.condition ===
                                                "Post Stroke"
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span>
                                            Post Stroke
                                        </span>
                                    </label>

                                    <label className="getting-started-radio-card">
                                        <input
                                            type="radio"
                                            name="condition"
                                            value="Other"
                                            checked={
                                                form.condition ===
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

                            <div className="getting-started-field">
                                <label
                                    className="getting-started-label"
                                    htmlFor="careNeeds"
                                >
                                    Please describe any care goals, concerns or needs that you have...
                                </label>

                                <textarea
                                    id="careNeeds"
                                    name="careNeeds"
                                    rows={5}
                                    className="getting-started-input getting-started-textarea"
                                    value={
                                        form.careNeeds
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <p className="getting-started-optional">
                                    (this field is optional)
                                </p>
                            </div>

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

                            <div className="getting-started-actions">
                                <button
                                    type="button"
                                    className="getting-started-button getting-started-button-secondary"
                                    onClick={() =>
                                        router.push(
                                            "/getting-started"
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