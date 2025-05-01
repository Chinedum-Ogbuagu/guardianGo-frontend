import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { IDropSession } from "../types/types.dropoff";

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  dropSessions: IDropSession[];
  pageSize: number;
};

function DropSessionPagination({
  currentPage,
  setCurrentPage,
  dropSessions,
  pageSize,
}: Props) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-4 py-2 text-sm text-muted-foreground">
            Page {currentPage} of {Math.ceil(dropSessions.length / pageSize)}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(Math.ceil(dropSessions.length / pageSize), p + 1)
              )
            }
            className={
              currentPage === Math.ceil(dropSessions.length / pageSize)
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default DropSessionPagination;
