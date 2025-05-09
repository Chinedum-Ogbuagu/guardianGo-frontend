"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTypewriterLoop } from "@/hooks/useTypewriterLoop";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  Shield,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
  Play,
  School,
  Users,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const words = useTypewriterLoop(
    ["church", "school", "daycare", "camp"],
    180,
    1500
  );
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleOpenAppClick = () => {
    router.push("/auth/login");
  };

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Features section data
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-indigo-500" />,
      title: "Enhanced Security",
      description:
        "Verify guardians with QR codes, photos, and PIN protection.",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Flexible Permissions",
      description:
        "Grant pickup access to family members, babysitters, or trusted friends.",
    },
    {
      icon: <School className="h-6 w-6 text-pink-500" />,
      title: "School Integration",
      description: "Works seamlessly with existing school management systems.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        "GuardianGo transformed our pickup process. Parents love the peace of mind.",
      author: "Sarah Johnson",
      role: "School Principal",
      image: "/api/placeholder/80/80",
    },
    {
      quote:
        "We reduced pickup time by 60% while improving safety and accountability.",
      author: "Pastor Michael",
      role: "Faith Community Church",
      image: "/api/placeholder/80/80",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* HEADER */}
      <header
        className={cn(
          "w-full border-b border-border/40 fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-background/95 backdrop-blur-sm shadow-sm"
            : "bg-background"
        )}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <Link href="/" className="font-bold text-xl flex items-center">
            <Shield className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              GuardianGo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/product"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              Product
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
            </Link>
            <Link
              href="/resources"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              Resources
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              Pricing
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              Blog
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              className="bg-transparent hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 border-indigo-200 hover:border-indigo-300 dark:bg-transparent dark:text-indigo-400 dark:border-indigo-800 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
              onClick={() => handleOpenAppClick()}
            >
              Open App
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>

            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border/40 py-4 px-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/product"
                className="text-sm py-2 px-4 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/resources"
                className="text-sm py-2 px-4 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/pricing"
                className="text-sm py-2 px-4 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="text-sm py-2 px-4 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Button
                className="justify-start"
                onClick={() => {
                  router.push("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Open App
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* HERO */}
        <section className="pt-28 md:pt-32 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
              <div className="md:w-1/2 text-center md:text-left md:pr-8 space-y-6 mb-10 md:mb-0">
                <div className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-950 px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 mb-4">
                  <span className="font-medium">New</span>
                  <span className="ml-1 text-indigo-500 dark:text-indigo-300">
                    Mobile app now available
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  Child Safety,
                  <br />
                  Digitized & Secure.
                </h1>

                <p className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto md:mx-0">
                  A modern system to track, verify, and protect children during{" "}
                  <span className="typewriter-word font-semibold text-foreground">
                    {words} <span className="animate-blink">|</span>
                  </span>
                  drop-off and pickup.
                </p>

                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
                  <Button
                    size="lg"
                    className="text-base px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none"
                  >
                    Try the Demo
                    <Play className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base px-6"
                  >
                    Learn More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      +
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      +
                    </div>
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                      +
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted by{" "}
                    <span className="font-medium text-foreground">500+</span>{" "}
                    organizations
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-20 animate-pulse"></div>
                <div className="relative bg-background rounded-2xl overflow-hidden border border-border shadow-xl">
                  <Image
                    src="/image_fx.png"
                    alt="App dashboard preview"
                    width={800}
                    height={500}
                    className="rounded-xl object-cover w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-zinc-800 rounded-lg p-3 shadow-lg border border-border">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">
                      Real-time pickup tracking
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Built for Safety & Efficiency
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                GuardianGo simplifies child pickup while maintaining the highest
                security standards.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg inline-block mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 px-4 bg-slate-50 dark:bg-zinc-900">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Trusted by Organizations Nationwide
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See what our customers are saying about GuardianGo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 md:p-12 text-white shadow-xl">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Modernize Your Child Management?
                </h2>
                <p className="text-indigo-100 max-w-2xl mx-auto text-lg">
                  Join hundreds of organizations already using GuardianGo to
                  keep children safe.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button
                    size="lg"
                    className="text-base px-6 bg-white text-indigo-600 hover:bg-indigo-50"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base px-6 border-white text-white hover:bg-white/10"
                  >
                    Request Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 dark:bg-zinc-900 border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/integrations"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold">GuardianGo</span>
            </div>

            <p className="text-sm text-muted-foreground text-center md:text-right">
              &copy; {new Date().getFullYear()} GuardianGo. All rights reserved.
              Built with ❤️ for safe schools and churches.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
