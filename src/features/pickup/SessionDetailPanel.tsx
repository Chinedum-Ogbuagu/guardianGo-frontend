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
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 p-6 ">
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
    <div className="h-full flex flex-col bg-white dark:bg-gray-950 shadow-lg  border-l border-gray-200 dark:border-gray-800">
      {/* Header */}
      <SessionDetailHeader
        unique_code={unique_code}
        pickup_status={pickup_status}
      />

      {/* Tabs */}
      <SessionDetailTabs
        guardian_name={guardian_name}
        drop_offs={drop_offs}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
        guardian_phone={guardian_phone}
      />

      {/* Action Footer */}
      {pickup_status === "awaiting" && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
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
