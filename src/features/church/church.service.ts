import { api } from "@/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface CreateChurchPayload {
  name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  logo_url?: string;
}

export async function createChurch(data: CreateChurchPayload) {
  const res = await api.post("/church", data);
  return res.data;
}

export async function getAllChurches() {
  const res = await api.get("/church");
  return res.data;
}

export const useCreateChurch = () => {
  return useMutation({
    mutationFn: (payload: CreateChurchPayload) => createChurch(payload),
  });
};

export const useGetAllChurches = () => {
  return useQuery({
    queryKey: ["churches"],
    queryFn: getAllChurches,
  });
};
