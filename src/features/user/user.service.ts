import { api } from "@/lib/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export async function inviteUser({
  name,
  phone,
  role,
  church_id,
}: {
  name: string;
  phone: string;
  role: string;
  church_id: string;
}) {
  const response = await api.post("/api/users/register", {
    name,
    phone,
    role,
    church_id,
  });
  return response.data;
}
export async function getUserByPhone(phone: string) {
  const response = await api.get(`/api/users/by-phone/${phone}`);
  return response.data;
}

export const useGetUserByPhone = (phone: string) => {
  return useQuery({
    queryKey: ["userDetailsByPhone", phone],
    queryFn: () => getUserByPhone(phone),
    enabled: !!phone,
  });
};

export const useInviteUser = () => {
  return useMutation({
    mutationFn: inviteUser,
    ...Option,
  });
};
