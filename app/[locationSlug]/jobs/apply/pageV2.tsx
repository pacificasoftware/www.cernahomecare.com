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

type Franchisee = {
    franchiseeId: number;
    slug: string;
    name: string;
    city: string;
    state: string;
    phone: string;
    phoneHref: string;
    jobsZip?: string | null;
};

type Job = {
    jobId: number;
    franchiseeId: number;
    franchiseeName: string;
    franchiseeCity?: string | null;
    franchiseeState?: string | null;
    franchiseeZipCode?: string | null;

    jobTitle: string;
    jobType?: string | null;
    shiftType?: string | null;
    jobDescription?: string | null;

    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
    payRange?: string | null;

    distanceMiles?: number | null;
};

function getApiBaseUrl() {
    return (
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com"
    ).replace(/\/$/, "");
}

async function getFranchisee(
    locationSlug: string
): Promise<Franchisee | null> {
    try {
        const response = await fetch(
            `${getApiBaseUrl()}/api/public/franchisees/${encodeURIComponent(
                locationSlug
            )}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.error(
                "Franchisee lookup failed:",
                response.status,
                await response.text()
            );

            return null;
        }

        return (await response.json()) as Franchisee;
    } catch (error) {
        console.error("Franchisee lookup failed:", error);
        return null;
    }
}

async function getActiveJobsByFranchiseeId(
    franchiseeId: number
): Promise<Job[]> {
    try {
        const response = await fetch(
            `${getApiBaseUrl()}/api/public/jobs/active/franchisee/${franchiseeId}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );

        const responseText = await response.text();

        if (!response.ok) {
            console.error(
                "Franchisee jobs lookup failed:",
                response.status,
                responseText
            );

            return [];
        }

        if (!responseText.trim()) {
            return [];
        }

        const result = JSON.parse(responseText);

        const rawJobs = Array.isArray(result)
            ? result
            : Array.isArray(result.jobs)
                ? result.jobs
                : Array.isArray(result.Jobs)
                    ? result.Jobs
                    : [];

        return rawJobs.map((item: any) => ({
            jobId: item.jobId ?? item.JobId,
            franchiseeId:
                item.franchiseeId ?? item.FranchiseeId,

            franchiseeName:
                item.franchiseeName ??
                item.FranchiseeName ??
                "",

            franchiseeCity:
                item.franchiseeCity ??
                item.FranchiseeCity,

            franchiseeState:
                item.franchiseeState ??
                item.FranchiseeState,

            franchiseeZipCode:
                item.franchiseeZipCode ??
                item.FranchiseeZipCode,

            jobTitle:
                item.jobTitle ??
                item.JobTitle ??
                "Caregiver",

            jobType:
                item.jobType ??
                item.JobType,

            shiftType:
                item.shiftType ??
                item.ShiftType,

            jobDescription:
                item.jobDescription ??
                item.JobDescription,

            city:
                item.city ??
                item.City,

            state:
                item.state ??
                item.State,

            zipCode:
                item.zipCode ??
                item.ZipCode,

            payRange:
                item.payRange ??
                item.PayRange,

            distanceMiles:
                item.distanceMiles ??
                item.DistanceMiles,
        }));
    } catch (error) {
        console.error("Franchisee jobs lookup failed:", error);
        return [];
    }
}

export default async function LocalJobApplicationPage({
    params,
    searchParams,
}: PageProps) {
    const { locationSlug } = await params;
    const { jobId } = await searchParams;

    const parsedJobId = Number(jobId);

    if (
        !jobId ||
        !Number.isInteger(parsedJobId) ||
        parsedJobId <= 0
    ) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-20">
                <h1 className="text-3xl font-extrabold text-[#00456B]">
                    Job Not Selected
                </h1>

                <p className="mt-4 text-slate-600">
                    Please return to the jobs page and select a position.
                </p>

                <Link
                    href={`/${locationSlug}/jobs`}
                    className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 font-extrabold text-white"
                >
                    View Open Positions
                </Link>
            </main>
        );
    }

    const franchisee = await getFranchisee(locationSlug);

    if (!franchisee) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-20">
                <h1 className="text-3xl font-extrabold text-[#00456B]">
                    Location Not Found
                </h1>

                <p className="mt-4 text-slate-600">
                    We could not find this Cerna location.
                </p>

                <Link
                    href={`/${locationSlug}/jobs`}
                    className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 font-extrabold text-white"
                >
                    View Open Positions
                </Link>
            </main>
        );
    }

    const jobs = await getActiveJobsByFranchiseeId(
        franchisee.franchiseeId
    );

    const job =
        jobs.find(
            (item) =>
                Number(item.jobId) === parsedJobId &&
                Number(item.franchiseeId) ===
                Number(franchisee.franchiseeId)
        ) ?? null;

    if (!job) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-20">
                <h1 className="text-3xl font-extrabold text-[#00456B]">
                    Job Not Found
                </h1>

                <p className="mt-4 text-slate-600">
                    This position is no longer available for this location.
                </p>

                <Link
                    href={`/${locationSlug}/jobs`}
                    className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 font-extrabold text-white"
                >
                    View Open Positions
                </Link>
            </main>
        );
    }

    return (
        <CareersApplicationForm
            franchiseeId={job.franchiseeId}
            jobId={job.jobId}
            appliedZipCode={
                job.zipCode ??
                job.franchiseeZipCode ??
                franchisee.jobsZip
            }
            locationSlug={locationSlug}
            jobTitle={job.jobTitle}
            franchiseeName={
                job.franchiseeName || franchisee.name
            }
            jobCity={
                job.city ??
                job.franchiseeCity ??
                franchisee.city
            }
            jobState={
                job.state ??
                job.franchiseeState ??
                franchisee.state
            }
            distanceMiles={job.distanceMiles}
        />
    );
}