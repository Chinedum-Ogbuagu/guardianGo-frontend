"use client";

import { useDashboardContext } from "./dashboard-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import {
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Briefcase,
  User,
} from "lucide-react";
import { NewDropOffForm } from "./NewDropOffForm";
import { ConfirmPickupPanel } from "./ConfirmPickupPanel";

export function SessionDetailPanel() {
  const { activeSession, setActiveSession } = useDashboardContext();

  if (activeSession === "new") return <NewDropOffForm />;
  if (activeSession?.status === "otp_verification")
    return <ConfirmPickupPanel session={activeSession} />;

  if (!activeSession) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-6">
        <div className="text-center space-y-2">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="font-medium text-lg">No Session Selected</h3>
          <p className="text-sm max-w-xs">
            Select a session from the list to view details and manage pickup.
          </p>
        </div>
      </div>
    );
  }

  const {
    code,
    guardianName,
    phone,
    childCount,
    status,
    children = [
      {
        name: "Joshua",
        className: "Toddlers",
        hasBag: true,
        note: "Allergic to peanuts",
      },
      { name: "Emeka", className: "Nursery", hasBag: false, note: "" },
      {
        name: "Johnson",
        className: "Toddlers",
        hasBag: true,
        note: "Allergic to water",
      },
    ],
    createdAt,
  } = activeSession;

  const isAwaitingPickup = status === "awaiting";

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="p-6 pb-4 border-b border-muted">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-2xl font-semibold">Drop Session</h2>
            <p className="text-muted-foreground text-sm">
              Details & pickup management
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">PICKUP CODE</div>
            <Badge
              variant="outline"
              className="font-mono font-semibold text-lg px-2 py-1"
            >
              {code}
            </Badge>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Guardian Info */}
        <Card className="border p-3 border-muted">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" /> Guardian Info
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Name</div>
              <div className="font-medium">{guardianName}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Phone</div>
              <div className="font-medium">{phone}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Children</div>
              <div className="font-medium">{childCount}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">
                Timestamp
              </div>
              <div className="font-medium text-sm">
                {new Date(createdAt).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Children */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Children
            </h3>
            <Badge
              className={`px-3 py-1 ${
                isAwaitingPickup
                  ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              }`}
            >
              {isAwaitingPickup ? (
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

          <div className="space-y-3">
            {children.map((child, idx) => (
              <Card
                key={idx}
                className="border border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <div className="flex items-stretch">
                  <div
                    className={`w-1.5 ${
                      child.hasBag ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{child.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Class: {child.className}
                        </p>
                      </div>
                      {child.hasBag && (
                        <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          <Briefcase className="h-3.5 w-3.5 mr-1" /> Has Bag
                        </div>
                      )}
                    </div>
                    {child.note && (
                      <div className="mt-2 text-sm flex items-start bg-amber-50 p-2 rounded border border-amber-100">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5 mt-0.5 shrink-0" />
                        <p className="text-amber-800">{child.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION */}
      {isAwaitingPickup && (
        <div className="p-6 border-t border-muted">
          <Button
            className="w-full bg-primary text-primary-foreground h-12"
            onClick={() =>
              setActiveSession({ ...activeSession, status: "otp_verification" })
            }
          >
            <CheckCircle className="mr-2 h-5 w-5" /> Confirm Pickup
          </Button>
        </div>
      )}
    </div>
  );
}
