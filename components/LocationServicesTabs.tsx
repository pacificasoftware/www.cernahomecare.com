"use client";

import { useState } from "react";
 

const services = [
    {
        title: "Hourly and Personal Care",
        content: (
            <>
                <h2 className="text-3xl font-extrabold text-[#00456B]">
                    Hourly and Personal Care
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    With Cerna In Home Care Services you are treated like family. Whether you
                    need some help around the house for a few hours a day or care 24 hours per
                    day every day, we have the right in home care services and programs for you
                    or your loved one including:
                </p>

                <ul className="mt-6 list-disc space-y-4 pl-6 text-lg leading-8 text-slate-700">
                    <li><strong>24 Hour Care</strong> 24 Hour Care aid that provides care 16 hours per day and is always there</li>
                    <li><strong>Hourly Care</strong> any schedule, any times from four hours to 24 hours</li>
                    <li><strong>24 Hour Care</strong> two 12 hour shifts when your loved one needs day and night attendance</li>
                    <li><strong>Memory Care</strong> Trained care providers with memory, Alzheimer’s and dementia care experience</li>
                    <li><strong>Cognitive Care</strong> Running appointments and errands, doctor visits, etc</li>
                    <li><strong>Care Management</strong> We are always available, especially when you can’t be. Just a phone call away.</li>
                </ul>

                <p className="mt-6 text-lg font-bold italic leading-8 text-slate-700">
                    All Cerna Care Aides have at least one year experience, Criminal
                    Background checked, DMV checked, Passed and acquired four units in
                    Cognitive Impairment course, have a minimum of eight hours in house
                    training and have a current CPR/First Aid Card.
                </p>
            </>
        ),
    },
    {
        title: "24 Hour Care",
        content: (
            <>
                <h2 className="text-3xl font-extrabold text-[#00456B]">
                    24 Hour Caregiver for 24/7 Assistance
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    Live In Home Care is an option for families that need a care aid on
                    site at all times, 24/7. The Caregiver actually lives in the home as
                    long as separate quarters exist for the them to sleep and have privacy.
                    The cost is much lower than having 24 hours of hourly/shift coverage
                    as the caregiver has eight hours of time to be relieved of duty, but
                    meals or a meal stipend are provided by the client.
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    Our 24 Hour Caregivers provide companionship, bathing, grooming, light
                    housekeeping, medication reminders, exercise, general assistance,
                    errands, cooking and much, much more. Cerna maintains Workman’s
                    Compensation Insurance, Liability Insurance and a Surety Bond to ensure
                    there would never be Homeowner liability.
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    We’ll be there on time and with a smile to provide the loving
                    compassionate care you expect for your family.
                </p>
            </>
        ),
    },
    {
        title: "Memory and Dementia Care",
        content: (
            <>
                <h2 className="text-3xl font-extrabold text-[#00456B]">
                    Memory and Dementia Care
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    Cerna specializes in Cognitive impairments from Alzheimer’s, Dementia,
                    Parkinson’s Stroke, Injuries, Diabetes and Others. We train our staff
                    and use the Alzheimer’s Associations CARES Training to ensure our staff
                    know and understand the special care requirements of someone with a
                    Cognitive Impairment.
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    Our staff implements special stimulation tools and techniques to help
                    the brain hold on to cognition and thrive. We integrate physical and
                    lifestyle changes into our clients lives to ensure quality of life and
                    vitality.
                </p>
            </>
        ),
    },
    {
        title: "Care Management",
        content: (
            <>
                <h2 className="text-3xl font-extrabold text-[#00456B]">
                    Care Management
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    If you don’t live near your aging parent, you may wonder if what you’re
                    doing is enough to oversee your loved one’s care. Even if you live
                    nearby, you may discover the problems you or your loved one are facing
                    are becoming larger and more complex than you can comfortably manage.
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    Cerna’s Care management is a team collaboration and process that
                    includes assessments, planning, facilitation, care coordination,
                    evaluation, and advocacy for any options and/or services to meet an
                    individual’s and/or family’s comprehensive health needs through
                    communication and available resources to promote wellness, quality of
                    life and cost-effective outcomes.
                </p>
            </>
        ),
    },
    {
        title: "Transportation Services",
        content: (
            <>
                <h2 className="text-3xl font-extrabold text-[#00456B]">
                    Transportation Services
                </h2>

                <h3 className="mt-6 text-2xl font-extrabold text-[#00456B]">
                    Cerna Van - Transportation
                </h3>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    At Cerna all drivers also accompany our clients into the home, can stop
                    and pick up medicines or food/supplies, can prepare a meal or help get
                    you or your loved one changed and in bed if needed.
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    Cerna has developed a corporate culture around a professional and caring
                    attitude. All Cerna staff is very knowledgeable in the field of elder
                    and/or handicapped transportation and they do their very best to offer
                    the best handicapped transportation services available.
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    Cerna Transportation staff are there to ensure that all transportation
                    details are considered before we arrive to transport you or your loved
                    one. Their experience and understanding attitude makes our
                    transportation services flexible and responsive to the various needs of
                    most any person needing transport.
                </p>
            </>
        ),
    },
    {
        title: "Tailored and Custom Services",
        content: (
            <>
                <h2 className="text-3xl font-extrabold text-[#00456B]">
                    Tailored and Custom Services
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    We weren’t made on an assembly line. Every person is an individual and
                    in need of different things when it comes to care and wellness. Cerna
                    Homecare customizes each plan of care to the needs of the care
                    recipient.
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                    From attending doctor appointments and facilitating communication
                    between doctor, senior and family members to monitoring client’s
                    adherence to medical orders and instructions, Cerna takes a customized
                    approach to each individual every time.
                </p>

                <ul className="mt-6 list-disc space-y-4 pl-6 text-lg leading-8 text-slate-700">
                    <li>Special dietary needs for diabetes, hypertension or heart disease.</li>
                    <li>Home care services planning and family support.</li>
                    <li>Social, recreational, or cultural activities that enrich quality of life.</li>
                    <li>And so much more.</li>
                </ul>
            </>
        ),
    },
];

export default function LocationServicesTabs() {
    const [active, setActive] = useState(0);

    return (
        <section className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="mb-8 text-3xl font-extrabold text-[#00456B]">
                Here is how we can help:
            </h2>

            <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
                <aside className="space-y-3">
                    {services.map((service, index) => (
                        <button
                            key={service.title}
                            type="button"
                            onClick={() => setActive(index)}
                            className={`block w-full px-8 py-4 text-left text-base font-bold transition ${active === index
                                    ? "border border-[#60b6ca] bg-white text-slate-500"
                                    : "bg-[#60b6ca] text-white hover:bg-[#00456B]"
                                }`}
                        >
                            {service.title}
                        </button>
                    ))}
                </aside>

                <article>{services[active].content}</article>
            </div>
        </section>
    );
}