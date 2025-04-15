"use client";

import { ThemeToggle } from "./theme/ThemeToggle";

export function SidebarStats() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">Living Seed Church</h2>
        <p className="text-sm text-muted-foreground">Attendant: Jane Doe</p>
      </div>

      <div className="mt-6">
        <p>
          👶 Drop-offs today: <strong>12</strong>
        </p>
        <p>
          📦 Pending pickups: <strong>4</strong>
        </p>
      </div>

      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}
