import Link from "next/link";
import LocalJobsClientV2 from "./LocalJobsClientV2";

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

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
};

async function getFranchisee(
    locationSlug: string
): Promise<Franchisee | null> {
    const apiBaseUrl =
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com";

    try {
        const response = await fetch(
            `${apiBaseUrl.replace(
                /\/$/,
                ""
            )}/api/public/franchisees/${encodeURIComponent(locationSlug)}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return null;
        }

        return (await response.json()) as Franchisee;
    } catch (error) {
        console.error("Franchisee lookup failed:", error);
        return null;
    }
}

export default async function LocalJobsPage({ params }: PageProps) {
    const { locationSlug } = await params;

    const franchisee = await getFranchisee(locationSlug);

    if (!franchisee) {
        return (
            <main className="px-6 py-20">
                <h1 className="text-3xl font-black text-[#00456B]">
                    Location Not Found
                </h1>

                <p className="mt-4 text-slate-600">
                    Please return to our careers page to view available
                    opportunities.
                </p>

                <Link
                    href="/careers"
                    className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 font-extrabold text-white"
                >
                    View Corporate Careers
                </Link>
            </main>
        );
    }

    return (
        <LocalJobsClientV2
            franchisee={franchisee}
            locationSlug={locationSlug}
        />
    );
}