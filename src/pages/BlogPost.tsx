import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBlogPostById, blogPosts, type BlogPost as BlogPostType } from "@/data/blogPosts";
import { BlogCard } from "@/components/BlogCard";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2,
  AlertTriangle,
  Lightbulb,
  Newspaper,
  BookOpen
} from "lucide-react";

const categoryConfig = {
  alert: {
    icon: AlertTriangle,
    label: "Security Alert",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  tip: {
    icon: Lightbulb,
    label: "Security Tip",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  news: {
    icon: Newspaper,
    label: "News",
    className: "bg-info/10 text-info border-info/20",
  },
  guide: {
    icon: BookOpen,
    label: "Guide",
    className: "bg-success/10 text-success border-success/20",
  },
};

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const post = getBlogPostById(postId || "");

  if (!post) {
    return (
      <Layout>
        <div className="section-container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button>Browse Articles</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const config = categoryConfig[post.category];
  const Icon = config.icon;
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const handleShare = () => {
    alert("Share feature would open sharing options in a production app!");
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 lg:py-16">
        <div className="section-container">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <div className="max-w-3xl animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className={config.className}>
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} read
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="gap-2 ml-auto"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 animate-fade-in">
              <div className="prose prose-slate max-w-none">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                        {paragraph.replace('# ', '')}
                      </h1>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- **')) {
                    const match = paragraph.match(/- \*\*(.+?)\*\*:? ?(.+)?/);
                    if (match) {
                      return (
                        <div key={index} className="flex gap-2 mb-2">
                          <span className="text-primary">•</span>
                          <span>
                            <strong>{match[1]}:</strong> {match[2]}
                          </span>
                        </div>
                      );
                    }
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <div key={index} className="flex gap-2 mb-2">
                        <span className="text-primary">•</span>
                        <span>{paragraph.replace('- ', '')}</span>
                      </div>
                    );
                  }
                  if (paragraph.match(/^\d+\./)) {
                    return (
                      <p key={index} className="mb-2 ml-4">
                        {paragraph}
                      </p>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {relatedPosts.length > 0 && (
                  <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <h3 className="font-semibold mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <BlogCard key={relatedPost.id} post={relatedPost} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
