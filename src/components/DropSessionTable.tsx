"use client";

import { useDashboardContext } from "./dashboard-context";
import { DropSessionStats } from "./DropSessionStats";
import { DropSessionSearch } from "./DropSessionSearch";
import { DropSessionRow } from "./DropSessionRow";
import { useState } from "react";
import { Card } from "./ui/card";
import { MOCK_SESSIONS } from "@/dummyData/MockSessions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Calendar } from "lucide-react";

export function DropSessionTable({ onRowClick }) {
  const [search, setSearch] = useState("");
  const { setActiveSession } = useDashboardContext();

  const filtered = MOCK_SESSIONS.filter(
    (s) => s.phone.includes(search) || s.code.includes(search)
  );

  const handleRowClick = (session) => {
    setActiveSession(session);
    if (onRowClick) onRowClick();
  };

  return (
    <div className="space-y-6">
      {/* Header with Date */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Drop Sessions</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date().toLocaleDateString("en-NG", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Stats */}
      <DropSessionStats />

      {/* Search */}
      <div className="mb-4">
        <DropSessionSearch onChange={setSearch} />
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">Code</TableHead>
              <TableHead className="w-52">Guardian</TableHead>
              <TableHead className="w-32">Phone</TableHead>
              <TableHead className="w-10">Children</TableHead>
              <TableHead className="w-32">Status</TableHead>
              <TableHead className="w-32">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No drop sessions found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((session) => (
                <DropSessionRow
                  key={session.code}
                  session={session}
                  onClick={() => handleRowClick(session)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
