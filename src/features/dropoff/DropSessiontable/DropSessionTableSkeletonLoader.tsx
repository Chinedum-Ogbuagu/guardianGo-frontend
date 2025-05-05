"use client";

import { TableCell, TableRow } from "@/components/ui/table";

export const SkeletonRow = () => {
  return (
    <TableRow className="animate-pulse border-l-4 border-l-slate-200 dark:border-l-zinc-700">
      {/* Code - 15% */}
      <TableCell className="w-[15%]">
        <div className="flex items-center">
          <div className="p-1.5  mr-2 bg-slate-200 dark:bg-zinc-700">
            <div className="h-3.5 w-3.5" />
          </div>
          <div className="h-5 w-16  bg-slate-200 dark:bg-zinc-700" />
        </div>
      </TableCell>

      {/* Guardian - 25% */}
      <TableCell className="w-[25%]">
        <div className="flex items-center">
          <div className="p-1.5  mr-2 bg-slate-200 dark:bg-zinc-700">
            <div className="h-3.5 w-3.5" />
          </div>
          <div className="h-5 w-32  bg-slate-200 dark:bg-zinc-700" />
        </div>
      </TableCell>

      {/* Phone - 15% */}
      <TableCell className="w-[15%]">
        <div className="flex items-center">
          <div className="p-1.5 mr-2 bg-slate-200 dark:bg-zinc-800 shadow-inner">
            <div className="h-3.5 w-3.5" />
          </div>
          <div className="h-5 w-24  bg-slate-200 dark:bg-zinc-800 shadow-inner" />
        </div>
      </TableCell>

      {/* Children - 10% */}
      <TableCell className="w-[10%]">
        <div className="flex items-center">
          <div className="p-1.5  mr-2 bg-slate-200 dark:bg-zinc-800 shadow-inner">
            <div className="h-3.5 w-3.5" />
          </div>
          <div className="h-5 w-6 r bg-slate-200 dark:bg-zinc-800 shadow-inner" />
        </div>
      </TableCell>

      {/* Status - 25% */}
      <TableCell className="w-[25%]">
        <div className="px-3 py-2 rounded-full w-32 h-8 bg-slate-200 dark:bg-zinc-800 shadow-inner" />
      </TableCell>

      {/* Time - 20% */}
      <TableCell className="text-right w-[20%]">
        <div className="flex items-center justify-end">
          <div className="h-5 w-16  bg-slate-200 dark:bg-zinc-800 shadow-inner ml-auto" />
        </div>
      </TableCell>
    </TableRow>
  );
};

// Optional - You can also create a multi-row skeleton component for showing multiple loading rows
export const SkeletonTable = ({ rowCount = 5 }) => {
  return (
    <>
      {[...Array(rowCount)].map((_, index) => (
        <SkeletonRow key={index} />
      ))}
    </>
  );
};
