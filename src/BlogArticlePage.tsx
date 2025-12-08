import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import { useLanguage } from "./context/LanguageContext";
import { supabase } from "./lib/supabaseClient";
import { buildMeta, breadcrumbSchema, getSEOConfig } from "../lib/seo";

type BlogPostDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  language: "fi" | "en";
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  author_name?: string | null;
  created_by?: string | null;
};

const formatDate = (date: string | null, language: "fi" | "en") => {
  if (!date) {
    return "";
  }
  try {
    return new Intl.DateTimeFormat(language === "fi" ? "fi-FI" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
};

const estimateReadingTime = (content: string | null) => {
  if (!content) {
    return 0;
  }
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pagePath = useMemo(() => {
    if (!slug) {
      return language === "fi" ? "/fi/uutiset" : "/en/news";
    }
    return language === "fi" ? `/fi/uutiset/${slug}` : `/en/news/${slug}`;
  }, [language, slug]);

  useEffect(() => {
    if (!slug) {
      return;
    }

    let ignore = false;

    const loadPost = async () => {
      if (!supabase) {
        setError(
          language === "fi"
            ? "Tietokantayhteys ei ole käytettävissä."
            : "Database connection is not available."
        );
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("blog_posts")
        .select(
          "id,title,slug,excerpt,content,cover_image_url,language,status,published_at,created_at,updated_at,author_name,created_by"
        )
        .eq("slug", slug)
        .eq("language", language)
        .maybeSingle();

      if (ignore) {
        return;
      }

      if (fetchError || !data) {
        console.error("[BlogArticlePage] Failed to load post", fetchError);
        setError(
          language === "fi"
            ? "Artikkelia ei löytynyt tai sitä ei voida näyttää."
            : "We could not find the article you were looking for."
        );
        setPost(null);
        setLoading(false);
        return;
      }

      setPost(data);
      setLoading(false);

      const { data: related, error: relatedError } = await supabase
        .from("blog_posts")
        .select("id,title,slug,excerpt,cover_image_url,language,published_at,created_at,status,updated_at,content")
        .eq("language", language)
        .eq("status", "published")
        .neq("id", data.id)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(3);

      if (!ignore) {
        if (relatedError) {
          console.error("[BlogArticlePage] Failed to load related posts", relatedError);
          setRelatedPosts([]);
        } else {
          setRelatedPosts((related ?? []) as BlogPostDetail[]);
        }
      }
    };

    loadPost();

    return () => {
      ignore = true;
    };
  }, [language, slug]);

  const meta = buildMeta({
    title: post?.title
      ? `${post.title} | Mitrox News`
      : "News – Mitrox",
    description:
      post?.excerpt ??
      (language === "fi"
        ? "Mitroxin asiantuntijoiden näkemyksiä teknologiasta, verkkosivuista ja tekoälystä."
        : "Mitrox insights on technology, websites, and AI."),
    path: pagePath,
    image: post?.cover_image_url ?? undefined,
    language,
  });

  const breadcrumbs = [
    {
      name: language === "fi" ? "Etusivu" : "Home",
      href: "/",
    },
    {
      name: language === "fi" ? "Uutiset" : "News",
      href: language === "fi" ? "/fi/uutiset" : "/en/news",
    },
    ...(post
      ? [
          {
            name: post.title,
            href: pagePath,
          },
        ]
      : []),
  ];

  const seoConfig = getSEOConfig(language);
  const publishedDate = formatDate(post?.published_at ?? post?.created_at ?? null, language);
  const readingTime = estimateReadingTime(post?.content ?? null);

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        url={meta.url}
        image={meta.image}
        noIndex={false}
        language={language}
      />
      <SEOEnhanced
        meta={{
          title: meta.title,
          description: meta.description,
          url: meta.url,
          image: meta.image,
          keywords: meta.keywords,
          locale: meta.locale,
        }}
        schemas={[
          breadcrumbSchema(breadcrumbs, language),
          post && {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt ?? meta.description,
            "image": post.cover_image_url ?? seoConfig.defaultImage,
            "inLanguage": language === "fi" ? "fi-FI" : "en-US",
            "datePublished": post.published_at ?? post.created_at,
            "dateModified": post.updated_at ?? post.published_at ?? post.created_at,
            "author": {
              "@type": "Person",
              "name": post.author_name ?? "Mitrox Team",
            },
            "publisher": {
              "@type": "Organization",
              "name": seoConfig.brand.name,
              "logo": {
                "@type": "ImageObject",
                "url": seoConfig.brand.logo,
              },
            },
            "mainEntityOfPage": meta.url,
          },
        ].filter(Boolean)}
        lang={language}
      />
      <Header />

      <main className="pt-28 md:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link
              to={language === "fi" ? "/fi/uutiset" : "/en/news"}
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition"
            >
              <span aria-hidden>←</span>
              {language === "fi" ? "Takaisin uutisiin" : "Back to news"}
            </Link>
          </div>

          {loading && (
            <div className="space-y-6">
              <div className="h-8 w-1/2 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-1/3 rounded bg-white/10 animate-pulse" />
              <div className="h-64 w-full rounded-3xl bg-white/10 animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-4/6 rounded bg-white/10 animate-pulse" />
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-10 text-center">
              <h1 className="text-3xl font-light text-red-100">
                {language === "fi" ? "Artikkelia ei löytynyt" : "Article not found"}
              </h1>
              <p className="mt-4 text-white/70">{error}</p>
              <div className="mt-6">
                <Link
                  to={language === "fi" ? "/fi/uutiset" : "/en/news"}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20 transition"
                >
                  {language === "fi" ? "Palaa uutisiin" : "Return to news"}
                </Link>
              </div>
            </div>
          )}

          {!loading && !error && post && (
            <article className="space-y-10">
              <header>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Mitrox News
                </p>
                <h1 className="mt-4 text-4xl md:text-5xl font-light leading-tight">{post.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/60">
                  {publishedDate && <span>{publishedDate}</span>}
                  {readingTime > 0 && (
                    <>
                      <span aria-hidden>•</span>
                      <span>
                        {language === "fi"
                          ? `${readingTime} min lukuaika`
                          : `${readingTime} min read`}
                      </span>
                    </>
                  )}
                  {post.author_name && (
                    <>
                      <span aria-hidden>•</span>
                      <span className="font-medium">{post.author_name}</span>
                    </>
                  )}
                </div>
              </header>

              {post.cover_image_url && (
                <div className="overflow-hidden rounded-3xl border border-white/10">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full object-cover max-h-[480px]"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="space-y-6 text-lg leading-relaxed text-white/80 prose prose-invert prose-lg max-w-none">
                {post.excerpt && (
                  <blockquote className="border-l-4 border-white/20 pl-6 italic text-white/70 not-prose">
                    {post.excerpt}
                  </blockquote>
                )}
                {post.content && (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Custom styling for markdown elements
                      p: ({ children }) => <p className="text-white/70 mb-4">{children}</p>,
                      h1: ({ children }) => <h1 className="text-3xl font-light text-white mt-8 mb-4">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-2xl font-light text-white mt-6 mb-3">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-light text-white mt-4 mb-2">{children}</h3>,
                      ul: ({ children }) => <ul className="list-disc list-inside text-white/70 mb-4 space-y-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside text-white/70 mb-4 space-y-2">{children}</ol>,
                      li: ({ children }) => <li className="text-white/70">{children}</li>,
                      a: ({ href, children }) => (
                        <a href={href} className="text-blue-300 hover:text-blue-200 underline" target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                      code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                        ) : (
                          <code className="block bg-black/40 text-white/90 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-white/10">
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children }) => (
                        <pre className="bg-black/40 text-white/90 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-white/10 mb-4">
                          {children}
                        </pre>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-white/20 pl-6 italic text-white/70 my-4">
                          {children}
                        </blockquote>
                      ),
                      strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                      em: ({ children }) => <em className="italic text-white/80">{children}</em>,
                      hr: () => <hr className="border-white/20 my-6" />,
                      img: ({ src, alt }) => (
                        <img src={src} alt={alt} className="rounded-lg my-4 max-w-full h-auto border border-white/10" />
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                )}
              </div>
            </article>
          )}
        </div>

        {!loading && !error && relatedPosts.length > 0 && (
          <section className="max-w-6xl mx-auto mt-16">
            <h2 className="text-2xl font-light text-white/90">
              {language === "fi" ? "Lisää luettavaa" : "Keep reading"}
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => {
                const relatedDate = formatDate(
                  related.published_at ?? related.created_at ?? null,
                  language
                );

                return (
                  <Link
                    key={related.id}
                    to={language === "fi" ? `/fi/uutiset/${related.slug}` : `/en/news/${related.slug}`}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                      {relatedDate}
                    </p>
                    <h3 className="mt-3 text-xl font-light text-white group-hover:text-white/90 transition">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="mt-3 text-sm text-white/70 line-clamp-3">{related.excerpt}</p>
                    )}
                    <span className="mt-6 inline-flex items-center gap-1 text-sm text-blue-300">
                      {language === "fi" ? "Lue artikkeli" : "Read article"}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

