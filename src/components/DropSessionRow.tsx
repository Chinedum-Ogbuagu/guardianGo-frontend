/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export function DropSessionRow({
  session,
  onClick,
}: {
  session: any;
  onClick: () => void;
}) {
  return (
    <TableRow
      onClick={onClick}
      className="cursor-pointer hover:bg-muted/50 transition-colors"
    >
      <TableCell className="font-medium">{session.code}</TableCell>
      <TableCell>{session.guardianName}</TableCell>
      <TableCell>{session.phone}</TableCell>
      <TableCell className="text-center">{session.childCount}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`px-2 py-1 flex items-center justify-center w-32 ${
            session.status === "awaiting"
              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
              : "bg-green-100 text-green-800 border-green-200"
          }`}
        >
          {session.status === "awaiting" ? (
            <>
              <AlertTriangle className="h-3 w-3 mr-1" />
              Awaiting Pickup
            </>
          ) : (
            <>
              <CheckCircle className="h-3 w-3 mr-1" />
              Picked Up
            </>
          )}
        </Badge>
      </TableCell>
      <TableCell className="text-right whitespace-nowrap">
        <div className="flex items-center  text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {new Date(session.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </TableCell>
    </TableRow>
  );
}
