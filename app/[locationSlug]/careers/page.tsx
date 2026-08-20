import Link from "next/link";

type location = {
    locationId: number;
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

async function getlocation(locationSlug: string): Promise<location | null> {
    const apiBaseUrl =
        process.env.API_BASE_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://api.cernahomecare.com";

    try {
        const response = await fetch(
            `${apiBaseUrl.replace(
                /\/$/,
                ""
            )}/api/public/locations/${encodeURIComponent(locationSlug)}`,
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

        return (await response.json()) as location;
    } catch {
        return null;
    }
}

export default async function LocalCareersPage({ params }: PageProps) {
    const { locationSlug } = await params;

    const location = await getlocation(locationSlug);

    if (!location) {
        return (
            <main className="px-6 py-20">
                <h1 className="text-3xl font-bold text-[#00456B]">
                    Location Not Found
                </h1>

                <p className="mt-4 text-slate-600">
                    Please visit our main careers page to view available opportunities.
                </p>

                <p className="mt-4 text-sm text-slate-500">
                    Current slug: {locationSlug}
                </p>

                <Link
                    href="/careers"
                    className="mt-6 inline-block font-bold text-[#DD8500]"
                >
                    View Corporate Careers
                </Link>
            </main>
        );
    }

    return (
        <main className="bg-slate-50">
            <section className="bg-[#d9f1f7] px-6 py-20 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#DD8500]">
                    Careers
                </p>

                <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-[#00456B] md:text-5xl">
                    Caregiver Careers in {location.city}, {location.state}
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-700">
                    Join {location.name} and make a meaningful difference helping seniors
                    remain safe, comfortable, and independent at home.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href={`/${locationSlug}/jobs`}
                        className="rounded-full bg-[#DD8500] px-8 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#c67600]"
                    >
                        View Open Positions
                    </Link>

                    <a
                        href={location.phoneHref}
                        className="rounded-full bg-white px-8 py-4 text-sm font-extrabold text-[#00456B] shadow-sm ring-1 ring-slate-200 transition hover:text-[#DD8500]"
                    >
                        Call {location.phone}
                    </a>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-extrabold text-[#00456B]">
                            Flexible Schedules
                        </h2>

                        <p className="mt-4 text-base leading-7 text-slate-700">
                            We offer caregiver opportunities that can fit around your
                            availability and lifestyle.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-extrabold text-[#00456B]">
                            Meaningful Work
                        </h2>

                        <p className="mt-4 text-base leading-7 text-slate-700">
                            Support local families with personal care, companionship, memory care,
                            respite care, and Covered support.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-extrabold text-[#00456B]">
                            Local Team Support
                        </h2>

                        <p className="mt-4 text-base leading-7 text-slate-700">
                            Work with a local Cerna team that understands the needs of families in{" "}
                            {location.city}.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}