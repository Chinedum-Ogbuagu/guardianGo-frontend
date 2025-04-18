"use client";
import { useDashboardContext } from "./dashboard-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { panelStateKeys } from "@/features/dropoff/types/types.dropoff";

export function DropSessionSearch({
  onChange,
}: {
  onChange: (term: string) => void;
}) {
  const { setDetailsPanelState } = useDashboardContext() || {
    setDetailsPanelState: () => {},
  };
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by phone or code..."
          className="pl-9 pr-4"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        onClick={() => setDetailsPanelState(panelStateKeys.newDropSession)}
      >
        <Plus className="h-4 w-4 mr-1" /> New Drop-Off
      </Button>
    </div>
  );
}
