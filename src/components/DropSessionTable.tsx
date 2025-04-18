"use client";
import { useDashboardContext } from "./dashboard-context";
import { DropSessionStats } from "./DropSessionStats";
import { DropSessionSearch } from "./DropSessionSearch";
import { DropSessionRow } from "./DropSessionRow";
import { useState, useCallback, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Calendar as CalendarIcon,
  Calendar as CalendarEmpty,
} from "lucide-react";
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

const SkeletonRow = () => (
  <TableRow className="animate-pulse">
    <TableCell>
      <div className="h-6 w-16 p-2 bg-slate-200 dark:bg-zinc-700 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-32 p-2 bg-slate-200 dark:bg-zinc-700 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-20 p-2 bg-slate-200 dark:bg-zinc-700 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-8 p-2 bg-slate-200 dark:bg-zinc-700 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-24 p-2 bg-slate-200 dark:bg-zinc-700 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-18 p-2 bg-slate-200 dark:bg-zinc-700 shadow-inner" />
    </TableCell>
  </TableRow>
);

export function DropSessionTable({ onRowClick }: { onRowClick?: () => void }) {
  const { setActiveDropSession, setDetailsPanelState } =
    useDashboardContext() || {
      setActiveDropSession: () => {},
    };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState("auto");

  const today = format(selectedDate, "yyyy-MM-dd");

  const {
    data: dropSessionsBydate = [],
    isLoading,
    refetch,
  } = useDropSessionsByDate(today);

  // Calculate and set table height based on available space
  useEffect(() => {
    const calculateTableHeight = () => {
      if (tableContainerRef.current) {
        const viewportHeight = window.innerHeight;
        const tableTop = tableContainerRef.current.getBoundingClientRect().top;
        // Leave some space at the bottom (e.g., 40px)
        const availableHeight = viewportHeight - tableTop - 40;
        const minHeight = 200; // Minimum height
        const maxHeight = 800; // Maximum height

        // Set height between min and max, but responsive to viewport
        const idealHeight = Math.max(
          minHeight,
          Math.min(availableHeight, maxHeight)
        );
        setTableHeight(`${idealHeight}px`);
      }
    };

    calculateTableHeight();
    window.addEventListener("resize", calculateTableHeight);

    return () => {
      window.removeEventListener("resize", calculateTableHeight);
    };
  }, []);

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

  // Generate skeleton rows for loading state
  const renderSkeletonRows = () => {
    return Array(12)
      .fill(2)
      .map((_, index) => <SkeletonRow key={`skeleton-${index}`} />);
  };

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

      <Card
        className="p-3 bg-slate-50 dark:bg-zinc-900"
        ref={tableContainerRef}
      >
        <div className="relative">
          {/* Fixed header */}
          <div className="sticky top-0 z-10 bg-slate-50 dark:bg-zinc-900 border-b">
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
            </Table>
          </div>

          {/* Scrollable body */}
          <div
            className="overflow-auto"
            style={{
              height: tableHeight,
              minHeight: "200px", // Ensure a minimum height
            }}
          >
            <Table>
              <TableBody>
                {isLoading ? (
                  renderSkeletonRows()
                ) : dropSessionsBydate.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="flex flex-col items-center justify-center py-16">
                        <div className="rounded-full bg-primary/5 p-8 mb-6">
                          <CalendarEmpty className="h-12 w-12 bg-transparent text-primary/60" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">
                          No drop sessions found
                        </h3>
                        <p className="text-muted-foreground text-center max-w-md mb-6">
                          There are no drop sessions for{" "}
                          <span className="font-medium">
                            {format(selectedDate, "PPPP")}
                          </span>
                          .
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const today = new Date();
                            setSelectedDate(today);
                            handleDateChange(today);
                          }}
                          className="text-sm"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          View Today&apos;s Sessions
                        </Button>
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
          </div>
        </div>
      </Card>
    </div>
  );
}
