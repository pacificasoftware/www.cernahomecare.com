import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";

const POSTS_PER_PAGE = 6;

function getPageNumber(value?: string) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 1) return 1;
    return Math.floor(parsed);
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams?: Promise<{ page?: string }>;
}) {
    const params = (await searchParams) ?? {};
    const currentPage = getPageNumber(params.page);

    const totalPosts = blogPosts.length;
    const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
    const safePage = Math.max(1, Math.min(currentPage, totalPages));

    const startIndex = (safePage - 1) * POSTS_PER_PAGE;
    const paginatedPosts = blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    return (
        <main className="bg-gradient-to-b from-slate-50 to-white">
            <section className="relative overflow-hidden border-b border-slate-200/80">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_45%)]" />
                <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
                            Cerna Insights
                        </p>
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                            Cerna Blog
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Explore articles on home care, franchising, senior support, and
                            the opportunities shaping the future of compassionate care.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
                <div className="grid gap-8 lg:grid-cols-3">
                    {paginatedPosts.map((post) => (
                        <article
                            key={post.slug}
                            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <Link href={`/blog/${post.slug}`} className="block">
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                            No image available
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-blue-700">
                                        {post.categories.join(" • ")}
                                    </p>

                                    <h2 className="mt-3 line-clamp-3 text-2xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-blue-700">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>

                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        By <span className="font-medium text-slate-700">{post.author}</span>
                                        <span className="mx-2 text-slate-300">|</span>
                                        {post.date}
                                    </p>
                                </div>

                                <p className="flex-1 text-base leading-7 text-slate-600">
                                    {post.excerpt}
                                </p>

                                <div className="mt-6">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                                    >
                                        Read article
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <Pagination currentPage={safePage} totalPages={totalPages} />
            </section>
        </main>
    );
}

function Pagination({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 5;
    const currentGroup = Math.floor((currentPage - 1) / maxVisiblePages);
    const startPage = currentGroup * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    const prevGroupPage = Math.max(1, startPage - maxVisiblePages);
    const nextGroupPage = Math.min(totalPages, endPage + 1);

    const hasPrevGroup = startPage > 1;
    const hasNextGroup = endPage < totalPages;

    return (
        <nav
            aria-label="Blog pagination"
            className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
            {/* FIRST */}
            <Link
                href={currentPage > 1 ? `/blog?page=1` : "#"}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${currentPage > 1
                    ? "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                    : "pointer-events-none border border-slate-200 bg-slate-100 text-slate-400"
                    }`}
                aria-label="First page"
            >
                ⏮
            </Link>

            {/* PREVIOUS GROUP */}
            <Link
                href={hasPrevGroup ? `/blog?page=${prevGroupPage}` : "#"}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${hasPrevGroup
                    ? "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                    : "pointer-events-none border border-slate-200 bg-slate-100 text-slate-400"
                    }`}
                aria-label="Previous page group"
            >
                &lt;&lt;
            </Link>

            {pages.map((page) => {
                const isActive = page === currentPage;

                return (
                    <Link
                        key={page}
                        href={`/blog?page=${page}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${isActive
                            ? "bg-blue-700 text-white shadow-md"
                            : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                            }`}
                    >
                        {page}
                    </Link>
                );
            })}

            {/* NEXT GROUP */}
            <Link
                href={hasNextGroup ? `/blog?page=${nextGroupPage}` : "#"}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${hasNextGroup
                    ? "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                    : "pointer-events-none border border-slate-200 bg-slate-100 text-slate-400"
                    }`}
                aria-label="Next page group"
            >
                &gt;&gt;
            </Link>

            {/* LAST */}
            <Link
                href={currentPage < totalPages ? `/blog?page=${totalPages}` : "#"}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${currentPage < totalPages
                    ? "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
                    : "pointer-events-none border border-slate-200 bg-slate-100 text-slate-400"
                    }`}
                aria-label="Last page"
            >
                ⏭
            </Link>
        </nav>
    );
}