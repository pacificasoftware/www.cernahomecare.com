import "server-only";

function getApiBaseUrl() {
    return (
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com"
    ).replace(/\/$/, "");
}

export async function hasCareersRecruitingPlatform(
    locationId: number
): Promise<boolean> {
    try {
        const apiKey = process.env.CERNA_API_KEY;

        if (!apiKey) {
            console.error(
                "CERNA_API_KEY environment variable is not configured."
            );

            return false;
        }

        const url =
            `${getApiBaseUrl()}` +
            `/api/public/location-features/` +
            `${locationId}/careers-recruiting-platform`;

        const response = await fetch(url, {
            method: "GET",

            headers: {
                Accept: "application/json",
                "X-API-KEY": apiKey,
            },

            cache: "no-store",
        });

        if (!response.ok) {
            console.error(
                "Location feature lookup failed:",
                response.status
            );

            return false;
        }

        const result = await response.json();

        return result.careersRecruitingPlatform === true;
    } catch (error) {
        console.error(
            "Unable to check recruiting feature:",
            error
        );

        return false;
    }
}