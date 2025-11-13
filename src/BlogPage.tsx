import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import { buildMeta, breadcrumbSchema, getSEOConfig } from "../lib/seo";
import { useLanguage } from "./context/LanguageContext";
import { supabase } from "./lib/supabaseClient";
import { getFullLocalizedPath } from "./utils/routeMapping";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  language: "fi" | "en";
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
};

const formatDate = (date: string | null, language: "fi" | "en") => {
  if (!date) {
    return "";
  }
  try {
    const d = new Date(date);
    const months = language === "fi" 
      ? ["TAMMIKUU", "HELMIKUU", "MAALISKUU", "HUHTIKUU", "TOUKOKUU", "KESÄKUU", "HEINÄKUU", "ELOKUU", "SYYSKUU", "LOKAKUU", "MARRASKUU", "JOULUKUU"]
      : ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`.toUpperCase();
  } catch {
    return date;
  }
};

const SKELETON_ITEMS = Array.from({ length: 3 }, (_, index) => index);

export default function BlogPage() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  const pagePath = useMemo(() => getFullLocalizedPath("blog", language), [language]);
  const seoConfig = getSEOConfig(language);
  const breadcrumbs = useMemo(
    () => [
      {
        name: language === "fi" ? "Etusivu" : "Home",
        href: "/",
      },
      {
        name: language === "fi" ? "Blogi" : "Blog",
        href: pagePath,
      },
    ],
    [language, pagePath]
  );

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("blog_posts")
        .select(
          "id,title,slug,excerpt,cover_image_url,language,status,published_at,created_at"
        )
        .eq("status", "published")
        .eq("language", language)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (ignore) {
        return;
      }

      if (fetchError) {
        console.error("[BlogPage] Failed to fetch posts", fetchError);
        setError(
          language === "fi"
            ? "Blogikirjoitusten latauksessa tapahtui virhe. Yritä uudelleen myöhemmin."
            : "We could not load the blog posts right now. Please try again later."
        );
        setPosts([]);
      } else {
        setPosts(data ?? []);
      }

      setLoading(false);
    };

    load();

    return () => {
      ignore = true;
    };
  }, [language, refreshToken]);

  const meta = buildMeta({
    title:
      language === "fi"
        ? "Blogi – Mitrox"
        : "Blog – Mitrox",
    description:
      language === "fi"
        ? "Lue Mitroxin näkemyksiä teknologiasta, verkkosivuista ja tekoälyratkaisuista."
        : "Read Mitrox insights on technology, websites, and AI solutions.",
    path: pagePath,
    language,
  });

  const introTitle = language === "fi" ? "Mitrox Blogi" : "Mitrox Blog";
  const introDescription =
    language === "fi"
      ? "Oppaat, vinkit ja ajatukset teknologiasta, tekoälystä ja kasvusta. Kirjoitettu Mitroxin asiantuntijoiden toimesta."
      : "Guides, insights, and opinions on technology, AI, and growth from the Mitrox team.";

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
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": introTitle,
            "description": introDescription,
            "inLanguage": language === "fi" ? "fi-FI" : "en-US",
            "publisher": {
              "@type": "Organization",
              "name": seoConfig.brand.name,
              "url": seoConfig.brand.url,
              "logo": seoConfig.brand.logo,
            },
          },
        ]}
        lang={language}
      />
      <Header />

      <main className="pt-28 md:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <section className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50 mb-3">
            {language === "fi" ? "Mitrox Insights" : "Mitrox Insights"}
          </p>
          <h1 className="text-4xl md:text-5xl font-light">{introTitle}</h1>
          <p className="mt-4 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            {introDescription}
          </p>
        </section>

        <section className="max-w-6xl mx-auto mt-16">
          {loading && (
            <div className="grid gap-8 md:grid-cols-2">
              {SKELETON_ITEMS.map((item) => (
                <div
                  key={`skeleton-${item}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 animate-pulse"
                >
                  <div className="h-48 rounded-xl bg-white/10" />
                  <div className="mt-6 space-y-3">
                    <div className="h-5 rounded bg-white/10" />
                    <div className="h-5 rounded bg-white/10 w-2/3" />
                    <div className="h-4 rounded bg-white/5 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-left">
              <p className="text-red-200 font-medium">{error}</p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                onClick={() => {
                  setRefreshToken((prev) => prev + 1);
                }}
              >
                {language === "fi" ? "Yritä uudelleen" : "Try again"}
              </button>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <h2 className="text-2xl font-light">
                {language === "fi" ? "Ei julkaistuja artikkeleita vielä" : "No published articles yet"}
              </h2>
              <p className="mt-3 text-white/60">
                {language === "fi"
                  ? "Palaathan pian takaisin. Julkaisemme uusia sisältöjä säännöllisesti."
                  : "Check back soon. We publish new content regularly."}
              </p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const publishedDate = formatDate(post.published_at ?? post.created_at, language);
                const postPath =
                  language === "fi"
                    ? `/fi/blogi/${post.slug}`
                    : `/en/blog/${post.slug}`;

                return (
                  <Link
                    to={postPath}
                    key={post.id}
                    className="group flex flex-col bg-black"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/10" />
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col flex-1 space-y-4 pt-4">
                      {/* Main Heading */}
                      <h2 className="text-xl font-light text-white leading-tight group-hover:text-white/80 transition">
                        {post.title}
                      </h2>

                      {/* Description */}
                      {post.excerpt && (
                        <p className="text-sm text-white/70 leading-relaxed line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Date and Read Button */}
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-xs uppercase tracking-wider text-white/50">
                          {publishedDate}
                        </p>
                        <div className="border border-white bg-black px-4 py-2 text-white text-xs font-medium uppercase tracking-wider transition group-hover:bg-white/10 rounded-full">
                          {language === "fi" ? "LUE" : "READ"}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

