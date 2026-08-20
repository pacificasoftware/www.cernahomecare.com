import { NextResponse } from "next/server";

function getApiBaseUrl() {
    return (
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com"
    ).replace(/\/$/, "");
}

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{
            locationId: string;
        }>;
    }
) {
    try {
        const { locationId } = await params;

        const parsedLocationId = Number(locationId);

        if (
            !Number.isInteger(parsedLocationId) ||
            parsedLocationId <= 0
        ) {
            return NextResponse.json(
                {
                    message: "Invalid locationId.",
                },
                {
                    status: 400,
                }
            );
        }

        const apiKey = process.env.CERNA_API_KEY;

        if (!apiKey) {
            console.error("CERNA_API_KEY is missing");

            return NextResponse.json(
                {
                    message: "Server configuration error.",
                },
                {
                    status: 500,
                }
            );
        }

        const url =
            `${getApiBaseUrl()}` +
            `/api/public/locations/${parsedLocationId}/jobs/active`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "X-API-KEY": apiKey,
            },
            cache: "no-store",
        });

        const body = await response.text();

        if (!response.ok) {
            console.error(
                "Unable to load location jobs:",
                response.status,
                body
            );

            return new NextResponse(body, {
                status: response.status,
                headers: {
                    "Content-Type":
                        response.headers.get("Content-Type") ||
                        "application/json",
                },
            });
        }

        return new NextResponse(body, {
            status: 200,
            headers: {
                "Content-Type":
                    response.headers.get("Content-Type") ||
                    "application/json",
            },
        });
    } catch (error) {
        console.error(
            "Unable to load location jobs:",
            error
        );

        return NextResponse.json(
            {
                message: "Unable to load location jobs.",
            },
            {
                status: 500,
            }
        );
    }
}