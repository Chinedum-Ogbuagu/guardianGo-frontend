"use client";

import { TableCell, TableRow } from "../../../components/ui/table";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Phone,
  Hash,
  Users,
} from "lucide-react";
import { IDropSessionRow } from "@/features/dropoff/types/types.dropoff";
import { useState } from "react";

export function DropSessionRow({ dropSession, onClick }: IDropSessionRow) {
  const [isHovered, setIsHovered] = useState(false);

  const isAwaiting = dropSession?.pickup_status === "awaiting";

  return (
    <TableRow
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "cursor-pointer transition-all duration-200 ",
        isHovered && "bg-slate-50 dark:bg-slate-800/40 scale-[1.005] shadow-sm"
      )}
    >
      <TableCell className="font-medium">
        <div className="flex items-center">
          <div
            className={cn(
              "p-1.5 rounded-md mr-2",
              isAwaiting
                ? "bg-yellow-100 dark:bg-yellow-900/30"
                : "bg-green-100 dark:bg-green-900/30"
            )}
          >
            <Hash
              className={cn(
                "h-3.5 w-3.5",
                isAwaiting
                  ? "text-yellow-700 dark:text-yellow-400"
                  : "text-green-700 dark:text-green-400"
              )}
            />
          </div>
          <span className="font-medium">{dropSession.unique_code}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 mr-2">
            <User className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
          </div>
          <span>{dropSession.guardian_name}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 mr-2">
            <Phone className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
          </div>
          <span>{dropSession.guardian_phone}</span>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center">
          <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 mr-2">
            <Users className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
          </div>
          <span>{dropSession.drop_offs.length}</span>
        </div>
      </TableCell>

      <TableCell>
        <div
          className={cn(
            "px-3 py-2 rounded-full flex items-center w-fit transition-all",
            isAwaiting
              ? "bg-yellow-100 dark:bg-yellow-900/30"
              : "bg-green-100 dark:bg-green-900/30"
          )}
        >
          {isAwaiting ? (
            <>
              <div className="animate-pulse mr-2 h-2 w-2 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-yellow-700 dark:text-yellow-400" />
              <span className="font-medium text-yellow-800 dark:text-yellow-300">
                Awaiting Pickup
              </span>
            </>
          ) : (
            <>
              <CheckCircle className="h-3.5 w-3.5 mr-1.5 text-green-700 dark:text-green-400" />
              <span className="font-medium text-green-800 dark:text-green-300">
                Picked Up
              </span>
            </>
          )}
        </div>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end text-slate-500 dark:text-slate-400">
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          <span>
            {new Date(dropSession.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
}
