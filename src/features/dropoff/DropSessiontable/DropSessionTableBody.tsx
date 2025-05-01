import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import {
  AlertTriangle,
  RefreshCw,
  Calendar as CalendarEmpty,
  CalendarIcon,
} from "lucide-react";
import React from "react";
import { DropSessionRow } from "./DropSessionTableRow";
import DropSessionPagination from "./DropSessionTablePagination";
import { IDropSession } from "../types/types.dropoff";
import { SkeletonRow } from "./DropSessionTableSkeletonLoader";

type Props = {
  isLoading: boolean;
  isError: boolean;
  dropSessions: IDropSession[];
  pageSize: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onRowClick: (dropSession: IDropSession) => void;
  handleDateChange: (date: Date) => void;
  selectedDate: Date;
  refetch: () => void;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

function DropSessionTableBody({
  isLoading,
  isError,
  dropSessions,
  pageSize,
  currentPage,
  setCurrentPage,
  onRowClick,
  handleDateChange,
  selectedDate,
  refetch,
  setSelectedDate,
}: Props) {
  const renderSkeletonRows = () => {
    return Array(8)
      .fill(2)
      .map((_, index) => <SkeletonRow key={`skeleton-${index}`} />);
  };
  return (
    <Table>
      <TableBody>
        {isLoading ? (
          renderSkeletonRows()
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-6 mb-6 shadow-inner">
                  <AlertTriangle className="h-12 w-12 bg-transparent text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-slate-900 dark:text-slate-100">
                  Failed to load drop sessions
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  There was an error fetching drop sessions for{" "}
                  <span className="font-medium">
                    {format(selectedDate, "PPPP")}
                  </span>
                  .
                </p>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => refetch()}
                  className="text-sm bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg active:shadow-sm"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ) : dropSessions?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-6 mb-6 shadow-inner">
                  <CalendarEmpty className="h-12 w-12 bg-transparent text-indigo-500 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-slate-900 dark:text-slate-100">
                  No drop sessions found
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  There are no drop sessions for{" "}
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    {format(selectedDate, "PPPP")}
                  </span>
                  .
                </p>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    setSelectedDate(today);
                    handleDateChange(today);
                  }}
                  className="text-sm bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg active:shadow-sm"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  View Today&apos;s Sessions
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          dropSessions &&
          dropSessions?.map((dropSession: IDropSession) => (
            <DropSessionRow
              key={dropSession.unique_code}
              dropSession={dropSession}
              onClick={() => onRowClick(dropSession)}
            />
          ))
        )}
      </TableBody>
      {dropSessions?.length > pageSize && (
        <div className="flex w-full justify-end mt-1">
          <DropSessionPagination
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            dropSessions={dropSessions}
          />
        </div>
      )}
    </Table>
  );
}

export default DropSessionTableBody;
