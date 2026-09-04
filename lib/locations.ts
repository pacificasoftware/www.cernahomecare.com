export type LocationPhone = {
    label: string;
    number: string;
    href: string;
};

export type LocationState = {
    code: string;
    name: string;
};

export type LocationData = {
    locationId: number;

    slug: string;
    name: string;

    city: string;
    state: string;
    zipCode: string;

    heroImage: string;

    addressLine1: string;
    addressLine2: string;

    phone: string;
    phoneHref: string;
    phones?: LocationPhone[];

    tollFreePhone?: string | null;
    tollFreePhoneHref?: string | null;

    email: string;
    careersEmail?: string | null;

    jobsZip?: string | null;

    latitude?: number | null;
    longitude?: number | null;

    mapUrl: string;

    coverageTitle: string;
    coverageAreas: string[];

    pageTitle?: string | null;
    metaDescription?: string | null;
    shortDescription?: string | null;

    sortOrder?: number | null;

    updatedUtc?: string | null;
};

export function getPreferredLocationPhone(
    location: LocationData | null | undefined
): {
    label: string;
    href: string;
} | null {
    if (!location) {
        return null;
    }

    /*
     * Rule:
     * 1. Toll-free number first
     * 2. Regular phone if toll-free is blank
     */

    const tollFreePhone =
        location.tollFreePhone?.trim();

    if (tollFreePhone) {
        return {
            label: tollFreePhone,
            href:
                location.tollFreePhoneHref?.trim() ||
                `tel:${tollFreePhone.replace(/[^\d+]/g, "")}`,
        };
    }

    const phone =
        location.phone?.trim();

    if (phone) {
        return {
            label: phone,
            href:
                location.phoneHref?.trim() ||
                `tel:${phone.replace(/[^\d+]/g, "")}`,
        };
    }

    return null;
}

/*
|--------------------------------------------------------------------------
| API DTO
|--------------------------------------------------------------------------
|
| This matches PublicLocationDto from the ASP.NET API.
|
*/

type PublicLocationDto = {
    locationId: number;

    slug: string;
    name: string;

    city: string;
    state: string;
    zipCode: string;

    address1: string;
    address2?: string | null;

    phone: string;
    phoneHref: string;

    tollFreePhone?: string | null;
    tollFreePhoneHref?: string | null;

    email?: string | null;
    careersEmail?: string | null;

    jobsZip?: string | null;

    latitude?: number | null;
    longitude?: number | null;

    heroImageUrl?: string | null;

    coverageTitle?: string | null;
    coverageAreas?: string | null;

    pageTitle?: string | null;
    metaDescription?: string | null;
    shortDescription?: string | null;

    sortOrder?: number | null;

    updatedUtc?: string | null;
};

const ADMIN_ASSET_BASE_URL =
    process.env.NEXT_PUBLIC_ADMIN_ASSET_BASE_URL ??
    "https://admin.cernahomecare.com";

function resolveHeroImageUrl(
    heroImageUrl?: string | null,
    updatedUtc?: string | null
) {
    if (!heroImageUrl) {
        return "/assets/cernaoffice.png";
    }

    let imageUrl = heroImageUrl;

    if (
        !heroImageUrl.startsWith("http://") &&
        !heroImageUrl.startsWith("https://")
    ) {
        if (heroImageUrl.startsWith("/assets/")) {
            imageUrl =
                `${ADMIN_ASSET_BASE_URL}${heroImageUrl}`;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Image Cache Version
    |--------------------------------------------------------------------------
    |
    | Prefer UpdatedUtc from the database.
    |
    | Older location records currently have UpdatedUtc = null,
    | so use the current timestamp as a temporary fallback.
    |
    */

    const version =
        updatedUtc
            ? encodeURIComponent(updatedUtc)
            : Date.now().toString();

    const separator =
        imageUrl.includes("?")
            ? "&"
            : "?";

    return `${imageUrl}${separator}v=${version}`;
}

/*
|--------------------------------------------------------------------------
| API URL
|--------------------------------------------------------------------------
*/
 

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://api.cernahomecare.com";

/*
|--------------------------------------------------------------------------
| Display Name
|--------------------------------------------------------------------------
|
| Your database currently has values such as:
|
| Cerna Orange County
| Cerna Southlake
| Cerna South Bay
| Las Vegas
|
| Existing pages expect:
|
| Orange County
| Southlake
| South Bay
| Las Vegas
|
*/

function getDisplayName(name: string): string {
    return name
        .replace(/^Cerna Home Care\s+/i, "")
        .replace(/^Cerna\s+/i, "")
        .trim();
}

/*
|--------------------------------------------------------------------------
| Coverage Areas
|--------------------------------------------------------------------------
|
| Standard locations:
| ["Irvine","Tustin",...]
|
| Florida locations use the county structure, so those continue to be
| handled by FloridaCoverageSelector.
|
*/

function parseCoverageAreas(
    value?: string | null
): string[] {
    if (!value) {
        return [];
    }

    try {
        const parsed = JSON.parse(value);

        if (
            Array.isArray(parsed) &&
            parsed.every(
                (item) => typeof item === "string"
            )
        ) {
            return parsed;
        }

        return [];
    } catch {
        console.error(
            "Invalid CoverageAreas JSON:",
            value
        );

        return [];
    }
}

/*
|--------------------------------------------------------------------------
| Normalize API Location
|--------------------------------------------------------------------------
|
| Converts the API DTO into the same LocationData shape your existing
| location pages already use.
|
*/

function normalizeLocation(
    item: PublicLocationDto
): LocationData {
    const displayName =
        getDisplayName(item.name);

    const phones: LocationPhone[] = [];

    if (item.phone && item.phoneHref) {
        phones.push({
            label: "Local",
            number: item.phone,
            href: item.phoneHref,
        });
    }

    if (
        item.tollFreePhone &&
        item.tollFreePhoneHref
    ) {
        phones.push({
            label: "Toll Free",
            number: item.tollFreePhone,
            href: item.tollFreePhoneHref,
        });
    }

    const addressLine2 = [
        item.city,
        item.state,
    ]
        .filter(Boolean)
        .join(", ") +
        (item.zipCode
            ? ` ${item.zipCode}`
            : "");

    const fullAddress = [
        item.address1,
        item.address2,
        item.city,
        item.state,
        item.zipCode,
    ]
        .filter(Boolean)
        .join(", ");

    return {
        locationId: item.locationId,

        slug: item.slug,

        name: displayName,

        city: item.city,
        state: item.state,
        zipCode: item.zipCode,

        heroImage:
            resolveHeroImageUrl(
                item.heroImageUrl,
                item.updatedUtc
            ),

        addressLine1:
            item.address2
                ? `${item.address1}, ${item.address2}`
                : item.address1,

        addressLine2,

        phone: item.phone,
        phoneHref: item.phoneHref,

        phones:
            phones.length > 0
                ? phones
                : undefined,

        tollFreePhone:
            item.tollFreePhone,

        tollFreePhoneHref:
            item.tollFreePhoneHref,

        email:
            item.email ?? "",

        careersEmail:
            item.careersEmail,

        jobsZip:
            item.jobsZip,

        latitude:
            item.latitude,

        longitude:
            item.longitude,

        mapUrl:
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(fullAddress),

        coverageTitle:
            item.coverageTitle ??
            `${displayName.toUpperCase()} COVERAGE AREAS`,

        coverageAreas:
            parseCoverageAreas(
                item.coverageAreas
            ),

        pageTitle:
            item.pageTitle,

        metaDescription:
            item.metaDescription,

        shortDescription:
            item.shortDescription,

        sortOrder:
            item.sortOrder,

        updatedUtc: item.updatedUtc,
    };
}

/*
|--------------------------------------------------------------------------
| Get All Locations
|--------------------------------------------------------------------------
*/

export async function getLocations():
    Promise<LocationData[]> {

    const response = await fetch(
        `${API_BASE_URL}/api/public/locations`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to load locations. Status: ${response.status}`
        );
    }

    const data =
        (await response.json()) as PublicLocationDto[];

    return data
        .map(normalizeLocation)
        .sort(
            (a, b) =>
                (a.sortOrder ?? 999) -
                (b.sortOrder ?? 999)
        );
}

/*
|--------------------------------------------------------------------------
| Get Unique Location States
|--------------------------------------------------------------------------
|
| Returns only states that currently have active/published Cerna locations.
|
| Example:
| [
|   { code: "CA", name: "California" },
|   { code: "FL", name: "Florida" }
| ]
|
*/

export async function getLocationStates():
    Promise<LocationState[]> {

    const response = await fetch(
        `${API_BASE_URL}/api/public/locations/states`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to load location states. Status: ${response.status}`
        );
    }

    const data =
        (await response.json()) as LocationState[];

    return data
        .filter(
            (state) =>
                state.code &&
                state.name
        )
        .map((state) => ({
            code:
                state.code
                    .trim()
                    .toUpperCase(),

            name:
                state.name.trim(),
        }))
        .sort((a, b) =>
            a.name.localeCompare(b.name)
        );
}

/*
|--------------------------------------------------------------------------
| Get Location By Slug
|--------------------------------------------------------------------------
*/

export async function getLocationBySlug(
    slug: string
): Promise<LocationData | null> {

    const response = await fetch(
        `${API_BASE_URL}/api/public/locations/${encodeURIComponent(
            slug
        )}`,
        {
            cache: "no-store",
        }
    );

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(
            `Failed to load location "${slug}". Status: ${response.status}`
        );
    }

    const data =
        (await response.json()) as PublicLocationDto;

    return normalizeLocation(data);
}