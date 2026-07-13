import Link from "next/link";
import LocalApplyClient from "./apply/LocalApplyClient";

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
};

export type Franchisee = {
    franchiseeId: number;
    slug: string;
    name: string;
    city: string;
    state: string;
    phone: string;
    phoneHref: string;
    jobsZip?: string | null;
};

function getApiBaseUrl() {
    return (
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com"
    ).replace(/\/$/, "");
}

async function getFranchisee(
    locationSlug: string
): Promise<Franchisee | null> {
    try {
        const url = `${getApiBaseUrl()}/api/public/franchisees/${encodeURIComponent(
            locationSlug
        )}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error("Franchisee lookup failed:", {
                url,
                status: response.status,
                body: responseText,
            });

            return null;
        }

        if (!responseText.trim()) {
            return null;
        }

        const result = JSON.parse(responseText);

        const phone = String(
            result.phone ??
            result.Phone ??
            ""
        );

        return {
            franchiseeId: Number(
                result.franchiseeId ??
                result.FranchiseeId
            ),

            slug:
                result.slug ??
                result.Slug ??
                locationSlug,

            name:
                result.name ??
                result.Name ??
                result.franchiseeName ??
                result.FranchiseeName ??
                "Cerna Home Care",

            city:
                result.city ??
                result.City ??
                "",

            state:
                result.state ??
                result.State ??
                "",

            phone,

            phoneHref:
                result.phoneHref ??
                result.PhoneHref ??
                `tel:${phone.replace(/\D/g, "")}`,

            jobsZip:
                result.jobsZip ??
                result.JobsZip ??
                result.zipCode ??
                result.ZipCode ??
                null,
        };
    } catch (error) {
        console.error("Franchisee lookup failed:", error);
        return null;
    }
}

export default async function LocalJobsPage({
    params,
}: PageProps) {
    const { locationSlug } = await params;

    const franchisee = await getFranchisee(locationSlug);

    if (!franchisee) {
        return (
            <main className="bg-white">
                <section className="mx-auto max-w-4xl px-6 py-24 text-center">
                    <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#DD8500]">
                        Careers at Cerna
                    </p>

                    <h1 className="mt-4 text-4xl font-extrabold text-[#00456B]">
                        Location Not Found
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                        We could not find the Cerna Home Care location you
                        requested.
                    </p>

                    <Link
                        href="/careers"
                        className="mt-8 inline-flex rounded-xl bg-[#DD8500] px-7 py-4 font-extrabold text-white transition hover:bg-[#c87500]"
                    >
                        Return to Careers
                    </Link>
                </section>
            </main>
        );
    }

    return <LocalApplyClient franchisee={franchisee} />;
}