import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { apiEndpoints } from "@/lib/ApiEndpoints";
import {
  DropOffDTO,
  IDropSession,
  IGuardianWithPhone,
  PaginatedResponse,
} from "../types/types.dropoff";
import { Phone } from "lucide-react";
import { RQueryOptions } from "@/lib/utils";

export const createDropOff = async (payload: DropOffDTO) => {
  const response = await api.post(apiEndpoints.dropoff, payload);
  return response.data;
};

export const getDropSessionByCode = async (code: string) => {
  const response = await api.get(`/api/dropoff/session/code/${code}`);
  return response.data;
};

type DropSessionsResponse = PaginatedResponse<IDropSession>;

export const getDropSessionsByDate = async (
  date: string,
  page?: number,
  pageSize?: number
): Promise<DropSessionsResponse> => {
  let url = `/api/dropoff/sessions?date=${date}`;
  if (page && pageSize) {
    url += `&page=${page}&page_size=${pageSize}`;
  }
  const response = await api.get(url);
  return response.data as DropSessionsResponse;
};
export const getGuardianByPhone = async (phone: string) => {
  const response = await api.get(`/api/guardians/with-children/${phone}`);
  return response.data;
};

export const useCreateDropOff = () => {
  return useMutation({
    mutationFn: createDropOff,
  });
};

export const useDropSessionsByDate = (
  date: string,
  page?: number,
  pageSize?: number
) => {
  return useQuery<DropSessionsResponse, Error>({
    queryKey: ["drop-sessions", date, page, pageSize],
    queryFn: () => getDropSessionsByDate(date, page, pageSize),
    enabled: !!date,
  });
};

export const useGetGuardianByPhone = (
  phone: string,
  options?: RQueryOptions<IGuardianWithPhone>
) => {
  return useQuery({
    queryKey: ["guardianDetailsByPhone", Phone],
    queryFn: () => getGuardianByPhone(phone),
    enabled: false,
    retry: false,
    ...options,
  });
};

export const useGetDropSessionByCode = (code: string) => {
  return useQuery({
    queryKey: ["drop-session", code],
    queryFn: () => getDropSessionByCode(code),
    enabled: !!code,
  });
};
