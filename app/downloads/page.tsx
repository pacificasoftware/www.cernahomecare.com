"use client"; 
import Link from "next/link";

const downloads = [
    {
        title: "New ADL Form",
        description: "NEW ADL FORM (THIS ONE CAN BE DONE ELECTRONICALLY)",
        href: "/downloads/ADL-Form-can-be-done-Electronicly.pdf",
    },
    {
        title: "ADL Instructions",
        description: "ADL INSTRUCTIONS (HOW TO USE THIS ELECTRONIC FORM)",
        href: "/downloads/Cerna-Healthcare-ADL-Instructions-For-new-fillinable-form-revised.pdf",
    },
    {
        title: "Our Brochure",
        description: "CERNA HEALTH CARE BROCHURE (PRINTABLE)",
        href: "/downloads/Brochure-Summer-2019.pdf",
    },
    {
        title: "Free Fall Prevention Guide (PDF)",
        description: "Download our free fall prevention guide.",
        href: "/downloads/CERNA_FALL_PREVENTION_GUIDE_OCT15_v6.pdf",
    },
    {
        title: "Free Nutrition Guide (PDF)",
        description: "Download our free nutrition guide.",
        href: "/downloads/CERNA_NUTRITION_GUIDE_OCT15_v5.pdf",
    },
];

export default function DownloadsPage() {
    return (
        <main className="bg-slate-50">
            <section className="bg-[#00456B] px-6 py-20 text-white">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        Cerna Home Care
                    </p>

                    <h1 className="text-5xl font-extrabold md:text-6xl">
                        Updated Downloads
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white/85">
                        Below is a list of available downloads for Cerna Homecare employees
                        and clients. Please check back often as these are constantly updated.
                    </p>

                    <Link
                        href="/contact-us"
                        className="mt-8 inline-flex rounded-full bg-[#DD8500] px-8 py-4 text-lg font-extrabold text-white shadow-lg transition hover:opacity-90"
                    >
                        Request a document for download &gt;
                    </Link>
                </div>
            </section>

            <section className="px-6 py-16">
                <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
                    {downloads.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00456B] text-white">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-8 w-8"
                                >
                                    <path d="M6 3h9l3 3v15H6V3Z" />
                                    <path d="M14 3v4h4" />
                                    <path d="M12 11v6" />
                                    <path d="M9 14l3 3 3-3" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-extrabold text-[#00456B]">
                                {item.title}
                            </h2>

                            <p className="mt-4 min-h-[56px] text-base font-semibold uppercase leading-7 text-slate-600">
                                {item.description}
                            </p>
                            <a
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();

                                    const url = new URL(item.href, window.location.origin).toString();
                                    window.open(url, "_blank", "noopener,noreferrer");
                                }}
                                className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c67600]"
                            >
                                Download
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}