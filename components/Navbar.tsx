"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    getLocationBySlug,
    type LocationData,
} from "@/lib/locations";

import styles from "./Navbar.module.css";

/*
|--------------------------------------------------------------------------
| Corporate Service Links
|--------------------------------------------------------------------------
*/

const corporateServiceLinks = [
    {
        href: "/services/specialized-care",
        label: "Specialized Care",
    },
    {
        href: "/services/memory-care",
        label: "Memory Care",
    },
    {
        href: "/services/covered-care",
        label: "Covered Care",
    },
    {
        href: "/services/companion-care",
        label: "Companion Care",
    },
    {
        href: "/services/care-management",
        label: "Care Management",
    },
    {
        href: "/services/transportation",
        label: "Transportation",
    },
    {
        href: "/services/mysafepatch",
        label: "MySafePatch",
    },
];

/*
|--------------------------------------------------------------------------
| Corporate Navigation
|--------------------------------------------------------------------------
*/

const corporateLinks = [
    {
        href: "/",
        label: "HOME",
    },
    {
        href: "/about-us",
        label: "ABOUT US",
    },
    {
        href: "/why-cerna",
        label: "WHY CERNA",
    },
    {
        href: "/locations",
        label: "LOCATIONS",
    },
    {
        href: "/careers",
        label: "CAREERS",
    },
    {
        href: "/contact-us",
        label: "CONTACT US",
    },
];

/*
|--------------------------------------------------------------------------
| Location Service Links
|--------------------------------------------------------------------------
*/

const locationServiceSlugs = [
    {
        slug: "specialized-care",
        label: "Specialized Care",
    },
    {
        slug: "memory-care",
        label: "Memory Care",
    },
    {
        slug: "covered-care",
        label: "Covered Care",
    },
    {
        slug: "companion-care",
        label: "Companion Care",
    },
    {
        slug: "care-management",
        label: "Care Management",
    },
    {
        slug: "transportation",
        label: "Transportation",
    },
    {
        slug: "mysafepatch",
        label: "MySafePatch",
    },
];

/*
|--------------------------------------------------------------------------
| Corporate Location
|--------------------------------------------------------------------------
|
| Orange County is Cerna's corporate location.
|
| Only the slug is defined here.
|
| Phone numbers come entirely from the database.
|
*/

const CORPORATE_LOCATION_SLUG =
    "orange-county";

/*
|--------------------------------------------------------------------------
| Navbar
|--------------------------------------------------------------------------
*/

export default function Navbar() {
    const pathname =
        usePathname();

    const [
        menuOpen,
        setMenuOpen,
    ] =
        useState(false);

    const [
        servicesOpen,
        setServicesOpen,
    ] =
        useState(false);

    /*
    |--------------------------------------------------------------------------
    | Location State
    |--------------------------------------------------------------------------
    */

    const [
        location,
        setLocation,
    ] =
        useState<LocationData | null>(
            null
        );

    const [
        corporateLocation,
        setCorporateLocation,
    ] =
        useState<LocationData | null>(
            null
        );

    /*
    |--------------------------------------------------------------------------
    | Determine First URL Segment
    |--------------------------------------------------------------------------
    */

    const pathParts =
        pathname
            .split("/")
            .filter(Boolean);

    const routeSlug =
        pathParts[0] ?? "";

    /*
    |--------------------------------------------------------------------------
    | Load Corporate Orange County
    |--------------------------------------------------------------------------
    |
    | Corporate pages use the Orange County database record.
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
                    "Navbar failed to load corporate location:",
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
    | If the first URL segment is a valid location slug,
    | the database/API returns the location.
    |
    */

    useEffect(() => {
        let cancelled = false;

        /*
         * Clear previous location immediately so a previous
         * location's phone number does not remain visible
         * during navigation.
         */
        setLocation(null);

        if (!routeSlug) {
            return () => {
                cancelled = true;
            };
        }

        async function loadCurrentLocation() {
            try {
                const result =
                    await getLocationBySlug(
                        routeSlug
                    );

                if (!cancelled) {
                    setLocation(
                        result
                    );
                }
            } catch {
                /*
                 * Corporate routes such as:
                 *
                 * /services
                 * /about-us
                 * /careers
                 *
                 * are not location slugs.
                 */
                if (!cancelled) {
                    setLocation(
                        null
                    );
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
    | Location Page State
    |--------------------------------------------------------------------------
    */

    const isLocationPage =
        location !== null;

    const basePath =
        location
            ? `/${location.slug}`
            : "";

    /*
    |--------------------------------------------------------------------------
    | Close Menu
    |--------------------------------------------------------------------------
    */

    const closeMenu = () => {
        setMenuOpen(false);
        setServicesOpen(false);
    };

    /*
    |--------------------------------------------------------------------------
    | Active Link
    |--------------------------------------------------------------------------
    */

    const isActive = (
        href: string
    ) => {
        /*
         * Corporate Home
         */
        if (href === "/") {
            return pathname === "/";
        }

        /*
         * Location Home
         */
        if (
            isLocationPage &&
            href === basePath
        ) {
            return pathname === href;
        }

        return (
            pathname === href ||
            pathname.startsWith(
                `${href}/`
            )
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Location Navigation
    |--------------------------------------------------------------------------
    */

    const locationLinks =
        location
            ? [
                {
                    href: basePath,
                    label: "HOME",
                },
                {
                    href:
                        `${basePath}/about-us`,
                    label: "ABOUT US",
                },
                {
                    href:
                        `${basePath}/why-cerna`,
                    label:
                        `WHY CERNA ${getLocationDisplayName(
                            location
                        ).toUpperCase()}`,
                },
                {
                    href:
                        `${basePath}/careers`,
                    label: "CAREERS",
                },
                {
                    href:
                        `${basePath}/contact-us`,
                    label:
                        "CONTACT US",
                },
            ]
            : [];

    /*
    |--------------------------------------------------------------------------
    | Active Navigation
    |--------------------------------------------------------------------------
    */

    const activeMainLinks =
        isLocationPage
            ? locationLinks
            : corporateLinks;

    /*
    |--------------------------------------------------------------------------
    | Active Service Links
    |--------------------------------------------------------------------------
    */

    const activeServiceLinks =
        isLocationPage
            ? locationServiceSlugs.map(
                (service) => ({
                    href:
                        `${basePath}/${service.slug}`,
                    label:
                        service.label,
                })
            )
            : corporateServiceLinks;

    /*
    |--------------------------------------------------------------------------
    | Services Active State
    |--------------------------------------------------------------------------
    */

    const isServicesActive =
        isLocationPage
            ? pathname ===
            `${basePath}/services` ||
            locationServiceSlugs.some(
                (service) =>
                    pathname ===
                    `${basePath}/${service.slug}`
            )
            : pathname ===
            "/services" ||
            pathname.startsWith(
                "/services/"
            );

    /*
    |--------------------------------------------------------------------------
    | Database Phone Selection
    |--------------------------------------------------------------------------
    |
    | EXACT RULE:
    |
    | 1. Toll-Free Phone
    | 2. Regular Phone if Toll-Free is blank
    |
    | LOCATION PAGE:
    | Uses that location's database record.
    |
    | CORPORATE PAGE:
    | Uses Orange County's database record.
    |
    | THERE ARE NO HARDCODED PHONE NUMBERS.
    |
    */

    const phoneLocation =
        location ??
        corporateLocation;

    const tollFreePhone =
        phoneLocation
            ?.tollFreePhone
            ?.trim() ?? "";

    const regularPhone =
        phoneLocation
            ?.phone
            ?.trim() ?? "";

    /*
     * Display Toll-Free first.
     * Fall back to regular phone.
     */
    const phoneLabel =
        tollFreePhone ||
        regularPhone;

    /*
     * Make sure the href corresponds to whichever
     * number is actually being displayed.
     */
    const phoneHref =
        tollFreePhone
            ? (
                phoneLocation
                    ?.tollFreePhoneHref
                    ?.trim() ||
                makePhoneHref(
                    tollFreePhone
                )
            )
            : regularPhone
                ? (
                    phoneLocation
                        ?.phoneHref
                        ?.trim() ||
                    makePhoneHref(
                        regularPhone
                    )
                )
                : "";

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <header
            className={
                styles.header
            }
        >
            <div
                className={
                    styles.navRow
                }
            >
                {/* ========================================================= */}
                {/* LOGO */}
                {/* ========================================================= */}

                <Link
                    href="/"
                    className={
                        styles.logoLink
                    }
                    onClick={
                        closeMenu
                    }
                >
                    <img
                        src="/assets/cerna-caring-seniors.webp"
                        alt="Cerna Home Care"
                        className={
                            styles.logo
                        }
                    />
                </Link>

                {/* ========================================================= */}
                {/* MOBILE MENU BUTTON */}
                {/* ========================================================= */}

                <button
                    type="button"
                    className={
                        styles.menuButton
                    }
                    onClick={() =>
                        setMenuOpen(
                            (
                                previous
                            ) =>
                                !previous
                        )
                    }
                    aria-label="Toggle navigation menu"
                    aria-expanded={
                        menuOpen
                    }
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* ========================================================= */}
                {/* NAVIGATION */}
                {/* ========================================================= */}

                <nav
                    className={`${styles.mainNav} ${menuOpen
                            ? styles.open
                            : ""
                        }`}
                >
                    <ul
                        className={
                            styles.navList
                        }
                    >
                        {/* ================================================= */}
                        {/* FIRST THREE LINKS */}
                        {/* ================================================= */}

                        {activeMainLinks
                            .slice(0, 3)
                            .map(
                                (
                                    item
                                ) => (
                                    <li
                                        key={
                                            item.href
                                        }
                                    >
                                        <Link
                                            href={
                                                item.href
                                            }
                                            onClick={
                                                closeMenu
                                            }
                                            className={
                                                isActive(
                                                    item.href
                                                )
                                                    ? styles.active
                                                    : undefined
                                            }
                                        >
                                            {
                                                item.label
                                            }
                                        </Link>
                                    </li>
                                )
                            )}

                        {/* ================================================= */}
                        {/* SERVICES */}
                        {/* ================================================= */}

                        <li
                            className={
                                styles.servicesItem
                            }
                        >
                            <div
                                className={
                                    styles.servicesTopRow
                                }
                            >
                                <Link
                                    href={
                                        isLocationPage
                                            ? `${basePath}/services`
                                            : "/services"
                                    }
                                    onClick={(
                                        event
                                    ) => {
                                        if (
                                            window.innerWidth <=
                                            1024
                                        ) {
                                            event.preventDefault();

                                            setServicesOpen(
                                                (
                                                    previous
                                                ) =>
                                                    !previous
                                            );

                                            return;
                                        }

                                        closeMenu();
                                    }}
                                    className={`${styles.servicesLink} ${isServicesActive
                                            ? styles.active
                                            : ""
                                        }`}
                                >
                                    SERVICES
                                </Link>

                                <button
                                    type="button"
                                    className={
                                        styles.servicesToggle
                                    }
                                    onClick={() =>
                                        setServicesOpen(
                                            (
                                                previous
                                            ) =>
                                                !previous
                                        )
                                    }
                                    aria-label="Toggle services menu"
                                >
                                    {servicesOpen
                                        ? "−"
                                        : "+"}
                                </button>
                            </div>

                            {/* ============================================= */}
                            {/* SERVICES DROPDOWN */}
                            {/* ============================================= */}

                            <ul
                                className={`${styles.servicesDropdown} ${servicesOpen
                                        ? styles.mobileServicesOpen
                                        : ""
                                    }`}
                            >
                                {activeServiceLinks.map(
                                    (
                                        item
                                    ) => (
                                        <li
                                            key={
                                                item.href
                                            }
                                        >
                                            <Link
                                                href={
                                                    item.href
                                                }
                                                onClick={
                                                    closeMenu
                                                }
                                                className={
                                                    isActive(
                                                        item.href
                                                    )
                                                        ? styles.active
                                                        : undefined
                                                }
                                            >
                                                {
                                                    item.label
                                                }
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </li>

                        {/* ================================================= */}
                        {/* REMAINING LINKS */}
                        {/* ================================================= */}

                        {activeMainLinks
                            .slice(3)
                            .map(
                                (
                                    item
                                ) => (
                                    <li
                                        key={
                                            item.href
                                        }
                                    >
                                        <Link
                                            href={
                                                item.href
                                            }
                                            onClick={
                                                closeMenu
                                            }
                                            className={
                                                isActive(
                                                    item.href
                                                )
                                                    ? styles.active
                                                    : undefined
                                            }
                                        >
                                            {
                                                item.label
                                            }
                                        </Link>
                                    </li>
                                )
                            )}

                        {/* ================================================= */}
                        {/* MOBILE PHONE */}
                        {/* ================================================= */}
                        {/* DATABASE ONLY */}

                        {phoneLabel ? (
                            <li
                                className={
                                    styles.mobileCallItem
                                }
                            >
                                <Link
                                    href={
                                        phoneHref
                                    }
                                    onClick={
                                        closeMenu
                                    }
                                    className={
                                        styles.mobileCallBtn
                                    }
                                >
                                    {
                                        phoneLabel
                                    }
                                </Link>
                            </li>
                        ) : null}
                    </ul>
                </nav>

                {/* ========================================================= */}
                {/* DESKTOP PHONE */}
                {/* ========================================================= */}
                {/* DATABASE ONLY */}

                {phoneLabel ? (
                    <Link
                        href={
                            phoneHref
                        }
                        className={
                            styles.callBtn
                        }
                    >
                        {
                            phoneLabel
                        }
                    </Link>
                ) : null}
            </div>
        </header>
    );
}

/*
|--------------------------------------------------------------------------
| Location Display Name
|--------------------------------------------------------------------------
*/

function getLocationDisplayName(
    location: LocationData
) {
    const name =
        location.name?.trim() ||
        location.city?.trim() ||
        "";

    /*
     * If database name is:
     *
     * Cerna Orange County
     *
     * display:
     *
     * WHY CERNA ORANGE COUNTY
     *
     * instead of:
     *
     * WHY CERNA CERNA ORANGE COUNTY
     */
    return name
        .replace(
            /^Cerna\s+(Home\s*Care\s+)?/i,
            ""
        )
        .trim();
}

/*
|--------------------------------------------------------------------------
| Phone Href
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