// src/app/report-spam/page.tsx
// This page only confirms the action: opening an email must NEVER auto-report spam.
"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ReportSpamContent() {
    const params = useSearchParams();
    const [working, setWorking] = useState(false);
    const [result, setResult] = useState("");

    async function reportSpam() {
        setWorking(true);
        setResult("");
        try {
            const response = await fetch("/api/report-spam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: params.get("id"),
                    expires: Number(params.get("expires")),
                    sig: params.get("sig"),
                }),
            });
            setResult(response.ok
                ? "Thank you. This inquiry has been marked as spam."
                : "We couldn't process this report. The link may have expired.");
        } catch {
            setResult("Unable to connect. Please try again.");
        } finally {
            setWorking(false);
        }
    }

    return (
        <main className="mx-auto max-w-lg px-6 py-20">
            <h1 className="text-3xl font-bold text-green-900">Report Spam</h1>
            <p className="mt-4 text-gray-700">Confirm that this Cerna Home Care inquiry is spam. Reporting will mark the inquiry as spam and block its verified visitor IP, if available.</p>
            <button type="button" disabled={working || !!result} onClick={reportSpam}
                className="mt-8 rounded-md bg-red-700 px-6 py-3 font-semibold text-white disabled:opacity-50">
                {working ? "Submitting..." : "Confirm Report Spam"}
            </button>
            {result && <p role="status" className="mt-5 text-gray-800">{result}</p>}
        </main>
    );
}

export default function ReportSpamPage() {
    return <Suspense fallback={<main className="mx-auto max-w-lg px-6 py-20">Loading report...</main>}><ReportSpamContent /></Suspense>;
}
