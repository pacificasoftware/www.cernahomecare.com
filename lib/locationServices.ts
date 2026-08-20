// lib/locationServices.ts

export const locationServices = {
    "specialized-care": {
        title: "Specialized Care",
        shortDescription:
            "Flexible in-home support for bathing, dressing, grooming, mobility, meals, and daily routines.",
        image: "/assets/specialized-care.webp",
        seoTitle: "Specialized Care Services",
        heroTitle: "Specialized Care at Home",
        intro:
            "Cerna Homecare provides hourly and personal care services designed to help clients remain safe, comfortable, and independent at home.",
        sections: [
            {
                heading: "Flexible care based on your schedule",
                body:
                    "Whether your loved one needs a few hours of support each week or daily assistance, our care team can help create a plan around your family’s needs.",
            },
            {
                heading: "Help with daily personal routines",
                body:
                    "Caregivers can assist with bathing, dressing, grooming, toileting, mobility, meal preparation, medication reminders, and companionship.",
            },
        ],
    },

    "live-in-care": {
        title: "Covered Care",
        shortDescription:
            "Around-the-clock support for families who need a consistent caregiver presence in the home.",
        image: "/assets/respite-care.webp",
        seoTitle: "Live-In Home Care Services",
        heroTitle: "Covered Care for Families",
        intro:
            "Covered Care can provide peace of mind for families who want their loved one supported at home instead of moving into a facility.",
        sections: [
            {
                heading: "Consistent care in the home",
                body:
                    "Covered Care helps provide continuity, companionship, and assistance with daily needs while allowing clients to remain in familiar surroundings.",
            },
        ],
    },

    "memory-care": {
        title: "Memory Care",
        shortDescription:
            "Specialized support for Alzheimer’s, dementia, memory loss, confusion, and changing care needs.",
        image: "/assets/memory2.webp",
        seoTitle: "Memory & Dementia Home Care",
        heroTitle: "Memory & Dementia Care at Home",
        intro:
            "Cerna Homecare supports families caring for loved ones with Alzheimer’s, dementia, memory loss, and related conditions.",
        sections: [
            {
                heading: "Compassionate dementia support",
                body:
                    "Our caregivers can help with routines, redirection, safety supervision, companionship, meals, mobility, and personal care.",
            },
        ],
    },

    "covered-care": {
        title: "Covered Care",
        shortDescription:
            "Short-term home support after surgery, hospitalization, rehab, or a health setback.",
        image: "/assets/covered-care.webp",
        seoTitle: "Covered Home Care",
        heroTitle: "Care After Hospital Discharge",
        intro:
            "After a hospital stay, many families need help at home to reduce stress and support a safer recovery.",
        sections: [
            {
                heading: "Support after discharge",
                body:
                    "Caregivers can assist with meals, mobility, transportation, medication reminders, personal care, and monitoring changes in condition.",
            },
        ],
    },

    "companion-care": {
        title: "Companion Care",
        shortDescription:
            "Friendly support, conversation, errands, appointments, meal help, and daily companionship.",
        image: "/assets/companionV2.webp",
        seoTitle: "Companion Care Services",
        heroTitle: "Companion Care at Home",
        intro:
            "Companion care helps seniors and adults stay socially engaged, supported, and comfortable at home.",
        sections: [
            {
                heading: "Meaningful daily support",
                body:
                    "Caregivers can help with conversation, errands, appointments, meal preparation, light housekeeping, and daily routines.",
            },
        ],
    },

    "care-management": {
        title: "Care Management",
        shortDescription:
            "Temporary relief for family caregivers who need rest, travel coverage, or backup support.",
        image: "/assets/caregiver-helping-elderly-patient-hero.png",
        seoTitle: "Care Management Services",
        heroTitle: "Care Managment for Family Caregivers",
        intro:
            "Respite care gives family caregivers time to rest while knowing their loved one is being supported at home.",
        sections: [
            {
                heading: "Backup care when families need it",
                body:
                    "Whether you need a few hours, a few days, or recurring support, respite care can help reduce caregiver stress.",
            },
        ],
    },
    "transportation": {
        title: "Transportation",
        shortDescription:
            "Transportation support that includes a caregiver so your loved one is accompanied throughout the trip.",
        image: "/assets/caretakers.png",
        seoTitle: "Senior Transportation Services",
        heroTitle: "Transportation with Caregiver Support",
        intro:
            "Cerna Homecare assists with transportation needs while providing a caregiver to accompany and support your loved one throughout the journey.",
        sections: [
            {
                heading: "More than pickup and drop-off",
                body:
                    "We assist with all of your transportation needs, which includes a caregiver so your loved one is not simply picked up and dropped off.",
            },
            {
                heading: "Support throughout the appointment or errand",
                body:
                    "A caregiver can help your loved one prepare, safely enter and exit the vehicle, attend appointments, run errands, and return home comfortably.",
            },
        ],
    },
} as const;

export type LocationServiceSlug = keyof typeof locationServices;