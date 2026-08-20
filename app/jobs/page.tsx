import PageRegular from "./pageRegular";
import V2JobsPage from "./pageV2";

const CORPORATE_LOCATION_SLUG = "orange-county";

function getApiBaseUrl() {
    return (
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com"
    ).replace(/\/$/, "");
}

type Location = {
    locationId: number;
    slug: string;
};

async function getCorporateLocation(): Promise<Location | null> {
    try {
        const apiKey = process.env.CERNA_API_KEY;

        if (!apiKey) {
            return null;
        }

        const url =
            `${getApiBaseUrl()}` +
            `/api/public/locations/${CORPORATE_LOCATION_SLUG}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "X-API-KEY": apiKey,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const result = await response.json();

        const locationId = Number(
            result.locationId ?? result.LocationId
        );

        if (
            !Number.isInteger(locationId) ||
            locationId <= 0
        ) {
            return null;
        }

        return {
            locationId,
            slug:
                result.slug ??
                result.Slug ??
                CORPORATE_LOCATION_SLUG,
        };
    } catch {
        return null;
    }
}

async function hasCareersRecruitingPlatform(
    locationId: number
): Promise<boolean> {
    try {
        const apiKey = process.env.CERNA_API_KEY;

        if (!apiKey) {
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
            return false;
        }

        const result = await response.json();

        return result.careersRecruitingPlatform === true;
    } catch {
        return false;
    }
}

export default async function JobsPage() {
    const corporateLocation =
        await getCorporateLocation();

    if (!corporateLocation) {
        return <PageRegular />;
    }

    const careersRecruitingPlatformEnabled =
        await hasCareersRecruitingPlatform(
            corporateLocation.locationId
        );

    if (careersRecruitingPlatformEnabled) {
        return <V2JobsPage />;
    }

    return <PageRegular />;
}