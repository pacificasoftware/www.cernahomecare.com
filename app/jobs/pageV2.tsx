import LocationV2JobsPage from "../[locationSlug]/jobs/_features/careers-recruiting-platform/V2JobsPage";

const CORPORATE_LOCATION_SLUG = "orange-county";

export default async function V2JobsPage() {
    return (
        <LocationV2JobsPage
            params={Promise.resolve({
                locationSlug: CORPORATE_LOCATION_SLUG,
            })}
        />
    );
}