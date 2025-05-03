import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

function DropSessionTableHeader() {
  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 rounded-2xl  dark:border-slate-800">
      <Table>
        <TableHeader className="border-b border-slate-200 dark:border-slate-800">
          <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-zinc-800">
            <TableHead className="w-[10%] text-indigo-700 dark:text-indigo-400 font-medium">
              Code
            </TableHead>
            <TableHead className="w-[25%] text-indigo-700 dark:text-indigo-400 font-medium">
              Guardian
            </TableHead>
            <TableHead className="w-[15%] text-indigo-700 dark:text-indigo-400 font-medium">
              Phone
            </TableHead>
            <TableHead className="w-[10%] text-indigo-700 dark:text-indigo-400 font-medium">
              Children
            </TableHead>
            <TableHead className="w-[20%] text-indigo-700 dark:text-indigo-400 font-medium">
              Status
            </TableHead>
            <TableHead className="w-[20%] text-indigo-700 dark:text-indigo-400 font-medium">
              Time
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
}

export default DropSessionTableHeader;
