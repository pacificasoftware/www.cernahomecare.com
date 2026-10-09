import { notFound } from "next/navigation";
import SeniorCareLandingClient from "./SeniorCareLandingClient";
// Update this import to match the existing getLocationBySlug helper in your Cerna project.
import { getLocationBySlug } from "@/lib/locations";

type PageProps = {
  params: Promise<{ locationSlug: string }>;
};

export default async function SeniorCareLandingPage({ params }: PageProps) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) notFound();

  return (
    <SeniorCareLandingClient
      locationSlug={locationSlug}
      phoneHref={location.phoneHref}
    />
  );
}
