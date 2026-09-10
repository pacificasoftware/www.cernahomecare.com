import PageRegular from "./pageRegular";
import V2JobsPage from "./pageV2";

export const dynamic = "force-dynamic";

const CORPORATE_LOCATION_ID = 1;

function getApiBaseUrl() {
    return (
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com"
    ).replace(/\/$/, "");
}

async function hasCareersRecruitingPlatform(
    locationId: number
): Promise<boolean> {
    try {
        const apiKey =
            process.env.CERNA_API_KEY;

        if (!apiKey) {
            console.error(
                "CERNA_API_KEY is missing."
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

        const text =
            await response.text();

        console.log(
            "JOBS FEATURE FLAG RESPONSE:",
            response.status,
            text
        );

        if (!response.ok) {
            console.error(
                "JOBS FEATURE FLAG FAILED:",
                response.status,
                text
            );

            return false;
        }

        const result =
            text
                ? JSON.parse(text)
                : {};

        return (
            result.careersRecruitingPlatform === true ||
            result.CareersRecruitingPlatform === true
        );
    } catch (error) {
        console.error(
            "JOBS FEATURE FLAG ERROR:",
            error
        );

        return false;
    }
}

export default async function JobsPage() {
    const careersRecruitingPlatformEnabled =
        await hasCareersRecruitingPlatform(
            CORPORATE_LOCATION_ID
        );

    if (
        careersRecruitingPlatformEnabled
    ) {
        return <V2JobsPage />;
    }

    return <PageRegular />;
}