"use client";

import { SidebarStats } from "@/components/SidebarStats";
import { DropSessionTable } from "@/components/DropSessionTable";
import { SessionDetailPanel } from "@/components/SessionDetailPanel";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DashboardProvider } from "@/components/dashboard-context";

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="h-screen flex flex-row overflow-hidden">
        <aside className="w-40 border-r p-4 flex flex-col justify-between bg-muted">
          <SidebarStats />
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 border-r">
          <DropSessionTable />
        </main>

        <section className="w-[28rem] p-4 overflow-y-auto">
          <SessionDetailPanel />
        </section>
      </div>
    </DashboardProvider>
  );
}
