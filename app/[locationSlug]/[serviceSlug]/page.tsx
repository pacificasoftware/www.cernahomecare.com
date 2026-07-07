import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations } from "@/lib/locations";
import { locationServices } from "@/lib/locationServices";
import LocationMiniContactForm from "@/components/LocationMiniContactForm";

type Props = {
    params: Promise<{
        locationSlug: string;
        serviceSlug: string;
    }>;
};

export async function generateMetadata({ params }: Props) {
    const { locationSlug, serviceSlug } = await params;

    const location = locations[locationSlug as keyof typeof locations];
    const service = locationServices[serviceSlug as keyof typeof locationServices];

    if (!location || !service) {
        return {};
    }

    return {
        title: `${service.seoTitle} in ${location.name}, ${location.state} | Cerna Homecare`,
        description: `${service.shortDescription} Learn more about ${service.title.toLowerCase()} services from Cerna Homecare in ${location.name}, ${location.state}.`,
    };
}

export default async function LocationServicePage({ params }: Props) {
    const { locationSlug, serviceSlug } = await params;

    const location = locations[locationSlug as keyof typeof locations];
    const service = locationServices[serviceSlug as keyof typeof locationServices];

    if (!location || !service) {
        notFound();
    }

    return (
        <main className="bg-white">
            <section className="bg-[#d9f1f7] px-6 py-12 md:py-16">
                <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                            Cerna Homecare {location.name}
                        </p>

                        <h1 className="text-4xl font-extrabold tracking-tight text-[#00456B] md:text-6xl">
                            {service.heroTitle} in {location.name}
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            {service.intro}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href={location.phones?.[0]?.href ?? location.phoneHref}
                                className="rounded-full bg-[#DD8500] px-6 py-3 font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                            >
                                Call {location.phones?.[0]?.number ?? location.phone}
                            </a>

                            <Link
                                href={`/${location.slug}`}
                                className="rounded-full border border-[#00456B] px-6 py-3 font-bold text-[#00456B] transition hover:bg-[#00456B] hover:text-white"
                            >
                                Back to {location.name}
                            </Link>
                        </div>
                    </div>

                    <div className="relative h-[260px] overflow-hidden rounded-[36px] bg-white shadow-xl md:h-[360px]">
                        <Image
                            src={service.image}
                            alt={`${service.title} services in ${location.name}`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 560px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="px-6 py-16">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_420px]">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#00456B] md:text-4xl">
                            {service.title} for families in {location.name}
                        </h2>

                        <div className="mt-8 space-y-10">
                            {service.sections.map((section) => (
                                <div key={section.heading}>
                                    <h3 className="text-2xl font-extrabold text-[#00456B]">
                                        {section.heading}
                                    </h3>

                                    <p className="mt-3 text-lg leading-8 text-slate-700">
                                        {section.body}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 rounded-[28px] bg-slate-50 p-8 ring-1 ring-slate-200">
                            <h3 className="text-2xl font-extrabold text-[#00456B]">
                                Need help deciding what type of care is right?
                            </h3>

                            <p className="mt-4 text-lg leading-8 text-slate-700">
                                Contact Cerna Homecare {location.name} to discuss your family’s
                                situation and learn whether {service.title.toLowerCase()} is the
                                right fit.
                            </p>

                            <a
                                href={location.phones?.[0]?.href ?? location.phoneHref}
                                className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 font-bold text-white"
                            >
                                Call {location.phones?.[0]?.number ?? location.phone}
                            </a>
                        </div>
                    </div>

                    <aside className="rounded-[32px] bg-white p-8 shadow-xl ring-1 ring-slate-200">
                        <h2 className="text-2xl font-extrabold text-[#00456B]">
                            Request a free consultation
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Tell us what type of care your family needs and a member of our
                            {location.name} team will follow up.
                        </p>

                        <div className="mt-6">
                            <LocationMiniContactForm
                                locationName={location.name}
                                locationState={location.state}
                                serviceTitle={service.title}
                            />
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-slate-50 px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-center text-3xl font-extrabold text-[#00456B]">
                        More home care services in {location.name}
                    </h2>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(locationServices)
                            .filter(([slug]) => slug !== serviceSlug)
                            .map(([slug, item]) => (
                                <Link
                                    key={slug}
                                    href={`/${location.slug}/${slug}`}
                                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <h3 className="text-xl font-extrabold text-[#00456B]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {item.shortDescription}
                                    </p>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </main>
    );
}