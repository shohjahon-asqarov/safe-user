import { useState } from "react";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertTriangle, Lightbulb, Newspaper, BookOpen } from "lucide-react";

type Category = 'all' | BlogPost['category'];

const categoryConfig = {
  all: { label: 'All Posts', icon: Newspaper },
  alert: { label: 'Alerts', icon: AlertTriangle },
  tip: { label: 'Tips', icon: Lightbulb },
  news: { label: 'News', icon: Newspaper },
  guide: { label: 'Guides', icon: BookOpen },
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 lg:py-20">
        <div className="section-container">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Security Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay informed about the latest cyber threats, security tips, and best practices 
              to keep yourself and your data safe online.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {(Object.keys(categoryConfig) as Category[]).map((category) => {
                const config = categoryConfig[category];
                const Icon = config.icon;
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {config.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 lg:py-16">
        <div className="section-container">
          {filteredPosts.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-8">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </p>

              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-semibold mb-6">Featured</h2>
                  <div className="space-y-6">
                    {featuredPosts.map((post, index) => (
                      <div
                        key={post.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <BlogCard post={post} featured />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div>
                  {featuredPosts.length > 0 && (
                    <h2 className="text-xl font-semibold mb-6">All Articles</h2>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post, index) => (
                      <div
                        key={post.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <BlogCard post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
