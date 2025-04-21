import { api } from "@/lib/api-client";

import { useMutation } from "@tanstack/react-query";

type ConfirmPickupPayload = {
  verified_by: number;
  notes?: string;
};

export async function confirmPickupSession(
  dropSessionId: number,
  payload: ConfirmPickupPayload
) {
  const res = await api.post(`/api/dropoff/confirm/${dropSessionId}`, payload);
  return res.data;
}

export function useConfirmPickupSession() {
  return useMutation({
    mutationFn: ({
      dropSessionId,
      payload,
    }: {
      dropSessionId: number;
      payload: ConfirmPickupPayload;
    }) => confirmPickupSession(dropSessionId, payload),
  });
}
