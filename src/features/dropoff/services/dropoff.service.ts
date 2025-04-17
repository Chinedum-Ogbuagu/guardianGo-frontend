/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { apiEndpoints } from "@/lib/ApiEndpoints";

export const createDropOff = async (payload: any) => {
  const response = await api.post(apiEndpoints.dropoff, payload);
  return response.data;
};

export const fetchDropOffs = async () => {
  const response = await api.get("/api/dropoffs");
  return response.data;
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

export const useDropOffs = () => {
  return useQuery({
    queryKey: ["dropoffs"],
    queryFn: fetchDropOffs,
  });
};
