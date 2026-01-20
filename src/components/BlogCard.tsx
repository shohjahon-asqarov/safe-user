import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, AlertTriangle, Lightbulb, Newspaper, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

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

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const config = categoryConfig[post.category];
  const Icon = config.icon;

  if (featured) {
    return (
      <Link to={`/blog/${post.id}`}>
        <Card className="card-hover group overflow-hidden border-border/50 bg-card">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image placeholder */}
            <div className="relative h-48 md:h-full bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-12 h-12 text-primary/50" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className={`${config.className} text-xs`}>
                  <Icon className="w-3 h-3 mr-1" />
                  {config.label}
                </Badge>
                {post.featured && (
                  <Badge variant="secondary" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>

              <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.id}`}>
      <Card className="h-full card-hover group overflow-hidden border-border/50 bg-card">
        {/* Image placeholder */}
        <div className="relative h-32 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-8 h-8 text-primary/50" />
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className={`${config.className} text-xs`}>
              {config.label}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
        </CardContent>

        <CardFooter className="pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
        </CardFooter>
      </Card>
    </Link>
  );
};
