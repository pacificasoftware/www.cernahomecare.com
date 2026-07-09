import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = {
    params: Promise<{
        franchiseeId: string;
    }>;
};

export async function GET(
    request: Request,
    context: RouteContext
) {
    const { franchiseeId } = await context.params;
    const parsedId = Number(franchiseeId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        return NextResponse.json(
            { message: "Invalid franchiseeId." },
            { status: 400 }
        );
    }

    const apiBaseUrl =
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com";

    const apiUrl =
        `${apiBaseUrl.replace(/\/$/, "")}` +
        `/api/public/jobs/active/franchisee/${parsedId}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        const body = await response.text();

        if (!response.ok) {
            console.error(
                "Franchisee jobs API failed:",
                response.status,
                apiUrl,
                body
            );
        }

        return new NextResponse(body, {
            status: response.status,
            headers: {
                "Content-Type":
                    response.headers.get("content-type") ||
                    "application/json",
            },
        });
    } catch (error) {
        console.error("Franchisee jobs proxy failed:", error);

        return NextResponse.json(
            { message: "Unable to load franchisee jobs." },
            { status: 500 }
        );
    }
}