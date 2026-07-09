"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

type PublicJob = {
    jobId: number;
    franchiseeId: number;
    franchiseeName: string;
    franchiseeCity: string;
    franchiseeState: string;
    franchiseeZipCode: string;

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
    franchisee: Franchisee;
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
    franchisee,
    locationSlug,
}: Props) {
    const [jobs, setJobs] = useState<PublicJob[]>([]);
    const [selectedJob, setSelectedJob] = useState<PublicJob | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadJobs() {
            if (!franchisee.jobsZip) {
                setErrorMessage(
                    "No ZIP code is configured for this location."
                );
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setErrorMessage("");

                const url = `/api/public/jobs/active/franchisee/${franchisee.franchiseeId}`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                    cache: "no-store",
                });

                const text = await response.text();

                let result: any = {};

                if (text.trim()) {
                    result = JSON.parse(text);
                }

                if (!response.ok) {
                    throw new Error(
                        result?.message ||
                        `Request failed with status ${response.status}`
                    );
                }

                const rawJobs = (
                    Array.isArray(result)
                        ? result
                        : Array.isArray(result.jobs)
                            ? result.jobs
                            : Array.isArray(result.Jobs)
                                ? result.Jobs
                                : []
                ) as any[];

                const normalizedJobs: PublicJob[] = rawJobs.map((job) => ({
                    jobId: job.jobId ?? job.JobId,
                    franchiseeId:
                        job.franchiseeId ?? job.FranchiseeId,

                    franchiseeName:
                        job.franchiseeName ??
                        job.FranchiseeName ??
                        franchisee.name,

                    franchiseeCity:
                        job.franchiseeCity ??
                        job.FranchiseeCity ??
                        franchisee.city,

                    franchiseeState:
                        job.franchiseeState ??
                        job.FranchiseeState ??
                        franchisee.state,

                    franchiseeZipCode:
                        job.franchiseeZipCode ??
                        job.FranchiseeZipCode ??
                        franchisee.jobsZip ??
                        "",

                    jobTitle: job.jobTitle ?? job.JobTitle,
                    jobType: job.jobType ?? job.JobType,
                    shiftType: job.shiftType ?? job.ShiftType,
                    jobDescription:
                        job.jobDescription ?? job.JobDescription,

                    city: job.city ?? job.City,
                    state: job.state ?? job.State,
                    zipCode: job.zipCode ?? job.ZipCode,
                    payRange: job.payRange ?? job.PayRange,
                    sortOrder: job.sortOrder ?? job.SortOrder,

                    distanceMiles:
                        job.distanceMiles ?? job.DistanceMiles,

                    latitude: job.latitude ?? job.Latitude,
                    longitude: job.longitude ?? job.Longitude,
                }));

                const franchiseeJobs = normalizedJobs.sort((a, b) => {
                    const sortA = a.sortOrder ?? 999;
                    const sortB = b.sortOrder ?? 999;

                    if (sortA !== sortB) {
                        return sortA - sortB;
                    }

                    return a.jobId - b.jobId;
                });

                setJobs(franchiseeJobs);
            } catch (error) {
                console.error("Jobs lookup failed:", error);

                setErrorMessage(
                    "Something went wrong loading the available jobs."
                );
            } finally {
                setIsLoading(false);
            }
        }

        loadJobs();
    }, [
        franchisee.franchiseeId,
        franchisee.jobsZip,
        franchisee.name,
        franchisee.city,
        franchisee.state,
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
                                for {franchisee.name}.
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
                                        {franchisee.name}
                                    </h2>

                                    <p className="mt-1 text-sm font-semibold text-slate-500">
                                        {franchisee.city},{" "}
                                        {franchisee.state}{" "}
                                        {franchisee.jobsZip}
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