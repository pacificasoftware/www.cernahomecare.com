import Link from "next/link";
import { notFound } from "next/navigation";
import { locations } from "@/lib/locations";
import LocationServicesTabs from "@/components/LocationServicesTabs";

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

    return (
        <main className="bg-white">
            <section
                className="relative flex min-h-[430px] items-center justify-center bg-cover bg-center px-6 text-center text-white md:min-h-[520px]"
                style={{ backgroundImage: `url("${location.heroImage}")` }}
            >
                <div className="absolute inset-0 bg-black/35" />

                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold md:text-7xl">
                        {location.name}
                    </h1>
                </div>
            </section>

            <section className="bg-white px-6 py-12">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                    <aside className="border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-extrabold uppercase text-[#00456B]">
                            {location.coverageTitle}
                        </h2>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[17px] leading-7 text-slate-700">
                            {location.coverageAreas.map((area) => (
                                <div key={area}>{area}</div>
                            ))}
                        </div>

                        <p className="mt-8 text-base leading-7 text-slate-700">
                            This office covers all of {location.name}, {location.state} — For a
                            more comprehensive list of coverage{" "}
                            <Link href="/locations" className="font-bold text-[#DD8500]">
                                click here
                            </Link>
                        </p>
                    </aside>

                    <div>
                        <h1 className="text-4xl font-extrabold text-[#00456B] md:text-5xl">
                            Your {location.name} Leadership
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-slate-700">
                            The {location.name} leadership team has a history of Compassion,
                            Care and attention to detail. We strive to provide the best care
                            possible in every situation. By understanding your needs and
                            learning your family we create a very nurturing and long lasting
                            relationship with each family we are responsible for!
                        </p>

                        <div className="mt-8">
                            <h2 className="text-3xl font-extrabold text-[#00456B]">
                                {location.addressLine1}
                            </h2>
                            <h2 className="mt-2 text-3xl font-extrabold text-[#00456B]">
                                {location.addressLine2}
                            </h2>

                            <a
                                href={location.phoneHref}
                                className="mt-8 block text-3xl font-extrabold text-[#00456B]"
                            >
                                {location.phone}
                            </a>

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

                            <h2 className="mt-8 text-3xl font-extrabold text-[#00456B]">
                                Get your FREE consultation today{" "}
                                <a href={location.phoneHref}>{location.phone}</a>
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 px-6 py-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-4xl font-extrabold text-[#00456B]">
                        How can we serve your needs?
                    </h2>

                    <p className="mt-6 max-w-5xl text-lg leading-8 text-slate-700">
                        Families are often placed in an immediate situation because mom or
                        dad are no longer independent and a decision needs to be made for
                        their safety. What do we do? Did we plan for this? Can mom stay
                        home? Does she have to go into a nursing home?
                    </p>
                </div>
            </section>
            <LocationServicesTabs />

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