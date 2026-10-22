import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import GuideLeadForm from "@/components/DementiaForm";

export const metadata: Metadata = {
    title: "Medicare GUIDE Dementia Support | Cerna Home Care",
    description:
        "Discover dementia care navigation, 24/7 caregiver support, and respite benefits available to eligible families through the Medicare GUIDE program.",
    robots: { index: false, follow: true },
};

const benefits = [
    { icon: "✦", title: "Personalized Care Navigation", description: "Dedicated dementia care guidance" },
    { icon: "◷", title: "24/7 Caregiver Support", description: "Help when your family needs it" },
    { icon: "♡", title: "Respite Care", description: "Covered relief for eligible caregivers" },
];

export default function GuideDementiaLandingPage() {
    return (
        <main className="guideLanding">
            <div className="landingShell">
                <header className="brandBar">
                    <span className="programLabel">MEDICARE GUIDE PROGRAM</span>
                </header>

                <section className="hero">
                    <div className="heroContent">
                        <div className="heroLogo" aria-label="Cerna Home Care">
                            <div className="brand">
                                <div className="brandMark" aria-hidden="true">C</div>
                                <div className="brandText">
                                    <strong>CERNA</strong>
                                    <span>HOME CARE</span>
                                </div>
                            </div>
                        </div>
                        <div className="eyebrow">SPECIALIZED DEMENTIA CARE SUPPORT</div>
                        <h1>Caring for someone with dementia shouldn&apos;t mean doing it alone.</h1>

                        <div className="benefitList">
                            {benefits.map((benefit) => (
                                <div className="benefit" key={benefit.title}>
                                    <div className="benefitIcon" aria-hidden="true">{benefit.icon}</div>
                                    <div className="benefitCopy">
                                        <strong>{benefit.title}</strong>
                                        <span>{benefit.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="actions">
                            <Link href="/guide-dementia-care" className="primaryButton">
                                Explore GUIDE Benefits <span aria-hidden="true">→</span>
                            </Link>
                            <a href="tel:8775776782" className="secondaryButton">Call (877) 577-6782</a>
                        </div>
                        <p className="disclaimer">
                            Eligibility, program participation, and covered respite services must be confirmed before enrollment.
                        </p>
                    </div>

                    <div className="visualColumn">
                        <div className="photoContainer">
                            <Image
                                src="/assets/caregiver.webp"
                                alt="Compassionate senior memory care"
                                fill
                                priority
                                sizes="(max-width: 900px) 100vw, 52vw"
                                className="heroPhoto"
                            />
                            <div className="photoOverlay">
                                <span>COMPASSIONATE CARE AT HOME</span>
                            </div>
                            <div className="guideFormOverlay"><GuideLeadForm /></div>
                        </div>

                        <div className="fundingCard">
                            <div className="fundingText">
                                <span className="fundingLabel">2026–2027 GUIDE RESPITE BENEFIT</span>
                                <strong>Up to $2,625</strong>
                                <strong>in FREE respite</strong>
                                <p>caregiving services for eligible Medicare beneficiaries</p>
                            </div>
                            <div className="fundingSymbol" aria-hidden="true">♡</div>
                        </div>
                    </div>
                </section>

                <div className="bottomBar">
                    <span>© {new Date().getFullYear()} Cerna Home Care</span>
                    <span>GUIDE respite eligibility and annual limits are determined by CMS program rules.</span>
                </div>
            </div>

            <style>{`
            .guideLanding {
                min-height: 100vh;
                background: linear-gradient(150deg,#eaf3fb 0%,#f8fbfd 31%,#fff 70%);
                color: #092c56;
                font-family: Arial,Helvetica,sans-serif;
            }

            .guideLanding * {
                box-sizing: border-box;
            }

            .landingShell {
                max-width: 1500px;
                min-height: 100vh;
                margin: auto;
                padding: 20px clamp(22px,4.3vw,72px) 18px;
                display: flex;
                flex-direction: column;
            }

            .brandBar {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 20px;
                padding-bottom: 10px;
            }

            .heroLogo {
                margin: 0 0 18px;
            }

            .brand {
                display: flex;
                align-items: center;
                gap: 11px;
            }

            .brandMark {
                width: 45px;
                height: 45px;
                border-radius: 12px;
                background: #075479;
                color: #fff;
                display: grid;
                place-items: center;
                font-size: 27px;
                font-weight: 800;
                box-shadow: 0 5px 15px #07547920;
            }

            .brandText {
                display: flex;
                flex-direction: column;
                line-height: 1;
                gap: 5px;
            }

            .brandText strong {
                font-size: 25px;
                font-weight: 800;
                letter-spacing: 2.5px;
                color: #075479;
            }

            .brandText span {
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 3.3px;
                color: #698495;
            }

            .programLabel {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background: #e9f2fc;
                border-radius: 999px;
                padding: 16px 23px;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 2.4px;
                color: #0d376a;
                text-align: center;
            }

            .hero {
                display: grid;
                grid-template-columns: minmax(0,.94fr) minmax(0,1.06fr);
                align-items: stretch;
                gap: clamp(30px,4.1vw,65px);
                flex: 0 0 auto;
                padding: 12px 0 27px;
            }

            .heroContent {
                min-width: 0;
                padding: 0;
                align-self: stretch;
                display: flex;
                flex-direction: column;
            }

            .eyebrow {
                display: inline-block;
                color: #314e6d;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 2.2px;
                margin-bottom: 16px;
            }

            .eyebrow::after {
                content: "";
                display: block;
                width: 90px;
                height: 2px;
                background: #3ba87b;
                margin-top: 15px;
            }

            .hero h1 {
                margin: 0 0 22px;
                color: #082b5a;
                font-size: clamp(30px,3vw,42px);
                line-height: 1.16;
                letter-spacing: -1.3px;
                font-weight: 800;
            }

            .benefitList {
                display: grid;
                gap: 12px;
                margin-bottom: 22px;
            }

            .benefit {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .benefitIcon {
                width: 38px;
                height: 38px;
                border-radius: 50%;
                flex: 0 0 38px;
                display: grid;
                place-items: center;
                background: #d7f0f8;
                color: #11699a;
                font-size: 19px;
            }

            .benefit:nth-child(2) .benefitIcon {
                background: #dcefe8;
                color: #208d72;
            }

            .benefit:nth-child(3) .benefitIcon {
                background: #f9e0ec;
                color: #dc4b8b;
            }

            .benefitCopy {
                display: grid;
                gap: 2px;
            }

            .benefitCopy strong {
                color: #0a315f;
                font-size: 14px;
                line-height: 1.15;
            }

            .benefitCopy span {
                color: #566d84;
                font-size: 12px;
                line-height: 1.35;
            }

            .actions {
                display: flex;
                align-items: stretch;
                gap: 12px;
                flex-wrap: wrap;
                margin-bottom: 22px;
            }

            .primaryButton,.secondaryButton {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 16px;
                min-height: 53px;
                padding: 14px 20px;
                font-size: 13px;
                font-weight: 800;
                border-radius: 13px;
                text-decoration: none;
                text-align: center;
            }

            .primaryButton {
                background: #07518a;
                color: white;
                box-shadow: 0 8px 20px #07518a20;
            }

            .primaryButton:hover {
                background: #073d70;
            }

            .secondaryButton {
                color: #07518a;
                background: white;
                border: 1.5px solid #07518a;
            }

            .secondaryButton:hover {
                background: #edf5fd;
            }

            .primaryButton:focus-visible,.secondaryButton:focus-visible {
                outline: 3px solid #49a18d;
                outline-offset: 3px;
            }

            .disclaimer {
                color: #62758a;
                font-size: 12px;
                line-height: 1.65;
                margin: auto 0 0;
                padding-top: 24px;
                max-width: 510px;
            }

            .visualColumn {
                min-width: 0;
                display: grid;
                gap: 15px;
                align-self: start;
            }

            .photoContainer {
                position: relative;
                height: clamp(490px,47vw,615px);
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 15px 35px #14345c14;
                isolation: isolate;
            }

            .heroPhoto {
                object-fit: cover;
                object-position: 44% center;
            }

            .photoOverlay {
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                padding: 55px 26px 22px;
                background: linear-gradient(transparent,rgba(7,33,54,.72));
                z-index: 1;
                pointer-events: none;
            }

            .photoOverlay span {
                font-size: 10px;
                color: white;
                font-weight: 800;
                letter-spacing: 2.5px;
            }

            .guideFormOverlay {
                position: absolute;
                z-index: 2;
                top: 50%;
                right: 16px;
                transform: translateY(-50%);
                width: min(220px, calc(100% - 32px));
                max-height: calc(100% - 32px);
                overflow-y: auto;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.65);
                border-radius: 16px;
                padding: 15px 12px;
                box-shadow: 0 12px 30px rgba(0, 26, 54, 0.20);
            }

            .guideLeadForm {
                gap: 6px;
            }

            .guideLeadForm h2 {
                font-size: 22px;
                font-weight: 800;
                line-height: 1.16;
                margin: 0 0 13px;
                color: #092e61;
            }

            .guideLeadForm > label:not(.guideSwitchRow) {
                font-size: 12px;
                font-weight: 700;
                margin-top: 2px;
            }

            .guideLeadForm > input:not([name="website"]) {
                width: 100%;
                min-width: 0;
                background: white;
                border: 1px solid #cedbe7;
                border-radius: 9px;
                padding: 9px 11px;
                min-height: 40px;
                font: inherit;
                font-size: 13px;
                color: #183f5f;
            }

            .guideLeadForm > input:focus-visible {
                outline: 2px solid #2b91bc;
                outline-offset: 1px;
            }

            .guideSwitchRow {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 7px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 700;
                margin: 12px 0 7px;
            }

            .guideSwitch {
                position: relative;
                flex: 0 0 42px;
                width: 42px;
                height: 24px;
            }

            .guideSwitch input {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                margin: 0;
                opacity: 0;
                z-index: 1;
                cursor: pointer;
            }

            .guideSwitchThumb {
                display: block;
                width: 100%;
                height: 100%;
                background: #b6c7d0;
                border-radius: 40px;
                transition: background .2s;
            }

            .guideSwitchThumb::after {
                content: "";
                position: absolute;
                top: 3px;
                left: 3px;
                background: white;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                box-shadow: 0 1px 4px #0003;
                transition: transform .2s;
            }

            .guideSwitch input:checked + .guideSwitchThumb {
                background: #148e6d;
            }

            .guideSwitch input:checked + .guideSwitchThumb::after {
                transform: translateX(18px);
            }

            .guideSwitch input:focus-visible + .guideSwitchThumb {
                outline: 3px solid #2b91bc;
                outline-offset: 2px;
            }

            .guideLeadForm button {
                cursor: pointer;
                border: 0;
                border-radius: 10px;
                background: #07518a;
                color: white;
                font-size: 13px;
                font-weight: 800;
                padding: 11px 10px;
                margin-top: 3px;
                min-height: 42px;
            }

            .guideLeadForm button:disabled {
                cursor: wait;
                opacity: .65;
            }

            .formFeedback {
                margin: 0;
                font-size: 11px;
            }

            .formFeedback.success {
                color: #176b41;
            }

            .formFeedback.error {
                color: #aa3535;
            }

            .formPrivacy {
                color: #718394;
                margin: 3px 0 0;
                font-size: 10px;
                line-height: 1.45;
            }

            .fundingCard {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 18px;
                border-radius: 22px;
                padding: 25px 30px;
                background: #e4f1ff;
            }

            .fundingText {
                display: flex;
                flex-direction: column;
                gap: 3px;
                min-width: 0;
            }

            .fundingLabel {
                color: #154475;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 1.8px;
                margin-bottom: 10px;
            }

            .fundingText strong {
                color: #092f64;
                font-size: clamp(29px,3vw,43px);
                letter-spacing: -1.5px;
                line-height: 1.07;
            }

            .fundingText p {
                color: #405b75;
                margin: 9px 0 0;
                font-size: 13px;
                line-height: 1.4;
            }

            .fundingSymbol {
                color: #82b1e5;
                flex: 0 0 auto;
                font-size: clamp(65px,8vw,115px);
                font-family: Georgia,serif;
                line-height: 1;
            }

            .bottomBar {
                margin-top: auto;
                border-top: 1px solid #e0eaf1;
                padding-top: 14px;
                display: flex;
                justify-content: space-between;
                gap: 18px;
                color: #8494a5;
                font-size: 10px;
            }

            /* Desktop: make both columns share the height of the image + respite card. */
            @media (min-width:901px) {
                .hero {
                    align-items: stretch;
                }

                .heroContent {
                    align-self: stretch;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .visualColumn {
                    align-self: stretch;
                }

                .disclaimer {
                    margin: 0;
                    padding-top: 16px;
                }

            }

            @media (max-width:1100px) {
                .hero {
                    gap: 25px;
                }

                .benefitIcon {
                    width: 38px;
                    height: 38px;
                    flex-basis: 38px;
                    font-size: 19px;
                }

                .fundingCard {
                    padding: 20px;
                }

            }

            @media (max-width:900px) {
                .hero {
                    grid-template-columns: 1fr;
                    padding-top: 30px;
                    gap: 27px;
                }

                .heroContent {
                    padding: 0;
                }

                .disclaimer {
                    margin-top: 0;
                    padding-top: 0;
                }

                .hero h1 {
                    max-width: 700px;
                }

                .benefitList {
                    grid-template-columns: repeat(3,minmax(0,1fr));
                    gap: 14px;
                }

                .benefit {
                    align-items: flex-start;
                    gap: 10px;
                }

                .benefitIcon {
                    width: 36px;
                    height: 36px;
                    flex-basis: 36px;
                    font-size: 18px;
                }

                .benefitCopy strong {
                    font-size: 14px;
                }

                .benefitCopy span {
                    font-size: 12px;
                }

                .photoContainer {
                    height: 550px;
                }

                .guideFormOverlay {
                    width: 245px;
                }

            }

            @media (max-width:600px) {
                .landingShell {
                    padding: 15px 18px 18px;
                }

                .heroLogo {
                    margin-bottom: 14px;
                }

                .brandMark {
                    width: 40px;
                    height: 40px;
                    font-size: 24px;
                }

                .brandText strong {
                    font-size: 22px;
                }

                .brandText span {
                    font-size: 9px;
                }

                .programLabel {
                    padding: 10px 11px;
                    max-width: 150px;
                    font-size: 9px;
                    letter-spacing: 1px;
                    line-height: 1.4;
                }

                .hero h1 {
                    font-size: clamp(33px,8vw,42px);
                    margin-bottom: 25px;
                }

                .eyebrow {
                    font-size: 10px;
                    letter-spacing: 1.5px;
                }

                .benefitList {
                    grid-template-columns: 1fr;
                    gap: 17px;
                    margin-bottom: 26px;
                }

                .benefit {
                    align-items: center;
                }

                .benefitIcon {
                    width: 38px;
                    height: 38px;
                    flex-basis: 38px;
                }

                .benefitCopy strong {
                    font-size: 14px;
                }

                .benefitCopy span {
                    font-size: 12px;
                }

                .actions {
                    flex-direction: column;
                }

                .primaryButton,.secondaryButton {
                    width: 100%;
                }

                .photoContainer {
                    height: 610px;
                }

                .guideFormOverlay {
                    right: 12px;
                    width: min(245px,calc(100% - 24px));
                    padding: 17px 15px;
                }

                .photoOverlay {
                    padding-left: 17px;
                    padding-right: 17px;
                }

                .photoOverlay span {
                    font-size: 9px;
                    letter-spacing: 1.4px;
                }

                .fundingCard {
                    padding: 19px;
                }

                .fundingLabel {
                    font-size: 9px;
                    letter-spacing: 1.1px;
                }

                .fundingText strong {
                    font-size: clamp(26px,7vw,35px);
                }

                .fundingSymbol {
                    font-size: 55px;
                }

                .bottomBar {
                    flex-direction: column;
                    text-align: center;
                    gap: 7px;
                }

            }

            @media (prefers-reduced-motion:reduce) {
                .guideSwitchThumb,.guideSwitchThumb::after {
                    transition: none;
                }

            }
            /* Mobile Only - Narrower Form */
@media (max-width: 600px) {
    .guideFormOverlay {
        right: 12px;
        width: min(200px, calc(100% - 24px));
        padding: 12px 10px;
    }
}
        `}</style>
        </main>
    );
}
