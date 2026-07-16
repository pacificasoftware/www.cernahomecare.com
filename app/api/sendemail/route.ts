import { NextResponse } from "next/server";

const DEFAULT_LOCATION_SLUG = "orange-county";

type FranchiseeResponse = {
franchiseeId?: number;
FranchiseeId?: number;
slug?: string | null;
name?: string | null;
};

type BackendResponse = {
success?: boolean;
message?: string;
reason?: string;
};

function clean(value: unknown) {
return String(value ?? "").trim();
}

function isValidEmail(email: string) {
return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
}

function parseFranchiseeId(value: unknown): number | null {
if (
value === null ||
value === undefined ||
value === ""
) {
return null;
}

```
const parsed = Number(value);

return Number.isInteger(parsed) && parsed > 0
    ? parsed
    : null;
```

}

function getCernaApiBaseUrl() {
return (
process.env.CERNA_API_URL ||
process.env.API_BASE_URL ||
process.env.NEXT_PUBLIC_API_BASE_URL ||
"https://api.cernahomecare.com"
).replace(//$/, "");
}

async function getFranchiseeIdBySlug(
slug: string
): Promise<number | null> {
const url =
`${getCernaApiBaseUrl()}` +
`/api/public/franchisees/${encodeURIComponent(slug)}`;

```
try {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
    });

    const responseText = await response.text();

    if (!response.ok) {
        console.error("Location lookup failed:", {
            url,
            status: response.status,
            responseText,
        });

        return null;
    }

    if (!responseText.trim()) {
        console.error(
            "Location lookup returned an empty response:",
            url
        );

        return null;
    }

    const location = JSON.parse(
        responseText
    ) as FranchiseeResponse;

    return parseFranchiseeId(
        location.franchiseeId ??
            location.FranchiseeId
    );
} catch (error) {
    console.error(
        "Location lookup threw an exception:",
        error
    );

    return null;
}
```

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
            {
                success: false,
                message: "Spam detected.",
            },
            {
                status: 400,
            }
        );
    }

    const purpose =
        clean(body.purpose).toLowerCase() ||
        "contact";

    const firstName = clean(body.firstName);
    const lastName =
        clean(body.lastName) || "N/A";
    const phone = clean(body.phone);
    const email = clean(body.email);
    const zipCode =
        clean(body.zipCode) || "Not provided";

    if (
        !firstName ||
        !lastName ||
        !phone ||
        !email
    ) {
        return NextResponse.json(
            {
                success: false,
                message:
                    "Missing required fields.",
            },
            {
                status: 400,
            }
        );
    }

    if (!isValidEmail(email)) {
        return NextResponse.json(
            {
                success: false,
                message:
                    "Please enter a valid email address.",
            },
            {
                status: 400,
            }
        );
    }

    const isCareerInquiry =
        purpose === "jobs" ||
        purpose === "job_apply";

    if (
        isCareerInquiry &&
        !/^\d{5}$/.test(zipCode)
    ) {
        return NextResponse.json(
            {
                success: false,
                message:
                    "Please enter a valid 5-digit ZIP code.",
            },
            {
                status: 400,
            }
        );
    }

    /*
     * Localized forms should send franchiseeId.
     *
     * Forms on the default website may omit it.
     * In that case, resolve the orange-county
     * location from the Cerna API.
     */
    let franchiseeId =
        parseFranchiseeId(body.franchiseeId);

    let resolvedLocationSlug =
        clean(body.locationSlug);

    if (!franchiseeId) {
        resolvedLocationSlug =
            resolvedLocationSlug ||
            DEFAULT_LOCATION_SLUG;

        franchiseeId =
            await getFranchiseeIdBySlug(
                resolvedLocationSlug
            );
    }

    if (!franchiseeId) {
        return NextResponse.json(
            {
                success: false,
                reason: "location_lookup_failed",
                message:
                    "We could not identify the selected Cerna Home Care location. Please try again later or call us directly.",
            },
            {
                status: 502,
            }
        );
    }

    const apiKey =
        process.env.SAFEPATCH_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            {
                success: false,
                reason:
                    "missing_api_configuration",
                message:
                    "Missing API configuration.",
            },
            {
                status: 500,
            }
        );
    }

    const subject = isCareerInquiry
        ? "Career Inquiry"
        : clean(body.subject) ||
          "Cerna Home Care Contact Inquiry";

    const submittedMessage =
        clean(body.message) ||
        "Contact form inquiry";

    const inquiryType =
        clean(body.inquiryType) ||
        "General Contact";

    const message = isCareerInquiry
        ? ` 
New Career Inquiry

First Name: ${firstName}
Last Name: ${lastName}
Phone: ${phone}
Email: ${email}
Zip Code: ${zipCode}
Location ID: ${franchiseeId}
Location Slug: ${
resolvedLocationSlug ||
"Resolved from supplied location ID"
}

Message:
${submittedMessage}
`.trim()
            : `
New Contact Inquiry

First Name: ${firstName}
Last Name: ${lastName}
Phone: ${phone}
Email: ${email}
Zip Code: ${zipCode}
Location ID: ${franchiseeId}
Location Slug: ${
resolvedLocationSlug ||
"Resolved from supplied location ID"
}

Inquiry Type: ${inquiryType}

Message:
${submittedMessage}
`.trim(); 
    const backendUrl =
        "https://api.mysafepatch.com" +
        "/api/sms/SendCernaHomeCareEmail";

    const payload = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        ZipCode: zipCode,
        Subject: subject,
        Message: message,
        Purpose: purpose,
        FranchiseeId: franchiseeId,
    };

    console.log(
        "Sending SafePatch email payload:",
        payload
    );

    const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-API-KEY": apiKey,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
    });

    const responseText =
        await response.text();

    let backendJson: BackendResponse | null =
        null;

    try {
        backendJson = responseText
            ? (JSON.parse(
                  responseText
              ) as BackendResponse)
            : null;
    } catch {
        backendJson = null;
    }

    if (!response.ok) {
        console.error(
            "SafePatch email failed:",
            {
                url: backendUrl,
                status: response.status,
                responseText,
                backendJson,
                franchiseeId,
                purpose,
            }
        );

        const backendMessage =
            backendJson?.message ||
            backendJson?.reason ||
            responseText ||
            "Email failed to send.";

        return NextResponse.json(
            {
                success: false,
                message: backendMessage,
                reason:
                    backendJson?.reason ||
                    "backend_failed",
                backendStatus:
                    response.status,
            },
            {
                status:
                    response.status >= 400 &&
                    response.status < 500
                        ? response.status
                        : 502,
            }
        );
    }

    return NextResponse.json({
        success: true,
        message: "Email sent successfully.",
        location: {
            franchiseeId,
            slug:
                resolvedLocationSlug ||
                null,
        },
        upstreamResponse:
            backendJson || responseText,
    });
} catch (error: unknown) {
    console.error(
        "Send email route error:",
        error
    );

    return NextResponse.json(
        {
            success: false,
            reason: "unexpected_error",
            message:
                error instanceof Error
                    ? error.message
                    : "Unexpected error.",
        },
        {
            status: 500,
        }
    );
} 
}
