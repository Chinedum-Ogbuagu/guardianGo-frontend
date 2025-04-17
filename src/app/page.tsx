"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTypewriterLoop } from "@/hooks/useTypewriterLoop";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Home() {
  const word = useTypewriterLoop(["church", "school", "any"], 180, 1500);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* HEADER */}
      <header className="w-full border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          <Link href="/" className="font-bold text-xl">
            GuardianGo
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/product"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Product
            </Link>
            <Link
              href="/resources"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </nav>

          <Button
            variant="outline"
            className="dark:bg-slate-100 light:bg-black  text-black hover:bg-white hover:text-black border border-border"
            onClick={() => router.push("/dashboard")}
          >
            Open App
          </Button>

          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-col items-center justify-between p-10 pt-20 flex-grow">
        {/* HERO */}
        <div className="text-center max-w-2xl space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Child Safety,
            <br />
            Digitized & Secure.
          </h1>
          <p className="typewriter-line text-muted-foreground text-lg sm:text-xl">
            A modern system to track, verify, and protect children during{" "}
            <span className="typewriter-word font-semibold">{word}</span>{" "}
            drop-off and pickup.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-2">
            <Button size="lg" className="text-base px-6">
              Try the Demo
            </Button>
            <Button variant="outline" size="lg" className="text-base px-6">
              Learn More
            </Button>
          </div>
        </div>

        {/* IMAGE */}
        <div className="pt-16 relative w-full max-w-4xl mx-auto">
          <Image
            src="/dashboard-preview2.png"
            alt="App dashboard preview"
            width={1200}
            height={700}
            className="rounded-xl fit shadow-xl object-cover w-full h-full border border-border"
          />
        </div>

        {/* FOOTER */}
        <footer className="w-full pt-20 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} GuardianGo. Built with ❤️ for safe
          churches.
        </footer>
      </div>
    </div>
  );
}
