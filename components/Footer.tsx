import Image from "next/image";
import Link from "next/link";

function SocialIcon({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            aria-label={label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10"
        >
            {children}
        </Link>
    );
}

export default function Footer() {
    return (
        <footer>
            <div style={{ backgroundColor: "#00456B", color: "white", padding: "40px 24px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ marginBottom: "24px", textAlign: "center" }}>
                        <Image
                            src="/assets/healthcare-cerna.webp"
                            alt="Footer highlights"
                            width={1000}
                            height={120}
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            gap: "48px",
                            alignItems: "start",
                            marginTop: "28px",
                        }}
                    >
                        <div>
                            <h3
                                style={{
                                    color: "white",
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    marginBottom: "20px",
                                    textTransform: "uppercase",
                                }}
                            >
                                Contact Us
                            </h3>

                            <p
                                style={{
                                    color: "white",
                                    fontSize: "18px",
                                    lineHeight: 1.6,
                                    marginBottom: "20px",
                                }}
                            >
                                Industry leading care services provided by highly trained Care
                                Givers. Only the best in service and staff!
                            </p>

                            <p style={{ color: "white", fontSize: "18px", marginBottom: "12px" }}>
                                <strong>Email:</strong> info@cernahc.com
                            </p>

                            <p style={{ color: "white", fontSize: "18px" }}>
                                <strong>Phone:</strong>{" "}
                                <span style={{ color: "#D26E4B" }}>(877) 577-6782</span>
                            </p>
                        </div>

                        <div>
                            <h3
                                style={{
                                    color: "white",
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    marginBottom: "20px",
                                    textTransform: "uppercase",
                                }}
                            >
                                Navigation
                            </h3>

                            <div>
                                {[
                                    "Website Terms",
                                    "Privacy Policy",
                                    "Locations",
                                    "Write a Review",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        style={{
                                            borderBottom: "1px solid white",
                                            padding: "12px 0",
                                            fontSize: "18px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#D26E4B",
                                                fontWeight: 700,
                                                marginRight: "10px",
                                            }}
                                        >
                                            &gt;
                                        </span>
                                        <span style={{ color: "#D26E4B" }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3
                                style={{
                                    color: "white",
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    marginBottom: "20px",
                                    textTransform: "uppercase",
                                }}
                            >
                                Information
                            </h3>

                            <div>
                                {[
                                    "Downloads",
                                    "Financial Support",
                                    "Insurance Information",
                                    "Affiliations",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        style={{
                                            borderBottom: "1px solid white",
                                            padding: "12px 0",
                                            fontSize: "18px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#AA6E4B",
                                                fontWeight: 700,
                                                marginRight: "10px",
                                            }}
                                        >
                                            &gt;
                                        </span>
                                        <span style={{ color: "#D26E4B" }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#002b44] text-white">
            <div className="mx-auto max-w-7xl px-6 py-8 text-center">
                <p className="text-base md:text-[18px]">
                    © 2025 Cerna Home Care | Industry leading care services provided by
                    highly trained Care Givers.
                </p>

                <div className="mt-5 flex items-center justify-center gap-4">
                    <SocialIcon href="#" label="Facebook">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-7 w-7 fill-current"
                        >
                            <path d="M13.5 8.5V6.8c0-.8.5-1.3 1.4-1.3H16V2.2c-.5-.1-1.6-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8v1.7H6v3.8h2.5V22h4.1v-9.7h2.8l.4-3.8h-3.2Z" />
                        </svg>
                    </SocialIcon>

                    <SocialIcon href="#" label="Instagram">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-7 w-7 fill-current"
                        >
                            <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.7 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
                        </svg>
                    </SocialIcon>

                    <SocialIcon href="#" label="LinkedIn">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-7 w-7 fill-current"
                        >
                            <path d="M4.98 3.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4V9Z" />
                        </svg>
                    </SocialIcon>

                    <SocialIcon href="#" label="YouTube">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-7 w-7 fill-current"
                        >
                            <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2C22 15 22 12 22 12s0-3-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
                        </svg>
                    </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
}