"use client";
import { useDashboardContext } from "./dashboard-context";
import { DropSessionStats } from "./DropSessionStats";
import { DropSessionSearch } from "./DropSessionSearch";
import { DropSessionRow } from "./DropSessionRow";
import { useState, useCallback } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Calendar as CalendarIcon, Loader2, SearchX } from "lucide-react";
import {
  IDropSession,
  panelStateKeys,
} from "@/features/dropoff/types/types.dropoff";
import { useDropSessionsByDate } from "@/features/dropoff/services/dropoff.service";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export function DropSessionTable({ onRowClick }: { onRowClick?: () => void }) {
  const { setActiveDropSession, setDetailsPanelState } =
    useDashboardContext() || {
      setActiveDropSession: () => {},
    };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const today = format(selectedDate, "yyyy-MM-dd");

  const {
    data: dropSessionsBydate = [],
    isLoading,
    refetch,
  } = useDropSessionsByDate(today);

  const handleRowClick = (dropSession: IDropSession) => {
    setDetailsPanelState?.(panelStateKeys.dropDetails);
    setActiveDropSession(dropSession);
    if (onRowClick) onRowClick();
  };

  const handleDateChange = useCallback(
    (date: Date | undefined) => {
      if (date) {
        setSelectedDate(date);
        setIsPopoverOpen(false);
        refetch();
      }
    },
    [refetch]
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Drop Sessions</h2>
        <div className="flex items-center gap-4">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[15rem] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => handleDateChange(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
                      There are no drop sessions scheduled for{" "}
                      {format(selectedDate, "PPPP")}.
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
