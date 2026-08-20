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
        features: [
            "Memory Care",
            "Medicare Program for Dementia",
            "Cognitive Stimulation",
            "Stroke and Brain Injury Care",
            "Behavior Management",
            "Healthy Lifestyle Modification",
            "Hospice Care Support",
        ],
    },
    //{
    //    title: "Covered Care",
    //    slug: "live-in-care",
    //    description:
    //        "More consistent care and companionship for clients who need extended support at home throughout the day and evening.",
    //    image: "/assets/respite-care.webp",
    //}, 
    {
        title: "Memory Care",
        slug: "memory-care",
        description:
            "Cerna specializes in cognitive impairments from Alzheimer’s, Parkinson’s, stroke, and other neurological disorders.",
        image: "/assets/group.png",
        features: [
            "Manage Behavior Changes",
            "Redirection and Trigger Management",
            "UTI Prevention",
            "Cognitive Stimulation",
            "Diet and Lifestyle Changes",
            "Secure Care for Wandering",
            "Medicare Dementia Program",
        ],
    },
    {
        title: "Covered Care",
        slug: "covered-care",
        description:
            "At Cerna, we get your care covered through a variety of programs that may be available.",
        image: "/assets/caretaker_with_lady.png",
        features: [
            "Medicare (for Dementia)",
            "VA Contracted",
            "Long Term Care Insurance",
            "Specialty Insurance Plans",
            "Workers Compensation",
        ],
    },
    {
        title: "Companion Care",
        slug: "companion-care",
        description:
            "Friendly support, conversation, errands, light activities, appointments, meal support, and help reducing isolation.",
        image: "/assets/man_with_caretaker.png",
        features: [
            "Bathing and Grooming",
            "Light Housekeeping and Sanitizing",
            "Diet Planning, Meal Prep and Grocery Shopping",
            "Exercise and Continuation of Physical Therapy",
            "Medication Reminders",
            "Transfers, Errands, Projects and More",
            "Post Surgery Recovery",
        ],
    }, 
    {
        title: "Care Management",
        slug: "care-management",
        description:
            "With Cerna’s Care Management program, managing the complexities of healthcare today is no longer a burden, so you can focus on quality of life.",
        image: "/assets/lady_on_couch.png",
        features: [
            "Patient Advocacy",
            "Manage Living Arrangements",
            "Coordinate and Facilitate Healthcare Services",
            "Monitor and Coordinate Doctors, Medications, Supplies & Equipment",
            "Diet Plan Coordination",
            "Appointment Scheduling",
            "Cognitive Activity Plans and Exercise",
        ],
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
