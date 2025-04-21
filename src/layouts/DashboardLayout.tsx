"use client";
import { SidebarStats } from "@/components/SidebarStats";
import { DropSessionTable } from "@/features/dropoff/components/DropSessionTable";
import { SessionDetailPanel } from "@/features/pickup/components/SessionDetailPanel";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DashboardProvider } from "@/lib/dashboard-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

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
      <div className="h-screen flex flex-col md:flex-row overflow-none bg-slate-100 dark:bg-background">
        {/* Mobile sidebar toggle */}
        {isMobile && (
          <div className="bg-slate-50 dark:bg-background border-b py-3 px-4 flex items-center justify-between shadow-sm">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-slate-50 dark:bg-background hover:bg-slate-100"
                >
                  <Menu className="h-5 w-5" />
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
            <h1 className="text-lg font-semibold flex items-center">
              <LayoutDashboard className="h-5 w-5 text-blue-600 mr-2 hidden sm:inline" />
              Child Pickup System
            </h1>
            {isMobile && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowDetailPanel(true)}
                className="bg-white dark:bg-background hover:bg-slate-100"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop sidebar - NARROWER */}
          <aside className="hidden md:flex w-28 xl:w-32 border-r flex-col justify-between bg-slate-200 dark:bg-muted shadow-sm">
            <div className="p-3 space-y-6">
              <div className="flex flex-col items-center pb-4 border-b">
                <LayoutDashboard className="h-6 w-6 text-blue-600 mb-1" />
                <h1 className="text-sm font-semibold text-center">
                  Child Pickup
                </h1>
              </div>
              <SidebarStats />
            </div>
          </aside>

          {/* Main content with gradient */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate to-zinc-100 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-zinc-800">
            <div className="p-3 md:p-4 h-full flex flex-col">
              <div className="flex-none pb-4 border-b mb-5 bg-gradient-to-r from-transparent via-slate-100 to-transparent dark:from-transparent dark:via-zinc-900/20 dark:to-transparent rounded-lg">
                <div className="px-4 py-3">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    Drop Sessions
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1">
                    Manage child drop-offs and pickups
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-hidden bg-slate-50 dark:bg-zinc-900/80 rounded-lg shadow-lg backdrop-blur-sm">
                <div className="p-4">
                  <DropSessionTable
                    onRowClick={
                      isMobile ? () => setShowDetailPanel(true) : undefined
                    }
                  />
                </div>
              </div>
            </div>
          </main>

          {/* Details panel - desktop */}
          <section className="hidden md:block w-96 lg:w-96 xl:w-120  overflow-y-auto rounded-l-xl bg-gradient-to-r from-transparent via-slate-200 to-slate-50 dark:from-transparent dark:via-blue-950/20 dark:to-transparent shadow-xl backdrop-blur-lg border-l border-slate-200 dark:border-slate-800">
            <SessionDetailPanel />
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
