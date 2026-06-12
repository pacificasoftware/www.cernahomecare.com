"use client";

import Image from "next/image";
import { useState } from "react";
import { Raleway } from "next/font/google";
import { Fragment } from "react";

const ralewayThin = Raleway({
    subsets: ["latin"],
    weight: "100",
});
function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatZip(value: string) {
    return value.replace(/\D/g, "").slice(0, 5);
}

const reasons = [
    {
        title: "Easy hiring process",
        text: "Apply in under 10 minutes",
    },
    {
        title: "Flexible scheduling",
        text: "Full-time, part-time & per diem",
    },
    {
        title: "Competitive pay",
        text: "Bi-weekly direct deposit",
    },
    {
        title: "Refer-a-friend bonus",
        text: "Earn when you bring people in",
    },
    {
        title: "Career advancement",
        text: "Caregiver → care manager",
    },
    {
        title: "Paid training",
        text: "We invest in your growth",
    },
];

const steps = [
    {
        number: "1",
        title: "Enter your ZIP",
        text: "Find openings at the franchise near you",
    },
    {
        number: "2",
        title: "Browse jobs",
        text: "Pick a role that fits your skills and schedule",
    },
    {
        number: "3",
        title: "Apply online",
        text: "Quick and easy, takes less than 10 minutes",
    },
    {
        number: "4",
        title: "We call you",
        text: "Our team reviews every application personally",
    },
];

const caregiverShifts = [
    "Newport Beach – 7am to 7pm FRI THRU SUN",
    "Irvine – 9am to 7pm SAT THRU SUN",
    "Rancho Mission Viejo – 7am to 7pm FRI THRU SUN",
    "Orange – 8am to 2pm FRI THRU SUN",
    "Newport Beach – 7am to 3pm WED, SAT",
    "Laguna Woods – 4pm to 9pm SAT, SUN",
];

export default function CareersPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resumeName, setResumeName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [isJobsPopupOpen, setIsJobsPopupOpen] = useState(false);

    const [selectedPopupJob, setSelectedPopupJob] = useState<PublicJob | null>(null);
    const [showPopupApplicationForm, setShowPopupApplicationForm] = useState(false);
    const [popupResumeName, setPopupResumeName] = useState("");
    const [isPopupSubmitting, setIsPopupSubmitting] = useState(false);

    const [jobsLoading, setJobsLoading] = useState(false);
    const [jobsError, setJobsError] = useState("");
    const [jobGroups, setJobGroups] = useState<FranchiseeJobGroup[]>([]);

    async function loadJobsNearZip() { 
       
        if (zipCode.length !== 5) {
            alert("Please enter a valid 5-digit ZIP code.");
            return;
        }

        try {
            setJobsLoading(true);
            setJobsError("");
            setJobGroups([]);
            setSelectedPopupJob(null);
            setShowPopupApplicationForm(false);
            setPopupResumeName("");
            setIsJobsPopupOpen(true);

            const apiBaseUrl =
                process.env.NEXT_PUBLIC_API_BASE_URL ||
                "https://api.cernahomecare.com";

            const url = `${apiBaseUrl.replace(/\/$/, "")}/api/public/jobs/active`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
            }); 

            if (!response.ok) {
                throw new Error(`Failed to load jobs. Status: ${response.status}`);
            }

            const jobs = (await response.json()) as PublicJob[];

            const grouped = jobs.reduce<Record<number, FranchiseeJobGroup>>(
                (acc, job) => {
                    if (!acc[job.franchiseeId]) {
                        acc[job.franchiseeId] = {
                            franchiseeId: job.franchiseeId,
                            franchiseeName: job.franchiseeName,
                            franchiseeCity: job.franchiseeCity,
                            franchiseeState: job.franchiseeState,
                            franchiseeZipCode: job.franchiseeZipCode,
                            jobs: [],
                        };
                    }

                    acc[job.franchiseeId].jobs.push(job);
                    return acc;
                },
                {}
            );

            setJobGroups(Object.values(grouped).slice(0, 3));
        } catch (error) {
            console.error(error);
            setJobsError("Sorry, we could not load jobs right now.");
        } finally {
            setJobsLoading(false);
        }
    }

    type PublicJob = {
        jobId: number;
        franchiseeId: number;
        franchiseeName: string;
        franchiseeCity: string | null;
        franchiseeState: string | null;
        franchiseeZipCode: string | null;
        jobTitle: string;
        jobType: string | null;
        shiftType: string | null;
        jobDescription: string | null;
        city: string | null;
        state: string | null;
        zipCode: string | null;
        payRange: string | null;
        sortOrder: number;
    };

    type FranchiseeJobGroup = {
        franchiseeId: number;
        franchiseeName: string;
        franchiseeCity: string | null;
        franchiseeState: string | null;
        franchiseeZipCode: string | null;
        jobs: PublicJob[];
    };


    return (
        <main className="bg-white">

            {/* HERO */}
            <section className="relative min-h-[490px] overflow-hidden bg-[#003E68]">
                <div className="absolute inset-y-0 right-[-90px] w-[78%]">
                    <Image
                        src="/assets/careers/duo.webp"
                        alt="Cerna Home Care caregivers"
                        fill
                        priority
                        sizes="80vw"
                        className="scale-[1.02] object-contain object-bottom"
                    />
                </div>

                <div className="relative flex min-h-[420px] w-full items-center px-6 py-10 sm:px-8 lg:px-14 xl:px-20">
                    <div className="w-full max-w-[430px]">
                        <h1 className="text-white">
                            <span className="block text-[24px] font-black leading-[0.92] tracking-[-0.04em] sm:text-[30px] lg:text-[34px]">
                                Make a Difference
                            </span>

                            <span className="mt-1 block leading-none tracking-[-0.05em]">
                                <span
                                    className={`${ralewayThin.className} text-[46px] leading-[0.84] tracking-[-0.04em] text-white/90 sm:text-[56px] lg:text-[66px]`}
                                >
                                    Every
                                </span>

                                <span className="ml-2 align-baseline text-[42px] font-black leading-[0.84] sm:text-[52px] lg:text-[60px]">
                                    Day
                                </span>
                            </span>
                        </h1>

                        <div className="mt-3 h-px w-[255px] max-w-full bg-white/55" />

                        <p className="mt-3 flex max-w-[390px] items-start gap-2.5 text-[16px] font-light leading-[1.22] tracking-[-0.035em] text-white/90 sm:text-[18px] lg:text-[20px]">
                            <span className="mt-1 inline-block h-3.5 w-3.5 shrink-0 rotate-45 bg-white shadow-sm" />
                            <span>
                                Join the{" "}
                                <span className="font-semibold text-white">
                                    CERNA Home Care
                                </span>{" "}
                                team and build a career rooted in compassion, purpose, and
                                community.
                            </span>
                        </p>

                        <div className="mt-8 w-full max-w-[410px] rounded-xl bg-white/20 px-5 pb-3 pt-3 shadow-xl ring-1 ring-white/10 backdrop-blur-sm">
                            <label className="block border-b border-white/70 pb-2.5 text-[16px] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-[18px]">
                                Enter your ZIP code to find jobs near you
                            </label>

                            <div className="mt-2.5 flex items-center gap-2.5">
                                <input
                                    value={zipCode}
                                    onChange={(e) => setZipCode(formatZip(e.target.value))}
                                    placeholder="e.g. 90210"
                                    inputMode="numeric"
                                    maxLength={5}
                                    pattern="[0-9]{5}"
                                    className="h-[38px] w-[135px] rounded-md border border-black bg-[#05070a] px-3 text-[15px] font-medium text-white placeholder:text-white outline-none focus:ring-2 focus:ring-white/60"
                                />

                                <button
                                    type="button"
                                    onClick={loadJobsNearZip}
                                    className="inline-flex h-[38px] items-center justify-center rounded-md border border-white/80 bg-white/10 px-4 text-[16px] font-semibold text-white transition hover:bg-white/20"
                                >
                                    <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] text-[#236491]">
                                        ●
                                    </span>
                                    Find Jobs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
           
            {/* JOIN TEAM */}
            <section className="bg-[#f5f7fb]">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                        {/* LEFT COLUMN */}
                        <div>
                            <p className="inline-flex rounded-md bg-[#00456B] px-4 py-1 text-sm font-extrabold text-white">
                                Caregiver Jobs
                            </p>

                            <h2 className="mt-5 max-w-[560px] font-black leading-[0.88] tracking-[-0.095em]">
                                <span className="text-[36px] text-[#4f4f52] sm:text-[46px] lg:text-[54px]">
                                    Join
                                </span>

                                <span
                                    className={`${ralewayThin.className} ml-1 text-[44px] font-thin text-[#00456B] sm:text-[56px] lg:text-[64px]`}
                                >
                                    the
                                </span>

                                <span className="ml-1 text-[44px] text-[#00456B] sm:text-[56px] lg:text-[64px]">
                                    CERNA
                                </span>

                                <br />

                                <span className="text-[44px] text-[#00456B] sm:text-[56px] lg:text-[64px]">
                                    Home
                                </span>

                                <span
                                    className={`${ralewayThin.className} ml-1 text-[44px] font-thin text-[#00456B] sm:text-[56px] lg:text-[64px]`}
                                >
                                    Care
                                </span>

                                <span className="ml-1 text-[44px] text-[#4f4f52] sm:text-[56px] lg:text-[64px]">
                                    team
                                </span>
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-700">
                                Build a career that fits your life while making a real difference
                                for others. As a Cerna Home Care caregiver, you’ll help seniors
                                live safely and comfortably at home, forming real connections and
                                bringing peace of mind to families.
                            </p>

                            <h3 className="mt-8 rounded-md bg-[#00456B] px-4 py-2 text-center text-lg font-black text-white">
                                6 reasons to join the Cerna team
                            </h3>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                {reasons.map((reason) => (
                                    <div
                                        key={reason.title}
                                        className="rounded-2xl bg-[#00456B] p-5 text-white shadow-sm"
                                    >
                                        <div className="text-sm font-black">
                                            {reason.title}
                                        </div>

                                        <div className="mt-1 text-sm leading-6 text-white/85">
                                            {reason.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT IMAGE - LEVEL WITH LEFT CONTENT */}
                        <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl">
                            <Image
                                src="/assets/careers/caregiver-team.webp"
                                alt="Cerna caregiver helping a senior at home"
                                fill
                                sizes="(max-width: 1024px) 100vw, 620px"
                                className="scale-[1.02] object-cover object-[72%_center]"
                            />
                        </div>
                    </div>

                    {/* FULL-WIDTH BOTTOM IMAGE */}
                    <div className="relative mt-8 h-[220px] overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl sm:h-[270px] lg:h-[300px]">
                        <Image
                            src="/assets/careers/outdoors_coffee.webp"
                            alt="..."
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* STEPS */}
             <section className="bg-white px-6 pb-14 pt-0 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-7xl rounded-3xl border-2 border-[#00456B]/35 bg-white p-6 shadow-[0_14px_40px_rgba(0,69,107,0.14)]">
                    <h2 className="mx-auto w-fit rounded-md bg-[#00456B] px-5 py-2 text-center text-lg font-black text-white">
                        How to start your career with CERNA
                    </h2>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-2 lg:gap-3">
                        {steps.map((step, index) => (
                            <Fragment key={step.number}>
                                <div className="w-full max-w-[200px] text-center md:w-[175px] lg:w-[190px]">
                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#00456B] text-4xl font-black text-white">
                                        {step.number}
                                    </div>

                                    <h3 className="mt-4 text-base font-black text-[#111827]">
                                        {step.title}
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-[190px] text-sm leading-6 text-slate-600">
                                        {step.text}
                                    </p>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="flex h-10 w-10 items-center justify-center md:-mt-16 md:h-20 md:w-12">
                                        <div className="relative h-[16px] w-[34px] rotate-90 bg-[#00456B] md:rotate-0">
                                            <div className="absolute right-[-14px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[14px] border-l-[16px] border-y-transparent border-l-[#00456B]" />
                                        </div>
                                    </div>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </section>


            {/* APPLICATION FORM */}
            <section
                id="apply"
                className="relative overflow-hidden bg-white px-6 py-16 sm:px-8 lg:px-10"
            >
                {/* faded blurred background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[-160px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#00456B]/20 blur-[95px]" />
                    <div className="absolute right-[-170px] top-[120px] h-[460px] w-[460px] rounded-full bg-[#DD8500]/15 blur-[105px]" />
                    <div className="absolute bottom-[-180px] left-1/2 h-[440px] w-[680px] -translate-x-1/2 rounded-full bg-[#00456B]/10 blur-[115px]" />
                </div>

                <div className="relative z-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-3xl font-black tracking-tight text-slate-700">
                            Complete the
                        </p>

                        <h2 className="text-5xl font-black tracking-tight text-[#00456B] sm:text-6xl">
                            Form Below
                        </h2>

                        <p className="mt-2 text-2xl font-semibold text-slate-700">
                            And we’ll get in touch with you
                        </p>
                    </div>

                    <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white/90 p-6 shadow-2xl ring-1 ring-slate-200 backdrop-blur-sm sm:p-8">
                    <p className="mb-6 text-sm font-semibold leading-6 text-slate-700">
                        Thank you for your interest in collaborating with us. Kindly fill
                        out the information below, including your preferred location, so
                        that we can reach out to you.
                    </p>

                    <form
                        className="grid gap-5"
                        onSubmit={async (e) => {
                            e.preventDefault();

                            const form = e.currentTarget;
                            const formData = new FormData(form);

                            const fullName = String(formData.get("FullName") || "").trim();
                            const phone = String(formData.get("Phone") || "").trim();
                            const email = String(formData.get("Email") || "").trim();
                            const resume = formData.get("Resume") as File | null;

                            if (!fullName || !phone || !email) {
                                alert("Please enter your name, phone, and email.");
                                return;
                            }

                            if (!resume || resume.size === 0) {
                                alert("Please attach your resume.");
                                return;
                            }

                            const allowedExtensions = [".pdf", ".doc", ".docx"];
                            const fileName = resume.name.toLowerCase();
                            const isAllowed = allowedExtensions.some((ext) =>
                                fileName.endsWith(ext)
                            );

                            if (!isAllowed) {
                                alert("Please upload a PDF, DOC, or DOCX resume.");
                                return;
                            }

                            if (resume.size > 10 * 1024 * 1024) {
                                alert("Resume cannot exceed 10 MB.");
                                return;
                            }

                            const apiBaseUrl =
                                process.env.NEXT_PUBLIC_API_BASE_URL ||
                                "https://api.cernahomecare.com";

                            const uploadUrl = `${apiBaseUrl}/api/applications/submit-with-resume`;

                            try {
                                setIsSubmitting(true);

                                const response = await fetch(uploadUrl, {
                                    method: "POST",
                                    body: formData,
                                });

                                const responseText = await response.text();

                                let result: any = null;

                                try {
                                    result = responseText ? JSON.parse(responseText) : null;
                                } catch {
                                    result = null;
                                }

                                if (!response.ok) {
                                    alert(
                                        result?.statusMessage ||
                                        result?.message ||
                                        `Application failed. Status: ${response.status}`
                                    );
                                    return;
                                }

                                alert("Thank you! Your application has been submitted.");
                                form.reset();
                                setResumeName("");
                            } catch (error) {
                                console.error("Application submit failed:", error);
                                alert("Something went wrong submitting your application.");
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}
                    >
                        <label className="grid gap-1 text-sm font-bold text-slate-700">
                            <span>
                                Your Name <span className="text-[#DD8500]">*</span>
                            </span>

                            <input
                                name="FullName"
                                required
                                className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                            />
                        </label>

                        <label className="grid gap-1 text-sm font-bold text-slate-700">
                            <span>
                                Phone <span className="text-[#DD8500]">*</span>
                            </span>

                            <input
                                name="Phone"
                                required
                                placeholder="(714) 555-1212"
                                inputMode="tel"
                                maxLength={14}
                                onChange={(e) => {
                                    e.currentTarget.value = formatPhone(e.currentTarget.value);
                                }}
                                className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                            />
                        </label>

                        <label className="grid gap-1 text-sm font-bold text-slate-700">
                            <span>
                                Email Address <span className="text-[#DD8500]">*</span>
                            </span>

                            <input
                                name="Email"
                                type="email"
                                required
                                className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                            />
                        </label>

                        <label className="grid gap-1 text-sm font-bold text-slate-700">
                            <span>Address</span>

                            <input
                                name="Address"
                                className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                            />
                        </label>

                        <div className="grid gap-2">
                            <span className="text-sm font-bold text-slate-700">
                                Do you currently have a HCA Per ID?
                            </span>

                            <div className="grid max-w-xs grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="HasHcaPerId"
                                        value="YES"
                                        defaultChecked
                                        className="peer sr-only"
                                    />

                                    <span className="flex items-center justify-center rounded-lg px-4 py-3 text-sm font-extrabold text-[#00456B] transition peer-checked:bg-[#00456B] peer-checked:text-white">
                                        YES
                                    </span>
                                </label>

                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="HasHcaPerId"
                                        value="NO"
                                        className="peer sr-only"
                                    />

                                    <span className="flex items-center justify-center rounded-lg px-4 py-3 text-sm font-extrabold text-[#00456B] transition peer-checked:bg-[#00456B] peer-checked:text-white">
                                        NO
                                    </span>
                                </label>
                            </div>
                        </div>

                        <label className="grid gap-1 text-sm font-bold text-slate-700">
                            <span>How did you hear about us?</span>

                            <select
                                name="HowHeardAboutUs"
                                defaultValue=""
                                className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                            >
                                <option value="" disabled>
                                    Please select
                                </option>
                                <option value="Google Search">Google Search</option>
                                <option value="Friend or Family">Friend or Family</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Indeed">Indeed</option>
                                <option value="Job Board">Job Board</option>
                                <option value="Cerna Website">Cerna Website</option>
                                <option value="Walk-In">Walk-In</option>
                                <option value="Referral">Referral</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>

                        <div className="grid gap-2">
                            <span className="text-sm font-bold text-slate-700">
                                Upload your resume <span className="text-[#DD8500]">*</span>
                            </span>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-slate-300 px-8 py-4 text-sm font-extrabold text-slate-800 transition hover:bg-slate-400">
                                    Attach file here

                                    <input
                                        name="Resume"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        onChange={(e) => {
                                            setResumeName(e.currentTarget.files?.[0]?.name ?? "");
                                        }}
                                    />
                                </label>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center rounded-lg bg-[#00456B] px-10 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#003a5a] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>

                            {resumeName ? (
                                <p className="text-sm font-semibold text-slate-600">
                                    Attached: {resumeName}
                                </p>
                            ) : null}
                        </div>

                        <p className="max-w-4xl text-xs leading-5 text-slate-600">
                            By submitting this form I agree to be contacted by CERNA Home
                            Care via call, email and text. To opt out, you can reply
                            “stop” at any time or click the unsubscribe link in the emails.
                            Message and data rates may apply.
                        </p>
                    </form>
                    </div>
                </div>
            </section>

            {/* JOBS POPUP */}
            {isJobsPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 pb-6 pt-[150px] backdrop-blur-sm sm:pb-10 sm:pt-[160px]">
                    <div className="relative max-h-[70vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                        <button
                            type="button"
                            onClick={() => {
                                setIsJobsPopupOpen(false);
                                setSelectedPopupJob(null);
                                setShowPopupApplicationForm(false);
                            }}
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xl font-black text-slate-600 transition hover:bg-slate-200"
                            aria-label="Close jobs popup"
                        >
                            ×
                        </button>

                        {!showPopupApplicationForm && (
                            <>
                                <div className="pr-10">
                                    <p className="text-sm font-black uppercase tracking-[0.25em] text-[#DD8500]">
                                        Jobs Near You
                                    </p>

                                    <h2 className="mt-2 text-3xl font-black tracking-tight text-[#00456B] sm:text-4xl">
                                        Closest CERNA locations hiring near {zipCode}
                                    </h2>

                                    <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
                                        Select a job position below, then click apply to continue.
                                    </p>
                                </div>

                                {jobsLoading && (
                                    <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-center font-bold text-slate-600">
                                        Loading available jobs...
                                    </div>
                                )}

                                {jobsError && !jobsLoading && (
                                    <div className="mt-8 rounded-2xl bg-red-50 p-6 text-center font-bold text-red-700">
                                        {jobsError}
                                    </div>
                                )}

                                {!jobsLoading && !jobsError && jobGroups.length === 0 && (
                                    <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-center font-bold text-slate-600">
                                        No jobs are currently available.
                                    </div>
                                )}

                                {!jobsLoading && !jobsError && jobGroups.length > 0 && (
                                    <div className="mt-6 grid gap-5">
                                        {jobGroups.map((group) => (
                                            <div
                                                key={group.franchiseeId}
                                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                                            >
                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                                    <div>
                                                        <h3 className="text-xl font-black text-[#00456B]">
                                                            {group.franchiseeName}
                                                        </h3>

                                                        <p className="mt-1 text-sm font-semibold text-slate-500">
                                                            {group.franchiseeCity}, {group.franchiseeState}{" "}
                                                            {group.franchiseeZipCode}
                                                        </p>
                                                    </div>

                                                    <span className="w-fit rounded-full bg-[#DD8500]/15 px-3 py-1 text-sm font-black text-[#DD8500]">
                                                        {group.jobs.length}{" "}
                                                        {group.jobs.length === 1 ? "job" : "jobs"} available
                                                    </span>
                                                </div>

                                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                    {group.jobs.map((job) => {
                                                        const isSelected =
                                                            selectedPopupJob?.jobId === job.jobId;

                                                        return (
                                                            <button
                                                                key={job.jobId}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedPopupJob(job);
                                                                    setShowPopupApplicationForm(false);
                                                                }}
                                                                className={`rounded-xl p-4 text-left shadow-sm ring-2 transition ${isSelected
                                                                        ? "bg-[#00456B] text-white ring-[#DD8500]"
                                                                        : "bg-white text-slate-900 ring-slate-200 hover:ring-[#00456B]/40"
                                                                    }`}
                                                            >
                                                                <p className="font-black">
                                                                    {job.jobTitle}
                                                                </p>

                                                                {(job.jobType ||
                                                                    job.shiftType ||
                                                                    job.payRange) && (
                                                                        <p
                                                                            className={`mt-1 text-sm font-semibold ${isSelected
                                                                                    ? "text-white/90"
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
                                                                        className={`mt-2 text-sm leading-6 ${isSelected
                                                                                ? "text-white/85"
                                                                                : "text-slate-600"
                                                                            }`}
                                                                    >
                                                                        {job.jobDescription}
                                                                    </p>
                                                                )}

                                                                {isSelected && (
                                                                    <p className="mt-3 text-xs font-black uppercase tracking-wide text-[#FFD08A]">
                                                                        Selected
                                                                    </p>
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="sticky bottom-0 mt-2 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">
                                                        {selectedPopupJob
                                                            ? `Selected: ${selectedPopupJob.jobTitle}`
                                                            : "Select a job position to continue"}
                                                    </p>

                                                    {selectedPopupJob && (
                                                        <p className="mt-1 text-sm font-semibold text-slate-500">
                                                            {selectedPopupJob.franchiseeName}
                                                        </p>
                                                    )}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (!selectedPopupJob) {
                                                            alert("Please select a job position first.");
                                                            return;
                                                        }

                                                        setShowPopupApplicationForm(true);
                                                    }}
                                                    className="inline-flex rounded-lg bg-[#00456B] px-5 py-3 text-sm font-black text-white transition hover:bg-[#003a5a] disabled:cursor-not-allowed disabled:opacity-50"
                                                    disabled={!selectedPopupJob}
                                                >
                                                    Apply to Selected Position
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {showPopupApplicationForm && selectedPopupJob && (
                            <div className="mt-2 rounded-3xl border-2 border-[#00456B]/20 bg-white p-6 shadow-xl">
                                <button
                                    type="button"
                                    onClick={() => setShowPopupApplicationForm(false)}
                                    className="mb-4 text-sm font-black text-[#00456B] hover:underline"
                                >
                                    ← Back to jobs
                                </button>

                                <div className="mb-6 rounded-2xl bg-[#00456B] p-4 text-white">
                                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                                        Applying for
                                    </p>

                                    <h3 className="mt-1 text-2xl font-black">
                                        {selectedPopupJob.jobTitle}
                                    </h3>

                                    <p className="mt-1 text-sm font-semibold text-white/90">
                                        {selectedPopupJob.franchiseeName} •{" "}
                                        {selectedPopupJob.franchiseeCity},{" "}
                                        {selectedPopupJob.franchiseeState}
                                    </p>
                                </div>

                                <form
                                    className="grid gap-5"
                                    onSubmit={async (e) => {
                                        e.preventDefault();

                                        const form = e.currentTarget;
                                        const formData = new FormData(form);

                                        formData.append(
                                            "FranchiseeId",
                                            String(selectedPopupJob.franchiseeId)
                                        );
                                        formData.append("JobId", String(selectedPopupJob.jobId));
                                        formData.append("AppliedZipCode", zipCode);

                                        const fullName = String(
                                            formData.get("FullName") || ""
                                        ).trim();
                                        const phone = String(formData.get("Phone") || "").trim();
                                        const email = String(formData.get("Email") || "").trim();
                                        const resume = formData.get("Resume") as File | null;

                                        if (!fullName || !phone || !email) {
                                            alert("Please enter your name, phone, and email.");
                                            return;
                                        }

                                        if (!resume || resume.size === 0) {
                                            alert("Please attach your resume.");
                                            return;
                                        }

                                        const allowedExtensions = [".pdf", ".doc", ".docx"];
                                        const fileName = resume.name.toLowerCase();
                                        const isAllowed = allowedExtensions.some((ext) =>
                                            fileName.endsWith(ext)
                                        );

                                        if (!isAllowed) {
                                            alert("Please upload a PDF, DOC, or DOCX resume.");
                                            return;
                                        }

                                        if (resume.size > 10 * 1024 * 1024) {
                                            alert("Resume cannot exceed 10 MB.");
                                            return;
                                        }

                                        const apiBaseUrl =
                                            process.env.NEXT_PUBLIC_API_BASE_URL ||
                                            "https://api.cernahomecare.com";

                                        const uploadUrl = `${apiBaseUrl.replace(
                                            /\/$/,
                                            ""
                                        )}/api/applications/submit-with-resume`;

                                        try {
                                            setIsPopupSubmitting(true);

                                            const response = await fetch(uploadUrl, {
                                                method: "POST",
                                                body: formData,
                                            });

                                            const responseText = await response.text();

                                            let result: any = null;

                                            try {
                                                result = responseText
                                                    ? JSON.parse(responseText)
                                                    : null;
                                            } catch {
                                                result = null;
                                            }

                                            if (!response.ok) {
                                                alert(
                                                    result?.statusMessage ||
                                                    result?.message ||
                                                    `Application failed. Status: ${response.status}`
                                                );
                                                return;
                                            }

                                            alert("Thank you! Your application has been submitted.");
                                            form.reset();
                                            setPopupResumeName("");
                                            setShowPopupApplicationForm(false);
                                            setIsJobsPopupOpen(false);
                                        } catch (error) {
                                            console.error(
                                                "Popup application submit failed:",
                                                error
                                            );
                                            alert("Something went wrong submitting your application.");
                                        } finally {
                                            setIsPopupSubmitting(false);
                                        }
                                    }}
                                >
                                    <input
                                        type="hidden"
                                        name="FranchiseeId"
                                        value={selectedPopupJob.franchiseeId}
                                    />

                                    <input
                                        type="hidden"
                                        name="JobId"
                                        value={selectedPopupJob.jobId}
                                    />

                                    <input type="hidden" name="AppliedZipCode" value={zipCode} />

                                    <label className="grid gap-1 text-sm font-bold text-slate-700">
                                        <span>
                                            Your Name <span className="text-[#DD8500]">*</span>
                                        </span>

                                        <input
                                            name="FullName"
                                            required
                                            className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                                        />
                                    </label>

                                    <label className="grid gap-1 text-sm font-bold text-slate-700">
                                        <span>
                                            Phone <span className="text-[#DD8500]">*</span>
                                        </span>

                                        <input
                                            name="Phone"
                                            required
                                            placeholder="(714) 555-1212"
                                            inputMode="tel"
                                            maxLength={14}
                                            onChange={(e) => {
                                                e.currentTarget.value = formatPhone(
                                                    e.currentTarget.value
                                                );
                                            }}
                                            className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                                        />
                                    </label>

                                    <label className="grid gap-1 text-sm font-bold text-slate-700">
                                        <span>
                                            Email Address{" "}
                                            <span className="text-[#DD8500]">*</span>
                                        </span>

                                        <input
                                            name="Email"
                                            type="email"
                                            required
                                            className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                                        />
                                    </label>

                                    <label className="grid gap-1 text-sm font-bold text-slate-700">
                                        <span>Address</span>

                                        <input
                                            name="Address"
                                            className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                                        />
                                    </label>

                                    <div className="grid gap-2">
                                        <span className="text-sm font-bold text-slate-700">
                                            Do you currently have a HCA Per ID?
                                        </span>

                                        <div className="grid max-w-xs grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                                            <label className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="HasHcaPerId"
                                                    value="YES"
                                                    defaultChecked
                                                    className="peer sr-only"
                                                />

                                                <span className="flex items-center justify-center rounded-lg px-4 py-3 text-sm font-extrabold text-[#00456B] transition peer-checked:bg-[#00456B] peer-checked:text-white">
                                                    YES
                                                </span>
                                            </label>

                                            <label className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="HasHcaPerId"
                                                    value="NO"
                                                    className="peer sr-only"
                                                />

                                                <span className="flex items-center justify-center rounded-lg px-4 py-3 text-sm font-extrabold text-[#00456B] transition peer-checked:bg-[#00456B] peer-checked:text-white">
                                                    NO
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <label className="grid gap-1 text-sm font-bold text-slate-700">
                                        <span>How did you hear about us?</span>

                                        <select
                                            name="HowHeardAboutUs"
                                            defaultValue=""
                                            className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                                        >
                                            <option value="" disabled>
                                                Please select
                                            </option>
                                            <option value="Google Search">Google Search</option>
                                            <option value="Friend or Family">
                                                Friend or Family
                                            </option>
                                            <option value="Social Media">Social Media</option>
                                            <option value="Indeed">Indeed</option>
                                            <option value="Job Board">Job Board</option>
                                            <option value="Cerna Website">Cerna Website</option>
                                            <option value="Walk-In">Walk-In</option>
                                            <option value="Referral">Referral</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </label>

                                    <div className="grid gap-2">
                                        <span className="text-sm font-bold text-slate-700">
                                            Upload your resume{" "}
                                            <span className="text-[#DD8500]">*</span>
                                        </span>

                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-slate-300 px-8 py-4 text-sm font-extrabold text-slate-800 transition hover:bg-slate-400">
                                                Attach file here

                                                <input
                                                    name="Resume"
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        setPopupResumeName(
                                                            e.currentTarget.files?.[0]?.name ?? ""
                                                        );
                                                    }}
                                                />
                                            </label>

                                            <button
                                                type="submit"
                                                disabled={isPopupSubmitting}
                                                className="inline-flex items-center justify-center rounded-lg bg-[#00456B] px-10 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#003a5a] disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {isPopupSubmitting
                                                    ? "Submitting..."
                                                    : "Submit Application"}
                                            </button>
                                        </div>

                                        {popupResumeName ? (
                                            <p className="text-sm font-semibold text-slate-600">
                                                Attached: {popupResumeName}
                                            </p>
                                        ) : null}
                                    </div>

                                    <p className="max-w-4xl text-xs leading-5 text-slate-600">
                                        By submitting this form I agree to be contacted by CERNA
                                        Home Care via call, email and text. To opt out, you can
                                        reply “stop” at any time or click the unsubscribe link in
                                        the emails. Message and data rates may apply.
                                    </p>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}