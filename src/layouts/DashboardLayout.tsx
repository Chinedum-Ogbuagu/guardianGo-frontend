"use client";
import { SidebarStats } from "@/components/SidebarStats";
import { DropSessionManager } from "@/features/dropoff/DropSessiontable/DropSessionManager";
import { SessionDetailPanel } from "@/features/pickup/SessionDetailPanel";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DashboardProvider } from "@/lib/dashboard-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  LayoutDashboard,
  BellRing,
  Settings,
  HelpCircle,
  Search,
  User,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DashboardProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-slate-200 dark:bg-zinc-950">
        {/* Slim Top Header (ClickUp Style) */}
        <header className="h-12 bg-slate-200/80 dark:bg-zinc-950/80  flex items-center justify-between px-3 backdrop-blur-sm z-10">
          <div className="flex items-center">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2 h-8 w-8">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="h-full bg-slate-200 dark:bg-muted p-4 flex flex-col justify-between">
                    <div className="space-y-1 mb-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <LayoutDashboard className="h-5 w-5 text-blue-600" />
                        <h1 className="text-lg font-semibold">Child Pickup</h1>
                      </div>
                      <SidebarStats />
                    </div>
                    <div className="mt-4">
                      <ThemeToggle />
                    </div>
                  </div>
                </SheetContent>
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
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-8 bg-slate-100 dark:bg-zinc-800 rounded-md pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
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
          {/* Desktop sidebar - NARROWER */}
          <aside className="hidden md:flex  flex-col ml-2 my-2 rounded-2xl justify-between bg-white dark:bg-zinc-900/50 z-10 transition-all duration-200 border border-slate-300 dark:border-slate-800 overflow-hidden">
            <div className="p-3 space-y-6">
              <SidebarStats />
            </div>
          </aside>

          {/* Main content with gradient */}
          <main className="flex-1 flex flex-col bg-white dark:bg-zinc-900 rounded-lg my-2 border border-slate-300 dark:border-slate-800 ml-2 z-20 shadow-lg">
            <div className="flex-1 p-4 flex flex-col">
              <div className="h-full p-3 flex flex-col">
                <DropSessionManager
                  onRowClick={
                    isMobile ? () => setShowDetailPanel(true) : undefined
                  }
                />
              </div>
            </div>
          </main>

          <section className="hidden md:flex flex-col w-96 lg:w-96 xl:w-120  **: my-2 rounded-lg mx-2 bg-white dark:bg-zinc-900 shadow-xl backdrop-blur-lg border border-slate-300 dark:border-slate-800">
            <div className="flex-1 overflow-y-auto">
              <SessionDetailPanel />
            </div>
          </section>

          {/* Mobile details panel */}
          {isMobile && (
            <Sheet open={showDetailPanel} onOpenChange={setShowDetailPanel}>
              <SheetContent side="right" className="w-full sm:w-96 p-0">
                <div className="flex items-center justify-between p-4 border-b bg-slate-200 dark:bg-muted">
                  <h2 className="font-semibold flex items-center">
                    Session Details
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDetailPanel(false)}
                    className="hover:bg-slate-300 dark:hover:bg-slate-800"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="overflow-y-auto h-[calc(100%-60px)]">
                  <SessionDetailPanel />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </DashboardProvider>
  );
}
