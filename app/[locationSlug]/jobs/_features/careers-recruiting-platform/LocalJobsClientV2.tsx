"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type location = {
    locationId: number;
    slug: string;
    name: string;
    city: string;
    state: string;
    phone: string;
    phoneHref: string;
    jobsZip?: string | null;
};

type PublicJob = {
    jobId: number;
    locationId: number;
    locationName: string;
    locationCity: string;
    locationState: string;
    locationZipCode: string;

    jobTitle: string;
    jobType?: string | null;
    shiftType?: string | null;
    jobDescription?: string | null;
    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
    payRange?: string | null;
    sortOrder?: number | null;

    distanceMiles?: number | null;
    latitude?: number | null;
    longitude?: number | null;
};

type Props = {
    location: Location;
    locationSlug: string;
};

function formatDistance(distanceMiles?: number | null) {
    if (distanceMiles === null || distanceMiles === undefined) {
        return "";
    }

    return `${distanceMiles.toFixed(1)} miles away`;
}

function getGoogleMapImageUrl(
    latitude?: number | null,
    longitude?: number | null
) {
    if (latitude === null || latitude === undefined) return "";
    if (longitude === null || longitude === undefined) return "";

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return "";
    }

    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=11&size=180x120&scale=2&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;
}

function formatLocationName(slug: string) {
    return slug
        .split("-")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}

export default function LocalJobsClient({
    location,
    locationSlug,
}: Props) {
    const [jobs, setJobs] = useState<PublicJob[]>([]);
    const [selectedJob, setSelectedJob] = useState<PublicJob | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isCancelled = false;

        async function loadJobs() {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const apiBaseUrl = (
                    process.env.NEXT_PUBLIC_API_BASE_URL ||
                    "https://api.cernahomecare.com"
                ).replace(/\/$/, "");

                const url = `${apiBaseUrl}/api/public/jobs/active/location/${location.locationId}`;

                console.log("Loading location jobs from:", url);

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                    cache: "no-store",
                });

                const responseText = await response.text();

                console.log("Location jobs response:", {
                    status: response.status,
                    body: responseText,
                });

                let result: any = null;

                if (responseText.trim()) {
                    try {
                        result = JSON.parse(responseText);
                    } catch {
                        throw new Error(
                            `The jobs API returned invalid JSON. Status: ${response.status}. Response: ${responseText.slice(
                                0,
                                300
                            )}`
                        );
                    }
                }

                if (!response.ok) {
                    throw new Error(
                        result?.statusMessage ||
                        result?.message ||
                        `Unable to load location jobs. Status: ${response.status}`
                    );
                }

                const rawJobs = Array.isArray(result)
                    ? result
                    : Array.isArray(result?.jobs)
                        ? result.jobs
                        : Array.isArray(result?.Jobs)
                            ? result.Jobs
                            : [];

                const normalizedJobs = rawJobs.map((item: any) => ({
                    jobId: Number(item.jobId ?? item.JobId),

                    locationId: Number(
                        item.locationId ?? item.locationId
                    ),

                    locationName:
                        item.locationName ??
                        item.locationName ??
                        location.name,

                    locationCity:
                        item.locationCity ??
                        item.locationCity ??
                        location.city,

                    locationState:
                        item.locationState ??
                        item.locationState ??
                        location.state,

                    locationZipCode:
                        item.locationZipCode ??
                        item.locationZipCode ??
                        location.jobsZip ??
                        null,

                    jobTitle:
                        item.jobTitle ??
                        item.JobTitle ??
                        "Caregiver",

                    jobType:
                        item.jobType ??
                        item.JobType ??
                        null,

                    shiftType:
                        item.shiftType ??
                        item.ShiftType ??
                        null,

                    jobDescription:
                        item.jobDescription ??
                        item.JobDescription ??
                        null,

                    city:
                        item.city ??
                        item.City ??
                        location.city,

                    state:
                        item.state ??
                        item.State ??
                        location.state,

                    zipCode:
                        item.zipCode ??
                        item.ZipCode ??
                        location.jobsZip ??
                        null,

                    payRange:
                        item.payRange ??
                        item.PayRange ??
                        null,

                    sortOrder:
                        item.sortOrder ??
                        item.SortOrder ??
                        null,

                    latitude:
                        item.latitude ??
                        item.Latitude ??
                        null,

                    longitude:
                        item.longitude ??
                        item.Longitude ??
                        null,

                    distanceMiles:
                        item.distanceMiles ??
                        item.DistanceMiles ??
                        null,
                }));

                if (!isCancelled) {
                    setJobs(normalizedJobs);
                }
            } catch (error) {
                console.error("Unable to load location jobs:", error);

                if (!isCancelled) {
                    setJobs([]);

                    setErrorMessage(
                        error instanceof Error
                            ? error.message
                            : "Unable to load location jobs."
                    );
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            }
        }

        void loadJobs();

        return () => {
            isCancelled = true;
        };
    }, [
        location.locationId,
        location.jobsZip,
        location.name,
        location.city,
        location.state,
    ]);

    return (
        <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <div> 

                    <h1 className="text-3xl font-black tracking-tight text-[#00456B] sm:text-4xl">
                        {formatLocationName(locationSlug)} Jobs
                    </h1>

                    <p className="mt-4 text-sm font-semibold text-slate-700">
                        Select a job position below, then click apply to
                        continue.
                    </p>
                </div>

                {isLoading && (
                    <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
                        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-[#DD8500]" />

                        <p className="mt-5 font-black text-[#00456B]">
                            Finding available jobs...
                        </p>
                    </div>
                )}

                {!isLoading && errorMessage && (
                    <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8">
                        <h2 className="text-xl font-black text-[#00456B]">
                            Unable to load jobs
                        </h2>

                        <p className="mt-2 text-slate-600">
                            {errorMessage}
                        </p>
                    </div>
                )}

                {!isLoading &&
                    !errorMessage &&
                    jobs.length === 0 && (
                        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8">
                            <h2 className="text-xl font-black text-[#00456B]">
                                No jobs currently available
                            </h2>

                            <p className="mt-2 text-slate-600">
                                There are no active positions currently listed
                                for {location.name}.
                            </p>
                        </div>
                    )}

                {!isLoading &&
                    !errorMessage &&
                    jobs.length > 0 && (
                        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="text-2xl font-black text-[#00456B]">
                                        {location.name}
                                    </h2>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        {location.city},{" "}
                                        {location.state}{" "}
                                        {location.jobsZip}
                                    </p>
                                </div>

                                <span className="w-fit rounded-full bg-[#DD8500]/15 px-4 py-2 text-sm font-black text-[#DD8500]">
                                    {jobs.length}{" "}
                                    {jobs.length === 1 ? "job" : "jobs"}{" "}
                                    available
                                </span>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {jobs.map((job) => {
                                    const isSelected =
                                        selectedJob?.jobId === job.jobId;

                                    const mapImageUrl =
                                        getGoogleMapImageUrl(
                                            job.latitude,
                                            job.longitude
                                        );

                                    return (
                                        <button
                                            key={job.jobId}
                                            type="button"
                                            onClick={() =>
                                                setSelectedJob(job)
                                            }
                                            className={`rounded-2xl border p-4 text-left shadow-sm transition ${isSelected
                                                    ? "border-[#DD8500] bg-[#00456B] text-white ring-2 ring-[#DD8500]"
                                                    : "border-slate-200 bg-white text-slate-900 hover:border-[#00456B]/40"
                                                }`}
                                        >
                                            <div className="flex gap-4">
                                                {mapImageUrl && (
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${job.latitude},${job.longitude}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        onClick={(event) =>
                                                            event.stopPropagation()
                                                        }
                                                        className="block h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-200"
                                                    >
                                                        <img
                                                            src={mapImageUrl}
                                                            alt={`Map for ${job.jobTitle}`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </a>
                                                )}

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-lg font-black">
                                                        {job.jobTitle}
                                                    </h3>

                                                    <p
                                                        className={`mt-1 text-sm font-bold ${isSelected
                                                                ? "text-white/90"
                                                                : "text-slate-600"
                                                            }`}
                                                    >
                                                        {[
                                                            job.city,
                                                            job.state,
                                                        ]
                                                            .filter(Boolean)
                                                            .join(", ")}{" "}
                                                        {job.zipCode}

                                                        {job.distanceMiles !==
                                                            null &&
                                                            job.distanceMiles !==
                                                            undefined && (
                                                                <span
                                                                    className={
                                                                        isSelected
                                                                            ? "text-[#FFD08A]"
                                                                            : "text-[#DD8500]"
                                                                    }
                                                                >
                                                                    {" "}
                                                                    •{" "}
                                                                    {formatDistance(
                                                                        job.distanceMiles
                                                                    )}
                                                                </span>
                                                            )}
                                                    </p>

                                                    {(job.jobType ||
                                                        job.shiftType ||
                                                        job.payRange) && (
                                                            <p
                                                                className={`mt-2 text-sm font-bold ${isSelected
                                                                        ? "text-white"
                                                                        : "text-[#00456B]"
                                                                    }`}
                                                            >
                                                                {[
                                                                    job.jobType,
                                                                    job.shiftType,
                                                                    job.payRange,
                                                                ]
                                                                    .filter(Boolean)
                                                                    .join(" • ")}
                                                            </p>
                                                        )}

                                                    {job.jobDescription && (
                                                        <p
                                                            className={`mt-3 text-sm leading-6 ${isSelected
                                                                    ? "text-white/85"
                                                                    : "text-slate-600"
                                                                }`}
                                                        >
                                                            {
                                                                job.jobDescription
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                <div className="sticky bottom-4 mt-6 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-black text-slate-900">
                                {selectedJob
                                    ? `Selected: ${selectedJob.jobTitle}`
                                    : "Select a job position to continue"}
                            </p>

                            {selectedJob && (
                                <p className="mt-1 text-sm font-semibold text-slate-500">
                                    {selectedJob.city},{" "}
                                    {selectedJob.state}
                                </p>
                            )}
                        </div>

                        <Link
                            href={
                                selectedJob
                                    ? `/${locationSlug}/jobs/apply?jobId=${selectedJob.jobId}`
                                    : "#"
                            }
                            onClick={(event) => {
                                if (!selectedJob) {
                                    event.preventDefault();

                                    alert(
                                        "Please select a job position first."
                                    );
                                }
                            }}
                            className={`inline-flex justify-center rounded-lg px-6 py-3 text-sm font-black text-white transition ${selectedJob
                                    ? "bg-[#00456B] hover:bg-[#003a5a]"
                                    : "cursor-not-allowed bg-[#87A9BA]"
                                }`}
                        >
                            Apply to Selected Position
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}