"use client";

import { useState, type FormEvent } from "react";

export default function GuideLeadForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [hasMedicare, setHasMedicare] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submitting) return;
        const formData = new FormData(event.currentTarget);
        console.log("Honeypot value:", JSON.stringify(formData.get("website")));
        setMessage("");
        setSuccess(false);
        setSubmitting(true);
        try {
            const response = await fetch("/api/dementia-inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    phone: phone.trim(),
                    email: email.trim(),
                    hasMedicare,
                    website: "",
                }),
            });
            if (!response.ok) throw new Error("Unable to submit right now. Please try again.");
            setSuccess(true);
            setMessage("Your information has been sent!");
            setName("");
            setPhone("");
            setEmail("");
            setHasMedicare(false);
        } catch {
            setMessage("We couldn't send your request. Please try again or call us.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form className="guideLeadForm" onSubmit={handleSubmit}>
            <h2>Request More Information</h2>
            <label htmlFor="guide-name">Name</label>
            <input id="guide-name" autoComplete="name" required maxLength={120}
                value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            <label htmlFor="guide-phone">Phone</label>
            <input id="guide-phone" type="tel" autoComplete="tel" required maxLength={35}
                value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
            <label htmlFor="guide-email">Email</label>
            <input id="guide-email" type="email" autoComplete="email" required maxLength={254}
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
            <label className="guideSwitchRow" htmlFor="guide-medicare">
                <span>Does the care recipient have Medicare?</span>
                <span className="guideSwitch">
                    <input id="guide-medicare" type="checkbox" role="switch"
                        aria-checked={hasMedicare} checked={hasMedicare}
                        onChange={(e) => setHasMedicare(e.target.checked)} />
                    <span className="guideSwitchThumb" />
                </span>
            </label>
            <input name="website" type="text" tabIndex={-1} autoComplete="off"
                aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
            <button type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Submit Request"}
            </button>
            {message && <p className={`formFeedback ${success ? "success" : "error"}`} role="status">{message}</p>}
            <p className="formPrivacy">By submitting, you agree to be contacted by Cerna Home Care about your inquiry.</p>
        </form>
    );
}
