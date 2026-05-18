export type FloridaCoverageGroup = {
    county: string;
    areas: string[];
};

export type FloridaLocationCoverage = {
    slug: string;
    label: string;
    coverageTitle: string;
    groups: FloridaCoverageGroup[];
};

export const floridaCoverageAreas: Record<string, FloridaLocationCoverage> = {
    orlando: {
        slug: "orlando",
        label: "Orlando",
        coverageTitle: "ORLANDO COVERAGE AREAS",
        groups: [
            {
                county: "Orange County",
                areas: [
                    "Orlando", "Alafaya", "Pine Hills", "Horizon West", "Fuller Heights",
                    "Apopka", "Ocoee", "Winter Garden", "Meadow Woods", "University",
                    "Winter Park", "Oak Ridge", "Hunter's Creek", "Maitland", "Lake Butler",
                    "Azalea Park", "Lockhart", "Southchase", "Doctor Phillips", "Conway",
                    "Goldenrod", "Fairview Shores", "Union Park", "Bithlo", "Pine Castle",
                    "Williamsburg", "Wedgefield", "Sky Lake", "Belle Isle", "South Apopka",
                    "Orlo Vista", "Rio Pinar", "Bay Hill", "Tangerine", "Clarcona",
                    "Oakland", "Holden Lakes", "Holden Heights", "Zellwood", "Windermere",
                    "Edgewood",
                ],
            },
            {
                county: "Osceola County",
                areas: [
                    "Kissimmee", "Poinciana", "St. Cloud", "Fuller Heights",
                    "Buenaventura Lakes", "Celebration", "Campbell",
                ],
            },
            {
                county: "Seminole County",
                areas: [
                    "Sanford", "Altamonte Springs", "Oviedo", "Winter Springs",
                    "Casselberry", "Wekiwa Springs", "Lake Mary", "Longwood",
                    "Forest City", "Goldenrod", "Fern Park", "Heathrow", "Geneva",
                    "Chuluota", "Midway", "Black Hammock",
                ],
            },
            {
                county: "Brevard County",
                areas: [
                    "Palm Bay", "Melbourne", "Titusville", "Merritt Island", "Rockledge",
                    "West Melbourne", "Port St. John", "Cocoa", "Viera West", "Viera East",
                    "Cocoa Beach", "Satellite Beach", "Cape Canaveral",
                    "North Merritt Island", "Indian Harbour Beach", "Micco", "Mims",
                    "South Patrick Shores", "Cocoa West", "Grant-Valkaria", "June Park",
                    "Melbourne Beach", "Malabar", "Indialantic", "Sharpes",
                    "Tropical Park", "Patrick AFB", "Palm Shores",
                ],
            },
        ],
    },

    tampa: {
        slug: "tampa",
        label: "Tampa",
        coverageTitle: "TAMPA COVERAGE AREAS",
        groups: [
            {
                county: "Hillsborough County",
                areas: [
                    "Tampa", "Brandon", "Town 'n' Country", "Riverview", "University",
                    "Plant City", "Valrico", "Carrollwood", "Egypt Lake-Leto",
                    "Sun City Center", "Apollo Beach", "Lake Magdalene", "Ruskin",
                    "East Lake-Orient Park", "Citrus Park", "Palm River-Clair Mel",
                    "Temple Terrace", "Lutz", "Fish Hawk", "Keystone", "Northdale",
                    "Westchase", "Bloomingdale", "Gibsonton", "Greater Sun Center",
                    "Thonotosassa", "Wimauma", "Cheval", "Mango", "Progress Village",
                    "Pebble Creek", "Seffner", "Balm", "Dover",
                ],
            },
            {
                county: "Hardee County",
                areas: ["Wauchula", "Bowling Green", "Zolfo Springs"],
            },
            {
                county: "Highlands County",
                areas: ["Sebring", "Avon Park", "Placid Lakes", "Sylvan Shores", "Lake Placid"],
            },
            {
                county: "Manatee County",
                areas: [
                    "Bradenton", "Lakewood Ranch", "South Bradenton", "Bayshore Gardens",
                    "Palmetto", "Memphis", "Longboat Key", "West Samoset", "Samoset",
                    "Cortez", "Ellenton", "Whitfield", "West Bradenton", "Holmes Beach",
                ],
            },
            {
                county: "Polk County",
                areas: [
                    "Lakeland", "Poinciana", "Fuller Heights", "Winter Haven",
                    "Haines City", "Bartow", "Auburndale", "Lake Wales", "Highland City",
                    "Davenport", "Lakeland Highlands", "Medulla", "Cypress Gardens",
                    "Winston", "Loughman", "Inwood", "Willow Oak", "Lake Alfred",
                    "Kathleen", "Dundee", "Jan Phyl Village", "Fussels Corner",
                    "Crystal Lake", "Combee Settlement", "Fort Meade", "Alturas",
                    "Mulberry", "Eagle Lake", "Wahneta", "Frostproof", "Polk City",
                    "Grenelefe", "Crooked Lake Park", "Lake Hamilton", "Babson Park",
                ],
            },
        ],
    },
};