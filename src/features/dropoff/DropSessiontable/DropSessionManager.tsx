"use client";
import { useDashboardContext } from "../../../lib/dashboard-context";
import { DropSessionStats } from "../DropSessionStats";
import { DropSessionSearch } from "../DropSessionSearch";
import { useGetDropSessionByCode } from "../services/dropoff.service";
import { useState, useCallback, useEffect, useRef } from "react";
import { Card } from "../../../components/ui/card";
import { Calendar as CalendarIcon, RefreshCw } from "lucide-react";
import {
  IDropSession,
  panelStateKeys,
} from "@/features/dropoff/types/types.dropoff";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import DropSessionTableHeader from "./DropSessionTableHeader";
import DropSessionTableBody from "./DropSessionTableBody";

export function DropSessionManager({
  onRowClick,
}: {
  onRowClick?: () => void;
}) {
  const [codeToSearch, setCodeToSearch] = useState<string>("");
  const {
    setActiveDropSession,
    setDetailsPanelState,
    selectedDate,
    setSelectedDate,
    dropSessionsBydate,
    isLoadingDropSessionsByDate: isLoading,
    refetchDropSessionsByDate: refetch,
    isErrorDropSessionsByDate,
  } = useDashboardContext() || {
    setActiveDropSession: () => {},
    setSelectedDate: () => {},
    selectedDate: new Date(),
    dropSessionsBydate: [],
    isLoadingDropSessionsByDate: false,
    refetchDropSessionsByDate: () => {},
  };
  const {
    data: dropSessionsByCode,
    isError: isErrorDropSessionsByCode,
    isLoading: isLoadingDropSessionsByCode,
  } = useGetDropSessionByCode(codeToSearch);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState("auto");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const reversedDropSessions = [...dropSessionsBydate].reverse();

  // Calculate and set table height based on available space
  useEffect(() => {
    const calculateTableHeight = () => {
      if (tableContainerRef.current) {
        const viewportHeight = window.innerHeight;
        const tableTop = tableContainerRef.current.getBoundingClientRect().top;
        // Leave some space at the bottom (e.g., 40px)
        const availableHeight = viewportHeight - tableTop - 100;
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
    [refetch, setSelectedDate]
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          Drop Sessions
        </h2>
        <div className="flex items-center gap-4">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[15rem] justify-start text-left font-normal border-slate-300 dark:border-slate-700 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                {selectedDate ? (
                  format(selectedDate, "PPPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 border-slate-200 dark:border-slate-700 shadow-lg rounded-lg"
              align="end"
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => handleDateChange(date)}
                initialFocus
                className="rounded-md"
              />
            </PopoverContent>
          </Popover>
          <Button
            size="icon"
            variant="outline"
            className="border-slate-300 dark:border-slate-700 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title="Refresh data"
            onClick={() => refetch()}
          >
            <RefreshCw className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </Button>
        </div>
      </div>
      <DropSessionStats />
      <div className="mb-4">
        <DropSessionSearch
          onChange={(searchTerm) => {
            setCodeToSearch(searchTerm);
          }}
        />
      </div>
      <Card
        className="p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 shadow-md rounded-xl overflow-hidden"
        ref={tableContainerRef}
      >
        <div className="relative">
          {/* Fixed header */}
          <DropSessionTableHeader />

          {/* Scrollable body */}
          <div
            className="overflow-auto"
            style={{
              height: tableHeight,
              minHeight: "200px", // Ensure a minimum height
            }}
          >
            <DropSessionTableBody
              dropSessions={
                codeToSearch ? dropSessionsByCode : reversedDropSessions
              }
              isLoading={isLoading || isLoadingDropSessionsByCode}
              isError={isErrorDropSessionsByDate || isErrorDropSessionsByCode}
              onRowClick={handleRowClick}
              pageSize={pageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleDateChange={handleDateChange}
              selectedDate={selectedDate}
              refetch={refetch}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
