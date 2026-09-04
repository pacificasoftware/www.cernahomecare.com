"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    getLocationBySlug,
    type LocationData,
} from "@/lib/locations";

/*
|--------------------------------------------------------------------------
| Corporate Location
|--------------------------------------------------------------------------
|
| Orange County is Cerna's corporate location.
|
| The slug itself is a routing/business rule.
| Phone numbers, email, etc. are NOT stored here.
| They come from the database.
|
*/

const CORPORATE_LOCATION_SLUG =
    "orange-county";

/*
|--------------------------------------------------------------------------
| Social Icon
|--------------------------------------------------------------------------
*/

function SocialIcon({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            aria-label={label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10"
        >
            {children}
        </Link>
    );
}

/*
|--------------------------------------------------------------------------
| Phone Href Helper
|--------------------------------------------------------------------------
*/

function makePhoneHref(phone: string) {
    return `tel:${phone.replace(
        /[^\d+]/g,
        ""
    )}`;
}

/*
|--------------------------------------------------------------------------
| Footer
|--------------------------------------------------------------------------
*/

export default function Footer() {
    const pathname = usePathname();

    /*
    |--------------------------------------------------------------------------
    | Determine Possible Location Slug
    |--------------------------------------------------------------------------
    |
    | Examples:
    |
    | /orange-county
    | /orange-county/services
    |
    | routeSlug = orange-county
    |
    | Corporate URLs:
    |
    | /services
    | /about-us
    | /careers
    |
    | will not resolve to a Location record.
    |
    */

    const pathParts =
        pathname.split("/").filter(Boolean);

    const routeSlug =
        pathParts[0] ?? "";

    /*
    |--------------------------------------------------------------------------
    | Database Location State
    |--------------------------------------------------------------------------
    */

    const [location, setLocation] =
        useState<LocationData | null>(null);

    const [
        corporateLocation,
        setCorporateLocation,
    ] =
        useState<LocationData | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Load Corporate Location
    |--------------------------------------------------------------------------
    |
    | Corporate contact information comes from the Orange County
    | database record.
    |
    */

    useEffect(() => {
        let cancelled = false;

        async function loadCorporateLocation() {
            try {
                const result =
                    await getLocationBySlug(
                        CORPORATE_LOCATION_SLUG
                    );

                if (!cancelled) {
                    setCorporateLocation(
                        result
                    );
                }
            } catch (error) {
                console.error(
                    "Footer failed to load corporate location:",
                    error
                );

                if (!cancelled) {
                    setCorporateLocation(
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
    | Load Current Location
    |--------------------------------------------------------------------------
    |
    | We deliberately try the first URL segment against the Locations API.
    |
    | If it is:
    |
    | orange-county
    | southlake
    | dallas
    | tampa
    | etc.
    |
    | the API returns that location.
    |
    | If it is:
    |
    | services
    | careers
    | about-us
    |
    | no Location is returned and the footer uses corporate information.
    |
    */

    useEffect(() => {
        let cancelled = false;

        /*
         * Clear the previous location immediately.
         *
         * This prevents a Dallas phone number, for example,
         * from temporarily remaining visible when navigating
         * to another location.
         */
        setLocation(null);

        if (!routeSlug) {
            return () => {
                cancelled = true;
            };
        }

        /*
         * Orange County is already loaded as the
         * corporate location.
         *
         * We can still load it here because this keeps
         * location-page behavior consistent.
         */
        async function loadCurrentLocation() {
            try {
                const result =
                    await getLocationBySlug(
                        routeSlug
                    );

                if (!cancelled) {
                    setLocation(result);
                }
            } catch (error) {
                console.error(
                    "Footer failed to load current location:",
                    error
                );

                if (!cancelled) {
                    setLocation(null);
                }
            }
        }

        loadCurrentLocation();

        return () => {
            cancelled = true;
        };
    }, [routeSlug]);

    /*
    |--------------------------------------------------------------------------
    | Footer Title
    |--------------------------------------------------------------------------
    */

    const footerTitle =
        location
            ? `Cerna Home Care ${location.name}`
            : "Cerna Home Care";

    /*
    |--------------------------------------------------------------------------
    | Footer Phone
    |--------------------------------------------------------------------------
    |
    | EXACT RULE FOR BOTH LOCATION AND CORPORATE PAGES:
    |
    | 1. Use Toll-Free Phone from the database when it exists.
    | 2. If Toll-Free Phone is blank, use the regular Phone.
    | 3. If both are blank, do not display a phone number.
    |
    | Location pages use that location's database record.
    | Corporate pages use the Orange County database record.
    |
    | No phone numbers are hard-coded here.
    |
    */

    const phoneLocation =
        location ?? corporateLocation;

    const tollFreePhone =
        phoneLocation?.tollFreePhone?.trim() || "";

    const regularPhone =
        phoneLocation?.phone?.trim() || "";

    const footerPhone =
        tollFreePhone || regularPhone;

    /*
    |--------------------------------------------------------------------------
    | Footer Phone Href
    |--------------------------------------------------------------------------
    |
    | The link must match the same phone number that is displayed.
    |
    | If the database does not provide the matching href, build the tel:
    | link directly from the selected database phone number.
    |
    */

    const footerPhoneHref =
        tollFreePhone
            ? (
                phoneLocation?.tollFreePhoneHref?.trim() ||
                makePhoneHref(tollFreePhone)
            )
            : regularPhone
                ? (
                    phoneLocation?.phoneHref?.trim() ||
                    makePhoneHref(regularPhone)
                )
                : "";

    /*
    |--------------------------------------------------------------------------
    | Footer Email
    |--------------------------------------------------------------------------
    |
    | Location email first.
    | Corporate Orange County email as fallback.
    |
    */

    const footerEmail =
        location?.email?.trim() ||
        corporateLocation?.email?.trim() ||
        "";

    /*
    |--------------------------------------------------------------------------
    | Current Year
    |--------------------------------------------------------------------------
    */

    const currentYear =
        new Date().getFullYear();

    return (
        <footer>
            {/* ============================================================= */}
            {/* MAIN FOOTER */}
            {/* ============================================================= */}

            <div
                style={{
                    backgroundColor:
                        "#00456B",
                    color: "white",
                    padding:
                        "40px 24px",
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    {/* ===================================================== */}
                    {/* BENEFITS ROW */}
                    {/* ===================================================== */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(4, minmax(0, 1fr))",
                            gap: "24px",
                            paddingBottom:
                                "28px",
                            marginBottom:
                                "28px",
                            borderBottom:
                                "1px solid rgba(255,255,255,0.2)",
                            textAlign:
                                "center",
                        }}
                    >
                        {/* ================================================= */}
                        {/* FREE ASSESSMENT */}
                        {/* ================================================= */}

                        <div>
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center text-white">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-12 w-12"
                                >
                                    <path d="M4 20h16" />
                                    <path d="M6 16l10-10 2 2-10 10H6v-2Z" />
                                </svg>
                            </div>

                            <p
                                style={{
                                    fontWeight:
                                        700,
                                    fontSize:
                                        "18px",
                                }}
                            >
                                Free Assessment
                            </p>
                        </div>

                        {/* ================================================= */}
                        {/* NO CONTRACTS */}
                        {/* ================================================= */}

                        <div>
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center text-white">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-12 w-12"
                                >
                                    <path d="M6 3h9l3 3v15H6V3Z" />
                                    <path d="M14 3v4h4" />
                                    <path d="M9 12h6" />
                                    <path d="M9 16h6" />
                                </svg>
                            </div>

                            <p
                                style={{
                                    fontWeight:
                                        700,
                                    fontSize:
                                        "18px",
                                }}
                            >
                                No Contracts
                            </p>
                        </div>

                        {/* ================================================= */}
                        {/* AVAILABLE 24/7 */}
                        {/* ================================================= */}

                        <div>
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center text-white">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-12 w-12"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="8"
                                    />

                                    <path d="M12 8v5l3 2" />
                                    <path d="M8 2h8" />
                                </svg>
                            </div>

                            <p
                                style={{
                                    fontWeight:
                                        700,
                                    fontSize:
                                        "18px",
                                }}
                            >
                                We are available
                                24/7
                            </p>
                        </div>

                        {/* ================================================= */}
                        {/* SECURE PAYMENTS */}
                        {/* ================================================= */}

                        <div>
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center text-white">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-12 w-12"
                                >
                                    <rect
                                        x="3"
                                        y="6"
                                        width="18"
                                        height="12"
                                        rx="2"
                                    />

                                    <path d="M3 10h18" />
                                    <path d="M7 15h4" />
                                </svg>
                            </div>

                            <p
                                style={{
                                    fontWeight:
                                        700,
                                    fontSize:
                                        "18px",
                                }}
                            >
                                100% Secure
                                payments
                            </p>
                        </div>
                    </div>

                    {/* ===================================================== */}
                    {/* FOOTER COLUMNS */}
                    {/* ===================================================== */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(3, minmax(0, 1fr))",
                            gap: "48px",
                            alignItems:
                                "start",
                            marginTop:
                                "28px",
                        }}
                    >
                        {/* ================================================= */}
                        {/* CONTACT US */}
                        {/* ================================================= */}

                        <div>
                            <h3
                                style={{
                                    color: "white",
                                    fontSize:
                                        "20px",
                                    fontWeight:
                                        700,
                                    marginBottom:
                                        "20px",
                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                Contact Us
                            </h3>

                            <p
                                style={{
                                    color: "white",
                                    fontSize:
                                        "18px",
                                    lineHeight:
                                        1.6,
                                    marginBottom:
                                        "20px",
                                }}
                            >
                                {footerTitle}{" "}
                                provides industry
                                leading care
                                services with
                                highly trained
                                Care Givers. Only
                                the best in
                                service and staff!
                            </p>

                            {/* ============================================= */}
                            {/* EMAIL FROM DATABASE */}
                            {/* ============================================= */}

                            {footerEmail ? (
                                <p
                                    style={{
                                        color:
                                            "white",
                                        fontSize:
                                            "18px",
                                        marginBottom:
                                            "12px",
                                    }}
                                >
                                    <strong>
                                        Email:
                                    </strong>{" "}

                                    <a
                                        href={`mailto:${footerEmail}`}
                                        style={{
                                            color:
                                                "#D26E4B",
                                            textDecoration:
                                                "none",
                                        }}
                                    >
                                        {
                                            footerEmail
                                        }
                                    </a>
                                </p>
                            ) : null}

                            {/* ============================================= */}
                            {/* PHONE FROM DATABASE */}
                            {/* ============================================= */}

                            {footerPhone ? (
                                <p
                                    style={{
                                        color:
                                            "white",
                                        fontSize:
                                            "18px",
                                    }}
                                >
                                    <strong>
                                        Phone:
                                    </strong>{" "}

                                    <a
                                        href={
                                            footerPhoneHref
                                        }
                                        style={{
                                            color:
                                                "#D26E4B",
                                            textDecoration:
                                                "none",
                                        }}
                                    >
                                        {
                                            footerPhone
                                        }
                                    </a>
                                </p>
                            ) : null}
                        </div>

                        {/* ================================================= */}
                        {/* NAVIGATION */}
                        {/* ================================================= */}

                        <div>
                            <h3
                                style={{
                                    color: "white",
                                    fontSize:
                                        "20px",
                                    fontWeight:
                                        700,
                                    marginBottom:
                                        "20px",
                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                Navigation
                            </h3>

                            <div>
                                {[
                                    {
                                        label:
                                            "Website Terms",
                                        href:
                                            "/website-terms",
                                    },
                                    {
                                        label:
                                            "Privacy Policy",
                                        href:
                                            "/privacy-policy",
                                    },
                                    {
                                        label:
                                            "Locations",
                                        href:
                                            "/locations",
                                    },
                                    {
                                        label:
                                            "Write a Review",
                                        href:
                                            "/write-a-review",
                                    },
                                ].map(
                                    (
                                        item
                                    ) => (
                                        <Link
                                            key={
                                                item.label
                                            }
                                            href={
                                                item.href
                                            }
                                            style={{
                                                display:
                                                    "block",
                                                borderBottom:
                                                    "1px solid white",
                                                padding:
                                                    "12px 0",
                                                fontSize:
                                                    "18px",
                                                color:
                                                    "#D26E4B",
                                                textDecoration:
                                                    "none",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight:
                                                        700,
                                                    marginRight:
                                                        "10px",
                                                }}
                                            >
                                                &gt;
                                            </span>

                                            {
                                                item.label
                                            }
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>

                        {/* ================================================= */}
                        {/* INFORMATION */}
                        {/* ================================================= */}

                        <div>
                            <h3
                                style={{
                                    color: "white",
                                    fontSize:
                                        "20px",
                                    fontWeight:
                                        700,
                                    marginBottom:
                                        "20px",
                                    textTransform:
                                        "uppercase",
                                }}
                            >
                                Information
                            </h3>

                            <div>
                                {[
                                    {
                                        label:
                                            "Downloads",
                                        href:
                                            "/downloads",
                                    },
                                    {
                                        label:
                                            "Financial Support",
                                        href:
                                            "/financial-support",
                                    },
                                    {
                                        label:
                                            "Insurance Information",
                                        href:
                                            "/insurance-information",
                                    },
                                    {
                                        label:
                                            "Affiliations",
                                        href:
                                            "/affiliations",
                                    },
                                ].map(
                                    (
                                        item
                                    ) => (
                                        <Link
                                            key={
                                                item.label
                                            }
                                            href={
                                                item.href
                                            }
                                            style={{
                                                display:
                                                    "block",
                                                borderBottom:
                                                    "1px solid white",
                                                padding:
                                                    "12px 0",
                                                fontSize:
                                                    "18px",
                                                color:
                                                    "#D26E4B",
                                                textDecoration:
                                                    "none",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight:
                                                        700,
                                                    marginRight:
                                                        "10px",
                                                }}
                                            >
                                                &gt;
                                            </span>

                                            {
                                                item.label
                                            }
                                        </Link>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================= */}
            {/* LOWER FOOTER */}
            {/* ============================================================= */}

            <div className="bg-[#002b44] text-white">
                <div className="mx-auto max-w-7xl px-6 py-8 text-center">
                    <p className="text-base md:text-[18px]">
                        © {currentYear} Cerna
                        Home Care | Industry
                        leading care services
                        provided by highly
                        trained Care Givers.
                    </p>

                    {/* ===================================================== */}
                    {/* SOCIAL ICONS */}
                    {/* ===================================================== */}

                    <div className="mt-5 flex items-center justify-center gap-4">
                        {/* FACEBOOK */}

                        <SocialIcon
                            href="#"
                            label="Facebook"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-7 w-7 fill-current"
                            >
                                <path d="M13.5 8.5V6.8c0-.8.5-1.3 1.4-1.3H16V2.2c-.5-.1-1.6-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8v1.7H6v3.8h2.5V22h4.1v-9.7h2.8l.4-3.8h-3.2Z" />
                            </svg>
                        </SocialIcon>

                        {/* INSTAGRAM */}

                        <SocialIcon
                            href="#"
                            label="Instagram"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-7 w-7 fill-current"
                            >
                                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.7 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
                            </svg>
                        </SocialIcon>

                        {/* LINKEDIN */}

                        <SocialIcon
                            href="#"
                            label="LinkedIn"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-7 w-7 fill-current"
                            >
                                <path d="M4.98 3.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4V9Z" />
                            </svg>
                        </SocialIcon>

                        {/* YOUTUBE */}

                        <SocialIcon
                            href="#"
                            label="YouTube"
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-7 w-7 fill-current"
                            >
                                <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2C22 15 22 12 22 12s0-3-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
                            </svg>
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
}