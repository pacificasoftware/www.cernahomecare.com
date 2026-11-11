import type { Metadata } from "next";
import Link from "next/link";

/**
 * Cerna Home Care blog article
 * Destination: src/app/blog/7-signs-parent-living-alone/page.tsx
 * Uses Tailwind CSS and the existing site's RootLayout (navbar/footer).
 */

export const metadata: Metadata = {
    title: "7 Signs It's Time to Get Help for a Parent Living Alone | Cerna Home Care",
    description:
        "Wondering if your aging parent is safe living alone? Learn seven signs to watch for, practical next steps, and how in-home care can help.",
    alternates: {
        canonical: "/blogs/7-signs-parent-living-alone",
    },
    openGraph: {
        title: "7 Signs It's Time to Get Help for a Parent Living Alone",
        description:
            "Seven signs your parent may need extra support at home—and what families can do next.",
        type: "article",
        url: "https://www.cernahomecare.com/blog/7-signs-parent-living-alone",
        siteName: "Cerna Home Care",
    },
};

const signs = [
    {
        title: "Changes in the Condition of the Home",
        paragraphs: [
            "Take a careful look around the next time you visit. Piles of unopened mail, overdue bills, dirty dishes, a cluttered kitchen, or laundry that's stacking up can all point to a parent who is finding daily tasks harder than they used to.",
            "A home that was always tidy and has recently become neglected is worth noticing.",
        ],
    },
    {
        title: "Weight Loss or an Empty Fridge",
        paragraphs: [
            "Check the refrigerator and pantry. Expired food, very little food, or a pile of takeout containers may mean your parent isn't shopping or cooking regularly. Unexplained weight loss, or clothes that suddenly look loose, can also be a sign they aren't eating enough or aren't eating well.",
            "Good nutrition matters at every age, and meal preparation is one of the most common reasons families look into in-home help.",
        ],
    },
    {
        title: "Missed Medications or Confusion About Pills",
        paragraphs: [
            "Take note of whether prescriptions are filled and being taken as directed. Pill bottles that are full when they should be empty, or doses that seem doubled up, can signal that managing medications has become overwhelming.",
            "Missed or incorrect doses can have serious consequences, so if you notice this, it's worth bringing up with your parent and their doctor.",
        ],
    },
    {
        title: "Falls, Near-Falls, or Trouble Getting Around",
        paragraphs: [
            "Look for bruises, new scrapes, or a parent who is holding onto furniture and walls while walking. Difficulty getting up from a chair, trouble with stairs, or a growing fear of falling are all worth paying attention to.",
            "Falls are one of the leading safety concerns for older adults, and they often lead to a loss of confidence and independence. A caregiver who can help with mobility, and a safer home setup, can make a real difference.",
        ],
    },
    {
        title: "Memory Lapses That Are Affecting Daily Life",
        paragraphs: [
            "Forgetting a name now and then is normal. But repeated questions, missed appointments, getting lost on familiar routes, or confusion about the date or time may be a sign that something more is going on.",
        ],
    },
    {
        title: "Declining Personal Care",
        paragraphs: [
            "A parent who once took pride in their appearance may start skipping showers, wearing the same clothes for days, or neglecting grooming. This can happen when bathing and dressing become physically difficult, or when they feel embarrassed to ask for help.",
            "Declining personal care is a sensitive topic, but it's also one where respectful, hands-on assistance can restore both safety and dignity.",
        ],
    },
    {
        title: "Withdrawal, Loneliness, or Changes in Mood",
        paragraphs: [
            "Pay attention to emotional health, too. A parent who has stopped seeing friends, dropped favorite activities, or seems unusually sad, irritable, or anxious may be struggling with isolation. Loneliness is a real health concern for seniors living alone.",
            "Regular companionship, whether that's conversation, a walk, or a shared meal, can have a meaningful effect on mood and overall well-being.",
        ],
    },
];

export default function SevenSignsParentLivingAlonePage() {
    const articleUrl =
        "https://www.cernahomecare.com/blog/7-signs-parent-living-alone";
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: "7 Signs It's Time to Get Help for a Parent Living Alone",
        description:
            "Seven signs that an older parent living alone may benefit from support, with practical next steps for families.",
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        author: { "@type": "Organization", name: "Cerna Home Care" },
        publisher: {
            "@type": "Organization",
            name: "Cerna Home Care",
            url: "https://www.cernahomecare.com",
        },
    };

    return (
        <main className="min-h-screen bg-white text-slate-800">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
            />

            <header className="bg-gradient-to-br from-[#f0f5e9] via-[#f9faf6] to-white py-14 sm:py-20">
                <div className="mx-auto max-w-4xl px-5 sm:px-8">
                    <nav aria-label="Breadcrumb" className="mb-7 text-sm text-slate-600">
                        <Link href="/" className="hover:text-[#315e1b] hover:underline">Home</Link>
                        <span aria-hidden="true" className="mx-2">/</span>
                        <Link href="/blog" className="hover:text-[#315e1b] hover:underline">Blog</Link>
                        <span aria-hidden="true" className="mx-2">/</span>
                        <span aria-current="page">7 Signs</span>
                    </nav>
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#315e1b]">
                        Senior Safety &amp; Family Care
                    </p>
                    <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[#285215] sm:text-5xl">
                        7 Signs It&apos;s Time to Get Help for a Parent Living Alone
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                        Recognizing when a little extra support could help your loved one stay safer and more comfortable at home.
                    </p>
                </div>
            </header>

            <article className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
                <div className="space-y-5 text-[17px] leading-8">
                    <p>
                        It&apos;s one of the hardest questions adult children face: <em>Is Mom or Dad still safe living on their own?</em>
                    </p>
                    <p>
                        Most older adults want to stay in their own homes for as long as possible, and many can do so safely with the right support. But the signs that a parent is struggling are often subtle. They tend to show up slowly, and a short phone call or a quick holiday visit can easily hide them.
                    </p>
                    <p>
                        If you&apos;re not sure what to look for, this list can help. None of these signs means your parent can&apos;t live at home. They&apos;re simply signals that a little extra support could make daily life safer and easier.
                    </p>
                </div>

                <div className="mt-10 space-y-9">
                    {signs.map((sign, index) => (
                        <section key={sign.title} aria-labelledby={`sign-${index + 1}`}>
                            <h2
                                id={`sign-${index + 1}`}
                                className="rounded-lg bg-[#f0f1ef] px-4 py-4 text-xl font-bold leading-snug text-[#315e1b] sm:text-2xl"
                            >
                                {index + 1}. {sign.title}
                            </h2>
                            <div className="mt-5 space-y-4 text-[17px] leading-8">
                                {sign.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                                {index === 4 && (
                                    <p>
                                        If you&apos;re seeing patterns like these, it&apos;s a good idea to talk with your parent&apos;s doctor. Families dealing with memory changes often find that consistent, compassionate <Link href="/services" className="font-medium text-[#315e1b] underline underline-offset-2 hover:text-[#23450f]">memory care at home</Link> helps their loved one feel calmer and more secure.
                                    </p>
                                )}
                            </div>
                        </section>
                    ))}
                </div>

                <section aria-labelledby="next-steps" className="mt-14">
                    <h2 id="next-steps" className="rounded-lg bg-[#f0f1ef] px-4 py-4 text-center text-2xl font-bold text-[#315e1b]">
                        What to Do If You&apos;re Noticing These Signs
                    </h2>
                    <p className="mt-5 text-[17px] leading-8">
                        Seeing one or more of these signs can feel overwhelming, but you don&apos;t have to solve everything at once. Here are some practical first steps:
                    </p>
                    <ol className="mt-5 list-decimal space-y-3 pl-6 text-[17px] leading-8 marker:font-bold marker:text-[#315e1b]">
                        <li><strong>Start a gentle conversation.</strong> Lead with love and concern, not criticism. Ask open-ended questions like &quot;How have things been feeling around the house lately?&quot;</li>
                        <li><strong>Talk to their doctor.</strong> A medical checkup can rule out treatable causes for changes in memory, mobility, or mood.</li>
                        <li><strong>Involve siblings and other family.</strong> Getting everyone on the same page early helps prevent conflict later.</li>
                        <li><strong>Explore options together.</strong> Many families start with just a few hours of in-home care a week and adjust over time. Your parent can stay in the home they love while getting the help they need.</li>
                        <li><strong>Consider a safety net.</strong> Even with support, there will be times your parent is alone. A discreet personal emergency response device, such as <a href="https://www.mysafepatch.com" target="_blank" rel="noopener noreferrer" className="text-[#315e1b] underline underline-offset-2">MySafePatch</a>, allows them to call for help quickly if they fall or feel unwell, without wearing a bulky pendant.</li>
                    </ol>
                </section>

                <section aria-labelledby="cerna-help" className="mt-14">
                    <h2 id="cerna-help" className="rounded-lg bg-[#f0f1ef] px-4 py-4 text-center text-2xl font-bold text-[#315e1b]">
                        How Cerna Homecare Can Help
                    </h2>
                    <div className="mt-5 space-y-5 text-[17px] leading-8">
                        <p>
                            At Cerna Homecare, we help seniors across <Link href="/locations" className="text-[#315e1b] underline underline-offset-2">Irvine and the surrounding communities</Link> stay safe, comfortable, and independent at home. Through our <Link href="/services" className="text-[#315e1b] underline underline-offset-2">companion care services</Link>, caregivers can assist with meal preparation, medication reminders, personal care, mobility support, companionship, and more, all tailored to your parent&apos;s needs and your family&apos;s schedule.
                        </p>
                        <p>If you&apos;re worried about a parent living alone, you don&apos;t have to figure it out by yourself.</p>
                    </div>
                    <div className="mt-7 rounded-xl border border-[#cfdcc4] bg-[#f5f8f2] p-6 sm:p-8">
                        <p className="text-lg font-semibold text-[#285215]">Talk with our care team.</p>
                        <p className="mt-2 text-slate-700">Request a free consultation or call us at (877) 577-6782 to talk with someone who understands what you&apos;re going through.</p>
                        <div className="mt-5 flex flex-wrap items-center gap-4">
                            <Link href="/contact-us" className="inline-flex rounded-lg bg-[#315e1b] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#23450f]">
                                Request a Free Consultation
                            </Link>
                            <a href="tel:+18775776782" className="font-semibold text-[#315e1b] underline underline-offset-2">(877) 577-6782</a>
                        </div>
                    </div>
                </section>

                <p className="mt-12 border-t border-slate-200 pt-6 text-sm italic leading-6 text-slate-500">
                    This article is for general informational purposes and isn&apos;t a substitute for professional medical advice. If you&apos;re concerned about a loved one&apos;s health, please speak with their healthcare provider.
                </p>
            </article>
        </main>
    );
}
