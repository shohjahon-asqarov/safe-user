import { Link } from "react-router-dom";
import { Shield, BookOpen, FileCheck, Award, ChevronRight, Lock, Eye, Smartphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { BlogCard } from "@/components/BlogCard";
import { courses } from "@/data/courses";
import { getFeaturedPosts } from "@/data/blogPosts";

const features = [
  {
    icon: BookOpen,
    title: "Learn at Your Pace",
    description: "Comprehensive courses designed for non-technical users, from basics to advanced protection.",
  },
  {
    icon: FileCheck,
    title: "Test Your Knowledge",
    description: "Interactive quizzes to verify your understanding and identify areas for improvement.",
  },
  {
    icon: Award,
    title: "Earn Certificates",
    description: "Get recognized for your security awareness with shareable certificates.",
  },
];

const stats = [
  { value: "10K+", label: "Users Protected" },
  { value: "50+", label: "Video Lessons" },
  { value: "95%", label: "Success Rate" },
  { value: "24/7", label: "Learning Access" },
];

const securityTopics = [
  { icon: Lock, title: "Password Security", description: "Create unbreakable passwords" },
  { icon: Eye, title: "Phishing Prevention", description: "Spot scams before they catch you" },
  { icon: Smartphone, title: "Device Protection", description: "Secure your digital life" },
  { icon: Users, title: "Social Engineering", description: "Defend against manipulation" },
];

const Index = () => {
  const featuredPosts = getFeaturedPosts().slice(0, 3);
  const popularCourses = courses.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="section-container py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Free Cyber Security Education
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Protect Your{" "}
                <span className="text-gradient">Digital Life</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Learn essential cyber security skills to safeguard your personal information, 
                protect your accounts, and stay safe online. No technical background required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Start Learning Free
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/quiz">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Take Security Test
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero illustration */}
            <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Background circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-80 h-80 rounded-full bg-primary/5 animate-pulse-slow" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-accent/10" />
                </div>
                {/* Center shield */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-primary shadow-glow flex items-center justify-center animate-float">
                    <Shield className="w-16 h-16 text-primary-foreground" />
                  </div>
                </div>
                {/* Floating icons */}
                {securityTopics.map((topic, index) => {
                  const positions = [
                    "top-8 left-1/4",
                    "top-1/4 right-8",
                    "bottom-1/4 left-8",
                    "bottom-8 right-1/4",
                  ];
                  return (
                    <div
                      key={topic.title}
                      className={`absolute ${positions[index]} bg-card shadow-card rounded-2xl p-4 animate-float`}
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <topic.icon className="w-6 h-6 text-primary" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How SafeUser Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A simple three-step journey to becoming security-aware
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative p-8 rounded-2xl bg-card border border-border/50 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-8 left-8 text-7xl font-bold text-primary/5">
                  {index + 1}
                </div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Popular Courses
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Start with our most popular security courses
              </p>
            </div>
            <Link to="/courses">
              <Button variant="outline" className="gap-2">
                View All Courses
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course, index) => (
              <div
                key={course.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Topics Grid */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Essential security topics to protect yourself online
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityTopics.map((topic, index) => (
              <div
                key={topic.title}
                className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50 text-center card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <topic.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Security Updates
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Stay informed about the latest threats and protection tips
              </p>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="gap-2">
                View All Posts
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Secure Your Digital Life?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of users who have improved their online security. 
                Start learning for free today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                    Start Free Course
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/self-check">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10"
                  >
                    Check Your Security Level
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
