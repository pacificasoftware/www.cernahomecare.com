import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";

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
                <Navbar />
                {children}
                <GoogleTagManager gtmId="GTM-WPMD2QCJ" /> 
                <Footer />
            </body>
        </html>
    );
}