import "./about-us.css";
import Link from "next/link";
import Image from "next/image";

const featureCards = [
    {
        title: "Our Care Services",
        description:
            "Bathing, grooming, meal preparation, outings, transportation, and more — all tailored to the unique needs of each client.",
        href: "/our-services",
    },
    {
        title: "Become a Caregiver",
        description:
            "Join our family and discover your true calling by uplifting the lives of others and providing care for those in need.",
        href: "/careers",
    },
    {
        title: "Convenient Locations",
        description:
            "We have office locations in several areas. Contact us to find the location nearest to your loved one.",
        href: "/locations",
    },
];



export default function AboutUsPage() {
    return (
        <main className="bg-white text-slate-900">
            <section className="about-hero">
                <div className="about-hero-container">
                    <div className="about-hero-grid">
                        <div className="about-hero-image-wrap">
                            <div className="about-hero-image-frame">
                                <Image
                                    src="/assets/cerna-staff.webp"
                                    alt="Cerna staff"
                                    fill
                                    priority
                                    quality={100}
                                    className="about-hero-image"
                                />
                            </div>
                        </div>

                        <div className="about-hero-card-wrap">
                            <div className="about-hero-card">
                                <h1 className="about-hero-title">Our Company and Values</h1>

                                <p className="about-hero-text">
                                    Cerna Homecare was founded in 2009 by Founder and CEO Nick Payzant
                                    on the principle that supportive care must be flexible, high quality and
                                    customized to the needs of the client. Our care is designed to be helping
                                    people become more independent and add to quality of life. Our elderly
                                    are a precious and diminishing asset, they deserve the very best and
                                    Cerna is built on providing that level of care. We build custom tailored
                                    care plans designed with the whole family in mind.
                                </p>

                                <div className="about-hero-buttons">
                                    <div className="about-hero-button-wrap">
                                        <Link
                                            href="/why-cerna"
                                            className="about-hero-button about-hero-button--orange"
                                        >
                                            Why Cerna
                                        </Link>
                                    </div>

                                    <div className="about-hero-button-wrap">
                                        <Link
                                            href="/contact-us"
                                            className="about-hero-button about-hero-button--blue"
                                        >
                                            Get In Touch
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          <section className="about-info-section">
    <div className="about-info-container">
        <div className="about-info-grid">
            <div className="about-info-left">
                <h2 className="about-info-title">How To Get Started</h2>

                <h3 className="about-info-subtitle">The Cerna Home Care way...</h3>

                <p className="about-info-text">
                    By calling one of our professionally trained Care Specialists you will be greeted
                    with passion and understanding. Your needs are our reason for being here! Please
                    call us now so we can answer your questions and help you put together a plan of
                    care that fits exactly to your needs.
                </p>

                <Link href="/contact-us" className="about-info-button">
                    Contact Us Now
                </Link>
            </div>

            <div className="about-info-right">
                <div className="about-info-item">
                    <div className="about-info-item-head">
                        <img src="/assets/head1.webp" alt="" className="about-info-icon" />
                        <h3 className="about-info-item-title">Our Care Services</h3>
                    </div>
                    <p className="about-info-item-text">
                        Bathing, Grooming, Meal Preparation, Outings, Transportation, and more...
                    </p>
                </div>

                <div className="about-info-item">
                    <div className="about-info-item-head">
                        <img src="/assets/head2.webp" alt="" className="about-info-icon" />
                        <h3 className="about-info-item-title">Become a Caregiver</h3>
                    </div>
                    <p className="about-info-item-text">
                        Join our family and discover your true calling by uplifting the lives of others
                        and providing care for those in need.
                    </p>
                </div>

                <div className="about-info-item">
                    <div className="about-info-item-head">
                        <img src="/assets/head3.webp" alt="" className="about-info-icon" />
                        <h3 className="about-info-item-title">Convenient Locations</h3>
                    </div>
                    <p className="about-info-item-text">
                        We have office locations in several areas. Contact us to find the location nearest
                        to your loved one.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

            <section className="bg-slate-50 py-20 md:py-24">
                <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-base font-semibold uppercase tracking-[0.28em] text-sky-700">
                            More About Cerna
                        </p>
                        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                            Support for families, caregivers, and communities
                        </h2>
                    </div>

                    <div className="mt-14 grid gap-6 lg:grid-cols-3">
                        {featureCards.map((card) => (
                            <div
                                key={card.title}
                                className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-slate-200"
                            >
                                <h3 className="text-2xl font-semibold text-slate-900">
                                    {card.title}
                                </h3>
                                <p className="mt-4 text-base leading-8 text-slate-600">
                                    {card.description}
                                </p>
                                <div className="mt-8">
                                    <Link
                                        href={card.href}
                                        className="inline-flex items-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-24">
                <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
                    <div className="rounded-[32px] border border-slate-200 bg-gradient-to-r from-sky-50 via-white to-orange-50 p-10 shadow-sm md:p-14">
                        <div className="mx-auto max-w-3xl text-center">
                            <p className="text-base font-semibold uppercase tracking-[0.28em] text-sky-700">
                                Ready to Begin
                            </p>
                            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                                Are You Ready?
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Cerna Homecare has several offices and is always expanding.Cerna Homecare has several offices and is always expanding.
                            </p>

                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/getting-started"
                                    className="inline-flex items-center rounded-2xl px-6 py-3.5 text-base font-semibold text-white transition hover:opacity-90"
                                    style={{ backgroundColor: "#DD8500" }}
                                >
                                    Get Started Now
                                </Link>

                                <Link
                                    href="/contact-us"
                                    className="inline-flex items-center rounded-2xl border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-white"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
        </main>
    );
}