import { NextResponse } from "next/server";

function clean(value: unknown) {
    return String(value ?? "").trim();
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const honeypot =
            clean(body.company) ||
            clean(body.website) ||
            clean(body.url);

        if (honeypot) {
            return NextResponse.json(
                { success: false, message: "Spam detected." },
                { status: 400 }
            );
        }

        const purpose = clean(body.purpose) || "contact";

        const firstName = clean(body.firstName);
        const lastName = clean(body.lastName) || "N/A";
        const phone = clean(body.phone);
        const email = clean(body.email);
        const zipCode = clean(body.zipCode) || "Not provided";

        if (!firstName || !lastName || !phone || !email) {
            return NextResponse.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        if (purpose === "job_apply" && !/^\d{5}$/.test(zipCode)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid 5-digit ZIP code." },
                { status: 400 }
            );
        }

        const apiBase = "https://api.mysafepatch.com";
        const apiKey = process.env.SAFEPATCH_API_KEY;
        const apiKeyHeader = "X-API-KEY";

        if (!apiKey) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing API configuration.",
                    missing: {
                        apiKey: true,
                    },
                },
                { status: 500 }
            );
        }

        const subject =
            purpose === "job_apply"
                ? "Career Inquiry"
                : clean(body.subject) || "Cerna Home Care Contact Inquiry";

        const message =
            purpose === "job_apply"
                ? `
New Career Inquiry

First Name: ${firstName}
Last Name: ${lastName}
Phone: ${phone}
Email: ${email}
Zip Code: ${zipCode}
                `.trim()
                : `
New Contact Inquiry

First Name: ${firstName}
Last Name: ${lastName}
Phone: ${phone}
Email: ${email}
Zip Code: ${zipCode}

Inquiry Type: ${clean(body.inquiryType) || "General Contact"}

Message:
${clean(body.message) || "Contact form inquiry"}
                `.trim();

        const backendUrl = `${apiBase}/api/sms/SendCernaHomeCareEmail`;

        const safePatchPayload = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Phone: phone,
            ZipCode: zipCode,
            Subject: subject,
            Message: message,
            Purpose: purpose,
        };

        console.log("Sending SafePatch email payload:", safePatchPayload);

        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [apiKeyHeader]: apiKey,
            },
            body: JSON.stringify(safePatchPayload),
        });

        const responseText = await response.text();

        let backendJson: any = null;

        try {
            backendJson = responseText ? JSON.parse(responseText) : null;
        } catch {
            backendJson = null;
        }

        if (!response.ok) {
            console.error("SafePatch email failed:", {
                url: backendUrl,
                status: response.status,
                responseText,
                backendJson,
            });

            const backendMessage =
                backendJson?.message ||
                backendJson?.reason ||
                responseText ||
                "Email failed to send.";

            return NextResponse.json(
                {
                    success: false,
                    message: backendMessage,
                    reason: backendJson?.reason || "backend_failed",
                    backendStatus: response.status,
                    backendUrl,
                    details: responseText,
                },
                { status: response.status >= 400 && response.status < 500 ? response.status : 502 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Email sent successfully.",
            upstreamResponse: backendJson || responseText,
        });
    } catch (error: any) {
        console.error("Send email route error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error?.message || "Unexpected error.",
                details: String(error),
            },
            { status: 500 }
        );
    }
}