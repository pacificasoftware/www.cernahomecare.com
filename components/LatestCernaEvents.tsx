import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";

export default function LatestCernaEvents() {
    const latestPosts = blogPosts.slice(0, 8);

    return (
        <section className="events-carousel-section">
            <div className="events-carousel-container">
                <div className="events-carousel-heading">
                    <span className="events-carousel-line" />
                    <h2 className="events-carousel-title">Latest Cerna Events</h2>
                    <span className="events-carousel-line" />
                </div>

                <div className="events-carousel-track">
                    {latestPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="events-card"
                        >
                            <div className="events-card-image-wrap">
                                {post.image ? (
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={420}
                                        height={280}
                                        className="events-card-image"
                                    />
                                ) : (
                                    <div className="events-card-image-placeholder">
                                        No image available
                                    </div>
                                )}
                            </div>

                            <div className="events-card-body">
                                <h3 className="events-card-title">{post.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}