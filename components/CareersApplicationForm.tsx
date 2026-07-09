"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CareersApplicationFormProps = {
    franchiseeId: number;
    jobId: number;
    appliedZipCode?: string | null;
    locationSlug: string;
    jobTitle?: string | null;
    franchiseeName?: string | null;
    jobCity?: string | null;
    jobState?: string | null;
    distanceMiles?: number | null;
};

function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) {
        return digits;
    }

    if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6
    )}`;
} 
export default function CareersApplicationForm({
    franchiseeId,
    jobId,
    appliedZipCode,
    locationSlug,
    jobTitle,
    franchiseeName,
    jobCity,
    jobState,
    distanceMiles,
}: CareersApplicationFormProps) {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resumeName, setResumeName] = useState("");

    return (
        <main className="min-h-screen bg-white">
            <section className="bg-slate-50 px-6 py-12 text-center">
                <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#DD8500]">
                    Careers at Cerna
                </p>

                <h1 className="mt-4 text-3xl font-extrabold text-[#00456B] sm:text-4xl">
                    Submit Your Application
                </h1>

                {jobTitle ? (
                    <p className="mt-3 text-lg font-bold text-slate-700">
                        {jobTitle}
                    </p>
                ) : null}

                {franchiseeName ? (
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                        {franchiseeName}
                    </p>
                ) : null}
            </section>

            <section className="mx-auto max-w-4xl px-6 py-12">
                {jobTitle && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#DD8500]">
                            Applying for
                        </p>

                        <h2 className="mt-2 text-2xl font-extrabold text-[#00456B]">
                            {jobTitle}
                        </h2>

                        <p className="mt-2 text-sm font-semibold text-slate-600">
                            {[
                                franchiseeName,
                                [jobCity, jobState].filter(Boolean).join(", "),
                                distanceMiles !== null && distanceMiles !== undefined
                                    ? `${distanceMiles.toFixed(1)} miles away`
                                    : null,
                            ]
                                .filter(Boolean)
                                .join(" • ")}
                        </p>
                    </div>
                )}

                <form
                    className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const form = e.currentTarget;
                        const formData = new FormData(form);

                        const fullName = String(
                            formData.get("FullName") || ""
                        ).trim();

                        const phone = String(
                            formData.get("Phone") || ""
                        ).trim();

                        const email = String(
                            formData.get("Email") || ""
                        ).trim();

                        const resume = formData.get(
                            "Resume"
                        ) as File | null;

                        if (!fullName || !phone || !email) {
                            alert(
                                "Please enter your name, phone, and email."
                            );
                            return;
                        }

                        if (!resume || resume.size === 0) {
                            alert("Please attach your resume.");
                            return;
                        }

                        const allowedExtensions = [
                            ".pdf",
                            ".doc",
                            ".docx",
                        ];

                        const fileName = resume.name.toLowerCase();

                        const isAllowed = allowedExtensions.some((ext) =>
                            fileName.endsWith(ext)
                        );

                        if (!isAllowed) {
                            alert(
                                "Please upload a PDF, DOC, or DOCX resume."
                            );
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
                            setIsSubmitting(true);

                            const response = await fetch(uploadUrl, {
                                method: "POST",
                                body: formData,
                            });

                            const responseText =
                                await response.text();

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

                            alert(
                                "Thank you! Your application has been submitted."
                            );

                            form.reset();
                            setResumeName("");

                            router.push(`/${locationSlug}/jobs`);
                        } catch (error) {
                            console.error(
                                "Application submit failed:",
                                error
                            );

                            alert(
                                "Something went wrong submitting your application."
                            );
                        } finally {
                            setIsSubmitting(false);
                        }
                    }}
                >
                    <input
                        type="hidden"
                        name="FranchiseeId"
                        value={franchiseeId}
                    />

                    <input
                        type="hidden"
                        name="JobId"
                        value={jobId}
                    />

                    <input
                        type="hidden"
                        name="AppliedZipCode"
                        value={appliedZipCode ?? ""}
                    />

                    <label className="grid gap-1 text-sm font-bold text-slate-700">
                        <span>
                            Your Name{" "}
                            <span className="text-[#DD8500]">*</span>
                        </span>

                        <input
                            name="FullName"
                            required
                            className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-[#111827] outline-none focus:bg-white focus:ring-2 focus:ring-[#DD8500]"
                        />
                    </label>

                    <label className="grid gap-1 text-sm font-bold text-slate-700">
                        <span>
                            Phone{" "}
                            <span className="text-[#DD8500]">*</span>
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

                            <option value="Google Search">
                                Google Search
                            </option>

                            <option value="Friend or Family">
                                Friend or Family
                            </option>

                            <option value="Social Media">
                                Social Media
                            </option>

                            <option value="Indeed">Indeed</option>
                            <option value="Job Board">Job Board</option>

                            <option value="Cerna Website">
                                Cerna Website
                            </option>

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
                                    required
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(e) => {
                                        setResumeName(
                                            e.currentTarget.files?.[0]
                                                ?.name ?? ""
                                        );
                                    }}
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center rounded-lg bg-[#00456B] px-10 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#003a5a] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit Application"}
                            </button>
                        </div>

                        {resumeName ? (
                            <p className="text-sm font-semibold text-slate-600">
                                Attached: {resumeName}
                            </p>
                        ) : null}
                    </div>

                    <p className="max-w-4xl text-xs leading-5 text-slate-600">
                        By submitting this form I agree to be contacted by
                        CERNA Home Care via call, email and text. To opt
                        out, you can reply &quot;stop&quot; at any time or
                        click the unsubscribe link in the emails. Message
                        and data rates may apply.
                    </p>
                </form>
            </section>
        </main>
    );
}