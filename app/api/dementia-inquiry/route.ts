
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const name = String(body.name ?? "").trim();
        const phone = String(body.phone ?? "").trim();
        const email = String(body.email ?? "").trim();
        const website = String(body.website ?? "").trim();
        const hasMedicare = body.hasMedicare === true;

        console.log("GUIDE inquiry received:", {
            name,
            email,
            hasMedicare,
            honeypotFilled: Boolean(website)
        });

        // Honeypot spam protection
        // During debugging, do not return a false success.
        if (website) {
            console.warn("GUIDE inquiry blocked by honeypot");

            return NextResponse.json(
                {
                    success: false,
                    message: "Submission blocked by spam protection.",
                    reason: "spam_filtered"
                },
                { status: 400 }
            );
        }

        if (!name || !phone || !email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name, phone and email are required."
                },
                { status: 400 }
            );
        }

        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
        const apiKey  = process.env.CERNA_API_KEY;

        if (!apiBase || !apiKey) {
            console.error("GUIDE API configuration missing");

            return NextResponse.json(
                {
                    success: false,
                    message: "Email service is not configured."
                },
                { status: 500 }
            );
        }

        const endpoint =
            `${apiBase.replace(/\/$/, "")}/api/Comms/SendGuideInquiryEmail`;

        console.log("GUIDE calling API:", endpoint);

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [process.env.API_KEY_HEADER || "X-API-KEY"]: apiKey
            },
            body: JSON.stringify({
                name,
                phone,
                email,
                hasMedicare,
                website: ""
            }),
            cache: "no-store"
        });

        const responseText = await response.text();

        let result: {
            success?: boolean;
            message?: string;
            reason?: string;
            adminEmailSent?: boolean;
        } = {};

        try {
            result = JSON.parse(responseText);
        } catch {
            console.error(
                "GUIDE API returned non-JSON response:",
                response.status
            );
        }

        console.log("GUIDE API result:", {
            status: response.status,
            success: result.success,
            reason: result.reason,
            message: result.message,
            adminEmailSent: result.adminEmailSent
        });

        // Only accept a confirmed successful email submission
        const emailSent =
            response.ok &&
            result.success === true &&
            result.reason !== "spam_filtered" &&
            result.message ===
            "Your GUIDE inquiry was submitted successfully.";

        if (!emailSent) {
            console.error("GUIDE email not confirmed:", {
                status: response.status,
                result
            });

            return NextResponse.json(
                {
                    success: false,
                    message:
                        process.env.NODE_ENV === "development"
                            ? `${result.message || "Email not confirmed."} (HTTP ${response.status}, ${result.reason || "unknown"})`
                            : "Unable to confirm email delivery.",
                    adminEmailSent: result.adminEmailSent ?? false
                },
                { status: 502 }
            );
        }

        console.log("GUIDE inquiry processed successfully");

        return NextResponse.json({
            success: true,
            message: "Your request has been submitted successfully."
        });

    } catch (error) {
        console.error("GUIDE inquiry exception:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    process.env.NODE_ENV === "development" &&
                        error instanceof Error
                        ? error.message
                        : "An unexpected error occurred."
            },
            { status: 500 }
        );
    }
}
