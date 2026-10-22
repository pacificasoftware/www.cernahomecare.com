
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Medicare GUIDE Dementia Care | Cerna Home Care",
    description:
        "Learn about Medicare GUIDE dementia support, care navigation, caregiver education, and respite services for eligible families.",
};

const benefits = [
    {
        title: "Dedicated Dementia Care Navigator",
        text: "A personalized care navigator helps coordinate appointments, develop care plans, and connect families with medical and community resources.",
    },
    {
        title: "24/7 Caregiver Support",
        text: "Access around-the-clock guidance for family caregivers, including support with changing care needs and difficult situations.",
    },
    {
        title: "Caregiver Training & Education",
        text: "Receive guidance on dementia-related behaviors, fall prevention, medication routines, home safety, and everyday caregiving.",
    },
    {
        title: "Covered Respite Care",
        text: "Eligible families may receive up to $2,625 in Medicare-covered respite services during the July 2026 through June 2027 GUIDE performance year.",
    },
];

const steps = [
    {
        title: "Free Consultation",
        text: "Contact Cerna to discuss your loved one's current dementia care needs and learn more about GUIDE services.",
    },
    {
        title: "Eligibility Review",
        text: "Our team reviews Medicare coverage, dementia-related requirements, and potential respite eligibility.",
    },
    {
        title: "Personalized Care Plan",
        text: "A dementia care navigator helps coordinate a care plan tailored to your loved one's needs and your family's circumstances.",
    },
    {
        title: "Care & Support Begins",
        text: "Eligible participants begin receiving approved care navigation, caregiver support, and applicable respite services.",
    },
];

const faqs = [
    {
        q: "Will my loved one need to change doctors?",
        a: "No. GUIDE care navigation works alongside existing doctors, specialists, and primary care providers.",
    },
    {
        q: "Does everyone receive $2,625 in respite care?",
        a: "No. Respite services are available only to eligible participants and are subject to GUIDE coverage requirements and applicable annual limits.",
    },
    {
        q: "Can someone with Medicare and Medi-Cal qualify?",
        a: "Potentially. People with Medicare and Medi-Cal may qualify if they meet Original Medicare and other GUIDE eligibility requirements.",
    },
    {
        q: "Are GUIDE services provided at no additional cost?",
        a: "Covered GUIDE services have no additional beneficiary cost-sharing. Other services outside GUIDE may have separate charges.",
    },
    {
        q: "When does the annual respite benefit reset?",
        a: "The GUIDE performance year runs from July 1 through June 30. Applicable limits and eligibility requirements may change in future years.",
    },
];

export default function GuideDementiaCarePage() {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.wrap}>
                    <p className={styles.eyebrow}>
                        CERNA HOME CARE · MEDICARE GUIDE PROGRAM
                    </p>

                    <h1>
                        More Dementia Care Support.
                        More Peace of Mind.
                    </h1>

                    <p className={styles.lead}>
                        Discover the CMS GUIDE Model (Guiding an Improved
                        Dementia Experience): personalized care navigation,
                        round-the-clock caregiver support, and covered
                        respite services for eligible families.
                    </p>

                    <div className={styles.buttons}>
                        <a
                            className={styles.primary}
                            href="tel:8775776782"
                        >
                            Call (877) 577-6782
                        </a>

                        <a
                            className={styles.secondary}
                            href="#consultation"
                        >
                            Request a GUIDE Consultation
                        </a>
                    </div>

                    <p className={styles.note}>
                        GUIDE participation, covered services, and respite
                        eligibility must be confirmed. The program is not
                        a cash benefit.
                    </p>
                </div>
            </section>

            <section className={styles.wrap}>
                <div className={styles.highlight}>
                    <div>
                        <p className={styles.eyebrow}>
                            2026–2027 GUIDE PERFORMANCE YEAR
                        </p>

                        <strong>Up to $2,625 FREE</strong>

                        <p>
                            In covered respite services for eligible
                            beneficiaries, from July 1, 2026 through
                            June 30, 2027.
                        </p>
                    </div>

                    <p>
                        There is no GUIDE cost-sharing for covered
                        services. The amount is an annual service-payment
                        cap—not a payment made to patients or caregivers—
                        and CMS may adjust it in future years.
                    </p>
                </div>

                <h2>
                    How the GUIDE Program Supports Your Family
                </h2>

                <div className={styles.cards}>
                    {benefits.map((b) => (
                        <article
                            className={styles.card}
                            key={b.title}
                        >
                            <h3>{b.title}</h3>
                            <p>{b.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.tinted}>
                <div className={styles.wrap}>
                    <h2>Who May Qualify?</h2>

                    <p>
                        GUIDE is designed for individuals living with
                        dementia who meet CMS requirements. An initial
                        review typically considers:
                    </p>

                    <ul className={styles.list}>
                        <li>
                            A dementia diagnosis confirmed by a
                            qualified GUIDE clinician.
                        </li>

                        <li>
                            Original Medicare Parts A and B, with
                            Medicare as the primary payer—not Medicare
                            Advantage or PACE.
                        </li>

                        <li>
                            Living in a private home or an approved
                            participating residential care community;
                            not a nursing home or memory care unit.
                        </li>

                        <li>
                            Not currently electing the Medicare hospice
                            benefit or enrolled with another GUIDE
                            participant.
                        </li>

                        <li>
                            For respite care specifically: a qualifying
                            dementia severity/care tier, an identified
                            unpaid primary caregiver, and an eligible
                            living arrangement. Since July 1, 2026,
                            residents of residential care communities
                            are not eligible for GUIDE respite.
                        </li>
                    </ul>

                    <p className={styles.note}>
                        Medicare and Medi-Cal dual eligibility may be
                        compatible when Original Medicare requirements
                        are met. Enrollment is voluntary and subject
                        to CMS confirmation.
                    </p>
                </div>
            </section>

            <section className={styles.wrap}>
                <h2>What Does GUIDE Respite Care Look Like?</h2>

                <p>
                    Respite gives unpaid family caregivers time to rest,
                    attend appointments or work, and care for themselves.
                    When approved, support may include in-home help with
                    supervision, mobility, hydration, meal routines,
                    personal care prompts, and wandering-risk awareness.
                    Adult day services and short facility stays may also
                    qualify, depending on the individual care plan.
                </p>

                <p>
                    The GUIDE program covers only approved respite
                    services up to the applicable annual limit; it
                    does not replace every home-care service or
                    guarantee a fixed number of hours.
                </p>

                <h2>Getting Started Is Straightforward</h2>

                <div className={styles.steps}>
                    {steps.map((s, i) => (
                        <article key={s.title}>
                            <span className={styles.stepNum}>
                                {i + 1}
                            </span>

                            <div>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className={styles.tinted}>
                <div className={styles.wrap}>
                    <h2>Frequently Asked Questions</h2>

                    <div className={styles.faqs}>
                        {faqs.map((f) => (
                            <details key={f.q}>
                                <summary>{f.q}</summary>
                                <p>{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="consultation"
                className={styles.wrap}
            >
                <div className={styles.consult}>
                    <p className={styles.eyebrow}>
                        LET&apos;S TALK
                    </p>

                    <h2>
                        Request Your GUIDE Eligibility Consultation
                    </h2>

                    <p>
                        Start with a conversation about your loved
                        one&apos;s care needs. Call Cerna directly to
                        ask about the GUIDE program and whether
                        services are available in your area.
                    </p>

                    <div className={styles.buttons}>
                        <a
                            className={styles.primary}
                            href="tel:8775776782"
                        >
                            Call (877) 577-6782
                        </a>

                        <Link
                            className={styles.secondary}
                            href="/services/memory-care"
                        >
                            Explore Memory Care
                        </Link>
                    </div>

                    <p className={styles.note}>
                        To protect private medical information, do not
                        send Medicare IDs or dates of birth through an
                        ordinary website contact form. Cerna can arrange
                        secure collection of sensitive details during
                        intake.
                    </p>
                </div>

                <p className={styles.source}>
                    Program guidance:{" "}
                    <a
                        href="https://www.cms.gov/priorities/innovation/guide/faqs"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CMS GUIDE FAQs
                    </a>
                    {" "}and{" "}
                    <a
                        href="https://www.cms.gov/priorities/innovation/files/guide-payment-methodology-paper.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CMS payment methodology
                    </a>
                    . Information current as of October 2026;
                    eligibility and limits may change.
                </p>
            </section>
        </main>
    );
}
