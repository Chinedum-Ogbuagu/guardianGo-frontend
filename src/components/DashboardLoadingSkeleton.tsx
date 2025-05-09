import {
  Shield,
  BellRing,
  HelpCircle,
  Settings,
  User,
  Search,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardLoadingSkeleton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-200 dark:bg-zinc-950">
      {/* Top Header */}
      <header className="h-12 bg-slate-200/80 dark:bg-zinc-950/80 flex items-center justify-between px-3 backdrop-blur-sm z-10">
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 h-8 w-8">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
            </Sheet>
          )}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl flex items-center">
              <Shield className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                GuardianGo
              </span>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <div className="w-full h-8 bg-slate-300 dark:bg-zinc-800 rounded-md animate-pulse" />
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600 dark:text-slate-400"
          >
            <BellRing className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600 dark:text-slate-400"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600 dark:text-slate-400"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600 dark:text-slate-400"
          >
            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
              <User className="h-3 w-3 text-white" />
            </div>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <aside className="hidden md:flex flex-col ml-2 my-2 rounded-2xl justify-between bg-white dark:bg-zinc-900/50 z-10 transition-all duration-200 border border-slate-300 dark:border-slate-800 overflow-hidden">
          <div className="p-3 space-y-6">
            {/* Sidebar Stats Loading State */}
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-slate-300 dark:bg-zinc-800 rounded w-3/4 animate-pulse"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-md bg-slate-300 dark:bg-zinc-800 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-300 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-slate-300 dark:bg-zinc-800 rounded w-4/5 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-slate-300 dark:bg-zinc-800 rounded w-3/4 animate-pulse"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-md bg-slate-300 dark:bg-zinc-800 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-300 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-slate-300 dark:bg-zinc-800 rounded w-4/5 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-slate-300 dark:bg-zinc-800 rounded w-3/4 animate-pulse"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-md bg-slate-300 dark:bg-zinc-800 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-300 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-slate-300 dark:bg-zinc-800 rounded w-4/5 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 flex flex-col bg-white dark:bg-zinc-900 rounded-lg my-2 border border-slate-300 dark:border-slate-800 ml-2 z-20 shadow-lg">
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-slate-300 dark:bg-zinc-800 rounded w-48 animate-pulse"></div>
              <div className="h-8 bg-slate-300 dark:bg-zinc-800 rounded w-32 animate-pulse"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-slate-100 dark:bg-zinc-800/50 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-700"
                >
                  <div className="flex justify-between mb-2">
                    <div className="h-5 bg-slate-300 dark:bg-zinc-700 rounded w-24 animate-pulse"></div>
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-zinc-700 animate-pulse"></div>
                  </div>
                  <div className="h-8 bg-slate-300 dark:bg-zinc-700 rounded w-12 animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative">
              <div className="h-10 bg-slate-300 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              {["Code", "Guardian", "Phone", "Children", "Status"].map(
                (header) => (
                  <div
                    key={header}
                    className="h-6 bg-slate-300 dark:bg-zinc-800 rounded animate-pulse"
                  ></div>
                )
              )}
            </div>

            {/* Table Rows */}
            {[1, 2, 3, 4, 5].map((row) => (
              <div
                key={row}
                className="grid grid-cols-5 gap-4 mb-4 p-2 rounded-md border border-slate-200 dark:border-zinc-800"
              >
                {[1, 2, 3, 4, 5].map((cell) => (
                  <div
                    key={cell}
                    className="h-6 bg-slate-300 dark:bg-zinc-800 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </main>

        {/* Right sidebar */}
        <section className="hidden md:flex flex-col w-96 lg:w-96 xl:w-120 my-2 rounded-lg mx-2 bg-white dark:bg-zinc-900 shadow-xl backdrop-blur-lg border border-slate-300 dark:border-slate-800">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="h-6 bg-slate-300 dark:bg-zinc-800 rounded w-32 animate-pulse mb-2"></div>
            <div className="h-4 bg-slate-300 dark:bg-zinc-800 rounded w-24 animate-pulse"></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {/* Profile Section */}
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-slate-300 dark:bg-zinc-800 animate-pulse mr-4"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-slate-300 dark:bg-zinc-800 rounded w-40 animate-pulse"></div>
                <div className="h-4 bg-slate-300 dark:bg-zinc-800 rounded w-24 animate-pulse"></div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded bg-slate-300 dark:bg-zinc-800 animate-pulse mr-3"></div>
                <div className="h-4 bg-slate-300 dark:bg-zinc-800 rounded w-32 animate-pulse"></div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded bg-slate-300 dark:bg-zinc-800 animate-pulse mr-3"></div>
                <div className="h-4 bg-slate-300 dark:bg-zinc-800 rounded w-48 animate-pulse"></div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded bg-slate-300 dark:bg-zinc-800 animate-pulse mr-3"></div>
                <div className="h-4 bg-slate-300 dark:bg-zinc-800 rounded w-36 animate-pulse"></div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <div className="h-5 bg-slate-300 dark:bg-zinc-800 rounded w-32 animate-pulse mb-4"></div>
              <div className="space-y-3">
                <div className="h-10 bg-slate-300 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
                <div className="h-10 bg-slate-300 dark:bg-zinc-800 rounded w-full animate-pulse"></div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="h-12 bg-indigo-300 dark:bg-indigo-900/40 rounded w-full animate-pulse mt-auto"></div>
          </div>
        </section>
      </div>
    </div>
  );
}
