import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 pt-8 md:pt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">HireHunt</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Track your job applications efficiently and never miss an
              opportunity.
            </p>
          </div>

          {/* Personal Website & Social */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Connect</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {/* Personal Website Link */}

              <li>
                <Link
                  href="https://jzach.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>👨‍💻 Visit my website</span>
                </Link>
              </li>
              {/* Social Links */}
              <li>
                <Link
                  href="https://github.com/zacisyourmaster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>🐙 Github</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/in/jzachs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>💼 LinkedIn</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
