"use client";
import { IDropSession } from "@/features/dropoff/types/types.dropoff";
import { createContext, useContext, useState } from "react";

interface DashboardContextType {
  detailsPanelState: string | null;
  setDetailsPanelState: React.Dispatch<React.SetStateAction<string | null>>;
  activeDropSession: IDropSession | null;
  setActiveDropSession: React.Dispatch<
    React.SetStateAction<IDropSession | null>
  >;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeDropSession, setActiveDropSession] =
    useState<IDropSession | null>(null);
  const [detailsPanelState, setDetailsPanelState] = useState<string | null>(
    null
  );

  return (
    <DashboardContext.Provider
      value={{
        activeDropSession,
        setActiveDropSession,
        detailsPanelState,
        setDetailsPanelState,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
