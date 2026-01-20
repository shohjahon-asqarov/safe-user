import { Link } from "react-router-dom";
import { Shield, Mail, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  learning: [
    { name: "All Courses", href: "/courses" },
    { name: "Security Test", href: "/quiz" },
    { name: "Get Certificate", href: "/certificate" },
    { name: "Self-Check", href: "/self-check" },
  ],
  resources: [
    { name: "Security Blog", href: "/blog" },
    { name: "Password Guide", href: "/courses/password-security" },
    { name: "Phishing Prevention", href: "/courses/phishing-awareness" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">SafeUser</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              Empowering everyone to stay safe online. Learn practical cyber security skills 
              to protect yourself, your family, and your business from digital threats.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Learning</h3>
            <ul className="space-y-3">
              {footerLinks.learning.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SafeUser. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              Educational purposes only. This platform does not provide professional security consulting.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
