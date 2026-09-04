import {
    getLocations,
    getLocationStates,
} from "@/lib/locations";

import LocationsClient from "./LocationClient";

export default async function LocationsPage() {
    const [locations, states] =
        await Promise.all([
            getLocations(),
            getLocationStates(),
        ]);

    return (
        <LocationsClient
            locations={locations}
            states={states}
        />
    );
}