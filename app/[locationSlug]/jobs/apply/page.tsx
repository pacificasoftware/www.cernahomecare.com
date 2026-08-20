import Link from "next/link";
import LocalApplyClient from "./LocalApplyClient";
import V2ApplyPage from "../_features/careers-recruiting-platform/V2ApplyPage";

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;

    searchParams: Promise<{
        jobId?: string;
    }>;
};

export type location = {
    locationId: number;
    slug: string;
    name: string;
    city: string;
    state: string;
    phone: string;
    phoneHref: string;
    jobsZip?: string | null;
};

function getApiBaseUrl() {
    return (
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com"
    ).replace(/\/$/, "");
}


/*
|--------------------------------------------------------------------------
| Get Location
|--------------------------------------------------------------------------
*/

async function getlocation(
    locationSlug: string
): Promise<location | null> {
    try {
        const url =
            `${getApiBaseUrl()}/api/public/locations/` +
            `${encodeURIComponent(locationSlug)}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error("Location lookup failed:", {
                url,
                status: response.status,
                body: responseText,
            });

            return null;
        }

        if (!responseText.trim()) {
            return null;
        }

        const result = JSON.parse(responseText);

        const phone = String(
            result.phone ??
            result.Phone ??
            ""
        );

        return {
            locationId: Number(
                result.locationId ??
                result.locationId
            ),

            slug:
                result.slug ??
                result.Slug ??
                locationSlug,

            name:
                result.name ??
                result.Name ??
                result.locationName ??
                result.locationName ??
                "Cerna Home Care",

            city:
                result.city ??
                result.City ??
                "",

            state:
                result.state ??
                result.State ??
                "",

            phone,

            phoneHref:
                result.phoneHref ??
                result.PhoneHref ??
                `tel:${phone.replace(/\D/g, "")}`,

            jobsZip:
                result.jobsZip ??
                result.JobsZip ??
                result.zipCode ??
                result.ZipCode ??
                null,
        };
    } catch (error) {
        console.error(
            "Location lookup failed:",
            error
        );

        return null;
    }
}


/*
|--------------------------------------------------------------------------
| Check Recruiting Platform Feature
|--------------------------------------------------------------------------
*/

async function hasCareersRecruitingPlatform(
    locationId: number
): Promise<boolean> {
    try {
        const apiKey =
            process.env.CERNA_API_KEY;

        if (!apiKey) {
            console.error(
                "CERNA_API_KEY is not configured."
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
            const responseText =
                await response.text();

            console.error(
                "Careers feature lookup failed:",
                {
                    url,
                    status: response.status,
                    body: responseText,
                }
            );

            return false;
        }

        const result =
            await response.json();

        return (
            result.careersRecruitingPlatform === true
        );
    } catch (error) {
        console.error(
            "Careers feature lookup failed:",
            error
        );

        return false;
    }
}


/*
|--------------------------------------------------------------------------
| Apply Page
|--------------------------------------------------------------------------
*/

export default async function LocalApplyPage({
    params,
    searchParams,
}: PageProps) {
    const { locationSlug } =
        await params;

    const location =
        await getlocation(locationSlug);


    /*
    |--------------------------------------------------------------------------
    | Location not found
    |--------------------------------------------------------------------------
    */

    if (!location) {
        return (
            <main className="bg-white">
                <section className="mx-auto max-w-4xl px-6 py-24 text-center">
                    <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#DD8500]">
                        Careers at Cerna
                    </p>

                    <h1 className="mt-4 text-4xl font-extrabold text-[#00456B]">
                        Location Not Found
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                        We could not find the Cerna Home Care
                        location you requested.
                    </p>

                    <Link
                        href="/careers"
                        className="mt-8 inline-flex rounded-xl bg-[#DD8500] px-7 py-4 font-extrabold text-white transition hover:bg-[#c87500]"
                    >
                        Return to Careers
                    </Link>
                </section>
            </main>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Feature check
    |--------------------------------------------------------------------------
    |
    | Current locationId matches new LocationId.
    |
    */

    const recruitingPlatformEnabled =
        await hasCareersRecruitingPlatform(
            location.locationId
        );


    /*
    |--------------------------------------------------------------------------
    | V2 APPLY
    |--------------------------------------------------------------------------
    |
    | Only enabled locations enter the recruiting platform.
    |
    */

    if (recruitingPlatformEnabled) {
        return (
            <V2ApplyPage
                params={Promise.resolve({
                    locationSlug,
                })}
                searchParams={searchParams}
            />
        );
    }


    /*
    |--------------------------------------------------------------------------
    | EXISTING APPLY PAGE
    |--------------------------------------------------------------------------
    */

    return (
        <LocalApplyClient
            location={location}
        />
    );
}