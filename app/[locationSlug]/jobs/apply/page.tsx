import Link from "next/link";
import CareersApplicationForm from "@/components/CareersApplicationForm";

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
    searchParams: Promise<{
        jobId?: string;
    }>;
};

export default async function LocalJobApplicationPage({
    params,
    searchParams,
}: PageProps) {
    const { locationSlug } = await params;
    const { jobId } = await searchParams;

    const parsedJobId = Number(jobId);

    if (!jobId || !Number.isInteger(parsedJobId) || parsedJobId <= 0) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-20">
                <h1 className="text-3xl font-extrabold text-[#00456B]">
                    Job Not Selected
                </h1>

                <p className="mt-4 text-slate-600">
                    Please return to the jobs page and select a position.
                </p>

                <Link
                    href={`/${locationSlug}/jobs`}
                    className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 font-extrabold text-white"
                >
                    View Open Positions
                </Link>
            </main>
        );
    }

    return (
        <CareersApplicationForm
            jobId={parsedJobId}
            locationSlug={locationSlug}
        />
    );
}