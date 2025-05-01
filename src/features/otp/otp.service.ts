import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

type SendOtpPayload = {
  phone: number;
  drop_off_id?: number;
  purpose?: string;
};

type VerifyOtpPayload = {
  phone: number;
  code: string;
  purpose?: string;
};

export async function sendOtp({
  phone,
  drop_off_id,
  purpose = "",
}: SendOtpPayload) {
  const res = await api.post("/api/otp/send", {
    phone,
    drop_off_id,
    purpose,
  });
  return res.data;
}

export async function verifyOtp({
  phone,
  code,
  purpose = "",
}: VerifyOtpPayload) {
  const res = await api.post("/api/otp/verify", {
    phone,
    code,
    purpose,
  });
  return res.data; // Expected: { user, token }
}

export function useSendOtp() {
  return useMutation({
    mutationFn: (payload: SendOtpPayload) => sendOtp(payload),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
  });
}
