import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Shield, BookOpen, FileCheck, Newspaper, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Take Test", href: "/quiz", icon: FileCheck },
  { name: "Security Blog", href: "/blog", icon: Newspaper },
  { name: "Self-Check", href: "/self-check", icon: ClipboardCheck },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <nav className="section-container" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-foreground">SafeUser</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-secondary"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link to="/certificate">
              <Button variant="outline" size="sm">
                Get Certificate
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="sm">Start Learning</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-down">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50 mt-2">
                <Link to="/certificate" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Get Certificate
                  </Button>
                </Link>
                <Link to="/courses" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Start Learning</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
