export type LocationData = {
    slug: string;
    name: string;
    state: string;
    heroImage: string;
    addressLine1: string;
    addressLine2: string;
    phone: string;
    phoneHref: string;
    email: string;
    mapUrl: string;
    coverageTitle: string;
    coverageAreas: string[];
};

export const locations: Record<string, LocationData> = {
    "orange-county": {
        slug: "orange-county",
        name: "Orange County",
        state: "CA",
        heroImage: "/assets/cernaoffice.png",
        addressLine1: "2151 Michelson Dr",
        addressLine2: "Irvine, CA 92612",
        phone: "(949) 298-3200",
        phoneHref: "tel:19492983200",
        email: "info@cernahc.com",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=2151+Michelson+Dr+Irvine+CA+92612",
        coverageTitle: "ORANGE COUNTY COVERAGE AREAS",
        coverageAreas: [
            "Aliso Viejo", "Anaheim", "Brea", "Buena Park", "Costa Mesa",
            "Cypress", "Dana Point", "Fountain Valley", "Fullerton",
            "Garden Grove", "Huntington Beach", "Irvine", "La Habra",
            "La Palma", "Laguna Beach", "Laguna Hills", "Laguna Niguel",
            "Laguna Woods", "Lake Forest", "Los Alamitos", "Mission Viejo",
            "Newport Beach", "Orange", "Placentia", "Rancho Santa Margarita",
            "San Clemente", "San Juan Capistrano", "Santa Ana", "Seal Beach",
            "Stanton", "Tustin", "Villa Park", "Westminster", "Yorba Linda",
        ],
    },

    "southlake": {
        slug: "southlake",
        name: "Southlake",
        state: "TX",
        heroImage: "/assets/1560-E-Southlake-Blvd-Southlake-TX-Building-Photo-1-Large.jpg",
        addressLine1: "1560 E Southlake Blvd",
        addressLine2: "Southlake, TX 76092",
        phone: "(682) 324-9800",
        phoneHref: "tel:16823249800",
        email: "info@cernahc.com",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=1560+E+Southlake+Blvd+Southlake+TX+76092",
        coverageTitle: "SOUTHLAKE COVERAGE AREAS",
        coverageAreas: ["Southlake", "Grapevine", "Colleyville", "Keller", "Westlake", "Trophy Club"],
    },

    "south-bay": {
        slug: "south-bay",
        name: "South Bay",
        state: "CA",
        heroImage: "/assets/3780-Kilroy-Airport-Way.jpg",
        addressLine1: "3780 Kilroy Airport Way",
        addressLine2: "Long Beach, CA 90806",
        phone: "(562) 242-1830",
        phoneHref: "tel:15622421830",
        email: "info@cernahc.com",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=3780+Kilroy+Airport+Way+Long+Beach+CA+90806",
        coverageTitle: "SOUTH BAY COVERAGE AREAS",
        coverageAreas: ["Long Beach", "Torrance", "Redondo Beach", "Manhattan Beach", "Hermosa Beach", "Palos Verdes"],
    },

    "marin-county": {
        slug: "marin-county",
        name: "Marin County",
        state: "CA",
        heroImage: "/assets/700-Larkspur-Landing.jpg",
        addressLine1: "700 Larkspur Landing Circle",
        addressLine2: "Larkspur, CA 94939",
        phone: "(415) 799-2628",
        phoneHref: "tel:14157992628",
        email: "info@cernahc.com",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=700+Larkspur+Landing+Circle+Larkspur+CA+94939",
        coverageTitle: "MARIN COUNTY COVERAGE AREAS",
        coverageAreas: ["Larkspur", "San Rafael", "Mill Valley", "Novato", "Sausalito", "Tiburon"],
    },

    "san-diego": {
        slug: "san-diego",
        name: "San Diego",
        state: "CA",
        heroImage: "/assets/12526-High-Bluff-Dr.jpg",
        addressLine1: "12526 High Bluff Drive",
        addressLine2: "San Diego, CA 92130",
        phone: "(877) 572-3762",
        phoneHref: "tel:18775723762",
        email: "info@cernahc.com",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=12526+High+Bluff+Drive+San+Diego+CA+92130",
        coverageTitle: "SAN DIEGO COVERAGE AREAS",
        coverageAreas: ["San Diego", "Del Mar", "La Jolla", "Encinitas", "Carlsbad", "Solana Beach"],
    },

    "pasadena": {
        slug: "pasadena",
        name: "Pasadena",
        state: "CA",
        heroImage: "/assets/1055 E Colorado Blvd.jpg",
        addressLine1: "1055 E Colorado Blvd., 5th Floor",
        addressLine2: "Pasadena, CA 91106",
        phone: "(818) 839-5602",
        phoneHref: "tel:18188395602",
        email: "info@cernahc.com",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=1055+E+Colorado+Blvd+5th+Floor+Pasadena+CA+91106",
        coverageTitle: "PASADENA COVERAGE AREAS",
        coverageAreas: ["Pasadena", "Altadena", "Arcadia", "San Marino", "South Pasadena", "Sierra Madre"],
    },

    "dallas": {
        slug: "dallas",
        name: "Dallas",
        state: "TX",
        heroImage: "/assets/8180_rafael_rivera.png",
        addressLine1: "101 E Park Blvd Suite 771",
        addressLine2: "Plano, TX 75074",
        phone: "(972) 330-2005",
        phoneHref: "tel:19723302005",
        email: "info@cernahc.com",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=101+E+Park+Blvd+Suite+771+Plano+TX+75074",
        coverageTitle: "DALLAS COVERAGE AREAS",
        coverageAreas: ["Dallas", "Plano", "Frisco", "Richardson", "Allen", "McKinney"],
    },

    "las-vegas": {
        slug: "las-vegas",
        name: "Las Vegas",
        state: "NV",
        heroImage: "/assets/8180_rafael_rivera.png",
        addressLine1: "8180 Rafael Rivera Way #305",
        addressLine2: "Las Vegas, NV 89113",
        phone: "(702) 673-1900",
        phoneHref: "tel:17026731900",
        email: "info@cernahc.com",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=8180+Rafael+Rivera+Way+305+Las+Vegas+NV+89113",
        coverageTitle: "LAS VEGAS COVERAGE AREAS",
        coverageAreas: ["Las Vegas", "Henderson", "Summerlin", "Spring Valley", "Enterprise", "Paradise"],
    },
};