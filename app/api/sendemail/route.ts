import https from "node:https";
import { NextResponse } from "next/server";

const DEFAULT_LOCATION_SLUG = "orange-county";

type BackendResponse = {
    success?: boolean;
    message?: string;
    reason?: string;
};

type HttpResponse = {
    status: number;
    body: string;
};

function clean(value: unknown): string {
    return String(value ?? "").trim();
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parselocationId(
    value: unknown
): number | null {
    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return null;
    }

    const parsed = Number(value);

    return Number.isInteger(parsed) && parsed > 0
        ? parsed
        : null;
}

function normalizeSlug(value: unknown): string {
    return clean(value)
        .toLowerCase()
        .replace(/^\/+|\/+$/g, "");
}

function getCernaApiBaseUrl(): string {
    return (
        process.env.CERNA_API_URL ||
        "https://api.cernahomecare.com"
    ).replace(/\/$/, "");
}

function postJson(
    url: string,
    apiKey: string,
    payload: unknown
): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
        const requestBody = JSON.stringify(payload);
        const parsedUrl = new URL(url);

        const request = https.request(
            {
                protocol: parsedUrl.protocol,
                hostname: parsedUrl.hostname,
                port: parsedUrl.port
                    ? Number(parsedUrl.port)
                    : 443,
                path:
                    parsedUrl.pathname +
                    parsedUrl.search,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-API-KEY": apiKey,
                    "Content-Length":
                        Buffer.byteLength(requestBody),
                },
                timeout: 30000,
            },
            (response) => {
                const chunks: Buffer[] = [];

                response.on("data", (chunk) => {
                    chunks.push(
                        Buffer.isBuffer(chunk)
                            ? chunk
                            : Buffer.from(chunk)
                    );
                });

                response.on("end", () => {
                    resolve({
                        status:
                            response.statusCode ?? 500,
                        body: Buffer.concat(chunks)
                            .toString("utf8"),
                    });
                });
            }
        );

        request.on("timeout", () => {
            request.destroy(
                new Error(
                    "The Cerna Home Care API request timed out."
                )
            );
        });

        request.on("error", reject);

        request.write(requestBody);
        request.end();
    });
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
                    reason: "spam_detected",
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

        const firstName =
            clean(body.firstName);

        const lastName =
            clean(body.lastName) || "N/A";

        const phone =
            clean(body.phone);

        const email =
            clean(body.email);

        const zipCode =
            clean(body.zipCode) ||
            "Not provided";

        if (
            !firstName ||
            !lastName ||
            !phone ||
            !email
        ) {
            return NextResponse.json(
                {
                    success: false,
                    reason: "missing_fields",
                    message:
                        "Please complete all required fields.",
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
                    reason: "d_email",
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
                    reason: "invalid_zip_code",
                    message:
                        "Please enter a valid 5-digit ZIP code.",
                },
                {
                    status: 400,
                }
            );
        }

        const locationId =
            parselocationId(
                body.locationId
            );

        let locationSlug =
            normalizeSlug(
                body.locationSlug
            );

        if (
            !locationId &&
            !locationSlug
        ) {
            locationSlug =
                DEFAULT_LOCATION_SLUG;
        }

        const subject =
            isCareerInquiry
                ? "Career Inquiry"
                : clean(body.subject) ||
                  "Cerna Home Care Contact Inquiry";

        const submittedMessage =
            clean(body.message) ||
            "Contact form inquiry";

        const inquiryType =
            clean(body.inquiryType) ||
            "General Contact";

        const locationIdForMessage =
            locationId?.toString() ||
            "Not supplied";

        const locationSlugForMessage =
            locationSlug ||
            "Not supplied";

        const message =
            isCareerInquiry
                ? [
                      "New Career Inquiry",
                      "",
                      `First Name: ${firstName}`,
                      `Last Name: ${lastName}`,
                      `Phone: ${phone}`,
                      `Email: ${email}`,
                      `Zip Code: ${zipCode}`,
                      `Location ID: ${locationIdForMessage}`,
                      `Location Slug: ${locationSlugForMessage}`,
                      "",
                      "Message:",
                      submittedMessage,
                  ].join("\n")
                : [
                      "New Contact Inquiry",
                      "",
                      `First Name: ${firstName}`,
                      `Last Name: ${lastName}`,
                      `Phone: ${phone}`,
                      `Email: ${email}`,
                      `Zip Code: ${zipCode}`,
                      `Location ID: ${locationIdForMessage}`,
                      `Location Slug: ${locationSlugForMessage}`,
                      "",
                      `Inquiry Type: ${inquiryType}`,
                      "",
                      "Message:",
                      submittedMessage,
                  ].join("\n");

        const apiKey =
            process.env.CERNA_API_KEY;

        if (!apiKey) {
            console.error(
                "CERNA_API_KEY is not configured."
            );

            return NextResponse.json(
                {
                    success: false,
                    reason:
                        "missing_api_configuration",
                    message:
                        "The email service is not configured.",
                },
                {
                    status: 500,
                }
            );
        }

        const backendUrl =
            `${getCernaApiBaseUrl()}` +
            "/api/Comms/SendCernaHomeCareEmail";

        const payload = {
            firstName,
            lastName,
            email,
            phone,
            zipCode,
            subject,
            message,
            purpose,
            locationId,
            locationSlug:
                locationSlug || null,
        };

        console.log(
            "Sending Cerna Home Care email request:",
            {
                backendUrl,
                purpose,
                locationId,
                locationSlug,
            }
        );

        const apiResponse =
            await postJson(
                backendUrl,
                apiKey,
                payload
            );

        const responseText =
            apiResponse.body;

        let backendJson:
            | BackendResponse
            | null = null;

        try {
            backendJson = responseText
                ? (JSON.parse(
                      responseText
                  ) as BackendResponse)
                : null;
        } catch {
            backendJson = null;
        }

        const responseOk =
            apiResponse.status >= 200 &&
            apiResponse.status < 300;

        if (!responseOk) {
            console.error(
                "Cerna Home Care email request failed:",
                {
                    url: backendUrl,
                    status:
                        apiResponse.status,
                    responseText,
                    locationId,
                    locationSlug,
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
                    reason:
                        backendJson?.reason ||
                        "backend_failed",
                    message:
                        backendMessage,
                    backendStatus:
                        apiResponse.status,
                },
                {
                    status:
                        apiResponse.status >= 400 &&
                        apiResponse.status < 500
                            ? apiResponse.status
                            : 502,
                }
            );
        }

        return NextResponse.json({
            success: true,
            message:
                "Email sent successfully.",
            location: {
                locationId,
                locationSlug,
            },
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
                        : "We could not send your message. Please try again.",
            },
            {
                status: 500,
            }
        );
    }
}