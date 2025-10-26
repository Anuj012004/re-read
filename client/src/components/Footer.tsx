import { Link } from "react-router-dom";
import { BookOpen, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Browse Books", href: "/allbooks" },
    { name: "Sell Books", href: "/sellbook" },
  ];

  const legalLinks = [
    { name: "Privacy & Cookie Policy", href: "/privacy-policy" },
  ];

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold">RE-READ</span>
            </Link>
            <p className="text-white/80 mb-6 leading-relaxed">
              The trusted platform to buy and sell textbooks. Save money, help
              peers, and build a sustainable book sharing community.
            </p>
          </div>

           <div className="flex flex-col space-y-3 ">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                Contact
              </h3>
              <a
                href="https://github.com/Anuj012004/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white/70 hover:text-yellow-400 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/anuj-667a66336"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white/70 hover:text-yellow-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://x.com/Anujx01"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white/70 hover:text-yellow-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span>X (Twitter)</span>
              </a>
            </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal / Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/60 text-center md:text-left">
              © {new Date().getFullYear()} RE-READ. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
