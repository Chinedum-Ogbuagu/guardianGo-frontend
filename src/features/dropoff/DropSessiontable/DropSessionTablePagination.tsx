import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

import { useDashboardContext } from "@/lib/dashboard-context";

type Props = {
  currentPage: number | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>> | undefined;

  pageSize: number;
};

function DropSessionPagination({
  currentPage,
  setCurrentPage,
  pageSize,
}: Props) {
  const { dropSessionsBydate } = useDashboardContext() || {};
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage?.((p) => Math.max(1, p - 1))}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-4 py-2 text-sm text-muted-foreground">
            Page {currentPage} of{" "}
            {Math.ceil((dropSessionsBydate?.total_count ?? 0) / pageSize)}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setCurrentPage?.((p) =>
                Math.min(
                  Math.ceil((dropSessionsBydate?.total_count ?? 0) / pageSize),
                  p + 1
                )
              )
            }
            className={
              currentPage ===
              Math.ceil((dropSessionsBydate?.total_count ?? 0) / pageSize)
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
