import { NextResponse } from "next/server";

function clean(value: unknown) {
    return String(value ?? "").trim();
}

function looksLikeSpam(value: unknown) {
    const v = clean(value);

    if (!v) return false;

    // Long random strings like twFknGDXpaJzpdDBVGsTYSf
    if (/^[A-Za-z]{18,}$/.test(v)) return true;

    // Random mixed-case pattern
    if (/[a-z][A-Z][a-z][A-Z]/.test(v)) return true;

    return false;
}

function isValidZip(value: unknown) {
    const zip = clean(value);
    if (!zip) return true;

    return /^\d{5}(-\d{4})?$/.test(zip);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Honeypot fields — bots often fill hidden fields
        const honeypot =
            clean(body.company) ||
            clean(body.website) ||
            clean(body.url);

        if (honeypot) {
            return NextResponse.json(
                { success: false, message: "Spam detected." },
                { status: 400 }
            );
        }

        if (
            looksLikeSpam(body.firstName) ||
            looksLikeSpam(body.lastName) ||
            looksLikeSpam(body.name) ||
            looksLikeSpam(body.city) ||
            looksLikeSpam(body.zip) ||
            looksLikeSpam(body.bestTimeToContact)
        ) {
            return NextResponse.json(
                { success: false, message: "Spam detected." },
                { status: 400 }
            );
        }

        if (!isValidZip(body.zip)) {
            return NextResponse.json(
                { success: false, message: "Invalid zip code." },
                { status: 400 }
            );
        }

        const apiBaseUrl =
            process.env.SAFEPATCH_API_BASE_URL || "https://api.mysafepatch.com/api";

        const apiKey = process.env.SAFEPATCH_API_KEY;
        const apiKeyHeader = process.env.SAFEPATCH_API_KEY_HEADER ?? "X-API-KEY";

        if (!apiKey) {
            return NextResponse.json(
                { success: false, message: "Missing SAFEPATCH_API_KEY on server." },
                { status: 500 }
            );
        }

        const dotnetUrl =
            process.env.DOTNET_API_SEND_CERNA_HOMECARE_EMAIL_URL ||
            `${apiBaseUrl.replace(/\/$/, "")}/sms/SendCernaHomeCareEmail`;

        const dotnetRes = await fetch(dotnetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [apiKeyHeader]: apiKey,
            },
            body: JSON.stringify(body),
        });

        const rawText = await dotnetRes.text();

        if (!dotnetRes.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: rawText || "Failed to send email.",
                    upstreamStatus: dotnetRes.status,
                },
                { status: dotnetRes.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Email sent successfully.",
            upstreamResponse: rawText,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error?.message || "Server error while sending contact request.",
            },
            { status: 500 }
        );
    }
}