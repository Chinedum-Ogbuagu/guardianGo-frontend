import { useDashboardContext } from "@/lib/dashboard-context";
import React from "react";
import { panelStateKeys } from "../dropoff/types/types.dropoff";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle,
  KeyRound,
  X,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  unique_code: string;
  pickup_status: string;
};

function SessionDetailHeader({ unique_code, pickup_status }: Props) {
  const { setDetailsPanelState } = useDashboardContext() || {};

  const isPickedUp = pickup_status !== "awaiting";

  return (
    <div className="sticky top-0 z-10 backdrop-blur-sm border-b dark:border-zinc-800 rounded-t-lg">
      {/* Top section with title and close button */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={() =>
              setDetailsPanelState?.(panelStateKeys.noActiveSession)
            }
            aria-label="Back to sessions"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </Button>
        </div>

        {/* Centered title */}
        <h2 className="text-lg font-medium absolute left-1/2 transform -translate-x-1/2">
          Session Details
        </h2>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onClick={() =>
                  setDetailsPanelState?.(panelStateKeys.noActiveSession)
                }
                aria-label="Close panel"
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Close panel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Session status information */}
      <div className="px-4 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center">
          <Badge
            className="py-1.5 px-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700
                     text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5"
          >
            <KeyRound className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            <span className="font-medium">{unique_code}</span>
          </Badge>
        </div>

        <Badge
          className={`py-1.5 px-2.5 flex items-center gap-1.5 ${
            isPickedUp
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
              : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
          }`}
        >
          {isPickedUp ? (
            <CheckCircle className="h-3.5 w-3.5" />
          ) : (
            <AlertTriangle className="h-3.5 w-3.5" />
          )}
          <span className="font-medium">
            {isPickedUp ? "Picked Up" : "Awaiting Pickup"}
          </span>
        </Badge>
      </div>
    </div>
  );
}

export default SessionDetailHeader;
