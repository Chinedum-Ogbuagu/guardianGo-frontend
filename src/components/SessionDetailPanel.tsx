"use client";

import { useDashboardContext } from "./dashboard-context";

export function SessionDetailPanel() {
  const { activeSession } = useDashboardContext();

  if (!activeSession)
    return (
      <p className="text-muted-foreground">Select a session to view details</p>
    );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Session Detail</h2>
      <p>
        <strong>Code:</strong> {activeSession.code}
      </p>
      <p>
        <strong>Guardian:</strong> {activeSession.guardian}
      </p>
      <p>
        <strong>Children:</strong> {activeSession.children}
      </p>
      <p>
        <strong>Status:</strong> {activeSession.status}
      </p>
      <p>
        <strong>Time:</strong> {activeSession.time}
      </p>

      <button className="mt-4 bg-primary text-white px-4 py-2 rounded">
        Confirm Pickup
      </button>
    </div>
  );
}
