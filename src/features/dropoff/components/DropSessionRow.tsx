"use client";

import { TableCell, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { IDropSessionRow } from "@/features/dropoff/types/types.dropoff";

export function DropSessionRow({ dropSession, onClick }: IDropSessionRow) {
  return (
    <TableRow
      onClick={onClick}
      className="cursor-pointer  hover:bg-muted/50 transition-colors"
    >
      <TableCell className="font-medium w-28">
        {dropSession.unique_code}
      </TableCell>
      <TableCell className="w-52">{dropSession.guardian_name}</TableCell>
      <TableCell className="w-32">{dropSession.guardian_phone}</TableCell>
      <TableCell className="text-center w-10">
        {dropSession.drop_offs.length}
      </TableCell>
      <TableCell className="w-32">
        <Badge
          variant="outline"
          className={`px-2 py-1 flex items-center justify-center w-32 ${
            dropSession.awaitingPickup === true
              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
              : "bg-green-100 text-green-800 border-green-200"
          }`}
        >
          {dropSession.awaitingPickup === true ? (
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
      <TableCell className="text-right whitespace-nowrap w-32">
        <div className="flex items-center  text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {new Date(dropSession.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </TableCell>
    </TableRow>
  );
}
