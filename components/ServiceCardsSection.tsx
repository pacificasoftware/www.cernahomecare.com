import Image from "next/image";
import Link from "next/link";
import { serviceCards } from "@/lib/serviceCards";

type ServiceCardsSectionProps = {
    basePath: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    className?: string;
};

export default function ServiceCardsSection({
    basePath,
    eyebrow = "Our Services",
    title = "Choose the Right Level of Support",
    description = "Every family’s situation is different. Our team can help you understand your options and create a care plan that fits your loved one’s needs.",
    className = "",
}: ServiceCardsSectionProps) {
    const normalizedBasePath =
        basePath === "/" ? "" : basePath.replace(/\/$/, "");

    return (
        <section
            className={`mx-auto max-w-7xl px-6 py-16 lg:px-8 ${className}`}
        >
            <div className="mx-auto max-w-3xl text-center">
                {eyebrow ? (
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        {eyebrow}
                    </p>
                ) : null}

                {title ? (
                    <h2 className="text-3xl font-bold tracking-tight text-[#00456B] md:text-4xl">
                        {title}
                    </h2>
                ) : null}

                {description ? (
                    <p className="mt-4 leading-8 text-slate-600">
                        {description}
                    </p>
                ) : null}
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {serviceCards.map((service) => (
                    <Link
                        key={service.slug}
                        href={`${normalizedBasePath}/${service.slug}`}
                        className="group overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={service.image}
                                alt={`${service.title} service`}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-[#00456B] transition group-hover:text-[#DD8500]">
                                {service.title}
                            </h3>

                            <p className="mt-4 leading-7 text-slate-600">
                                {service.description}
                            </p>

                            {service.features?.length ? (
                                <ul className="mt-5 space-y-3">
                                    {service.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700"
                                        >
                                            <span className="mt-0.5 text-xl font-bold leading-none text-[#1f73d8]">
                                                ✓
                                            </span>

                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}

                            <span className="mt-6 inline-flex font-bold text-[#DD8500]">
                                Learn More →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}