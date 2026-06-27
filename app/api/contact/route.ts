import { NextResponse } from "next/server";

function clean(value: unknown) {
    return String(value ?? "").trim();
}

function looksLikeSpam(value: unknown) {
    const v = clean(value);

    if (!v) return false;

    if (/^[A-Za-z]{18,}$/.test(v)) return true;
    if (/[a-z][A-Z][a-z][A-Z]/.test(v)) return true;

    return false;
}

function isPayrollInquiry(value: unknown) {
    const v = clean(value).toLowerCase();

    if (!v) return false;

    return /\b(payroll|pay roll|paycheck|pay check|paychecks|paystub|pay stub|wages|salary|direct deposit|timesheet|time sheet|hours worked|missing pay|late pay|paid|payment)\b/i.test(v);
}

function isValidZip(value: unknown) {
    const zip = clean(value);
    if (!zip) return true;

    return /^\d{5}(-\d{4})?$/.test(zip);
}

async function validateCityWithAI(city: string) {
    const openAiApiKey = process.env.OPENAI_API_KEY;

    if (!openAiApiKey || !city) {
        return { allowed: true, reason: "ai_city_skipped" };
    }

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0,
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: `
You are a city validation filter.

Determine whether the submitted value is a plausible real city, county, region, or market area.

Allow:
- Real city names
- Counties, such as Orange County
- Metro/market areas, such as South Bay
- City names with spaces, apostrophes, hyphens, or periods

Reject:
- Gibberish
- Random characters
- Keyboard smashing
- Fake-looking text
- Names, emails, phone numbers, or messages that are not locations

When in doubt, allow the value unless it is clearly fake.

Return ONLY valid JSON:
{
  "allowed": true or false,
  "reason": "allowed" | "invalid_city"
}
                    `.trim(),
                },
                {
                    role: "user",
                    content: `City: ${city}`,
                },
            ],
        }),
    });

    if (!aiRes.ok) {
        return { allowed: true, reason: "ai_city_check_failed" };
    }


    const data = await aiRes.json();
    const content = data?.choices?.[0]?.message?.content;

    try {
        return JSON.parse(content);
    } catch {
        return { allowed: true, reason: "ai_city_parse_failed" };
    }
}

async function validateInquiryWithAI({
    name,
    city,
    message,
}: {
    name: string;
    city: string;
    message: string;
}) {
    const openAiApiKey = process.env.OPENAI_API_KEY;

    if (!openAiApiKey) {
        console.log("OPENAI_API_KEY missing");
        return { allowed: true, reason: "ai_not_configured" };
    }

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0,
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: `
You are a spam and solicitation filter for a home care contact form.

Your job is to decide whether the submission is from a real person who may be interested in home care services, caregiving, consultation, support, or general information.

ALLOW messages that are short, plain, or general, as long as they are not spam or a vendor/sales pitch.

Examples that MUST be allowed:
- "Please send me some information."
- "I am interested in your services."
- "I would like more information."
- "Can someone contact me?"
- "Please call me."
- "I need care for my mom."
- "Looking for home care."
- "I am looking for a job."

Reject ONLY:
1. Gibberish or random characters
2. Keyboard smashing
3. Meaningless text
4. Sales solicitations
5. SEO offers
6. Marketing pitches
7. Recruiting/staffing/vendor offers
8. Lead generation offers
9. Web design or app development offers
10. AI-generated bulk spam

Do NOT reject a message just because it is short.
When in doubt, allow the message unless it is clearly spam or clearly a solicitation.

Return ONLY valid JSON:
{
  "allowed": true or false,
  "reason": "allowed" | "gibberish" | "sales_solicitation"
}
                    `.trim(),
                },
                {
                    role: "user",
                    content: `
Name: ${name}
City: ${city}
Message: ${message}
                    `.trim(),
                },
            ],
        }),
    });

    if (!aiRes.ok) {
        const errorText = await aiRes.text();
        console.log("AI validation failed:", aiRes.status, errorText);

        return { allowed: true, reason: "ai_request_failed" };
    }

    const data = await aiRes.json();
    const text = data?.choices?.[0]?.message?.content || "";

    console.log("AI RESPONSE:", text);

    try {
        return JSON.parse(text);
    } catch (err) {
        console.log("AI response parse failed:", err);
        return { allowed: true, reason: "ai_parse_failed" };
    }
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

        if (
            looksLikeSpam(body.firstName) ||
            looksLikeSpam(body.lastName) ||
            looksLikeSpam(body.name) ||
            looksLikeSpam(body.city) ||
            looksLikeSpam(body.zip) ||
            looksLikeSpam(body.bestTimeToContact)
        ) {
            return NextResponse.json(
                { success: false, message: "Spam detected." },
                { status: 400 }
            );
        }

        if (!isValidZip(body.zip)) {
            return NextResponse.json(
                { success: false, message: "Invalid zip code." },
                { status: 400 }
            );
        }

        const name =
            clean(body.name) ||
            `${clean(body.firstName)} ${clean(body.lastName)}`.trim();

        const city = clean(body.city);
        const message =
            clean(body.message) ||
            clean(body.remarks) ||
            clean(body.comments);

        if (city) {
            const cityCheck = await validateCityWithAI(city);

            if (!cityCheck.allowed) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Please enter a valid city.",
                        reason: cityCheck.reason,
                    },
                    { status: 400 }
                );
            }
        }

        const payrollText = [
            body.name,
            body.firstName,
            body.lastName,
            body.subject,
            body.message,
            body.remarks,
            body.comments,
            body.purpose,
        ].join(" ");

        if (isPayrollInquiry(payrollText)) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "For any paycheck related issues, please contact Cerna HQ and ask for the Payroll Dept.",
                    reason: "payroll_inquiry",
                },
                { status: 400 }
            );
        }

        if (message || name || city) {
            const aiCheck = await validateInquiryWithAI({
                name,
                city,
                message,
            });

            if (!aiCheck.allowed) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            aiCheck.reason === "sales_solicitation"
                                ? "This form is for home care inquiries only. Sales or vendor solicitations are not accepted."
                                : "Please enter a valid message.",
                        reason: aiCheck.reason,
                    },
                    { status: 400 }
                );
            }
        }

        const apiBaseUrl =
            process.env.SAFEPATCH_API_BASE_URL || "https://api.mysafepatch.com/api";

        const apiKey = process.env.API_KEY;
        const apiKeyHeader = process.env.SAFEPATCH_API_KEY_HEADER ?? "X-API-KEY";

        if (!apiKey) {
            return NextResponse.json(
                { success: false, message: "Missing SAFEPATCH_API_KEY on server." },
                { status: 500 }
            );
        }

        const dotnetUrl =
            process.env.DOTNET_API_SEND_CERNA_HOMECARE_EMAIL_URL ||
            `${apiBaseUrl.replace(/\/$/, "")}/sms/SendCernaHomeCareEmail`;

        const dotnetRes = await fetch(dotnetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                [apiKeyHeader]: apiKey,
            },
            body: JSON.stringify(body),
        });

        const rawText = await dotnetRes.text();

        if (!dotnetRes.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: rawText || "Failed to send email.",
                    upstreamStatus: dotnetRes.status,
                },
                { status: dotnetRes.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Email sent successfully.",
            upstreamResponse: rawText,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error?.message || "Server error while sending contact request.",
            },
            { status: 500 }
        );
    }
}