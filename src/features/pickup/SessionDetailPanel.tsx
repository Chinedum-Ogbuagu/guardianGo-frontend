"use client";

import { useDashboardContext } from "../../lib/dashboard-context";
import { Button } from "../../components/ui/button";
import { Users, CheckCircle } from "lucide-react";
import { NewDropOffForm } from "../dropoff/dropoffForm/NewDropOffForm";
import { ConfirmPickupPanel } from "./ConfirmPickupPanel";
import { panelStateKeys } from "@/features/dropoff/types/types.dropoff";
import SessionDetailHeader from "./SessionDetailHeader";
import SessionDetailTabs from "./SessionDetailTabs";

export function SessionDetailPanel() {
  const { detailsPanelState, setDetailsPanelState, activeDropSession } =
    useDashboardContext() || {};

  if (detailsPanelState === panelStateKeys.newDropSession)
    return <NewDropOffForm />;
  if (detailsPanelState === panelStateKeys.otp) return <ConfirmPickupPanel />;

  if (
    !activeDropSession ||
    detailsPanelState === panelStateKeys.noActiveSession
  ) {
    return (
      <div className="flex items-center rounded-lg justify-center h-full bg-white dark:bg-zinc-900 p-6 ">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-medium text-lg">No Session Selected</h3>
          <p className="text-sm max-w-xs text-muted-foreground">
            Select a session from the table to view details and manage pickup.
          </p>
        </div>
      </div>
    );
  }

  const {
    unique_code,
    guardian_name,
    guardian_phone,
    drop_offs,
    created_at,
    pickup_status,
  } = activeDropSession;

  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = new Date(created_at).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10">
        <SessionDetailHeader
          unique_code={unique_code}
          pickup_status={pickup_status}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <SessionDetailTabs
          guardian_name={guardian_name}
          drop_offs={drop_offs}
          formattedDate={formattedDate}
          formattedTime={formattedTime}
          guardian_phone={guardian_phone}
        />
      </div>

      {/* Fixed Footer */}
      {pickup_status === "awaiting" && (
        <div className="sticky bottom-0 p-4 border-t border-gray-200 dark:border-gray-800 rounded-b-lg bg-white dark:bg-zinc-900">
          <Button
            className="w-full h-12 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium"
            onClick={() => {
              setDetailsPanelState?.(panelStateKeys.otp);
            }}
          >
            <CheckCircle className="mr-2 h-5 w-5" /> Confirm Pickup
          </Button>
        </div>
      )}
    </div>
  );
}
