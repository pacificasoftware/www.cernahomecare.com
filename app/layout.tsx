
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";
import SiteLayoutVisibility from "@/components/SiteLayoutVisibility";

export const metadata: Metadata = {
    title: "Cerna Home Care",
    description: "Cerna Home Care website",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">

                {/* Hide navbar on GUIDE landing page */}
                <SiteLayoutVisibility>
                    <Navbar />
                </SiteLayoutVisibility>

                {/* Main page content */}
                {children}

                {/* Keep Google Tag Manager active on all pages */}
                <GoogleTagManager gtmId="GTM-WPMD2QCJ" />

                {/* Hide footer on GUIDE landing page */}
                <SiteLayoutVisibility>
                    <Footer />
                </SiteLayoutVisibility>

            </body>
        </html>
    );
}
