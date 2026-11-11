// src/app/api/report-spam/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const apiBase = process.env.CERNA_API_BASE_URL?.replace(/\/$/, "");
    const apiKey = process.env.CERNA_API_KEY;
    if (!apiBase || !apiKey) {
        return NextResponse.json({ success: false, reason: "server_not_configured" }, { status: 503 });
    }

    let body: { id?: string; expires?: number; sig?: string };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false }, { status: 400 });
    }

    if (!body.id || !/^[0-9a-f-]{36}$/i.test(body.id) ||
        !Number.isSafeInteger(body.expires) || !body.sig || !/^[a-f0-9]{64}$/i.test(body.sig)) {
        return NextResponse.json({ success: false, reason: "invalid_request" }, { status: 400 });
    }

    try {
        const apiResponse = await fetch(`${apiBase}/api/Comms/ReportHomeCareSpam`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-API-KEY": apiKey },
            body: JSON.stringify(body),
            cache: "no-store",
        });
        return NextResponse.json({ success: apiResponse.ok }, { status: apiResponse.status });
    } catch {
        return NextResponse.json({ success: false }, { status: 502 });
    }
}
