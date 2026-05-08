import "../website-terms/website-terms.css";

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-white">
            <section className="bg-[#00456B] px-6 py-20 text-white">
                <div className="website-terms-container text-center">
                    <h1 className="text-5xl font-extrabold text-white md:text-6xl">
                        Privacy Policy
                    </h1>

                    <p className="terms-hero-subtitle">
                        Effective Date: Jan 1, 2026
                    </p>
                </div>
            </section>

            <section className="px-6 py-16">
                <div className="website-terms-container">
                    <p>
                        Your privacy is very important to us. This Privacy Policy
                        explains how we collect, use, communicate, and disclose
                        personal information, including your consent to receive SMS
                        text messages.
                    </p>

                    <h2 className="terms-heading">1. Information We Collect</h2>

                    <p>
                        We may collect personal information including, but not
                        limited to:
                    </p>

                    <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Telephone number</li>
                        <li>
                            Information submitted through website forms, written
                            forms, phone calls, or other communications
                        </li>
                    </ul>

                    <p>
                        Personal information is collected only by lawful and fair
                        means, and with your knowledge or consent where appropriate.
                    </p>

                    <h2 className="terms-heading">2. How We Use Your Information</h2>

                    <p>We collect and use personal information to:</p>

                    <ul>
                        <li>Respond to your inquiries</li>
                        <li>Provide services or information you request</li>
                        <li>
                            Communicate by phone, email, or SMS when you provide
                            consent
                        </li>
                        <li>Improve our services and support operations</li>
                        <li>Comply with legal and regulatory obligations</li>
                    </ul>

                    <p>
                        We will only retain personal information as long as necessary
                        to fulfill the purposes for which it was collected, unless
                        otherwise required by law.
                    </p>

                    <h2 className="terms-heading">3. SMS Messaging &amp; Consent</h2>

                    <p>
                        If you provide your mobile phone number, you are expressly
                        consenting to receive SMS text messages from Cerna Homecare.
                        This consent applies only to the specific messages you have
                        opted into.
                    </p>

                    <p>Consent is obtained through one or more of the following:</p>

                    <ul>
                        <li>Online website forms with explicit SMS opt-in wording</li>
                        <li>Written or paper forms with SMS opt-in language</li>
                        <li>Verbal or other documented consent methods</li>
                    </ul>

                    <p>
                        Message &amp; data rates may apply. Message frequency may
                        vary.
                    </p>

                    <p>
                        You can reply HELP for more information. You can reply STOP
                        at any time to opt out of further messaging.
                    </p>

                    <p>
                        You are not required to consent to SMS messaging as a
                        condition of purchasing any goods or services.
                    </p>

                    <h2 className="terms-heading">
                        4. SMS Opt-In on Web and Written Forms
                    </h2>

                    <p>To ensure compliance with SMS consent regulations:</p>

                    <ul>
                        <li>
                            All website forms that collect a phone number for
                            potential SMS communication will include a checkbox or
                            disclosure statement indicating that by providing a phone
                            number and submitting the form, you consent to be
                            contacted via SMS.
                        </li>
                        <li>
                            Written forms provided in person or by mail will include
                            similar SMS consent language.
                        </li>
                    </ul>

                    <h2 className="terms-heading">
                        5. Sharing of Personal Information
                    </h2>

                    <p>
                        We do not share your mobile phone number, SMS opt-in data, or
                        consent information with third parties or affiliates for
                        marketing or promotional purposes.
                    </p>

                    <p>We may share personal information with:</p>

                    <ul>
                        <li>
                            Service providers who assist us with SMS delivery or
                            technical operations
                        </li>
                        <li>Legal or regulatory authorities as required by law</li>
                        <li>Other parties only with your explicit consent</li>
                    </ul>

                    <p>
                        SMS opt-in data and consent records will be maintained
                        securely and will not be sold or shared for marketing use.
                    </p>

                    <h2 className="terms-heading">6. Data Security</h2>

                    <p>
                        We protect personal information by implementing reasonable
                        and appropriate administrative, technical, and physical
                        safeguards against loss, theft, unauthorized access,
                        disclosure, copying, use, or modification.
                    </p>

                    <h2 className="terms-heading">7. Accuracy &amp; Access</h2>

                    <p>
                        We strive to keep personal data accurate, complete, and
                        up-to-date. You may contact us to access or correct your
                        information.
                    </p>

                    <h2 className="terms-heading">
                        8. Policy Availability &amp; Updates
                    </h2>

                    <p>
                        This Privacy Policy is available on our website. We may
                        update it periodically. Material changes will be reflected
                        here with an updated effective date.
                    </p>

                    <h2 className="terms-heading">9. Contact Information</h2>

                    <p>
                        If you have questions about this policy, how we handle your
                        data, or your SMS consent choices, please contact us:
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:info@cernahc.com">info@cernahc.com</a>
                        <br />
                        <strong>Phone:</strong>{" "}
                        <a href="tel:18775776782">(877) 577-6782</a>
                    </p>
                </div>
            </section>
        </main>
    );
}