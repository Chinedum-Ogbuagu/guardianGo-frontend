"use client";

import { Card, CardContent } from "../../../components/ui/card";
import { Users, Clock, CheckCircle } from "lucide-react";

export function DropSessionStats() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {/* Total */}
      <Card className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 ">
        <CardContent className="py-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total Drop-Offs
              </p>
              <p className="text-xl font-medium text-slate-900 dark:text-slate-100">
                12
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-500 dark:text-slate-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Awaiting Pickup */}
      <Card className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 ">
        <CardContent className="py-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Awaiting Pickup
              </p>
              <p className="text-xl font-medium text-slate-900 dark:text-slate-100">
                4
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-500 dark:text-slate-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Picked Up */}
      <Card className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 ">
        <CardContent className="py-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Picked Up
              </p>
              <p className="text-xl font-medium text-slate-900 dark:text-slate-100">
                8
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-slate-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
