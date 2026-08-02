export type ServiceCard = {
    title: string;
    slug: string;
    description: string;
    image: string;
    features?: string[];
};

export const serviceCards: ServiceCard[] = [
    {
        title: "Specialized Care",
        slug: "specialized-care",
        description:
            "Flexible in-home support with bathing, dressing, grooming, meal preparation, mobility assistance, and daily routines.",
        image: "/assets/specialized-care.webp",
    },
    {
        title: "24 Hour Care",
        slug: "live-in-care",
        description:
            "More consistent care and companionship for clients who need extended support at home throughout the day and evening.",
        image: "/assets/respite-care.webp",
    },
    {
        title: "Memory & Dementia Care",
        slug: "memory-dementia-care",
        description:
            "Patient, compassionate support for clients living with Alzheimer’s, dementia, memory loss, or cognitive changes.",
        image: "/assets/group.png",
    },
    {
        title: "Covered Care",
        slug: "covered-care",
        description:
            "Help after a hospital stay, surgery, rehab discharge, or illness so clients can recover safely and comfortably at home.",
        image: "/assets/caretaker_with_lady.png",
    },
    {
        title: "Companion Care",
        slug: "companion-care",
        description:
            "Friendly support, conversation, errands, light activities, appointments, meal support, and help reducing isolation.",
        image: "/assets/man_with_caretaker.png",
    },
    {
        title: "Respite Care",
        slug: "respite-care",
        description:
            "Temporary relief for family caregivers who need time to rest, travel, work, or recharge while their loved one is cared for.",
        image: "/assets/lady_on_couch.png",
    },
    {
        title: "Transportation",
        slug: "transportation",
        description:
            "We assist with all of your transportation needs, which includes a caregiver so your loved one is not simply picked up and dropped off.",
        image: "/assets/caretakers.png",
        features: [
            "Hospital 2 Home Program",
            "Facility Discharge Coordination",
            "Errands & Med Pick-Up",
            "General Home Assistance & Errands",
        ],
    },
];
