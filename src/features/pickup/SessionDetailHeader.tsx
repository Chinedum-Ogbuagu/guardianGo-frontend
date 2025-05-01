import { useDashboardContext } from "@/lib/dashboard-context";
import React from "react";
import { panelStateKeys } from "../dropoff/types/types.dropoff";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, KeyRound, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  unique_code: string;
  pickup_status: string;
};

function SessionDetailHeader({ unique_code, pickup_status }: Props) {
  const { setDetailsPanelState } = useDashboardContext() || {};
  return (
    <div className="p-2 bg-indigo-50 dark:bg-gray-950 ">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-blck dark:text-white hover:bg-white/20 p-1 h-8 w-8"
          onClick={() => setDetailsPanelState?.(panelStateKeys.noActiveSession)}
        >
          <X className="h-3 w-3" />
        </Button>

        <Badge className="bg-white/20 hover:bg-white/30 text-fuchsia-950 dark:text-white border-none p-2">
          {pickup_status === "awaiting" ? (
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Awaiting Pickup
            </span>
          ) : (
            <span className="flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" /> Picked Up
            </span>
          )}
        </Badge>
      </div>

      <div className="mt-2 px-2">
        <h2 className="text-xl font-bold">Session Details</h2>
        <div className="flex items-center mt-1 mb-2">
          <Badge className="font-mono text-xs px-2 py-0.5 bg-white/20 hover:bg-white/30 text-black dark:text-white border-none flex items-center gap-1">
            <KeyRound className="h-3 w-3" /> {unique_code}
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default SessionDetailHeader;
