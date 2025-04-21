/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { apiEndpoints } from "@/lib/ApiEndpoints";
import { IDropSession, IGuardianWithPhone } from "../types/types.dropoff";
import { Phone } from "lucide-react";
import { RQueryOptions } from "@/lib/utils";

export const createDropOff = async (payload: any) => {
  const response = await api.post(apiEndpoints.dropoff, payload);
  return response.data;
};


export const getDropSessionsByDate = async (date: string): Promise<IDropSession[]> => {
  const response = await api.get(`/api/dropoff/sessions?date=${date}`);
  return response.data.data;
};
export const getGuardianByPhone = async (phone: string ) => {
  const response = await api.get(`/api/guardians/with-children/${phone}`);
  return response.data
}

export const useCreateDropOff = () => {
  return useMutation({
    mutationFn: createDropOff,    
  });
};


export const useDropSessionsByDate = (date: string) => {
  return useQuery({
    queryKey: ["drop-sessions", date],
    queryFn: () => getDropSessionsByDate(date),
    enabled: !!date, 
  });
};

export const useGetGuardianByPhone = (phone: string,  options?: RQueryOptions<IGuardianWithPhone>) => {
  return useQuery({
    queryKey: ["guardianDetailsByPhone", Phone],
    queryFn: () => getGuardianByPhone(phone),
    enabled: false,
    retry: false,
    ...options
  })
}