
"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function SiteLayoutVisibility({ children }: Props) {
    const pathname = usePathname();

    const isLandingPage =
        pathname === "/guide-dementia-landing";

    if (isLandingPage) {
        return null;
    }

    return <>{children}</>;
}
