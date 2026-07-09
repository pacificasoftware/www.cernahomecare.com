import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.cernahomecare.com";

export async function GET(req: NextRequest) {
    try {
        const zipCode = req.nextUrl.searchParams.get("zipCode") || "";
        const radiusMiles = req.nextUrl.searchParams.get("radiusMiles") || "50";

        if (!/^\d{5}$/.test(zipCode)) {
            return NextResponse.json(
                { message: "Invalid ZIP code." },
                { status: 400 }
            );
        }

        const backendUrl = `${API_BASE_URL.replace(
            /\/$/,
            ""
        )}/api/public/jobs/active?zipCode=${encodeURIComponent(
            zipCode
        )}&radiusMiles=${encodeURIComponent(radiusMiles)}`;

        const response = await fetch(backendUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        const text = await response.text();

        return new NextResponse(text, {
            status: response.status,
            headers: {
                "Content-Type":
                    response.headers.get("content-type") || "application/json",
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: "Jobs proxy failed.",
                error: error?.message || String(error),
            },
            { status: 500 }
        );
    }
}