
import type { Metadata } from "next";
import "./globals.css";

import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

                {/* Google Ads - Site-wide tag */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=AW-1050038364"
                    strategy="afterInteractive"
                />

                <Script
                    id="cerna-google-ads"
                    strategy="afterInteractive"
                >
                    {`
                        window.dataLayer = window.dataLayer || [];

                        window.gtag = function() {
                            window.dataLayer.push(arguments);
                        };

                        window.gtag('js', new Date());
                        window.gtag('config', 'AW-1050038364');
                    `}
                </Script>

                {/* Hide navbar on GUIDE landing page */}
                <SiteLayoutVisibility>
                    <Navbar />
                </SiteLayoutVisibility>

                {/* Main page content */}
                {children}

                {/* Google Tag Manager - Site-wide */}
                <GoogleTagManager gtmId="GTM-WPMD2QCJ" />

                {/* Hide footer on GUIDE landing page */}
                <SiteLayoutVisibility>
                    <Footer />
                </SiteLayoutVisibility>

            </body>
        </html>
    );
}
