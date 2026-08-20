import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = {
    params: Promise<{
        locationId: string;
    }>;
};

export async function GET(
    request: Request,
    context: RouteContext
) {
    const { locationId } = await context.params;
    const parsedId = Number(locationId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
        return NextResponse.json(
            { message: "Invalid locationId." },
            { status: 400 }
        );
    }

    const apiBaseUrl =
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com";

    const apiUrl =
        `${apiBaseUrl.replace(/\/$/, "")}` +
        `/api/public/jobs/active/location/${parsedId}`;

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
                "location jobs API failed:",
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
        console.error("location jobs proxy failed:", error);

        return NextResponse.json(
            { message: "Unable to load location jobs." },
            { status: 500 }
        );
    }
}