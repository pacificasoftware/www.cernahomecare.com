import Link from "next/link";
import LocalJobApplicationForm from "./LocalJobApplicationForm";
 
const franchisees: Record<
    string,
    {
        name: string;
        city: string;
        state: string;
        phone: string;
        phoneHref: string;
        jobsZip?: string;
    }
> = {
    "south-bay": {
        name: "Cerna Home Care South Bay",
        city: "South Bay",
        state: "CA",
        phone: "(562) 242-1830",
        phoneHref: "tel:15622421830",
        jobsZip: "90806",
    },
    "orange-county": {
        name: "Cerna Home Care Orange County",
        city: "Orange County",
        state: "CA",
        phone: "(949) 298-3200",
        phoneHref: "tel:19492983200",
        jobsZip: "92612",
    },
    southlake: {
        name: "Cerna Home Care Southlake",
        city: "Southlake",
        state: "TX",
        phone: "(682) 324-9800",
        phoneHref: "tel:16823249800",
        jobsZip: "76092",
    },
    dallas: {
        name: "Cerna Home Care Dallas",
        city: "Dallas",
        state: "TX",
        phone: "(972) 330-2005",
        phoneHref: "tel:19723302005",
        jobsZip: "75074",
    },
    tampa: {
        name: "Cerna Home Care Tampa",
        city: "Tampa",
        state: "FL",
        phone: "(813) 776-6099",
        phoneHref: "tel:18137766099",
        jobsZip: "33618",
    },
    orlando: {
        name: "Cerna Home Care Orlando",
        city: "Orlando",
        state: "FL",
        phone: "(407) 495-4344",
        phoneHref: "tel:14074954344",
        jobsZip: "32703",
    },
};

type PageProps = {
    params: Promise<{
        locationSlug: string;
    }>;
};

export default async function LocalCareersPage({ params }: PageProps) {
    const { locationSlug } = await params;

    const franchisee = franchisees[locationSlug];

    if (!franchisee) {
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#DD8500]">
                    Careers
                </p>

                <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-[#00456B] md:text-5xl">
                    Caregiver Careers in {franchisee.city}, {franchisee.state}
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-700">
                    Join {franchisee.name} and make a meaningful difference helping seniors
                    remain safe, comfortable, and independent at home.
                </p>

                <div className="mt-8 flex justify-center gap-4">

                    {/*  V2*/}
                    {/*<a*/}
                    {/*    href="#open-positions"*/}
                    {/*    className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"*/}
                    {/*>*/}
                    {/*    View Open Positions*/}
                    {/*</a>*/}

                    <a
                        href="#apply-now"
                        className="rounded-full bg-[#DD8500] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                    >
                        Apply Now
                    </a>

                    <a
                        href={franchisee.phoneHref}
                        className="rounded-full bg-white px-7 py-3 text-sm font-bold text-[#00456B] shadow-sm ring-1 ring-slate-200 transition hover:text-[#DD8500]"
                    >
                        Call {franchisee.phone}
                    </a>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-[#00456B]">
                            Flexible Schedules
                        </h2>
                        <p className="mt-3 text-slate-600">
                            We offer caregiver opportunities that can fit around your
                            availability and lifestyle.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-[#00456B]">
                            Meaningful Work
                        </h2>
                        <p className="mt-3 text-slate-600">
                            Support local families with personal care, companionship,
                            memory care, respite care, and post-hospital support.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-xl font-bold text-[#00456B]">
                            Local Team Support
                        </h2>
                        <p className="mt-3 text-slate-600">
                            Work with a local Cerna team that understands the needs of
                            families in {franchisee.city}.
                        </p>
                    </div>
                </div>
            </section>

            <section id="apply-now" className="bg-white px-6 py-20 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                            Apply Now
                        </p>

                        <h2 className="text-3xl font-bold text-[#00456B]">
                            Apply for a Caregiver Position in {franchisee.city}
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                            Complete the form below and our local {franchisee.city} team will
                            contact you about caregiver opportunities with {franchisee.name}.
                        </p>
                    </div>

                    <div className="mt-10">
                        <LocalJobApplicationForm
                            locationName={franchisee.name}
                            locationCity={franchisee.city}
                            locationState={franchisee.state}
                            jobsZip={franchisee.jobsZip}
                        />
                    </div>
                </div>
            </section>

            {/*<section id="open-positions" className="bg-white px-6 py-20 lg:px-8">*/}
            {/*    <div className="mx-auto max-w-5xl text-center">*/}
            {/*        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">*/}
            {/*            Open Positions*/}
            {/*        </p>*/}

            {/*        <h2 className="text-3xl font-bold text-[#00456B]">*/}
            {/*            Jobs Near {franchisee.city}*/}
            {/*        </h2>*/}

            {/*        <p className="mx-auto mt-4 max-w-2xl text-slate-600">*/}
            {/*            View current caregiver opportunities for {franchisee.name}.*/}
            {/*        </p>*/}

            {/*        <div className="mt-10 rounded-3xl bg-slate-50 p-8 text-left ring-1 ring-slate-200">*/}
            {/*            <h3 className="text-xl font-bold text-[#00456B]">*/}
            {/*                Caregiver / Home Care Aide*/}
            {/*            </h3>*/}

            {/*            <p className="mt-2 text-slate-600">*/}
            {/*                Location: {franchisee.city}, {franchisee.state}*/}
            {/*            </p>*/}

            {/*            <p className="mt-4 text-slate-700">*/}
            {/*                Provide compassionate in-home support including companionship,*/}
            {/*                personal care, meal preparation, errands, memory care support,*/}
            {/*                respite care, and post-hospital assistance.*/}
            {/*            </p>*/}

            {/*            <a*/}
            {/*                href={`mailto:careers@cernahomecare.com?subject=Caregiver Application - ${franchisee.city}`}*/}
            {/*                className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c67600]"*/}
            {/*            >*/}
            {/*                Apply Now*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </main>
    );
}