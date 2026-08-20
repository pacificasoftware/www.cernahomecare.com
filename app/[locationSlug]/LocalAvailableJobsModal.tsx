"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type LocalJob = {
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
};

type Props = {
    locationId: number;
    locationName: string;
    city: string;
    state: string;
    jobsZip?: string | null;
    locationSlug: string;
};

export default function LocalAvailableJobsModal({
    locationId,
    locationName,
    city,
    state,
    jobsZip,
    locationSlug,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [jobs, setJobs] = useState<LocalJob[]>([]);
    const [selectedJob, setSelectedJob] = useState<LocalJob | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function loadJobs() {
        if (!jobsZip) {
            setIsOpen(true);
            setJobs([]);
            setSelectedJob(null);
            setErrorMessage("No ZIP code is configured for this location.");
            return;
        }

        try {
            setIsOpen(true);
            setIsLoading(true);
            setErrorMessage("");
            setJobs([]);
            setSelectedJob(null);

            const url = `/api/public/jobs/active?zipCode=${encodeURIComponent(
                jobsZip
            )}&radiusMiles=500`;

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
                setErrorMessage(`No open jobs were found for ${locationName} right now.`);
                return;
            }

            const rawJobs = (
                Array.isArray(result)
                    ? result
                    : Array.isArray(result.jobs)
                        ? result.jobs
                        : Array.isArray(result.Jobs)
                            ? result.Jobs
                            : Array.isArray(result.data)
                                ? result.data
                                : Array.isArray(result.Data)
                                    ? result.Data
                                    : Array.isArray(result.items)
                                        ? result.items
                                        : Array.isArray(result.Items)
                                            ? result.Items
                                            : []
            ) as any[];

            const normalizedJobs = rawJobs.map((job) => ({
                jobId: job.jobId ?? job.JobId,
                locationId: job.locationId ?? job.locationId,
                locationName: job.locationName ?? job.locationName,
                locationCity: job.locationCity ?? job.locationCity,
                locationState: job.locationState ?? job.locationState,
                locationZipCode: job.locationZipCode ?? job.locationZipCode,

                jobTitle: job.jobTitle ?? job.JobTitle,
                jobType: job.jobType ?? job.JobType,
                shiftType: job.shiftType ?? job.ShiftType,
                jobDescription: job.jobDescription ?? job.JobDescription,
                city: job.city ?? job.City,
                state: job.state ?? job.State,
                zipCode: job.zipCode ?? job.ZipCode,
                payRange: job.payRange ?? job.PayRange,
                sortOrder: job.sortOrder ?? job.SortOrder,
                distanceMiles: job.distanceMiles ?? job.DistanceMiles,
            })) as LocalJob[];


            const filteredJobs = normalizedJobs
                .filter((job) => Number(job.locationId) === Number(locationId))
                .sort((a, b) => {
                    const sortA = a.sortOrder ?? 999;
                    const sortB = b.sortOrder ?? 999;

                    if (sortA !== sortB) return sortA - sortB;

                    return a.jobId - b.jobId;
                });

            if (filteredJobs.length === 0) {
                setErrorMessage(`No open jobs were found for ${locationName} right now.`);
                return;
            }

            setJobs(filteredJobs);
        } catch (error) {
            console.error("Local jobs lookup failed:", error);
            setErrorMessage("Something went wrong loading jobs. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={loadJobs}
                className="rounded-full bg-[#DD8500] px-8 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#c67600]"
            >
                View Open Positions
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm">
                    <div className="relative mx-auto w-full max-w-7xl rounded-3xl bg-white shadow-2xl">
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                setSelectedJob(null);
                            }}
                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-2xl font-black text-slate-600 transition hover:bg-slate-200"
                            aria-label="Close jobs popup"
                        >
                            ×
                        </button>

                        {/* HERO */}
                        <section className="bg-slate-50">
                            <div className="mx-auto max-w-7xl px-6 py-8 text-center sm:px-8 lg:px-10">
                                <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#DD8500]">
                                    Careers at Cerna
                                </p>

                                <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-[#DD8500]" />

                                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#00456B] sm:text-4xl">
                                    Current Employment Openings
                                </h1>

                                <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-700">
                                    View current caregiver opportunities for {locationName}.
                                </p>
                            </div>
                        </section>

                        {/* MAIN PANELS */}
                        <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
                            <div className="grid gap-8 lg:grid-cols-2">
                                {/* LEFT PANEL - JOBS */}
                                <aside className="rounded-3xl bg-[#00456B] p-8 text-white shadow-xl">
                                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                                        Open Positions
                                    </p>

                                    <h3 className="mt-4 text-3xl font-extrabold">
                                        Jobs available in {city}, {state}
                                    </h3>

                                    <p className="mt-3 text-base leading-7 text-white/85">
                                        Select one of the available positions below to begin your
                                        application with {locationName}.
                                    </p>

                                    {isLoading && (
                                        <div className="mt-8 rounded-2xl bg-white/10 p-8 text-center">
                                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-[#DD8500]" />

                                            <p className="mt-4 text-sm font-bold text-white/85">
                                                Loading available jobs...
                                            </p>
                                        </div>
                                    )}

                                    {errorMessage && !isLoading && (
                                        <div className="mt-8 rounded-2xl bg-white/10 p-6">
                                            <h4 className="text-lg font-extrabold text-white">
                                                No jobs currently listed
                                            </h4>

                                            <p className="mt-2 text-sm leading-6 text-white/80">
                                                {errorMessage}
                                            </p>
                                        </div>
                                    )}

                                    {!isLoading && !errorMessage && jobs.length > 0 && (
                                        <div className="mt-6 grid gap-4">
                                            {jobs.map((job) => {
                                                const isSelected = selectedJob?.jobId === job.jobId;

                                                return (
                                                    <button
                                                        key={job.jobId}
                                                        type="button"
                                                        onClick={() => setSelectedJob(job)}
                                                        className={`rounded-2xl p-5 text-left transition ${isSelected
                                                                ? "bg-[#DD8500] text-white"
                                                                : "bg-white text-slate-900 hover:bg-slate-100"
                                                            }`}
                                                    >
                                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                            <div>
                                                                <h4
                                                                    className={`text-lg font-extrabold ${isSelected
                                                                            ? "text-white"
                                                                            : "text-[#00456B]"
                                                                        }`}
                                                                >
                                                                    {job.jobTitle}
                                                                </h4>

                                                                <p
                                                                    className={`mt-1 text-sm font-bold ${isSelected
                                                                            ? "text-white/90"
                                                                            : "text-slate-600"
                                                                        }`}
                                                                >
                                                                    {[job.city, job.state]
                                                                        .filter(Boolean)
                                                                        .join(", ")}{" "}
                                                                    {job.zipCode}
                                                                </p>
                                                            </div>

                                                            {isSelected && (
                                                                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                                                                    Selected
                                                                </span>
                                                            )}
                                                        </div>

                                                        {(job.jobType || job.shiftType || job.payRange) && (
                                                            <p
                                                                className={`mt-3 text-sm font-semibold ${isSelected
                                                                        ? "text-white/90"
                                                                        : "text-[#00456B]"
                                                                    }`}
                                                            >
                                                                {[job.jobType, job.shiftType, job.payRange]
                                                                    .filter(Boolean)
                                                                    .join(" • ")}
                                                            </p>
                                                        )}

                                                        {job.jobDescription && (
                                                            <p
                                                                className={`mt-3 text-sm leading-6 ${isSelected
                                                                        ? "text-white/85"
                                                                        : "text-slate-700"
                                                                    }`}
                                                            >
                                                                {job.jobDescription}
                                                            </p>
                                                        )}
                                                    </button>
                                                );
                                            })}

                                            <Link
                                                href={
                                                    selectedJob
                                                        ? `/careers/${locationSlug}/apply?jobId=${selectedJob.jobId}`
                                                        : "#"
                                                }
                                                onClick={(e) => {
                                                    if (!selectedJob) {
                                                        e.preventDefault();
                                                        alert("Please select a job position first.");
                                                    }
                                                }}
                                                className={`mt-2 rounded-lg px-7 py-4 text-center text-sm font-extrabold uppercase tracking-wide text-white transition ${selectedJob
                                                        ? "bg-[#DD8500] hover:bg-[#c87500]"
                                                        : "cursor-not-allowed bg-white/30"
                                                    }`}
                                            >
                                                Apply to Selected Position
                                            </Link>
                                        </div>
                                    )}
                                </aside>

                                {/* RIGHT PANEL */}
                                <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
                                    <div className="relative h-[260px] w-full">
                                        <Image
                                            src="/assets/love-work-400x269.webp"
                                            alt="Caregiver team"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="p-8">
                                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                                            Join Our Team
                                        </p>

                                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#00456B]">
                                            Join a care team that values compassion
                                        </h2>

                                        <p className="mt-5 text-lg leading-8 text-slate-700">
                                            {locationName} is hiring compassionate caregivers who
                                            want to make a meaningful difference for seniors and
                                            families in {city}.
                                        </p>

                                        <div className="mt-8 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DD8500]/15 text-[#DD8500]">
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="h-7 w-7"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M7 3v3M17 3v3M4.5 9.5h15M6.5 21h11A2.5 2.5 0 0 0 20 18.5v-11A2.5 2.5 0 0 0 17.5 5h-11A2.5 2.5 0 0 0 4 7.5v11A2.5 2.5 0 0 0 6.5 21Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                        />
                                                        <path
                                                            d="M8 14l2.2 2.2L16 10.8"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>

                                                <div>
                                                    <h3 className="text-lg font-extrabold text-[#00456B]">
                                                        Flexible Schedules
                                                    </h3>

                                                    <p className="mt-2 text-base leading-7 text-slate-700">
                                                        Flexible schedules, rewarding work, supportive
                                                        leadership, and opportunities to grow your
                                                        caregiving career with Cerna Home Care.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedJob && (
                                            <div className="mt-8 rounded-2xl bg-[#00456B] p-5 text-white">
                                                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#DD8500]">
                                                    Selected Position
                                                </p>

                                                <h3 className="mt-2 text-2xl font-extrabold">
                                                    {selectedJob.jobTitle}
                                                </h3>

                                                <p className="mt-2 text-sm font-semibold text-white/85">
                                                    {[selectedJob.city, selectedJob.state]
                                                        .filter(Boolean)
                                                        .join(", ")}{" "}
                                                    {selectedJob.zipCode}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
}