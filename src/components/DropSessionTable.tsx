"use client";

import { useDashboardContext } from "./dashboard-context";
import { DropSessionStats } from "./DropSessionStats";
import { DropSessionSearch } from "./DropSessionSearch";
import { DropSessionRow } from "./DropSessionRow";
import { useState } from "react";

const MOCK_SESSIONS = [
  {
    code: "ABC123",
    guardianName: "Mr. Johnson",
    phone: "08011223344",
    childCount: 2,
    status: "awaiting",
    createdAt: new Date().toISOString(),
  },
  {
    code: "XYZ789",
    guardianName: "Mrs. Chioma",
    phone: "09099887766",
    childCount: 1,
    status: "picked_up",
    createdAt: new Date().toISOString(),
  },
];

export function DropSessionTable() {
  const [search, setSearch] = useState("");
  const { setActiveSession } = useDashboardContext();

  const filtered = MOCK_SESSIONS.filter(
    (s) => s.phone.includes(search) || s.code.includes(search)
  );

  return (
    <div>
      {/* Stats */}
      <DropSessionStats />

      {/* Date */}
      <p className="text-sm text-muted-foreground mb-2">
        Today —{" "}
        {new Date().toLocaleDateString("en-NG", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {/* Search + Action */}
      <DropSessionSearch onChange={setSearch} />

      {/* Table */}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Code</th>
            <th>Guardian</th>
            <th>Phone</th>
            <th>Children</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <DropSessionRow
              key={s.code}
              session={s}
              onClick={() => setActiveSession(s)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
