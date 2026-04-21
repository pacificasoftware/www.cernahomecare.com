import Link from "next/link";
import styles from "./Navbar.module.css";

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
                    <ul>
                        <li>
                            <Link href="/" className={styles.active}>
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link href="/about-us">
                                ABOUT US
                            </Link>
                        </li>
                        <li>
                            <Link href="/whycerna">
                              WHY CERNA
                            </Link>
                        </li>
                        <li>
                            <Link href="/services">
                                SERVICES
                            </Link>
                        </li>
                        <li>
                            <Link href="/locations">
                                LOCATIONS
                            </Link>
                        </li>
                        <li>
                            <Link href="/careers">
                                CAREERS
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact-us">
                                CONTACT US
                            </Link>
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