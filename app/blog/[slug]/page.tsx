import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogPosts";

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = blogPosts.find((item) => item.slug === slug);

    if (!post) {
        return {
            title: "Blog Post Not Found",
        };
    }

    return {
        title: post.seoTitle || `${post.title} | Cerna Blog`,
        description: post.seoDescription || post.excerpt,
    };
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = blogPosts.find((item) => item.slug === slug);

    if (!post) {
        notFound();
    }

    const imageSrc =
        post.image && post.image.startsWith("/")
            ? post.image
            : "/assets/blog/default.webp";

    return (
        <main className="bg-white">
            <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
                <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                    >
                        ← Back to Blog
                    </Link>

                    <div className="mt-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                            {post.categories.join(" • ")}
                        </p>

                        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                            {post.title}
                        </h1>

                        <p className="mt-4 text-base text-slate-500">
                            By <span className="font-medium text-slate-700">{post.author}</span>
                            <span className="mx-2 text-slate-300">|</span>
                            {post.date}
                        </p>
                    </div>
                </div>
            </section>

            <article className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
                {post.image && (
                    <div className="events-card-image-wrap">
                        <Image
                            src={imageSrc}
                            alt={post.title}
                            width={420}
                            height={260}
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="mx-auto max-w-3xl blog-content">
                    <div
                        className="
                        prose prose-slate prose-lg max-w-none
                        prose-headings:mt-10
                        prose-headings:font-bold
                        prose-headings:tracking-tight
                        prose-headings:text-[#004469]
                        prose-h2:text-2xl
                        prose-h2:sm:text-3xl
                        prose-p:mt-5
                        prose-p:text-lg
                        prose-p:leading-8
                        prose-p:text-slate-700
                        prose-ul:mt-5
                        prose-ul:list-disc
                        prose-ul:pl-6
                        prose-ul:space-y-3
                        prose-li:text-slate-700
                        prose-strong:text-slate-900
                        prose-a:text-blue-700
                        prose-a:no-underline
                        hover:prose-a:text-blue-800
                    "
                        dangerouslySetInnerHTML={{ __html: post.html.replace(/\\n/g, "") }}
                    />
                </div>

                <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-blue-100 bg-blue-50 px-6 py-8 sm:px-8">
                    <h3 className="text-2xl font-bold text-slate-900">
                        Ready to learn more?
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-700">
                        Contact Cerna Home Care to learn how personalized support can help
                        your family move forward with confidence.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/contact"
                            className="inline-flex items-center rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}