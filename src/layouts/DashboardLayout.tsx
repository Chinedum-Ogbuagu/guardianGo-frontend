"use client";

import { SidebarStats } from "@/components/SidebarStats";
import { DropSessionTable } from "@/components/DropSessionTable";
import { SessionDetailPanel } from "@/components/SessionDetailPanel";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DashboardProvider } from "@/components/dashboard-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
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
      <div className="h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Mobile sidebar toggle */}
        {isMobile && (
          <div className="bg-background border-b py-2 px-4 flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="h-full bg-muted p-4 flex flex-col justify-between">
                  <SidebarStats />
                  <div className="mt-4">
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold">Child Pickup System</h1>
            {isMobile && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowDetailPanel(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop sidebar */}
          <aside className="hidden md:flex w-26 xl:w-34 border-r flex-col justify-between bg-muted">
            <div className="p-4 space-y-6">
              <h1 className="text-xl font-semibold px-2 pb-4 border-b">
                Child Pickup
              </h1>
              <SidebarStats />
            </div>
            <div className="p-4 border-t">
              <ThemeToggle />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto border-r">
            <div className="p-4 md:p-6 h-full flex flex-col">
              <div className="flex-none pb-4 border-b mb-4">
                <h2 className="text-xl font-semibold">Drop Sessions</h2>
                <p className="text-sm text-muted-foreground">
                  Manage child drop-offs and pickups
                </p>
              </div>
              <div className="flex-1 overflow-hidden">
                <DropSessionTable
                  onRowClick={
                    isMobile ? () => setShowDetailPanel(true) : undefined
                  }
                />
              </div>
            </div>
          </main>

          {/* Details panel - desktop */}
          <section className={`hidden md:block w-100 lg:w-120 overflow-y-auto`}>
            <SessionDetailPanel />
          </section>

          {/* Mobile details panel */}
          {isMobile && (
            <Sheet open={showDetailPanel} onOpenChange={setShowDetailPanel}>
              <SheetContent side="right" className="w-full sm:w-96 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="font-semibold">Session Details</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDetailPanel(false)}
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
