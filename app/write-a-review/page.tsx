import Link from "next/link";

const reviewOptions = [
    {
        name: "Google+",
        logo: "G+",
        logoClass: "text-[#4285F4]",
        description:
            "Share your experience on Google so other families can learn about Cerna Home Care.",
        href: "#",
        button: "Write a Google Review",
    },
    {
        name: "Facebook",
        logo: "f",
        logoClass: "text-[#1877F2]",
        description:
            "Leave a recommendation on Facebook and help families looking for trusted care.",
        href: "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F100074751955615%2Fphotos%2Fthank-you-for-trusting-us-clienttestimonial%2F905948021906921%2F#",
        button: "Review on Facebook",
    },
    {
        name: "Yelp",
        logo: "yelp",
        logoClass: "text-[#D32323]",
        description:
            "Tell others about your experience with our caregivers and care team.",
        href: "https://www.yelp.com/writeareview/biz/PZeevkHBc037ve2eGgbrgQ?return_url=%2Fbiz%2FPZeevkHBc037ve2eGgbrgQ&source=biz_details_war_button",
        button: "Review on Yelp",
    },
];

export default function WriteAReviewPage() {
    return (
        <main className="bg-slate-50">
            <section className="bg-[#00456B] px-6 py-20 text-white">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#DD8500]">
                        Cerna Home Care
                    </p>

                    <h1 className="text-5xl font-extrabold text-white md:text-6xl">
                        Write a Review
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white/90">
                        Your feedback helps families find trusted, compassionate care.
                        Thank you for taking a moment to share your experience with Cerna
                        Home Care.
                    </p>
                </div>
            </section>

            <section className="px-6 py-16">
                <div className="mx-auto max-w-6xl">
                    <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
                        <h2 className="text-4xl font-extrabold text-[#00456B]">
                            We appreciate your feedback
                        </h2>

                        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                            Reviews from clients and families help us continue improving
                            our services while helping others feel confident choosing Cerna
                            Home Care.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {reviewOptions.map((item) => (
                            <div
                                key={item.name}
                                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="mb-6 flex h-16 items-center">
                                    <div
                                        className={`text-5xl font-black tracking-tight ${item.logoClass}`}
                                        aria-label={`${item.name} logo`}
                                    >
                                        {item.logo}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-extrabold text-[#00456B]">
                                    {item.name}
                                </h3>

                                <p className="mt-4 min-h-[96px] text-base leading-7 text-slate-600">
                                    {item.description}
                                </p>

                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex rounded-full bg-[#DD8500] px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition hover:bg-[#c67600]"
                                >
                                    {item.button}
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 rounded-[32px] bg-[#00456B] p-8 text-center text-white shadow-xl md:p-12">
                        <h2 className="text-3xl font-extrabold">
                            Need help or have a concern?
                        </h2>

                        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/85">
                            We would love the opportunity to help. Contact our team directly
                            and we will be happy to assist you.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="tel:18775776782"
                                className="rounded-full bg-[#DD8500] px-8 py-4 text-lg font-extrabold text-white transition hover:opacity-90"
                            >
                                Call (877) 577-6782
                            </a>

                            <Link
                                href="/contact-us"
                                className="rounded-full bg-white px-8 py-4 text-lg font-extrabold text-[#00456B] transition hover:opacity-90"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}