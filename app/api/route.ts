import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

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

        const rawText = await dotnetRes.text().catch(() => "");

        let data: any = null;
        try {
            data = rawText ? JSON.parse(rawText) : null;
        } catch { }

        if (!dotnetRes.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        data?.message ||
                        rawText ||
                        "Failed to send email – please try again later",
                    upstreamStatus: dotnetRes.status,
                },
                { status: dotnetRes.status }
            );
        }

        return NextResponse.json({ success: true });
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