"use client";

import { useDashboardContext } from "./dashboard-context";
import { DropSessionStats } from "./DropSessionStats";
import { DropSessionSearch } from "./DropSessionSearch";
import { DropSessionRow } from "./DropSessionRow";
import { useState } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Calendar } from "lucide-react";

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
  {
    code: "LMN456",
    guardianName: "Mr. Adewale",
    phone: "08134567890",
    childCount: 3,
    status: "awaiting",
    createdAt: new Date().toISOString(),
  },
  {
    code: "JKL321",
    guardianName: "Mrs. Uche",
    phone: "07056789012",
    childCount: 2,
    status: "picked_up",
    createdAt: new Date().toISOString(),
  },
  {
    code: "DEF789",
    guardianName: "Mr. Obi",
    phone: "08033445566",
    childCount: 1,
    status: "awaiting",
    createdAt: new Date().toISOString(),
  },
  {
    code: "GHJ567",
    guardianName: "Mrs. Amina",
    phone: "09077665544",
    childCount: 2,
    status: "awaiting",
    createdAt: new Date().toISOString(),
  },
  {
    code: "QWE234",
    guardianName: "Mr. Bello",
    phone: "08022334455",
    childCount: 4,
    status: "picked_up",
    createdAt: new Date().toISOString(),
  },
  {
    code: "RTY678",
    guardianName: "Mrs. Grace",
    phone: "08111223344",
    childCount: 2,
    status: "awaiting",
    createdAt: new Date().toISOString(),
  },
  {
    code: "UIO890",
    guardianName: "Mr. Musa",
    phone: "07099887766",
    childCount: 1,
    status: "picked_up",
    createdAt: new Date().toISOString(),
  },
  {
    code: "ASD345",
    guardianName: "Mrs. Ezinne",
    phone: "09012345678",
    childCount: 3,
    status: "awaiting",
    createdAt: new Date().toISOString(),
  },
];

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
              <TableHead>Guardian</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="w-24">Children</TableHead>
              <TableHead className="w-32">Status</TableHead>
              <TableHead className="w-24">Time</TableHead>
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
