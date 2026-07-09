export type BlogPost = {
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

export type BlogPostDetail = BlogPost & {
  content: string | null;
  updated_at: string | null;
  author_name?: string | null;
  created_by?: string | null;
};

export type BlogConfig = {
  language: "fi" | "en";
  basePath?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  HeaderComponent?: React.ComponentType;
  FooterComponent?: React.ComponentType;
};


