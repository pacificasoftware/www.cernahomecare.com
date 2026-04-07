"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    return (
        <header className={styles.header}>
            <div className={styles.navRow}>
                <Link href="/" aria-label="Go to homepage" className={styles.logoLink}>
                    <img
                        src="https://cernafranchising.com/wp-content/uploads/2025/07/cerna-caring-seniors.jpg"
                        width="200"
                        height="97"
                        alt="Cerna Franchising Logo"
                        className={styles.logo}
                    />
                </Link>

                <nav className={styles.mainNav}>
                    <ul>
                        <li>
                            <Link href="/" className={isActive("/") ? styles.active : ""}>
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link href="/our-brand" className={isActive("/aboutus") ? styles.active : ""}>
                               ABOUT US
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className={isActive("/services") ? styles.active : ""}>
                              SERVICES
                            </Link>
                        </li>
                        <li>
                            <Link href="/locations" className={isActive("/locations") ? styles.active : ""}>
                                LOCATIONS&apos;S
                            </Link>
                        </li>
                      
                        <li>
                            <Link href="/contact" className={isActive("/contact") ? styles.active : ""}>
                                CONTACT US
                            </Link>
                        </li>
                    </ul>
                </nav>

                <a href="tel:8447443866" className={styles.callBtn}>
                    (844) 744-3866
                </a>
            </div>
        </header>
    );
}