import type { Metadata } from "next";
import { Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-site",
    display: "swap",

});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

 

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
            <body className={`${lato.variable} ${geistMono.variable} antialiased`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
