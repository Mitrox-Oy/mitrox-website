import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { LogOut, Plus, Save, ShieldCheck, ShieldOff, Loader2, Trash2, Edit, LayoutDashboard, FileText, BarChart3, Globe, TrendingUp, Users, User as UserIcon, Upload, Lock, Image as ImageIcon, X, Eye } from "lucide-react";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import { buildMeta } from "../lib/seo";
import { supabase } from "./lib/supabaseClient";

type BlogPostRecord = {
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
};

type DraftState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  language: "fi" | "en";
  status: "draft" | "published";
  authorName: string;
  publishedAt: string | null;
};

type MfaState = {
  factorId: string;
  challengeId?: string;
  ticket?: string;
};

const defaultDraft: DraftState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  language: "fi",
  status: "draft",
  authorName: "",
  publishedAt: null,
};

// Format date for preview (same as BlogPage)
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

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const hasAdminRole = (user: User | null) => {
  if (!user) return false;
  const appMetadata = (user.app_metadata ?? {}) as Record<string, unknown>;
  const role = (appMetadata.role as string | undefined)?.toLowerCase();
  const roles = (appMetadata.roles as string[] | undefined)?.map((val) => val.toLowerCase());
  if (role === "admin") return true;
  if (roles && roles.includes("admin")) return true;
  return false;
};

export default function AdminDashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [checkingRole, setCheckingRole] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInFlight, setLoginInFlight] = useState(false);
  const [mfaChallenge, setMfaChallenge] = useState<MfaState | null>(null);
  const [totpCode, setTotpCode] = useState("");
  const [mfaError, setMfaError] = useState<string | null>(null);

  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [draft, setDraft] = useState<DraftState>(defaultDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [hasCustomSlug, setHasCustomSlug] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"dashboard" | "blog" | "analytics" | "profile">("dashboard");
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  
  // Profile management state
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingBlogImage, setUploadingBlogImage] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
  const [changingPassword, setChangingPassword] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setAuthError("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
      setAuthLoading(false);
      return;
    }
    
    let ignore = false;
    const initialise = async () => {
      if (!supabase) {
        setAuthLoading(false);
        return;
      }
      setAuthLoading(true);
      const { data, error } = await supabase.auth.getSession();
      if (ignore) return;

      if (error) {
        console.error("[AdminDashboard] getSession failed", error);
        setAuthError("Authentication failed. Please sign in again.");
        setSession(null);
        setUser(null);
        setAuthLoading(false);
        return;
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setAuthError(null);
      } else {
        setSession(null);
        setUser(null);
      }
      setAuthLoading(false);
    };

    initialise();

    if (supabase) {
      const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (ignore) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);
      });

      return () => {
        ignore = true;
        subscription.subscription.unsubscribe();
      };
    }

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!session || !user) {
      return;
    }
    setCheckingRole(true);

    if (!hasAdminRole(user)) {
      setAuthError("Your account does not have admin privileges.");
      if (supabase) {
        supabase.auth.signOut().catch((signOutError) => {
          console.error("[AdminDashboard] failed to sign out non-admin", signOutError);
        });
      }
      setCheckingRole(false);
      return;
    }

    const loadPosts = async () => {
      if (!supabase) return;
      setLoadingPosts(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "id,title,slug,excerpt,content,cover_image_url,language,status,published_at,created_at,updated_at,author_name"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[AdminDashboard] failed to load posts", error);
        setFormError("Failed to load posts. Check Supabase connection.");
        setPosts([]);
      } else {
        setPosts(data ?? []);
      }
      setLoadingPosts(false);
    };

    loadPosts();
    setCheckingRole(false);
  }, [session, user]);

  // Load analytics data when analytics section is active
  useEffect(() => {
    if (activeSection === "analytics" && supabase && session && user && hasAdminRole(user)) {
      const loadAnalytics = async () => {
        if (!supabase) return;
        setLoadingAnalytics(true);
        const { data, error } = await supabase
          .from("traffic_analytics")
          .select("*")
          .order("timestamp", { ascending: false })
          .limit(1000); // Limit to recent 1000 events

        if (error) {
          console.error("[AdminDashboard] failed to load analytics", error);
          setAnalyticsData([]);
        } else {
          setAnalyticsData(data ?? []);
        }
        setLoadingAnalytics(false);
      };

      loadAnalytics();
    }
  }, [activeSection, session, user]);

  // Load user profile picture
  useEffect(() => {
    if (user && supabase) {
      const loadProfilePicture = async () => {
        if (!supabase) return;
        const { data } = await supabase.storage
          .from("profiles")
          .getPublicUrl(`${user.id}/avatar.jpg`);
        if (data?.publicUrl) {
          // Check if image exists by trying to fetch it
          try {
            const response = await fetch(data.publicUrl, { method: "HEAD" });
            if (response.ok) {
              setProfilePicture(data.publicUrl);
            }
          } catch {
            // Image doesn't exist yet
          }
        }
      };
      loadProfilePicture();
    }
  }, [user]);

  useEffect(() => {
    if (!hasCustomSlug) {
      setDraft((prev) => ({
        ...prev,
        slug: prev.title ? slugify(prev.title) : "",
      }));
    }
  }, [draft.title, hasCustomSlug]);

  const resetDraft = () => {
    setDraft(defaultDraft);
    setEditingId(null);
    setFormError(null);
    setFormSuccess(null);
    setHasCustomSlug(false);
  };

  const refreshPosts = async () => {
    if (!supabase) return;
    setLoadingPosts(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "id,title,slug,excerpt,content,cover_image_url,language,status,published_at,created_at,updated_at,author_name"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[AdminDashboard] failed to refresh posts", error);
      setFormError("Failed to refresh posts.");
      setPosts([]);
    } else {
      setPosts(data ?? []);
    }
    setLoadingPosts(false);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      setAuthError("Supabase is not configured.");
      return;
    }
    setAuthError(null);
    setLoginInFlight(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      console.error("[AdminDashboard] login failed", error);
      setAuthError(error.message || "Sign in failed. Check your credentials.");
      setLoginInFlight(false);
      return;
    }

    if (data.session) {
      setSession(data.session);
      setUser(data.session.user);
      setMfaChallenge(null);
      setTotpCode("");
      setAuthError(null);
      setLoginInFlight(false);
      return;
    }

    const mfa = (data as unknown as { mfa?: Record<string, unknown> }).mfa;
    if (mfa && mfa["type"] === "totp") {
      setMfaChallenge({
        factorId: (mfa["factorId"] as string | undefined) ?? "",
        challengeId: (mfa["challengeId"] as string | undefined) ?? undefined,
        ticket: (mfa["ticket"] as string | undefined) ?? undefined,
      });
      setAuthError("Multi-factor authentication required. Enter your TOTP code.");
    } else {
      setAuthError("Additional verification is required. Please complete MFA.");
    }
    setLoginInFlight(false);
  };

  const handleVerifyTotp = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      setMfaError("Supabase is not configured.");
      return;
    }
    if (!mfaChallenge || !mfaChallenge.challengeId) {
      setMfaError("No MFA challenge is active.");
      return;
    }

    setMfaError(null);
    setLoginInFlight(true);

    try {
      const { error } = await supabase.auth.mfa.verify({
        factorId: mfaChallenge.factorId,
        challengeId: mfaChallenge.challengeId,
        code: totpCode,
      });

      if (error) {
        console.error("[AdminDashboard] TOTP verification failed", error);
        setMfaError(error.message ?? "Invalid verification code.");
        setLoginInFlight(false);
        return;
      }

      // After successful MFA verification, the session is set via auth state change listener
      // But we can also check for it immediately
      if (!supabase) return;
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        setSession(sessionData.session);
        setUser(sessionData.session.user);
        setMfaChallenge(null);
        setTotpCode("");
        setAuthError(null);
      } else {
        // Session should be set by auth state change listener, but wait a moment
        setTimeout(() => {
          if (!supabase) return;
          supabase.auth.getSession().then(({ data: retrySession }) => {
            if (retrySession?.session) {
              setSession(retrySession.session);
              setUser(retrySession.session.user);
              setMfaChallenge(null);
              setTotpCode("");
              setAuthError(null);
            } else {
              setMfaError("Verification succeeded but session was not established. Please try signing in again.");
            }
          });
        }, 500);
      }
    } catch (verificationError) {
      console.error("[AdminDashboard] MFA verify error", verificationError);
      setMfaError("Verification failed. Try again.");
    } finally {
      setLoginInFlight(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setPosts([]);
    resetDraft();
  };

  const handleEditPost = (post: BlogPostRecord) => {
    setEditingId(post.id);
    setDraft({
      title: post.title ?? "",
      slug: post.slug ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      coverImageUrl: post.cover_image_url ?? "",
      language: post.language ?? "fi",
      status: post.status ?? "draft",
      authorName: post.author_name ?? "",
      publishedAt: post.published_at,
    });
    setHasCustomSlug(true);
    setFormSuccess(null);
    setFormError(null);
  };

  const handleStatusToggle = async (post: BlogPostRecord) => {
    if (!supabase) return;
    const nextStatus = post.status === "published" ? "draft" : "published";
    const payload = {
      status: nextStatus,
      published_at: nextStatus === "published" ? post.published_at ?? new Date().toISOString() : null,
    };

    const { error } = await supabase
      .from("blog_posts")
      .update(payload)
      .eq("id", post.id);

    if (error) {
      console.error("[AdminDashboard] failed to update status", error);
      setFormError("Failed to update post status.");
      return;
    }

    setFormSuccess(`Post ${nextStatus === "published" ? "published" : "moved to draft"} successfully.`);
    refreshPosts();
  };

  const handleDeleteCover = () => {
    setDraft((prev) => ({ ...prev, coverImageUrl: "" }));
  };

  const handleDeletePost = async (postId: string) => {
    if (!supabase) return;
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    setDeletingId(postId);
    setFormError(null);

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", postId);

    if (error) {
      console.error("[AdminDashboard] failed to delete post", error);
      setFormError("Failed to delete post.");
      setDeletingId(null);
      return;
    }

    setFormSuccess("Post deleted successfully.");
    setDeletingId(null);
    refreshPosts();
  };

  // Image upload functions
  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!supabase || !user) return;
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setProfileError("Please select an image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setProfileError("Image size must be less than 5MB.");
      return;
    }

    setUploadingImage(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profiles")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error("[AdminDashboard] failed to upload profile picture", uploadError);
        // Show more specific error message
        if (uploadError.message?.includes("Bucket not found") || uploadError.message?.includes("does not exist")) {
          setProfileError("Storage bucket 'profiles' not found. Please create it in Supabase Storage settings.");
        } else if (uploadError.message?.includes("new row violates row-level security")) {
          setProfileError("Permission denied. Please check your storage RLS policies in Supabase.");
        } else {
          setProfileError(`Failed to upload profile picture: ${uploadError.message || "Unknown error"}`);
        }
        setUploadingImage(false);
        return;
      }

      // Get public URL
      const { data } = supabase.storage.from("profiles").getPublicUrl(fileName);
      if (data?.publicUrl) {
        setProfilePicture(data.publicUrl);
        setProfileSuccess("Profile picture updated successfully.");
      }
    } catch (error: any) {
      console.error("[AdminDashboard] profile picture upload error", error);
      setProfileError(`Upload error: ${error?.message || "Unknown error"}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleBlogImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!supabase || !user) return;
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setFormError("Please select an image file.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setFormError("Image size must be less than 10MB.");
      return;
    }

    setUploadingBlogImage(true);
    setFormError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const timestamp = Date.now();
      const fileName = `blog/${user.id}/${timestamp}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("[AdminDashboard] failed to upload blog image", uploadError);
        // Show more specific error message
        if (uploadError.message?.includes("Bucket not found") || uploadError.message?.includes("does not exist")) {
          setFormError("Storage bucket 'blog-images' not found. Please create it in Supabase Storage settings.");
        } else if (uploadError.message?.includes("new row violates row-level security")) {
          setFormError("Permission denied. Please check your storage RLS policies in Supabase.");
        } else {
          setFormError(`Failed to upload image: ${uploadError.message || "Unknown error"}`);
        }
        setUploadingBlogImage(false);
        return;
      }

      // Get public URL
      const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
      if (data?.publicUrl) {
        setDraft((prev) => ({ ...prev, coverImageUrl: data.publicUrl }));
        setFormSuccess("Image uploaded successfully.");
      }
    } catch (error: any) {
      console.error("[AdminDashboard] blog image upload error", error);
      setFormError(`Upload error: ${error?.message || "Unknown error"}`);
    } finally {
      setUploadingBlogImage(false);
    }
  };

  const handlePasswordChange = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;

    if (passwordData.new !== passwordData.confirm) {
      setProfileError("New passwords do not match.");
      return;
    }

    if (passwordData.new.length < 8) {
      setProfileError("Password must be at least 8 characters long.");
      return;
    }

    setChangingPassword(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: passwordData.new,
      });

      if (error) {
        console.error("[AdminDashboard] failed to change password", error);
        setProfileError(error.message || "Failed to change password.");
        setChangingPassword(false);
        return;
      }

      setProfileSuccess("Password changed successfully.");
      setPasswordData({ current: "", new: "", confirm: "" });
    } catch (error) {
      console.error("[AdminDashboard] password change error", error);
      setProfileError("Failed to change password.");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSubmitPost = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) {
      setFormError("Supabase is not configured.");
      return;
    }
    setFormError(null);
    setFormSuccess(null);

    if (!draft.title.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (!draft.slug.trim()) {
      setFormError("Slug is required.");
      return;
    }
    if (!draft.content.trim()) {
      setFormError("Content cannot be empty.");
      return;
    }

    setSavingDraft(true);

    const payload = {
      title: draft.title.trim(),
      slug: draft.slug.trim(),
      excerpt: draft.excerpt.trim() || null,
      content: draft.content.trim(),
      cover_image_url: draft.coverImageUrl.trim() || null,
      language: draft.language,
      status: draft.status,
      author_name: draft.authorName.trim() || null,
      created_by: user?.id ?? null,
      published_at:
        draft.status === "published"
          ? draft.publishedAt ?? new Date().toISOString()
          : null,
    };

    let error: { message: string } | null = null;

    if (editingId) {
      const response = await supabase
        .from("blog_posts")
        .update(payload)
        .eq("id", editingId);
      error = response.error;
    } else {
      const response = await supabase.from("blog_posts").insert(payload);
      error = response.error;
    }

    if (error) {
      console.error("[AdminDashboard] failed to save post", error);
      setFormError(error.message ?? "Failed to save the post.");
      setSavingDraft(false);
      return;
    }

    setFormSuccess(editingId ? "Post updated successfully." : "Post created successfully.");
    setSavingDraft(false);
    resetDraft();
    refreshPosts();
  };

  const meta = useMemo(
    () =>
      buildMeta({
        title: "Admin Dashboard – Mitrox",
        description: "Secure administration dashboard to manage Mitrox content.",
        path: "/admin",
        noIndex: true,
        language: "fi",
      }),
    []
  );

  // Calculate dashboard stats
  const dashboardStats = useMemo(() => {
    const totalPosts = posts.length;
    const publishedPosts = posts.filter((p) => p.status === "published").length;
    const draftPosts = posts.filter((p) => p.status === "draft").length;
    const fiPosts = posts.filter((p) => p.language === "fi").length;
    const enPosts = posts.filter((p) => p.language === "en").length;
    const recentPosts = posts
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      fiPosts,
      enPosts,
      recentPosts,
    };
  }, [posts]);

  // Calculate analytics stats
  const analyticsStats = useMemo(() => {
    const totalVisits = analyticsData.length;
    const uniqueVisitors = new Set(analyticsData.map((a) => a.user_agent || a.path)).size;
    
    // Language breakdown
    const languageCounts = analyticsData.reduce((acc, a) => {
      const lang = a.language || 'unknown';
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Country breakdown
    const countryCounts = analyticsData.reduce((acc, a) => {
      const country = a.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Top countries
    const topCountries = Object.entries(countryCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([country, count]) => ({ country, count: count as number }));

    // Top pages
    const pageCounts = analyticsData.reduce((acc, a) => {
      const path = a.path || '/';
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPages = Object.entries(pageCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([path, count]) => ({ path, count: count as number }));

    // Recent visits (last 24 hours)
    const now = new Date();
    const last24Hours = analyticsData.filter((a) => {
      const visitTime = new Date(a.timestamp);
      return now.getTime() - visitTime.getTime() < 24 * 60 * 60 * 1000;
    }).length;

    return {
      totalVisits,
      uniqueVisitors,
      languageCounts,
      topCountries,
      topPages,
      last24Hours,
    };
  }, [analyticsData]);

  const unauthenticatedView = (
    <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur">
      <div className="flex items-center gap-3 text-white">
        <ShieldCheck className="h-6 w-6 text-emerald-300" />
        <h1 className="text-2xl font-light">Mitrox Admin</h1>
      </div>
      <p className="mt-2 text-sm text-white/60">
        Sign in with your verified Mitrox admin credentials. Multi-factor authentication is enforced.
      </p>
      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        <div>
          <label htmlFor="admin-email" className="block text-xs uppercase tracking-[0.3em] text-white/50">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="block text-xs uppercase tracking-[0.3em] text-white/50">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900/50"
          disabled={loginInFlight}
        >
          {loginInFlight ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in securely"
          )}
        </button>
      </form>
      {mfaChallenge && (
        <form onSubmit={handleVerifyTotp} className="mt-6 space-y-3">
          <div>
            <label htmlFor="totp-code" className="block text-xs uppercase tracking-[0.3em] text-white/50">
              TOTP code
            </label>
            <input
              id="totp-code"
              inputMode="numeric"
              pattern="\\d{6}"
              maxLength={6}
              required
              value={totpCode}
              onChange={(event) => setTotpCode(event.target.value)}
              className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-900/50"
            disabled={loginInFlight}
          >
            {loginInFlight ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying…
              </>
            ) : (
              "Verify & continue"
            )}
          </button>
        </form>
      )}
      {(authError || mfaError) && (
        <div className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          {authError || mfaError}
        </div>
      )}
      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-xs text-white/50">
        <p className="font-semibold uppercase tracking-[0.25em] text-white/60">Security checklist</p>
        <ul className="mt-3 space-y-2 list-disc pl-4">
          <li>Use a hardware key or authenticator app for MFA.</li>
          <li>Ensure the Supabase project enforces RLS and admin role policies.</li>
          <li>Rotate passwords regularly and never reuse them.</li>
        </ul>
      </div>
    </div>
  );

  // Dashboard view component
  const dashboardView = (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 uppercase tracking-[0.2em]">Total Posts</p>
              <p className="mt-2 text-3xl font-light text-white">{dashboardStats.totalPosts}</p>
            </div>
            <FileText className="h-8 w-8 text-white/40" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 uppercase tracking-[0.2em]">Published</p>
              <p className="mt-2 text-3xl font-light text-emerald-300">{dashboardStats.publishedPosts}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-emerald-300/40" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 uppercase tracking-[0.2em]">Drafts</p>
              <p className="mt-2 text-3xl font-light text-yellow-300">{dashboardStats.draftPosts}</p>
            </div>
            <FileText className="h-8 w-8 text-yellow-300/40" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 uppercase tracking-[0.2em]">Languages</p>
              <p className="mt-2 text-sm text-white/80">
                <span className="text-blue-300">{dashboardStats.fiPosts} FI</span>
                {" / "}
                <span className="text-purple-300">{dashboardStats.enPosts} EN</span>
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-white/40" />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-light text-white mb-4">Recent Posts</h2>
        {loadingPosts ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-white/60" />
          </div>
        ) : dashboardStats.recentPosts.length === 0 ? (
          <p className="text-white/60 text-center py-8">No posts yet. Create your first post in the Blog section.</p>
        ) : (
          <div className="space-y-3">
            {dashboardStats.recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-4 hover:bg-black/60 transition"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium truncate">{post.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        post.status === "published"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-white/10 text-white/60">
                      {post.language.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 mt-1">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    type="button"
                    onClick={() => {
                      handleEditPost(post);
                      setActiveSection("blog");
                    }}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-white/70 hover:text-white"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Analytics view component
  const analyticsView = (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 uppercase tracking-[0.2em]">Total Visits</p>
              <p className="mt-2 text-3xl font-light text-white">{analyticsStats.totalVisits}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-white/40" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 uppercase tracking-[0.2em]">Unique Visitors</p>
              <p className="mt-2 text-3xl font-light text-emerald-300">{analyticsStats.uniqueVisitors}</p>
            </div>
            <Users className="h-8 w-8 text-emerald-300/40" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 uppercase tracking-[0.2em]">Last 24 Hours</p>
              <p className="mt-2 text-3xl font-light text-blue-300">{analyticsStats.last24Hours}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-300/40" />
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60 uppercase tracking-[0.2em]">Languages</p>
              <p className="mt-2 text-sm text-white/80">
                {Object.entries(analyticsStats.languageCounts).map(([lang, count], idx) => (
                  <span key={lang}>
                    {idx > 0 && " / "}
                    <span className={lang === "fi" ? "text-blue-300" : lang === "en" ? "text-purple-300" : "text-white/60"}>
                      {count as number} {lang.toUpperCase()}
                    </span>
                  </span>
                ))}
              </p>
            </div>
            <Globe className="h-8 w-8 text-white/40" />
          </div>
        </div>
      </div>

      {/* Top Countries */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-light text-white mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Top Countries
        </h2>
        {loadingAnalytics ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-white/60" />
          </div>
        ) : analyticsStats.topCountries.length === 0 ? (
          <p className="text-white/60 text-center py-8">No traffic data yet.</p>
        ) : (
          <div className="space-y-3">
            {analyticsStats.topCountries.map(({ country, count }, index) => (
              <div
                key={country}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm w-6">{index + 1}.</span>
                  <span className="text-white font-medium">{country}</span>
                </div>
                <span className="text-emerald-300 font-medium">{count} visits</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Pages */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-light text-white mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Most Visited Pages
        </h2>
        {loadingAnalytics ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-white/60" />
          </div>
        ) : analyticsStats.topPages.length === 0 ? (
          <p className="text-white/60 text-center py-8">No page views yet.</p>
        ) : (
          <div className="space-y-3">
            {analyticsStats.topPages.map(({ path, count }, index) => (
              <div
                key={path}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-sm w-6">{index + 1}.</span>
                  <code className="text-white/80 font-mono text-sm">{path}</code>
                </div>
                <span className="text-blue-300 font-medium">{count} views</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Language Breakdown */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-light text-white mb-4">Language Usage</h2>
        {loadingAnalytics ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-white/60" />
          </div>
        ) : Object.keys(analyticsStats.languageCounts).length === 0 ? (
          <p className="text-white/60 text-center py-8">No language data yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(analyticsStats.languageCounts)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([lang, count]) => {
                const total = analyticsStats.totalVisits;
                const countNum = count as number;
                const percentage = total > 0 ? ((countNum / total) * 100).toFixed(1) : 0;
                return (
                  <div key={lang} className="rounded-lg border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">
                        {lang === "fi" ? "Finnish" : lang === "en" ? "English" : lang.toUpperCase()}
                      </span>
                      <span className="text-white/60 text-sm">{percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          lang === "fi" ? "bg-blue-300" : lang === "en" ? "bg-purple-300" : "bg-white/40"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-white/60 text-sm mt-2">{countNum} visits</p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );

  // Profile management view
  const profileView = (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-light text-white mb-4 flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Profile Picture
        </h2>
        <p className="text-sm text-white/60 mb-6">
          Upload a profile picture that will be displayed in blog posts. Maximum file size: 5MB.
        </p>
        
        <div className="flex items-start gap-6">
          <div className="relative">
            {profilePicture ? (
              <div className="relative">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover border-2 border-white/20"
                />
                <button
                  type="button"
                  onClick={async () => {
                    if (!supabase || !user) return;
                    try {
                      // Try to delete the file from storage
                      const fileExt = profilePicture.split('.').pop()?.split('?')[0] || 'jpg';
                      const fileName = `${user.id}/avatar.${fileExt}`;
                      await supabase.storage.from("profiles").remove([fileName]);
                    } catch (error) {
                      console.error("Failed to delete profile picture from storage", error);
                    }
                    setProfilePicture(null);
                    setProfileSuccess("Profile picture removed.");
                  }}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500/80 hover:bg-red-500 text-white"
                  title="Remove picture"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="h-32 w-32 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-white/40" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <label className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-sm text-white hover:border-white/40 hover:bg-black/80 transition cursor-pointer">
              <Upload className="h-4 w-4" />
              {uploadingImage ? "Uploading..." : "Upload Picture"}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
            {uploadingImage && (
              <div className="mt-2 flex items-center gap-2 text-sm text-white/60">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-light text-white mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Change Password
        </h2>
        <p className="text-sm text-white/60 mb-6">
          Update your account password. Use a strong password with at least 8 characters.
        </p>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              value={passwordData.new}
              onChange={(e) => setPasswordData((prev) => ({ ...prev, new: e.target.value }))}
              className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={passwordData.confirm}
              onChange={(e) => setPasswordData((prev) => ({ ...prev, confirm: e.target.value }))}
              className="w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            disabled={changingPassword}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900/50"
          >
            {changingPassword ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Changing...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Change Password
              </>
            )}
          </button>
        </form>
      </div>

      {/* Account Info */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-light text-white mb-4">Account Information</h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Email</p>
            <p className="mt-1 text-white">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">User ID</p>
            <p className="mt-1 text-white/60 font-mono text-sm">{user?.id}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Role</p>
            <p className="mt-1 text-emerald-300">Admin</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      {profileError && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          {profileError}
        </div>
      )}
      {profileSuccess && (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          {profileSuccess}
        </div>
      )}
    </div>
  );

  const authenticatedView = (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-light text-white flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-emerald-300" />
            Mitrox Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Manage content and monitor your site. All changes are audited via Supabase Row Level Security.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            {user?.email}
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:border-white/30 hover:bg-white/20 transition"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveSection("dashboard")}
          className={`px-6 py-3 text-sm font-medium transition border-b-2 ${
            activeSection === "dashboard"
              ? "border-emerald-400 text-white"
              : "border-transparent text-white/60 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </div>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("blog")}
          className={`px-6 py-3 text-sm font-medium transition border-b-2 ${
            activeSection === "blog"
              ? "border-emerald-400 text-white"
              : "border-transparent text-white/60 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog Management
          </div>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("analytics")}
          className={`px-6 py-3 text-sm font-medium transition border-b-2 ${
            activeSection === "analytics"
              ? "border-emerald-400 text-white"
              : "border-transparent text-white/60 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Traffic Analytics
          </div>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("profile")}
          className={`px-6 py-3 text-sm font-medium transition border-b-2 ${
            activeSection === "profile"
              ? "border-emerald-400 text-white"
              : "border-transparent text-white/60 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Profile
          </div>
        </button>
      </div>

      {/* Conditional Content Based on Active Section */}
      {activeSection === "dashboard" ? (
        dashboardView
      ) : activeSection === "analytics" ? (
        analyticsView
      ) : activeSection === "profile" ? (
        profileView
      ) : (
        <>
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-light text-white">Compose post</h2>
            <p className="text-sm text-white/60">
              All fields are validated before submission. Publishing automatically stores the post in Supabase. Supports Markdown formatting.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:border-white/30 hover:bg-white/20 transition"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              type="button"
              onClick={resetDraft}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:border-white/30 hover:bg-white/20 transition"
            >
              <Plus className="h-4 w-4" />
              New draft
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmitPost} className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">Title</label>
              <input
                type="text"
                required
                value={draft.title}
                onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Slug <span className="text-white/30">(URL-friendly)</span>
              </label>
              <input
                type="text"
                required
                value={draft.slug}
                onChange={(event) => {
                  setHasCustomSlug(true);
                  setDraft((prev) => ({ ...prev, slug: slugify(event.target.value) }));
                }}
                className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">Language</label>
              <select
                value={draft.language}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, language: event.target.value as "fi" | "en" }))
                }
                className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
              >
                <option value="fi">Finnish</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">Status</label>
              <select
                value={draft.status}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, status: event.target.value as "draft" | "published" }))
                }
                className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Writer / Author Name
              </label>
              <input
                type="text"
                value={draft.authorName}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, authorName: event.target.value }))
                }
                placeholder="Enter writer name (e.g., John Doe)"
                className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
              />
              <p className="mt-1 text-xs text-white/40">
                This name will be displayed with your profile picture in blog posts
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">Excerpt</label>
              <textarea
                value={draft.excerpt}
                onChange={(event) => setDraft((prev) => ({ ...prev, excerpt: event.target.value }))}
                rows={3}
                className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Cover image <span className="text-white/30">(optional)</span>
              </label>
              <div className="mt-2 flex gap-3">
                <input
                  type="url"
                  value={draft.coverImageUrl}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, coverImageUrl: event.target.value }))
                  }
                  placeholder="Enter URL or upload image"
                  className="flex-1 rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none"
                />
                <label className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-sm text-white hover:border-white/40 hover:bg-black/80 transition cursor-pointer">
                  <ImageIcon className="h-4 w-4" />
                  {uploadingBlogImage ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload"
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBlogImageUpload}
                    disabled={uploadingBlogImage}
                    className="hidden"
                  />
                </label>
                {draft.coverImageUrl && (
                  <button
                    type="button"
                    onClick={handleDeleteCover}
                    className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white hover:border-white/30 hover:bg-white/20 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3em] text-white/50">
                Content <span className="text-white/30">(Markdown supported)</span>
              </label>
              <textarea
                value={draft.content}
                onChange={(event) => setDraft((prev) => ({ ...prev, content: event.target.value }))}
                rows={12}
                required
                placeholder="Write your content in Markdown format..."
                className="mt-2 w-full rounded-lg border border-white/20 bg-black/60 px-4 py-2 text-white focus:border-white/40 focus:outline-none font-mono text-sm"
              />
              <p className="mt-1 text-xs text-white/40">
                Supports Markdown: **bold**, *italic*, links, lists, code blocks, etc.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="text-sm text-white/60">
              All changes are synced to Supabase with full audit logging. Remember to double-check preview before publishing.
            </div>
            <div className="flex items-center gap-3">
              {formSuccess && (
                <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-200">
                  {formSuccess}
                </div>
              )}
              {formError && (
                <div className="rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs text-red-200">
                  {formError}
                </div>
              )}
              <button
                type="submit"
                disabled={savingDraft}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900/50"
              >
                {savingDraft ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {editingId ? "Update post" : "Save post"}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Preview Section */}
      {showPreview && draft.title && (
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-light text-white">Card Preview</h2>
            <p className="text-sm text-white/60">How your post will appear on the news page</p>
          </div>
          <div className="max-w-md">
            <div className="group flex flex-col bg-black">
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {draft.coverImageUrl ? (
                  <img
                    src={draft.coverImageUrl}
                    alt={draft.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-white/10 via-white/5 to-white/10" />
                )}
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 space-y-4 pt-4">
                {/* Main Heading */}
                <h2 className="text-xl font-light text-white leading-tight group-hover:text-white/80 transition">
                  {draft.title || "Post Title"}
                </h2>

                {/* Description */}
                {draft.excerpt && (
                  <p className="text-sm text-white/70 leading-relaxed line-clamp-3 flex-1">
                    {draft.excerpt}
                  </p>
                )}

                {/* Date and Read Button */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs uppercase tracking-wider text-white/50">
                    {formatDate(
                      draft.publishedAt || (draft.status === "published" ? new Date().toISOString() : null),
                      draft.language
                    ) || "DATE"}
                  </p>
                  <div className="border border-white bg-black px-4 py-2 text-white text-xs font-medium uppercase tracking-wider transition group-hover:bg-white/10 rounded-full">
                    {draft.language === "fi" ? "LUE" : "READ"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-light text-white">Published & draft posts</h2>
            <p className="text-sm text-white/60">
              Manage visibility and edit posts. Drafts remain private thanks to Supabase row-level security policies.
            </p>
          </div>
          <button
            type="button"
            onClick={refreshPosts}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white hover:border-white/30 hover:bg-white/20 transition"
          >
            Refresh
          </button>
        </div>

        {loadingPosts ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((index) => (
              <div key={`skeleton-${index}`} className="h-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
            No posts yet. Start by creating your first draft.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <div key={post.id} className="rounded-2xl border border-white/10 bg-black/60 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">{post.language === "fi" ? "Finnish" : "English"}</p>
                    <h3 className="mt-2 text-xl font-light text-white">{post.title}</h3>
                        <p className="mt-1 text-xs text-white/50">/{post.language === "fi" ? `fi/uutiset/${post.slug}` : `en/news/${post.slug}`}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                      post.status === "published"
                        ? "border border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                        : "border border-amber-400/40 bg-amber-500/10 text-amber-200"
                    }`}
                  >
                    {post.status === "published" ? (
                      <>
                        <ShieldCheck className="h-3 w-3" />
                        Published
                      </>
                    ) : (
                      <>
                        <ShieldOff className="h-3 w-3" />
                        Draft
                      </>
                    )}
                  </span>
                </div>
                {post.excerpt && <p className="mt-3 text-sm text-white/60 line-clamp-3">{post.excerpt}</p>}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleEditPost(post)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:border-white/30 hover:bg-white/20 transition"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusToggle(post)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:border-white/30 hover:bg-white/20 transition"
                  >
                    {post.status === "published" ? "Move to draft" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePost(post.id)}
                    disabled={deletingId === post.id}
                    className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs text-red-200 hover:border-red-500/60 hover:bg-red-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === post.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Trash2 className="h-3 w-3" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-xl font-light text-white">Operational security checklist</h2>
        <ul className="mt-4 space-y-2 text-sm text-white/60 list-disc pl-5">
          <li>Blog posts are stored in Supabase table <code className="text-white/80">blog_posts</code> with RLS enabled.</li>
          <li>Only users with <code className="text-white/80">admin</code> role in <code className="text-white/80">app_metadata</code> can insert or update posts.</li>
          <li>Use Supabase storage or signed URLs for media. Avoid embedding untrusted HTML.</li>
          <li>Ensure backups and audit logs are active in Supabase for compliance.</li>
        </ul>
      </section>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a0a0f] text-white">
      <SEOHead
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        url={meta.url}
        image={meta.image}
        noIndex
        language="fi"
      />
      <SEOEnhanced
        meta={{
          title: meta.title,
          description: meta.description,
          url: meta.url,
          image: meta.image,
          keywords: meta.keywords,
          locale: meta.locale,
          noIndex: true,
        }}
        lang="fi"
      />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        {!supabase ? (
          <div className="mx-auto max-w-md rounded-2xl border border-red-500/40 bg-red-500/10 p-8 shadow-lg backdrop-blur">
            <div className="flex items-center gap-3 text-white">
              <ShieldOff className="h-6 w-6 text-red-300" />
              <h1 className="text-2xl font-light">Configuration Required</h1>
            </div>
            <p className="mt-4 text-sm text-red-200">
              Supabase is not configured. To access the admin dashboard:
            </p>
            <ol className="mt-4 space-y-2 text-sm text-white/80 list-decimal pl-5">
              <li>Create a <code className="text-white/90">.env</code> file in the project root</li>
              <li>Add your Supabase credentials:
                <pre className="mt-2 p-3 bg-black/40 rounded text-xs overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key`}
                </pre>
              </li>
              <li>Get these values from <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">app.supabase.com</a> → Your Project → Settings → API</li>
              <li>Restart your dev server after adding the .env file</li>
            </ol>
          </div>
        ) : authLoading || checkingRole ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex items-center gap-3 text-white/60 font-light">
              <Loader2 className="h-5 w-5 animate-spin" />
              Authenticating session…
            </div>
          </div>
        ) : session && user && hasAdminRole(user) ? (
          authenticatedView
        ) : (
          unauthenticatedView
        )}
      </main>
    </div>
  );
}

