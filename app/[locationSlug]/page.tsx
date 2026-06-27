import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations } from "@/lib/locations";
import { locationServices } from "@/lib/locationServices";
import LocationMiniContactForm from "@/components/LocationMiniContactForm";
import FloridaCoverageSelector from "@/components/FloridaCoverageSelector";

type Props = {
    params: Promise<{
        locationSlug: string;
    }>;
};

export default async function LocationPage({ params }: Props) {
    const { locationSlug } = await params;
    const location = locations[locationSlug as keyof typeof locations];

    if (!location) {
        notFound();
    }

    const primaryPhoneHref = location.phones?.[0]?.href ?? location.phoneHref;
    const primaryPhoneNumber = location.phones?.[0]?.number ?? location.phone;

    return (
        <main className="bg-white">
            {/* Compact top section */}
            <section className="bg-[#d9f1f7] px-6 py-12 md:py-16">
                <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                            Cerna Homecare {location.name}
                        </p>

                        <h1 className="text-4xl font-extrabold tracking-tight text-[#00456B] md:text-6xl">
                            Home Care Services in {location.name}
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
                            Cerna Homecare helps families in {location.name} with compassionate,
                            personalized in-home care. Explore our care services, request a free
                            consultation, or call our local team today.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href={primaryPhoneHref}
                                className="rounded-full bg-[#DD8500] px-6 py-3 font-bold text-white shadow-sm transition hover:bg-[#c67600]"
                            >
                                Call {primaryPhoneNumber}
                            </a>

                            <a
                                href="#free-consultation"
                                className="rounded-full border border-[#00456B] px-6 py-3 font-bold text-[#00456B] transition hover:bg-[#00456B] hover:text-white"
                            >
                                Free Consultation
                            </a>
                        </div>
                    </div>

                    <div className="relative h-[220px] overflow-hidden rounded-[36px] bg-white shadow-xl md:h-[300px]">
                        <Image
                            src={location.heroImage}
                            alt={`Cerna Homecare ${location.name}`}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 560px"
                            className="object-cover"
                            quality={100}
                        />
                    </div>
                </div>
            </section>

            {/* Service tiles */}
            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                            Here is how we can help
                        </p>

                        <h2 className="text-4xl font-extrabold text-[#00456B]">
                            In-home care services in {location.name}
                        </h2>

                        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-700">
                            Choose the type of care that best fits your family. Each service has
                            a dedicated page with more details for families in {location.name}.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(locationServices).map(([serviceSlug, service]) => (
                            <Link
                                key={serviceSlug}
                                href={`/${location.slug}/${serviceSlug}`}
                                className="group overflow-hidden rounded-[28px] bg-white shadow-md ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                    <Image
                                        src={service.image}
                                        alt={`${service.title} in ${location.name}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                        quality={100}
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-extrabold text-[#00456B]">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 text-base leading-7 text-slate-600">
                                        {service.shortDescription}
                                    </p>

                                    <span className="mt-5 inline-flex font-bold text-[#DD8500]">
                                        Learn more →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Free consultation */}
            <section id="free-consultation" className="bg-slate-50 px-6 py-16">
                <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                            Free Consultation
                        </p>

                        <h2 className="text-4xl font-extrabold text-[#00456B]">
                            Get your free {location.name} care consultation today
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            Tell us about your family’s needs and our local Cerna Homecare team
                            will help you understand your options.
                        </p>

                        <h3 className="mt-8 text-3xl font-extrabold text-[#00456B]">
                            Call:{" "}
                            <a href={primaryPhoneHref} className="hover:text-[#DD8500]">
                                {primaryPhoneNumber}
                            </a>
                        </h3>
                    </div>

                    <div className="rounded-[32px] bg-white p-8 shadow-xl ring-1 ring-slate-200">
                        <LocationMiniContactForm />
                    </div>
                </div>
            </section>

            {/* Location image */}
            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="relative h-[280px] overflow-hidden rounded-[40px] bg-slate-100 shadow-xl md:h-[460px]">
                        <Image
                            src={location.heroImage}
                            alt={`${location.name} Cerna Homecare`}
                            fill
                            sizes="(max-width: 768px) 100vw, 1200px"
                            className="object-cover"
                            quality={100}
                        />
                    </div>
                </div>
            </section>

            {/* Leadership and contact details */}
            <section className="bg-white px-6 pb-16">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        Local Leadership
                    </p>

                    <h2 className="text-4xl font-extrabold text-[#00456B] md:text-5xl">
                        Your {location.name} Leadership
                    </h2>

                    <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-700">
                        The {location.name} leadership team has a history of compassion, care,
                        and attention to detail. We strive to provide the best care possible in
                        every situation. By understanding your needs and learning your family,
                        we create a nurturing and long-lasting relationship with each family we
                        serve.
                    </p>

                    <div className="mt-10">
                        <h3 className="text-3xl font-extrabold text-[#00456B]">
                            {location.addressLine1}
                        </h3>

                        <h3 className="mt-2 text-3xl font-extrabold text-[#00456B]">
                            {location.addressLine2}
                        </h3>

                        <div className="mt-8 space-y-2">
                            {location.phones?.length ? (
                                location.phones.map((phone) => (
                                    <a
                                        key={phone.href}
                                        href={phone.href}
                                        className="block text-3xl font-extrabold text-[#00456B] hover:text-[#DD8500]"
                                    >
                                        {phone.number}{" "}
                                        <span className="text-xl font-bold text-slate-600">
                                            ({phone.label})
                                        </span>
                                    </a>
                                ))
                            ) : (
                                <a
                                    href={location.phoneHref}
                                    className="block text-3xl font-extrabold text-[#00456B] hover:text-[#DD8500]"
                                >
                                    {location.phone}
                                </a>
                            )}
                        </div>

                        <a
                            href={`mailto:${location.email}`}
                            className="mt-3 block text-xl font-bold text-[#DD8500]"
                        >
                            {location.email}
                        </a>

                        <a
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 font-bold text-white"
                        >
                            View Map
                        </a>
                    </div>
                </div>
            </section>

            {/* Coverage areas */}
            <section className="bg-slate-50 px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <aside className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-extrabold uppercase text-[#00456B]">
                            {location.coverageTitle}
                        </h2>

                        {location.state === "FL" ? (
                            <FloridaCoverageSelector locationSlug={location.slug} />
                        ) : (
                            <div className="grid gap-x-8 gap-y-2 text-[17px] leading-7 text-slate-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {location.coverageAreas.map((area) => (
                                    <div key={area}>{area}</div>
                                ))}
                            </div>
                        )}

                        <p className="mt-8 text-base leading-7 text-slate-700">
                            This office covers all of {location.name}, {location.state}. For a
                            more comprehensive list of coverage{" "}
                            <Link href="/locations" className="font-bold text-[#DD8500]">
                                click here
                            </Link>
                            .
                        </p>
                    </aside>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white">
                <div
                    className="h-[90px] bg-cover bg-center"
                    style={{ backgroundImage: 'url("/assets/banner.webp")' }}
                />

                <div className="mx-auto max-w-7xl px-6 py-16 text-center">
                    <h2 className="text-3xl font-extrabold text-black md:text-4xl">
                        Both our Clients and their Families Love Us!
                    </h2>

                    <div className="mt-12 grid gap-10 md:grid-cols-3">
                        <div className="bg-slate-100 px-8 py-12">
                            <div className="text-2xl text-[#DD8500]">★★★★★</div>

                            <h3 className="mt-4 text-xl font-bold text-[#00456B]">
                                I Sing Your Praises!
                            </h3>

                            <p className="mt-4 text-base italic leading-7 text-slate-600">
                                Johnna has been doing really good. She has only had 1 or maybe 2
                                small meltdowns during quarantine. She’s doing her homework without
                                asking, cleaning her room and making 85% of her own food. All in all
                                she’s been better than I ever could have imagined. You were so right.
                            </p>

                            <p className="mt-8 font-bold text-slate-600">Johnna Haynes</p>
                        </div>

                        <div className="bg-slate-100 px-8 py-12">
                            <div className="text-2xl text-[#DD8500]">★★★★★</div>

                            <h3 className="mt-4 text-xl font-bold text-[#00456B]">
                                Best Company to work for
                            </h3>

                            <p className="mt-4 text-base italic leading-7 text-slate-600">
                                I love working for Cerna. I love how they care not just for
                                caregivers but for their clients. They always do the best to fit
                                caregivers with the right clients. My clients are pleased with them
                                and how they have the best caregivers to send.
                            </p>

                            <p className="mt-8 font-bold text-slate-600">Shirley Rose</p>
                        </div>

                        <div className="bg-slate-100 px-8 py-12">
                            <div className="text-2xl text-[#DD8500]">★★★★★</div>

                            <h3 className="mt-4 text-xl font-bold text-[#00456B]">
                                You are so great!
                            </h3>

                            <p className="mt-4 text-base italic leading-7 text-slate-600">
                                You did a great job teaching me about what’s really going on with
                                Johnna. Nobody was able to figure it out. We all as a team continue
                                to work with Johnna. I actually finally enjoy coming home and
                                spending time with her.
                            </p>

                            <p className="mt-8 font-bold text-slate-600">
                                DeAnn and Johnna King
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}