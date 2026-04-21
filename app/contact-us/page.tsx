import "./contact-us.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "Contact Us | Cerna Home Care",
    description:
        "Get in touch with Cerna Home Care. Contact sales, support, or ask a question through our contact form.",
};

function InfoCard({
    icon,
    title,
    description,
    buttonText,
    buttonHref,
}: {
    icon: string;
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
}) {
    return (
        <div
            className="rounded-[8px] border-[8px] border-transparent p-10 text-center shadow-sm"
            style={{ backgroundColor: "#00456B" }}
        >
            <div className="mb-6 flex justify-center">
                <Image src={icon} alt="" width={92} height={92} className="h-auto w-auto" />
            </div>

            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">{title}</h3>

            <p className="mx-auto mb-8 max-w-[420px] text-lg leading-8 text-white">
                {description}
            </p>

            <a
                href={buttonHref}
                className="inline-flex items-center justify-center rounded-none px-8 py-5 text-2xl font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: "#DD8500" }}
            >
                {buttonText}
            </a>
        </div>
    );
}

export default function ContactUsPage() {
    return (
        <main>
            <section className="relative min-h-[620px] overflow-hidden">
                <Image
                    src="/assets/caregiver-helping-elderly.jpg"
                    alt="Caregiver helping elderly person"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />

                <div className="relative mx-auto flex min-h-[620px] max-w-[1400px] items-center justify-center px-6 text-center md:px-10">
                    <div className="max-w-[900px]">
                        <h1 className="mb-8 text-5xl font-bold text-white md:text-7xl">
                            Get in Touch
                        </h1>

                        <p className="mx-auto mb-10 max-w-[880px] text-lg leading-8 text-white md:text-2xl">
                            Cerna Homecare has several offices and is always expanding into new
                            areas. The following information will help you get in contact with
                            the location that is nearest to you. If you are not finding what you
                            need, please feel free to contact us by filling out the form entitled
                            Customer Service.
                        </p>

                        <Link
                            href="/locations"
                            className="inline-flex items-center justify-center px-10 py-5 text-2xl font-bold text-white transition hover:opacity-90"
                            style={{ backgroundColor: "#195FA0" }}
                        >
                            OUR LOCATIONS
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-[#F4F4F4] px-6 py-14 md:px-10 md:py-20">
                <div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-2">
                    <InfoCard
                        icon="/assets/phone.png"
                        title="Talk to Sales"
                        description="Interested in getting home care services? Speak to a representative now."
                        buttonText="(877) 577-6782"
                        buttonHref="tel:8775776782"
                    />

                    <InfoCard
                        icon="/assets/quote.png"
                        title="Contact Support"
                        description="Sometimes you need a little help. Don’t worry, We’re here for you 24/7."
                        buttonText="(949) 298-3200"
                        buttonHref="tel:9492983200"
                    />
                </div>
            </section>

            <section className="bg-[#F4F4F4] px-6 pb-16 md:px-10 md:pb-24">
                <div className="mx-auto max-w-[900px]">
                    <h2 className="mb-8 text-center text-4xl font-bold text-[#00456B] md:text-5xl">
                        Ask A Question
                    </h2>

                    <div className="rounded-[8px] bg-white p-8 shadow-sm md:p-10">
                        <form className="grid gap-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                                />
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                            />

                            <textarea
                                placeholder="How can we help?"
                                rows={6}
                                className="w-full border border-slate-300 px-4 py-3 text-lg outline-none focus:border-[#00456B]"
                            />

                            <div className="pt-2 text-center">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white transition hover:opacity-90"
                                    style={{ backgroundColor: "#DD8500" }}
                                >
                                    SEND MESSAGE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section> 
        </main>
    );
}