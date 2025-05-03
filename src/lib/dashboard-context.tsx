"use client";
import { useDropSessionsByDate } from "@/features/dropoff/services/dropoff.service";
import {
  IDropSession,
  PaginatedResponse,
} from "@/features/dropoff/types/types.dropoff";
import { createContext, useContext, useState } from "react";
import { format } from "date-fns";

interface DashboardContextType {
  detailsPanelState: string | null;
  setDetailsPanelState: React.Dispatch<React.SetStateAction<string | null>>;
  activeDropSession: IDropSession | null;
  setActiveDropSession: React.Dispatch<
    React.SetStateAction<IDropSession | null>
  >;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  dropSessionsBydate: PaginatedResponse<IDropSession> | undefined;
  isLoadingDropSessionsByDate: boolean;
  isErrorDropSessionsByDate: boolean;
  refetchDropSessionsByDate: () => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const today = format(selectedDate, "yyyy-MM-dd");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: dropSessionsBydate,
    isLoading: isLoadingDropSessionsByDate,
    isError: isErrorDropSessionsByDate,
    refetch: refetchDropSessionsByDate,
  } = useDropSessionsByDate(today, page, pageSize);

  return (
    <DashboardContext.Provider
      value={{
        activeDropSession,
        setActiveDropSession,
        detailsPanelState,
        setDetailsPanelState,
        selectedDate,
        setSelectedDate,
        dropSessionsBydate,
        isLoadingDropSessionsByDate,
        isErrorDropSessionsByDate,
        refetchDropSessionsByDate,
        setPage,
        page,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
