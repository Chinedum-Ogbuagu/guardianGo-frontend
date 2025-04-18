"use client";

import { useDashboardContext } from "./dashboard-context";
import { DropSessionStats } from "./DropSessionStats";
import { DropSessionSearch } from "./DropSessionSearch";
import { DropSessionRow } from "./DropSessionRow";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Calendar, Loader2, SearchX } from "lucide-react";
import {
  IDropSession,
  panelStateKeys,
} from "@/features/dropoff/types/types.dropoff";
import { useDropSessionsByDate } from "@/features/dropoff/services/dropoff.service";

export function DropSessionTable({ onRowClick }: { onRowClick?: () => void }) {
  const { setActiveDropSession, setDetailsPanelState } =
    useDashboardContext() || {
      setActiveDropSession: () => {},
    };

  const today = new Date().toISOString().split("T")[0];
  const { data: dropSessionsBydate = [], isLoading } =
    useDropSessionsByDate(today);

  const handleRowClick = (dropSession: IDropSession) => {
    setDetailsPanelState?.(panelStateKeys.dropDetails);
    setActiveDropSession(dropSession);
    if (onRowClick) onRowClick();
  };

  return (
    <div className="space-y-6">
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

      <DropSessionStats />

      <div className="mb-4">
        <DropSessionSearch onChange={() => {}} />
      </div>

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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-primary/10 p-6 mb-4">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                    <p className="text-muted-foreground font-medium">
                      Loading drop sessions...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : dropSessionsBydate.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-primary/10 p-6 mb-4">
                      <SearchX className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">
                      No drop sessions found
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      There are no drop sessions scheduled for today.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              dropSessionsBydate.map((dropSession: IDropSession) => (
                <DropSessionRow
                  key={dropSession.unique_code}
                  dropSession={dropSession}
                  onClick={() => handleRowClick(dropSession)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
