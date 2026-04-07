import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.links}>
                    <Link href="/blog">Cerna Blog</Link>
                    <span className={styles.divider}>|</span>
                    <Link href="/terms">Terms &amp; Conditions</Link>
                    <span className={styles.divider}>|</span>
                    <Link href="/privacy">Privacy Policy</Link>
                </div>
            </div>

            <div className={styles.copyRow}>
                <p className={styles.copy}>
                    Copyright 2025 © Cerna Homecare
                </p>
            </div>
        </footer>
    );
}