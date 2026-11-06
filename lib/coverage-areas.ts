
import {
    getLocationBySlug,
    type CoverageGroup,
    type LocationData,
} from "@/lib/locations";

export type CoverageArea = {
    name: string;
    slug: string;
    groupName: string | null;
    locationSlug: string;
};

export function toCoverageAreaSlug(value: string): string {
    return value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export function extractCoverageAreas(
    location: LocationData
): CoverageArea[] {
    const coverage = location.coverageAreas;

    if (!Array.isArray(coverage)) {
        return [];
    }

    const results: CoverageArea[] = [];

    for (const item of coverage) {
        if (typeof item === "string") {
            const name = item.trim();

            if (name) {
                results.push({
                    name,
                    slug: toCoverageAreaSlug(name),
                    groupName: null,
                    locationSlug: location.slug,
                });
            }

            continue;
        }

        if (
            !item ||
            typeof item !== "object" ||
            !Array.isArray((item as CoverageGroup).areas)
        ) {
            continue;
        }

        const group = item as CoverageGroup;

        for (const value of group.areas) {
            if (typeof value !== "string") continue;

            const name = value.trim();
            if (!name) continue;

            results.push({
                name,
                slug: toCoverageAreaSlug(name),
                groupName: group.county?.trim() || null,
                locationSlug: location.slug,
            });
        }
    }

    // Prevent duplicate URLs within the same location.
    const unique = new Map<string, CoverageArea>();

    for (const area of results) {
        if (area.slug && !unique.has(area.slug)) {
            unique.set(area.slug, area);
        }
    }

    return Array.from(unique.values());
}

export async function getCoverageAreasByLocation(
    locationSlug: string
): Promise<CoverageArea[]> {
    const location = await getLocationBySlug(locationSlug);

    if (!location) {
        return [];
    }

    return extractCoverageAreas(location);
}

export async function getCoverageAreaBySlug(
    locationSlug: string,
    coverageAreaSlug: string
): Promise<CoverageArea | null> {
    const areas =
        await getCoverageAreasByLocation(locationSlug);

    return (
        areas.find(
            area => area.slug === coverageAreaSlug
        ) ?? null
    );
}
