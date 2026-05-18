"use client";

import { useMemo, useState } from "react";
import { floridaCoverageAreas } from "@/lib/floridaCoverageAreas";

type Props = {
    locationSlug: string;
};

export default function FloridaCoverageSelector({ locationSlug }: Props) {
    const floridaLocation = floridaCoverageAreas[locationSlug];

    const [selectedCounty, setSelectedCounty] = useState(
        floridaLocation?.groups[0]?.county ?? ""
    );

    const selectedGroup = useMemo(() => {
        return floridaLocation?.groups.find(
            (group) => group.county === selectedCounty
        );
    }, [floridaLocation, selectedCounty]);

    if (!floridaLocation) {
        return null;
    }

    return (
        <>
            <div className="mb-6">
                <div className="relative w-full">
                    <select
                        id="county-filter"
                        value={selectedCounty}
                        onChange={(e) => setSelectedCounty(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-center text-sm font-semibold text-[#00456B] outline-none transition focus:border-[#DD8500] focus:ring-2 focus:ring-[#DD8500]/20"
                    >
                        {floridaLocation.groups.map((group) => (
                            <option key={group.county} value={group.county}>
                                {group.county}
                            </option>
                        ))}
                    </select>

                    <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#00456B]">
                        ▼
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[17px] leading-7 text-slate-700">
                {selectedGroup?.areas.map((area) => (
                    <div key={`${selectedGroup.county}-${area}`}>{area}</div>
                ))}
            </div>
        </>
    );
}