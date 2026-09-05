import "./contact-us.css";

import Link from "next/link";
import Image from "next/image";

import ContactForm from "./ContactForm";

import {
    getLocationBySlug,
} from "@/lib/locations";

export const metadata = {
    title: "Contact Us | Cerna Home Care",
    description:
        "Get in touch with Cerna Home Care. Contact sales, support, or ask a question through our contact form.",
};

const CORPORATE_LOCATION_SLUG =
    "orange-county";

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
            style={{
                backgroundColor: "#00456B",
            }}
        >
            <div className="mb-6 flex justify-center">
                <Image
                    src={icon}
                    alt=""
                    width={92}
                    height={92}
                    className="h-auto w-auto"
                />
            </div>

            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                {title}
            </h3>

            <p className="mx-auto mb-8 max-w-[420px] text-lg leading-8 text-white">
                {description}
            </p>

            <a
                href={buttonHref}
                className="inline-flex items-center justify-center rounded-none px-8 py-5 text-2xl font-bold text-white transition hover:opacity-90"
                style={{
                    backgroundColor: "#DD8500",
                }}
            >
                {buttonText}
            </a>
        </div>
    );
}

export default async function ContactUsPage() {
    /*
    |--------------------------------------------------------------------------
    | Corporate Location
    |--------------------------------------------------------------------------
    |
    | Corporate contact information comes from the Orange County
    | location record in the database.
    |
    */

    const location =
        await getLocationBySlug(
            CORPORATE_LOCATION_SLUG
        );

    /*
    |--------------------------------------------------------------------------
    | Database Phone Numbers
    |--------------------------------------------------------------------------
    */

    const tollFreePhone =
        location?.tollFreePhone?.trim() ??
        "";

    const regularPhone =
        location?.phone?.trim() ??
        "";

    /*
    |--------------------------------------------------------------------------
    | Sales Phone
    |--------------------------------------------------------------------------
    |
    | Prefer Toll-Free.
    | Fall back to regular phone.
    |
    */

    const salesPhone =
        tollFreePhone ||
        regularPhone;

    const salesPhoneHref =
        tollFreePhone
            ? (
                location
                    ?.tollFreePhoneHref
                    ?.trim() ||
                makePhoneHref(
                    tollFreePhone
                )
            )
            : regularPhone
                ? (
                    location
                        ?.phoneHref
                        ?.trim() ||
                    makePhoneHref(
                        regularPhone
                    )
                )
                : "";

    /*
    |--------------------------------------------------------------------------
    | Support Phone
    |--------------------------------------------------------------------------
    |
    | Prefer the regular/local office phone.
    | Fall back to Toll-Free if regular phone is blank.
    |
    */

    const supportPhone =
        regularPhone ||
        tollFreePhone;

    const supportPhoneHref =
        regularPhone
            ? (
                location
                    ?.phoneHref
                    ?.trim() ||
                makePhoneHref(
                    regularPhone
                )
            )
            : tollFreePhone
                ? (
                    location
                        ?.tollFreePhoneHref
                        ?.trim() ||
                    makePhoneHref(
                        tollFreePhone
                    )
                )
                : "";

    return (
        <main>
            {/* ============================================================= */}
            {/* HERO */}
            {/* ============================================================= */}

            <section className="relative min-h-[620px] overflow-hidden">
                <Image
                    src="/assets/caregiver-helping-elderly-patient-hero.png"
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
                            style={{
                                backgroundColor:
                                    "#195FA0",
                            }}
                        >
                            OUR LOCATIONS
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================================= */}
            {/* CONTACT CARDS */}
            {/* ============================================================= */}

            <section className="bg-[#F4F4F4] px-6 py-14 md:px-10 md:py-20">
                <div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-2">
                    {/* ===================================================== */}
                    {/* SALES */}
                    {/* ===================================================== */}

                    {salesPhone ? (
                        <InfoCard
                            icon="/assets/phone.png"
                            title="Talk to Sales"
                            description="Interested in getting home care services? Speak to a representative now."
                            buttonText={
                                salesPhone
                            }
                            buttonHref={
                                salesPhoneHref
                            }
                        />
                    ) : null}

                    {/* ===================================================== */}
                    {/* SUPPORT */}
                    {/* ===================================================== */}

                    {supportPhone ? (
                        <InfoCard
                            icon="/assets/quote.png"
                            title="Contact Support"
                            description="Sometimes you need a little help. Don’t worry, We’re here for you 24/7."
                            buttonText={
                                supportPhone
                            }
                            buttonHref={
                                supportPhoneHref
                            }
                        />
                    ) : null}
                </div>
            </section>

            {/* ============================================================= */}
            {/* CONTACT FORM */}
            {/* ============================================================= */}

            <section className="bg-[#F4F4F4] px-6 pb-16 md:px-10 md:pb-24">
                <div className="mx-auto max-w-[900px]">
                    <h2 className="mb-8 text-center text-4xl font-bold text-[#00456B] md:text-5xl">
                        Ask A Question
                    </h2>

                    <div className="rounded-[8px] bg-white p-8 shadow-sm md:p-10">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    );
}

/*
|--------------------------------------------------------------------------
| Phone Href Helper
|--------------------------------------------------------------------------
*/

function makePhoneHref(
    phone: string
) {
    return `tel:${phone.replace(
        /[^\d+]/g,
        ""
    )}`;
}