
import type { MetadataRoute } from "next";
import { getLocations } from "@/lib/locations";
import { extractCoverageAreas } from "@/lib/coverage-areas";

const BASE_URL = "https://www.cernahomecare.com";

// Set to true after the coverage-area pages
// have approved SEO content and are indexable.
const INCLUDE_CITY_PAGES = true;

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locations = await getLocations();

    const urls: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            changeFrequency: "weekly",
            priority: 1,
        },
    ];

    for (const location of locations) {
        urls.push({
            url: `${BASE_URL}/${location.slug}`,
            changeFrequency: "weekly",
            priority: 0.9,
        });

        if (INCLUDE_CITY_PAGES) {
            const areas = extractCoverageAreas(location);

            for (const area of areas) {
                urls.push({
                    url: `${BASE_URL}/${location.slug}/areas/${area.slug}`,
                    changeFrequency: "monthly",
                    priority: 0.7,
                });
            }
        }
    }

    return urls;
}
