import Link from "next/link";
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

export default function Navbar() {
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
                        <li>
                            <Link href="/" className={styles.active}>
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link href="/about-us">ABOUT US</Link>
                        </li>
                        <li>
                            <Link href="/whycerna">WHY CERNA</Link>
                        </li>

                        <li className={styles.servicesItem}>
                            <Link href="/services" className={styles.servicesLink}>
                                SERVICES
                            </Link>

                            <ul className={styles.servicesDropdown}>
                                {serviceLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li>
                            <Link href="/locations">LOCATIONS</Link>
                        </li>
                        <li>
                            <Link href="/careers">CAREERS</Link>
                        </li>
                        <li>
                            <Link href="/contact-us">CONTACT US</Link>
                        </li>
                    </ul>
                </nav>

                <Link href="tel:8775776782" className={styles.callBtn}>
                    (877) 577-6782
                </Link>
            </div>
        </header>
    );
}