"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const corporateServiceLinks = [
    { href: "/services/specialized-care", label: "Specialized Care" },
    { href: "/services/memory-care", label: "Memory Care" },
    { href: "/services/covered-care", label: "Covered Care" },  
    { href: "/services/companion-care", label: "Companion Care" },
    { href: "/services/care-management", label: "Care Management" },
    { href: "/services/transportation", label: "Transportation" },
    { href: "/services/mysafepatch", label: "MySafePatch" },
];

const corporateLinks = [
    { href: "/", label: "HOME" },
    { href: "/about-us", label: "ABOUT US" },
    { href: "/why-cerna", label: "WHY CERNA" },
    { href: "/locations", label: "LOCATIONS" },
    { href: "/careers", label: "CAREERS" },
    { href: "/contact-us", label: "CONTACT US" },
];

const locationNavConfig: Record<
    string,
    {
        label: string;
        phone: string;
        phoneHref: string;
        showCareers?: boolean;
    }
> = {
    "orange-county": {
        label: "Orange County",
        phone: "(949) 298-3200",
        phoneHref: "tel:19492983200",
        showCareers: true,
    },
    southlake: {
        label: "Southlake",
        phone: "(682) 324-9800",
        phoneHref: "tel:16823249800",
        showCareers: true,
    },
    "south-bay": {
        label: "South Bay",
        phone: "(562) 242-1830",
        phoneHref: "tel:15622421830",
        showCareers: true,
    },
    "marin-county": {
        label: "Marin County",
        phone: "(415) 799-2628",
        phoneHref: "tel:14157992628",
        showCareers: true,
    },
    "san-diego": {
        label: "San Diego",
        phone: "(877) 577-6782",
        phoneHref: "tel:18775776782",
        showCareers: true,
    },
    pasadena: {
        label: "Pasadena",
        phone: "(562) 242-1830",
        phoneHref: "tel:15622421830",
        showCareers: true,
    },
    dallas: {
        label: "Dallas",
        phone: "(972) 330-2005",
        phoneHref: "tel:19723302005",
        showCareers: true,
    },
    "las-vegas": {
        label: "Las Vegas",
        phone: "(702) 673-1900",
        phoneHref: "tel:17026731900",
        showCareers: true,
    },
    orlando: {
        label: "Orlando",
        phone: "(407) 495-4344",
        phoneHref: "tel:14074954344",
        showCareers: true,
    },
    tampa: {
        label: "Tampa",
        phone: "(813) 776-6099",
        phoneHref: "tel:18137766099",
        showCareers: true,
    },
}; 

// Menu Options for Location Pages
const locationServiceSlugs = [
    { slug: "specialized-care", label: "Specialized Care" }, 
    { slug: "memory-care", label: "Memory Care" },
    { slug: "covered-care", label: "Covered Care" }, 
    { slug: "companion-care", label: "Companion Care" },
    { slug: "care-management", label: "Care Management" },
    { slug: "transportation", label: "Transportation" },
    { slug: "mysafepatch", label: "MySafePatch" },
]; 

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const pathParts = pathname.split("/").filter(Boolean);
    const locationSlug = pathParts[0];
    const locationConfig = locationNavConfig[locationSlug];

    const isLocationPage = Boolean(locationConfig);
    const basePath = isLocationPage ? `/${locationSlug}` : "";

    const closeMenu = () => {
        setMenuOpen(false);
        setServicesOpen(false);
    };

    const isActive = (href: string) => {
        // Corporate home and each location home should only be active
        // when the current pathname exactly matches the home URL.
        if (href === "/" || (isLocationPage && href === basePath)) {
            return pathname === href;
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const locationLinks = locationConfig
        ? [
            { href: basePath, label: "HOME" },
            { href: `${basePath}/about-us`, label: "ABOUT US" },
            {
                href: `${basePath}/why-cerna`,
                label: `WHY CERNA ${locationConfig.label.toUpperCase()}`,
            },
            ...(locationConfig.showCareers
                ? [{ href: `${basePath}/careers`, label: "CAREERS" }]
                : []),
            { href: `${basePath}/contact-us`, label: "CONTACT US" },
        ]
        : [];

    const activeMainLinks = isLocationPage ? locationLinks : corporateLinks;

    const activeServiceLinks = isLocationPage
        ? locationServiceSlugs.map((service) => ({
            href: `${basePath}/${service.slug}`,
            label: service.label,
        }))
        : corporateServiceLinks;

    const isServicesActive = isLocationPage
        ? pathname === `${basePath}/services` ||
        locationServiceSlugs.some(
            (service) => pathname === `${basePath}/${service.slug}`
        )
        : pathname === "/services" || pathname.startsWith("/services/");

    const phoneHref = locationConfig?.phoneHref ?? "tel:18775776782";
    const phoneLabel = locationConfig?.phone ?? "(877) 577-6782";

    return (
        <header className={styles.header}>
            <div className={styles.navRow}>
                <Link
                    href="/"
                    className={styles.logoLink}
                    onClick={closeMenu}
                >
                    <img
                        src="/assets/cerna-caring-seniors.webp"
                        alt="Cerna Home Care"
                        className={styles.logo}
                    />
                </Link>

                <button
                    type="button"
                    className={styles.menuButton}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={`${styles.mainNav} ${menuOpen ? styles.open : ""}`}>
                    <ul className={styles.navList}>
                        {activeMainLinks.slice(0, 3).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={isActive(item.href) ? styles.active : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        <li className={styles.servicesItem}>
                            <div className={styles.servicesTopRow}>
                                <Link
                                    href={isLocationPage ? `${basePath}/services` : "/services"}
                                    onClick={(e) => {
                                        if (window.innerWidth <= 1024) {
                                            e.preventDefault();
                                            setServicesOpen((prev) => !prev);
                                            return;
                                        }

                                        closeMenu();
                                    }}
                                    className={`${styles.servicesLink} ${isServicesActive ? styles.active : ""
                                        }`}
                                >
                                    SERVICES
                                </Link>

                                <button
                                    type="button"
                                    className={styles.servicesToggle}
                                    onClick={() => setServicesOpen((prev) => !prev)}
                                    aria-label="Toggle services menu"
                                >
                                    {servicesOpen ? "−" : "+"}
                                </button>
                            </div>

                            <ul
                                className={`${styles.servicesDropdown} ${servicesOpen ? styles.mobileServicesOpen : ""
                                    }`}
                            >
                                {activeServiceLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={closeMenu}
                                            className={isActive(item.href) ? styles.active : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {activeMainLinks.slice(3).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={closeMenu}
                                    className={isActive(item.href) ? styles.active : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        <li className={styles.mobileCallItem}>
                            <Link
                                href={phoneHref}
                                onClick={closeMenu}
                                className={styles.mobileCallBtn}
                            >
                                {phoneLabel}
                            </Link>
                        </li>
                    </ul>
                </nav>

                <Link href={phoneHref} className={styles.callBtn}>
                    {phoneLabel}
                </Link>
            </div>
        </header>
    );
}