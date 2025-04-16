"use client";

import { Card, CardContent } from "./ui/card";
import { Users, AlertTriangle, CheckCircle } from "lucide-react";

export function DropSessionStats() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <Card className="shadow-sm">
        <CardContent className="py-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Total Drop-Offs</p>
              <p className="text-xl font-bold">12</p>
            </div>
            <Users className="h-6 w-6 text-primary/20" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-yellow-50 shadow-sm">
        <CardContent className="py-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-yellow-800/70">Awaiting Pickup</p>
              <p className="text-xl font-bold text-yellow-800">4</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-yellow-500/30" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50 shadow-sm">
        <CardContent className="py-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-green-800/70">Picked Up</p>
              <p className="text-xl font-bold text-green-800">8</p>
            </div>
            <CheckCircle className="h-6 w-6 text-green-500/30" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
