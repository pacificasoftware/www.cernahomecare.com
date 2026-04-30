"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const serviceLinks = [
    { href: "/services", label: "Our Services" },
    { href: "/services/home-care", label: "Home Care" },
    { href: "/services/memory-care", label: "Memory Care" },
    { href: "/services/care-management", label: "Care Management" },
    { href: "/services/mysafepatch", label: "MySafePatch" },
    { href: "/services/medical-appointments", label: "Medical Appointments" },
    { href: "/services/wellness-visits", label: "Wellness Visits" },
    { href: "/services/fall-prevention", label: "Fall Prevention" },
    { href: "/services/assisted-living", label: "Assisted Living" },
];

const mainLinks = [
    { href: "/", label: "HOME" },
    { href: "/about-us", label: "ABOUT US" },
    { href: "/why-cerna", label: "WHY CERNA" },
    { href: "/locations", label: "LOCATIONS" },
    { href: "/careers", label: "CAREERS" },
    { href: "/contact-us", label: "CONTACT US" },
];

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const isServicesActive =
        pathname === "/services" || pathname.startsWith("/services/");

    return (
        <header className={styles.header}>
            <div className={styles.navRow}>
                <Link href="/" className={styles.logoLink}>
                    <img
                        src="/assets/cerna-caring-seniors.webp"
                        alt="Cerna Home Care"
                        className={styles.logo}
                    />
                </Link>

                <nav className={styles.mainNav}>
                    <ul className={styles.navList}>
                        {mainLinks.slice(0, 3).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={isActive(item.href) ? styles.active : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        <li className={styles.servicesItem}>
                            <Link
                                href="/services"
                                className={`${styles.servicesLink} ${isServicesActive ? styles.active : ""
                                    }`}
                            >
                                SERVICES
                            </Link>

                            <ul className={styles.servicesDropdown}>
                                {serviceLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={
                                                isActive(item.href) ? styles.active : undefined
                                            }
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {mainLinks.slice(3).map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={isActive(item.href) ? styles.active : undefined}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Link href="tel:8775776782" className={styles.callBtn}>
                    (877) 577-6782
                </Link>
            </div>
        </header>
    );
}