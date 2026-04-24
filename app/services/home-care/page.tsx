import Image from "next/image";
import Link from "next/link";
import styles from "./HomeCarePage.module.css";

const careTypes = [
    {
        title: "Live-in Care",
        desc: "Care provided up to 16 hours per day with a dedicated caregiver always present.",
    },
    {
        title: "Hourly Care",
        desc: "Flexible scheduling from as little as 4 hours up to full-day care.",
    },
    {
        title: "24 Hour Care",
        desc: "Continuous support with rotating caregivers covering both day and night shifts.",
    },
    {
        title: "Memory Care",
        desc: "Specialized care for Alzheimer’s and dementia with trained caregivers.",
    },
    {
        title: "Cognitive Care",
        desc: "Help with appointments, errands, and daily mental engagement activities.",
    },
    {
        title: "Care Management",
        desc: "Ongoing coordination and support — always available when you need us.",
    },
];

export default function HomeCarePage() {
    return (
        <main className={styles.page}>
            <section className={styles.heroSection}>
                <div className={styles.heroContainer}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Hourly &amp; Personal Care Services</h1>

                        <p className={styles.heroText}>
                            With Cerna In-Home Care Services, you are treated like family.
                            Whether you need a few hours of help each day or full-time care,
                            we provide flexible solutions tailored to your needs.
                        </p>

                        <div className={styles.heroActions}>
                            <Link href="tel:8775776782" className={styles.primaryButton}>
                                Call (877) 577-6782
                            </Link>
                        </div>
                    </div>

                 
                </div>
            </section>

            <section className={styles.cernaBoxSection}>
                <Image
                    src="/assets/cerna-box.webp"
                    alt="Cerna Homecare is a local leader in the home care service industry"
                    width={1600}
                    height={420}
                    className={styles.cernaBoxImage}
                    priority
                />
            </section>


            <section className={styles.servicesSection}>
                <div className={styles.sectionIntro}>
                    <h2 className={styles.sectionTitle}>Flexible Care Options</h2>
                    <p className={styles.sectionText}>
                        We offer a wide range of care services designed to support comfort,
                        independence, and peace of mind.
                    </p>
                </div>

                <div className={styles.cardsGrid}>
                    {careTypes.map((item) => (
                        <div key={item.title} className={styles.card}>
                            <div className={styles.cardIcon}>✓</div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardText}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.trustSection}>
                <div className={styles.trustContainer}>
                    <h2 className={styles.trustTitle}>Trusted &amp; Qualified Caregivers</h2>

                    <p className={styles.trustText}>
                        All Cerna Care Aides have at least one year of experience, are
                        thoroughly background checked, DMV verified, and trained in cognitive
                        impairment care. Each caregiver completes in-house training and
                        maintains current CPR and First Aid certification.
                    </p>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.ctaBox}>
                    <h2 className={styles.ctaTitle}>Ready to get started?</h2>
                    <p className={styles.ctaText}>
                        Contact us today for a complimentary in-home consultation.
                    </p>

                    <div className={styles.ctaActions}>
                        <Link href="/contact-us" className={styles.secondaryButton}>
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}