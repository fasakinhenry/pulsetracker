import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="mb-8 flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Logo */}
          <a href="#" className="flex flex-shrink-0 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A975D]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M22 12h-4l-3 9L9 3l-3 9H2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">
              PulseTracker
            </span>
          </a>

          {/* Links */}
          <nav className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 transition-colors hover:text-gray-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-600 transition-colors hover:text-[#1A975D]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 PulseTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
