import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

type requestOtpPayload = {
  phone: number;
  name: string;
  drop_off_id?: number;
  purpose?: string;
  token?: string;
};

type VerifyOtpAndLoginPayload = {
  phone: number;
  code: string;
  purpose?: string;
};

export async function requestOtp({
  phone,
  drop_off_id,
  name,
  purpose = "",
  token = "",
}: requestOtpPayload) {
  const res = await api.post("/api/auth/request-otp", {
    phone,
    drop_off_id,
    purpose,
    name,
    token,
  });
  return res.data;
}

export async function verifyOtpAndLogin({
  phone,
  code,
  purpose = "",
}: VerifyOtpAndLoginPayload) {
  const res = await api.post("/api/auth/verify-otp", {
    phone,
    code,
    purpose,
  });
  return res.data; // Expected: { user, token }
}

export function useRequestOtp() {
  return useMutation({
    mutationFn: (payload: requestOtpPayload) => requestOtp(payload),
  });
}

export function useVerifyOtpAndLogin() {
  return useMutation({
    mutationFn: (payload: VerifyOtpAndLoginPayload) =>
      verifyOtpAndLogin(payload),
  });
}
