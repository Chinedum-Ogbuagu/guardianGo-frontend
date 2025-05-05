import { useDashboardContext } from "@/lib/dashboard-context";
import React from "react";
import { panelStateKeys } from "../dropoff/types/types.dropoff";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, KeyRound, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  unique_code: string;
  pickup_status: string;
};

function SessionDetailHeader({ unique_code, pickup_status }: Props) {
  const { setDetailsPanelState } = useDashboardContext() || {};
  return (
    <div className="p-2 rounded-t-lg dark:bg-zinc-900/50 border-b dark:border-zinc-800 bg-white/50 ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl ml-2 ">Session Details</h2>

        <Button
          variant="ghost"
          size="sm"
          className="text-blck dark:text-white hover:bg-white/20 p-1 h-8 w-8"
          onClick={() => setDetailsPanelState?.(panelStateKeys.noActiveSession)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="mt-2 px-2">
        <div className="flex items-center justify-between mt-1 mb-2">
          <Badge className="font-bold text-md p-1 rounded-lg bg-white/20 hover:bg-white/30 text-black dark:text-white border-none flex items-center gap-1">
            <KeyRound className="h-3 w-3" /> {unique_code}
          </Badge>
          <Badge className="bg-white/20 hover:bg-white/30  text-fuchsia-950 rounded-lg dark:text-white border-none p-2">
            {pickup_status === "awaiting" ? (
              <>
                <AlertTriangle className="h-3.5 w-3.5 mr-1 text-yellow-700 dark:text-yellow-400" />
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
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default SessionDetailHeader;
