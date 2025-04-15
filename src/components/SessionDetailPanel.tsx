"use client";

import { useDashboardContext } from "./dashboard-context";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Clock,
  User,
  Users,
  AlertCircle,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { NewDropOffForm } from "./NewDropOffForm";

export function SessionDetailPanel() {
  const { activeSession } = useDashboardContext();

  if (activeSession === "new") {
    return <NewDropOffForm />;
  }

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
    ],
    createdAt,
  } = activeSession;

  const isAwaitingPickup = status === "awaiting";

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 pb-0">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Drop Session</h2>
            <p className="text-muted-foreground text-sm">
              Details and pickup management
            </p>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">
              PICKUP CODE
            </div>
            <Badge
              variant="outline"
              className="text-lg px-4 py-1 font-mono font-bold"
            >
              {code}
            </Badge>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <User className="mr-2 h-5 w-5" />
              Guardian Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">NAME</div>
                <div className="font-medium">{guardianName}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">PHONE</div>
                <div className="font-medium">{phone}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  CHILDREN
                </div>
                <div className="font-medium">{childCount}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  TIMESTAMP
                </div>
                <div className="font-medium text-sm">
                  {new Date(createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Children
          </h3>
          <Badge
            className={`px-3 py-1 ${
              isAwaitingPickup
                ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                : "bg-green-100 text-green-800 hover:bg-green-200"
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
      </div>

      <div className="px-6 overflow-y-auto flex-grow">
        <div className="space-y-3">
          {children.map((child, idx) => (
            <Card key={idx} className="overflow-hidden">
              <div className="flex items-stretch">
                <div
                  className={`w-1.5 ${
                    child.hasBag ? "bg-blue-500" : "bg-gray-200"
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
                    <div className="flex items-center">
                      {child.hasBag && (
                        <div className="bg-blue-50 text-blue-700 p-1.5 rounded text-xs flex items-center mr-1">
                          <Briefcase className="h-3.5 w-3.5 mr-1" /> Has Bag
                        </div>
                      )}
                    </div>
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

      {isAwaitingPickup && (
        <div className="p-6 pt-4 mt-auto">
          <Separator className="mb-4" />
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12">
            <CheckCircle className="mr-2 h-5 w-5" /> Confirm Pickup
          </Button>
        </div>
      )}
    </div>
  );
}
