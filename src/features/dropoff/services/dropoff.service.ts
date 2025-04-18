/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { apiEndpoints } from "@/lib/ApiEndpoints";
import { IDropSession } from "../types/types.dropoff";

export const createDropOff = async (payload: any) => {
  const response = await api.post(apiEndpoints.dropoff, payload);
  return response.data;
};


export const getDropSessionsByDate = async (date: string): Promise<IDropSession[]> => {
  const response = await api.get(`/api/dropoff/sessions?date=${date}`);
  return response.data.data;
};

export const useCreateDropOff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDropOff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dropoffs"] });
    },
  });
};


export const useDropSessionsByDate = (date: string) => {
  return useQuery({
    queryKey: ["drop-sessions", date],
    queryFn: () => getDropSessionsByDate(date),
    enabled: !!date, 
  });
};