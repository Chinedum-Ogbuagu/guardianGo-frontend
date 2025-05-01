import { TableCell, TableRow } from "@/components/ui/table";

export const SkeletonRow = () => (
  <TableRow className="animate-pulse">
    <TableCell>
      <div className="h-6 w-16 p-2 bg-slate-200 dark:bg-zinc-800 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-42 p-2 bg-slate-200 dark:bg-zinc-800 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-20 p-2 bg-slate-200 dark:bg-zinc-800 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-8 p-2 bg-slate-200 dark:bg-zinc-800 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-24 p-2 bg-slate-200 dark:bg-zinc-800 shadow-inner" />
    </TableCell>
    <TableCell>
      <div className="h-6 w-18 p-2 bg-slate-200 dark:bg-zinc-800 shadow-inner" />
    </TableCell>
  </TableRow>
);
