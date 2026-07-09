import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Careers | Cerna Home Care",
    description:
        "Apply now for Cerna Home Care jobs and view available caregiver and healthcare career opportunities.",
};

const celebrationImages = [
    {
        src: "/assets/love-work.webp",
        alt: "Cerna Home Care team celebration",
    },
    {
        src: "/assets/love-works.webp",
        alt: "Cerna Home Care careers celebration",
    },
    {
        src: "/assets/cerna-crew.webp",
        alt: "Cerna Home Care crew",
    },
];

export default function CareersPage() {
    return (
        <main className="bg-white">
            <section className="bg-white">
                <div className="mx-auto max-w-5xl px-6 py-12 text-center sm:px-8 lg:px-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#00456B] sm:text-5xl">
                        Apply Now!
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg font-bold leading-8 text-blue-700">
                        For more information or to get assistance with applying to Cerna Home Care
                        please call us at{" "}
                        <a href="tel:18775776782" className="underline underline-offset-4">
                            1 (877) 577-6782
                        </a>
                        .
                    </p>

                    <p className="mt-6 text-lg uppercase tracking-wide text-slate-600">
                        Thank you for your interest in working with Cerna.
                    </p>

                    <div className="mt-7">
                        <Link
                            href="/jobs"
                            className="inline-flex bg-[#005B89] px-12 py-4 text-lg font-extrabold uppercase tracking-wide text-white transition hover:bg-[#00456B]"
                        >
                            See Available Job Listings
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-[#236491]">
                <div className="mx-auto max-w-7xl px-6 pb-20 pt-14 sm:px-8 lg:px-10">
                    <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        It’s Always fun at Cerna – Cerna Celebrations!
                    </h2>

                    <div className="mt-12 grid gap-10 md:grid-cols-3">
                        {celebrationImages.map((image) => (
                            <div key={image.src} className="overflow-hidden">
                                <div className="relative h-[250px] bg-slate-100">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 420px"
                                        className="object-cover"
                                        quality={100}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-20">
                <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#DD8500]">
                        Need Help Applying?
                    </p>
                    <div className="mt-3 h-1 w-12 rounded-full bg-[#DD8500]" />

                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#00456B] sm:text-4xl">
                        We’re here to help you get started
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-700">
                        For more information or assistance with applying to Cerna Home
                        Care, please call us at{" "}
                        <a
                            href="tel:18775776782"
                            className="font-extrabold text-[#00456B] underline decoration-[#DD8500] decoration-2 underline-offset-4"
                        >
                            1 (877) 577-6782
                        </a>
                        .
                    </p>

                    <p className="mt-5 text-lg font-extrabold uppercase tracking-wide text-slate-800">
                        Thank you for your interest in working with Cerna.
                    </p>
                </div>

                <div className="rounded-3xl bg-slate-50 p-8 shadow-sm ring-1 ring-slate-200">
                    <h3 className="text-2xl font-extrabold text-[#00456B]">
                        Why join Cerna?
                    </h3>

                    <div className="mt-6 grid gap-4">
                        {[
                            "Meaningful work helping seniors and families",
                            "Supportive care-focused team environment",
                            "Opportunities for caregiver and healthcare roles",
                            "A company culture that values compassion and service",
                        ].map((item) => (
                            <div key={item} className="flex gap-3 text-slate-700">
                                <span className="font-extrabold text-[#DD8500]">✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-6 py-16 sm:px-8 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-3xl bg-[#00456B] p-8 text-white shadow-xl lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight">
                            Ready to apply?
                        </h2>
                        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/90">
                            View available job listings or contact our team for help with
                            the application process.
                        </p>
                    </div>

                    <Link
                        href="/jobs"
                        className="inline-flex shrink-0 justify-center rounded-lg bg-[#DD8500] px-8 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-md transition hover:bg-[#c87500]"
                    >
                        See Available Job Listings
                    </Link>
                </div>
            </section>
        </main>
    );
}