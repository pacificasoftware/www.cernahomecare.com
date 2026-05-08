import Image from "next/image";

const affiliations = [
    {
        name: "Association for Benchmarking Health Care",
        description:
            "The Association for Benchmarking Health Care™ is an association of health care organizations that conducts benchmarking studies to identify the practices that improve the overall operations of its members.",
        logo: "/assets/abhc.png",
        url: "https://www.abhc.org",
    },
    {
        name: "Home Care Association of America",
        description:
            "The Home Care Association of America is the industry’s leading trade association for providers of home care, which encompasses a broad range of services that supports seniors’ wellbeing and enables them to age in place.",
        logo: "/assets/home-care-association.png",
        url: "https://www.hcaoa.org",
    },
    {
        name: "Alzheimer’s Association",
        description:
            "Formed in 1980, the Alzheimer’s Association is the world’s leading voluntary health organization in Alzheimer’s care, support and research. We provide services to those affected by Alzheimer’s and other dementias.",
        logo: "/assets/alzheimers-association.jpg",
        url: "https://www.alz.org",
    },
    {
        name: "American Home Health Organization",
        description:
            "AHHO is a Nationwide Organization dedicated to the advancement of Home Healthcare individuals and the industry they represent. These are certificate based programs and are completely online.",
        logo: "/assets/ahho.jpg",
        url: "https://ahho.org",
    },
];

export default function AffiliationsPage() {
    return (
        <main className="bg-white">
            <section className="px-6 py-14">
                <div className="mx-auto max-w-5xl text-center">
                    <div className="inline-flex flex-wrap items-center justify-center border border-slate-400 text-2xl font-light uppercase md:text-3xl">
                        <span className="bg-[#DD8500] px-4 py-2 text-white">
                            Here are a few of our
                        </span>
                        <span className="px-4 py-2 text-slate-600">
                            Associated Partners
                        </span>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-20">
                <div className="mx-auto max-w-5xl">
                    {affiliations.map((item, index) => (
                        <div
                            key={item.name}
                            className={`grid gap-6 py-10 md:grid-cols-[1fr_180px] md:items-center ${index !== affiliations.length - 1
                                    ? "border-b border-slate-300"
                                    : ""
                                }`}
                        >
                            <div>
                                <h2 className="text-base font-extrabold uppercase tracking-wide text-[#0070c9]">
                                    {item.name}
                                </h2>

                                <p className="mt-6 text-lg italic leading-8 text-slate-600">
                                    {item.description}
                                </p>
                            </div>

                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-24 items-center justify-center rounded border border-slate-200 bg-slate-50 p-4 transition hover:shadow-md"
                            >
                                <Image
                                    src={item.logo}
                                    alt={`${item.name} logo`}
                                    width={180}
                                    height={80}
                                    className="max-h-20 w-auto object-contain"
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}