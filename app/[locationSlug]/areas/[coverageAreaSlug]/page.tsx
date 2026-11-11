import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
    getLocationBySlug,
    getPreferredLocationPhone,
} from "@/lib/locations";

import {
    extractCoverageAreas,
} from "@/lib/coverage-areas";

type PageProps = {
    params: Promise<{
        locationSlug: string;
        coverageAreaSlug: string;
    }>;
};

async function loadPageData(params: PageProps["params"]) {
    const { locationSlug, coverageAreaSlug } = await params;

    const location = await getLocationBySlug(locationSlug);

    if (!location) {
        console.log("SEO ERROR: Location not found:", locationSlug);
        notFound();
    }

    const areas = extractCoverageAreas(location);

    console.log("SEO COVERAGE DEBUG:", {
        locationSlug,
        locationName: location.name,
        coverageAreaSlug,
        rawCoverageAreas: location.coverageAreas,
        extractedAreas: areas,
    });

    const area = areas.find(
        item => item.slug === coverageAreaSlug
    );

    if (!area) {
        console.log(
            "SEO ERROR: Coverage area not found:",
            coverageAreaSlug
        );
        notFound();
    }  
     
    return { location, area, areas };
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { location, area } = await loadPageData(params);

    const title =
        `Senior Homecare in ${area.name} | Cerna Homecare`;

    const description =
        `Explore in-home senior care services in ${area.name}. ` +
        `Cerna Homecare ${location.name} provides personalized ` +
        `care options for local families.`;

    const canonical =
        `https://www.cernahomecare.com/` +
        `${location.slug}/areas/${area.slug}`;

    return {
        title,
        description,
        alternates: {
            canonical,
        },

        // Keep new pages out of search until their
        // unique local content has been reviewed.
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function CoverageAreaPage({
    params,
}: PageProps) {
    const { location, area, areas } =
        await loadPageData(params);

    const phone = getPreferredLocationPhone(location);

    const nearbyAreas = areas
        .filter(item => item.slug !== area.slug)
        .slice(0, 12);

    return (
        <main className="bg-slate-50">

            {/* HERO */}
            <section className="bg-[#d9f1f7] px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <p className="font-semibold uppercase tracking-widest text-[#DD8500]">
                        Cerna Homecare {location.name}
                    </p>

                    <h1 className="mt-4 text-4xl font-bold text-[#00456B] md:text-5xl">
                        Senior Homecare Services in {area.name}
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
                        Looking for compassionate in-home senior care
                        in {area.name}? Cerna Homecare {location.name}
                        helps families explore personalized care options
                        that support comfort, safety, and independence.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href={`/${location.slug}/contact-us`}
                            className="rounded-full bg-[#DD8500] px-7 py-3 font-bold text-white"
                        >
                            Request Care Information
                        </Link>

                        {phone && (
                            <a
                                href={phone.href}
                                className="rounded-full bg-white px-7 py-3 font-bold text-[#00456B]"
                            >
                                Call {phone.label}
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="mx-auto max-w-7xl px-6 py-20">
                <h2 className="text-3xl font-bold text-[#00456B]">
                    In-Homecare Options in {area.name}
                </h2>

                <p className="mt-5 max-w-3xl leading-8 text-slate-700">
                    Our {location.name} team can help you learn
                    about personal care, dementia support,
                    companionship, respite care, and assistance
                    following a hospital stay.
                </p>

                <Link
                    href={`/${location.slug}/services`}
                    className="mt-6 inline-block font-bold text-[#DD8500]"
                >
                    Explore Our Care Services
                </Link>
            </section>

            {/* OTHER COVERAGE AREAS */}
            {nearbyAreas.length > 0 && (
                <section className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="text-3xl font-bold text-[#00456B]">
                            Other Communities We Serve
                        </h2>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {nearbyAreas.map(item => (
                                <Link
                                    key={item.slug}
                                    href={`/${location.slug}/areas/${item.slug}`}
                                    className="rounded-xl border border-slate-200 p-5 font-semibold text-[#00456B] hover:border-[#DD8500]"
                                >
                                    Homecare in {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="px-6 py-20 text-center">
                <h2 className="text-3xl font-bold text-[#00456B]">
                    Need Homecare in {area.name}?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                    Contact Cerna Homecare {location.name}
                    to discuss your family's needs and
                    available care options.
                </p>

                <Link
                    href={`/${location.slug}/contact-us`}
                    className="mt-8 inline-block rounded-full bg-[#DD8500] px-8 py-4 font-bold text-white"
                >
                    Contact Our Care Team
                </Link>
            </section>
        </main>
    );
}
