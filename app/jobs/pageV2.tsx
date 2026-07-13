"use client";

import { useState } from "react";
import Image from "next/image";

function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function JobsPage() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resumeName, setResumeName] = useState("");

    return (
        <main className="bg-white">
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
                        Cerna Home Care is hiring compassionate caregivers who want to make
                        a meaningful difference for seniors and families.
                    </p>
                </div>
            </section>

            {/* MAIN PANELS */}
            <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* LEFT PANEL */}
                    <aside className="rounded-3xl bg-[#00456B] p-8 text-white shadow-xl">
                        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                            Get In Touch
                        </p>

                        <h3 className="mt-4 text-3xl font-extrabold">
                            Complete the short form below and we'll be in touch.
                        </h3>

                        <p className="mt-3 text-base leading-7 text-white/85">
                            Thank you for your interest in collaborating with us. Kindly fill out
                            the information below, including your preferred location, so that we can
                            reach out to you.
                        </p>
                        <form
                            className="mt-6 grid gap-4"
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
                                    process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.cernahomecare.com";

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
                            <label className="grid gap-1 text-sm font-semibold">
                                <span>
                                    Your Name <span className="text-[#DD8500]">*</span>
                                </span>

                                <input
                                    name="FullName"
                                    required
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#DD8500]"
                                />
                            </label>

                            <label className="grid gap-1 text-sm font-semibold">
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
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#DD8500]"
                                />
                            </label>

                            <label className="grid gap-1 text-sm font-semibold">
                                <span>
                                    Email Address <span className="text-[#DD8500]">*</span>
                                </span>

                                <input
                                    name="Email"
                                    type="email"
                                    required
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#DD8500]"
                                />
                            </label>

                            <label className="grid gap-1 text-sm font-semibold">
                                <span>Address</span>

                                <input
                                    name="Address"
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#DD8500]"
                                />
                            </label>

                            <div className="grid gap-2">
                                <span className="text-sm font-semibold">
                                    Do you currently have a HCA Per ID?
                                </span>

                                <div className="grid w-1/2 grid-cols-2 gap-2 rounded-xl bg-white/10 p-1">
                                    <label className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="HasHcaPerId"
                                            value="YES"
                                            defaultChecked
                                            className="peer sr-only"
                                        />
                                        <span className="flex items-center justify-center rounded-lg px-4 py-3 text-sm font-extrabold text-white transition peer-checked:bg-[#DD8500] peer-checked:text-white">
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
                                        <span className="flex items-center justify-center rounded-lg px-4 py-3 text-sm font-extrabold text-white transition peer-checked:bg-[#DD8500] peer-checked:text-white">
                                            NO
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <label className="grid gap-1 text-sm font-semibold">
                                <span>How did you hear about us?</span>

                                <select
                                    name="HowHeardAboutUs"
                                    defaultValue=""
                                    className="rounded-xl border border-white/20 bg-white px-4 py-3 font-semibold text-[#111827] outline-none focus:ring-2 focus:ring-[#DD8500]"
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
                                <span className="text-sm font-semibold">
                                    Upload your resume <span className="text-[#DD8500]">*</span>
                                </span>

                                <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-white/70 px-6 py-4 text-sm font-extrabold text-[#00456B] transition hover:bg-white">
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

                                {resumeName ? (
                                    <p className="text-sm text-white/80">{resumeName}</p>
                                ) : null}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 rounded-lg bg-[#DD8500] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c87500] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>

                            <p className="text-xs leading-5 text-white/75">
                                By submitting this form I agree to be contacted by CERNA Home Care
                                via call, email and text. To opt out, you can reply “stop” at any
                                time or click the unsubscribe link in the emails. Message and data
                                rates may apply.
                            </p>
                        </form>

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
                                We are always looking for caring, dependable people who want
                                to provide excellent support to clients and families.
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
                                            Flexible schedules, rewarding work, supportive leadership,
                                            and opportunities to grow your caregiving career with
                                            Cerna Home Care.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
} 