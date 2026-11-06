
"use client";

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackConsultationConversion(): void {
    if (typeof window === "undefined") return;

    if (typeof window.gtag !== "function") {
        console.warn("Google Ads tag is not available.");
        return;
    }

    window.gtag("event", "conversion", {
        send_to: "AW-1050038364/6NavCPPs9bIdENyg2fQD",
    });
}
