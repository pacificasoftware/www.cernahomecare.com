import { NextResponse } from "next/server";

function clean(value: unknown) {
    return String(value ?? "").trim();
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const firstName = clean(body.firstName);
        const lastName = clean(body.lastName);
        const phone = clean(body.phone);
        const email = clean(body.email);

        if (!firstName || !lastName || !phone || !email) {
            return NextResponse.json(
                { success: false, message: "Missing required fields." },
                { status: 400 }
            );
        }

        const apiBase = process.env.SAFEPATCH_API_BASE_URL;
        const apiKey = process.env.SAFEPATCH_API_KEY;
        const apiKeyHeader = process.env.SAFEPATCH_API_KEY_HEADER || "X-API-KEY"; 
   

        if (!apiBase || !apiKey) {
            return NextResponse.json(
                { success: false, message: "Missing API configuration." },
                { status: 500 }
            );
        }

        const message = `
                New Career Inquiry

                First Name: ${firstName}
                Last Name: ${lastName}
                Phone: ${phone}
                Email: ${email}
        `.trim();

        const response = await fetch(`${apiBase}/sms/SendCernaHomeCareEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [apiKeyHeader]: apiKey,
            },
            body: JSON.stringify({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Phone: phone,
                Subject: "Career Inquiry",
                Message: `
                New Career Inquiry

                First Name: ${firstName}
                Last Name: ${lastName}
                Phone: ${phone}
                Email: ${email}
        `.trim(),
                Purpose: "jobs",
            }),
        });

        const responseText = await response.text();
      
        if (!response.ok) {
            console.error("Career email failed:", response.status, responseText);
            return NextResponse.json(
                {
                    success: false,
                    message: "Email failed to send.",
                    details: responseText,
                },
                { status: 502 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Career apply route error:", error);

        return NextResponse.json(
            { success: false, message: "Unexpected error." },
            { status: 500 }
        );
    }
}