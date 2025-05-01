"use client";

import { Card, CardContent } from "../../components/ui/card";
import { Users, Clock, CheckCircle } from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";
import {
  getTotalDropOffs,
  getTotalDropOffsForAwaitingSessions,
  getTotalDropOffsForCompletedSessions,
} from "./utils/utils";
import { useDashboardContext } from "@/lib/dashboard-context";

export function DropSessionStats() {
  const {
    dropSessionsBydate,
    isLoadingDropSessionsByDate,
    isErrorDropSessionsByDate,
  } = useDashboardContext() || {};

  const totalDropOffSessions = getTotalDropOffs(dropSessionsBydate);
  const awaitingPickupSessions =
    getTotalDropOffsForAwaitingSessions(dropSessionsBydate);
  const completedPickupSessions =
    getTotalDropOffsForCompletedSessions(dropSessionsBydate);

  const SkeletonCard = () => (
    <Card className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 ">
      <CardContent className="py-3">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-2 bg-slate-200 dark:bg-zinc-800 w-24 mb-2" />
            <Skeleton className="h-4 bg-slate-200 dark:bg-zinc-800 w-12" />
          </div>
          <Skeleton className="h-8 w-8 bg-slate-200 dark:bg-zinc-800 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {/* Total */}
      {isLoadingDropSessionsByDate || isErrorDropSessionsByDate ? (
        <SkeletonCard />
      ) : (
        <Card className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 ">
          <CardContent className="py-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total Drop-Offs
                </p>
                <p className="text-xl font-medium text-slate-900 dark:text-slate-100">
                  {totalDropOffSessions}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-500 dark:text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Awaiting Pickup */}
      {isLoadingDropSessionsByDate || isErrorDropSessionsByDate ? (
        <SkeletonCard />
      ) : (
        <Card className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 ">
          <CardContent className="py-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Awaiting Pickup
                </p>
                <p className="text-xl font-medium text-slate-900 dark:text-slate-100">
                  {awaitingPickupSessions}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Clock className="h-4 w-4 text-amber-500 dark:text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Picked Up */}
      {isLoadingDropSessionsByDate || isErrorDropSessionsByDate ? (
        <SkeletonCard />
      ) : (
        <Card className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 ">
          <CardContent className="py-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Picked Up
                </p>
                <p className="text-xl font-medium text-slate-900 dark:text-slate-100">
                  {completedPickupSessions}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
