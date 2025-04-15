/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useState } from "react";

const DashboardContext = createContext<any>(null);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeSession, setActiveSession] = useState(null);

  return (
    <DashboardContext.Provider value={{ activeSession, setActiveSession }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
