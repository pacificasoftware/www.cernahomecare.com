import Link from "next/link";
import CareersApplicationForm from "@/components/CareersApplicationForm";

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;

    searchParams: Promise<{
        jobId?: string;
    }>;
};

type location = {
    locationId: number;
    name: string;
    slug: string;
    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
};

type Job = {
    jobId: number;
    locationId: number;
    title: string;
    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
    distanceMiles?: number | null;
};

function getApiBaseUrl() {
    return (
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com"
    ).replace(/\/$/, "");
}

async function getlocation(
    locationSlug: string
): Promise<location | null> {
    try {
        const response = await fetch(
            `${getApiBaseUrl()}/api/public/locations/${locationSlug}`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        const locationId = Number(
            data.locationId ??
            data.locationId
        );

        if (
            !Number.isInteger(locationId) ||
            locationId <= 0
        ) {
            return null;
        }

        return {
            locationId,

            name:
                data.name ??
                data.Name ??
                data.locationName ??
                data.locationName ??
                "",

            slug:
                data.slug ??
                data.Slug ??
                locationSlug,

            city:
                data.city ??
                data.City ??
                null,

            state:
                data.state ??
                data.State ??
                null,

            zipCode:
                data.zipCode ??
                data.ZipCode ??
                null,
        };
    } catch {
        return null;
    }
}

async function getActiveJobsBylocationId(
    locationId: number
): Promise<Job[]> {
    try {
        const response = await fetch(
            `${getApiBaseUrl()}/api/public/jobs/active/location/${locationId}`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        const rows =
            Array.isArray(data)
                ? data
                : Array.isArray(data?.jobs)
                    ? data.jobs
                    : Array.isArray(data?.Jobs)
                        ? data.Jobs
                        : [];

        return rows
            .map((job: any) => ({
                jobId: Number(
                    job.jobId ??
                    job.JobId
                ),

                locationId: Number(
                    job.locationId ??
                    job.locationId
                ),

                title:
                    job.title ??
                    job.Title ??
                    job.jobTitle ??
                    job.JobTitle ??
                    "",

                city:
                    job.city ??
                    job.City ??
                    null,

                state:
                    job.state ??
                    job.State ??
                    null,

                zipCode:
                    job.zipCode ??
                    job.ZipCode ??
                    null,

                distanceMiles:
                    job.distanceMiles ??
                    job.DistanceMiles ??
                    null,
            }))
            .filter(
                (job: Job) =>
                    Number.isInteger(job.jobId) &&
                    job.jobId > 0
            );
    } catch {
        return [];
    }
}

export default async function V2ApplyPage({
    params,
    searchParams,
}: PageProps) {
    const { locationSlug } = await params;
    const { jobId } = await searchParams;

    const parsedJobId = Number(jobId);

    /*
    |--------------------------------------------------------------------------
    | Job ID required
    |--------------------------------------------------------------------------
    */

    if (
        !Number.isInteger(parsedJobId) ||
        parsedJobId <= 0
    ) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-16">
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                    <h1 className="text-3xl font-extrabold text-[#00456B]">
                        Job Not Selected
                    </h1>

                    <p className="mt-4 text-slate-600">
                        Please select a position before starting your application.
                    </p>

                    <Link
                        href={`/${locationSlug}/jobs`}
                        className="mt-8 inline-flex rounded-lg bg-[#DD8500] px-6 py-3 font-bold text-white"
                    >
                        View Available Jobs
                    </Link>
                </div>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Location
    |--------------------------------------------------------------------------
    */

    const location =
        await getlocation(locationSlug);

    if (!location) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-16">
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                    <h1 className="text-3xl font-extrabold text-[#00456B]">
                        Location Not Found
                    </h1>

                    <p className="mt-4 text-slate-600">
                        We could not find this Cerna Home Care location.
                    </p>
                </div>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Find selected active job
    |--------------------------------------------------------------------------
    */

    const jobs =
        await getActiveJobsBylocationId(
            location.locationId
        );

    const selectedJob =
        jobs.find(
            (job) =>
                job.jobId === parsedJobId &&
                job.locationId ===
                location.locationId
        ) ?? null;

    if (!selectedJob) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-16">
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                    <h1 className="text-3xl font-extrabold text-[#00456B]">
                        Job Not Found
                    </h1>

                    <p className="mt-4 text-slate-600">
                        This position is no longer available.
                    </p>

                    <Link
                        href={`/${locationSlug}/jobs`}
                        className="mt-8 inline-flex rounded-lg bg-[#DD8500] px-6 py-3 font-bold text-white"
                    >
                        View Available Jobs
                    </Link>
                </div>
            </main>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Application
    |--------------------------------------------------------------------------
    */

    return (
        <CareersApplicationForm
            locationId={location.locationId}
            jobId={selectedJob.jobId}
            appliedZipCode={
                selectedJob.zipCode ??
                location.zipCode ??
                ""
            }
            locationSlug={locationSlug}
            jobTitle={selectedJob.title}
            locationName={location.name}
            jobCity={selectedJob.city ?? ""}
            jobState={selectedJob.state ?? ""}
            distanceMiles={
                selectedJob.distanceMiles ?? null
            }
        />
    );
}