"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendOtp } from "../otp/otp.service";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const formatPhone = (value: string) => value.replace(/\D/g, "").slice(0, 11); // numeric, max 11 digits

  const isValidPhone = (value: string) => /^0\d{10}$/.test(value); // must start with 0 and be 11 digits

  const handleSubmit = async () => {
    const cleanedPhone = formatPhone(phone);

    if (!isValidPhone(cleanedPhone)) {
      toast.error("Phone number must start with 0 and be 11 digits");
      return;
    }

    return toast.promise(
      await sendOtp({ phone: cleanedPhone, purpose: "login" }),
      {
        loading: "Sending OTP...",
        success: () => {
          router.push(`/auth/verify?phone=${cleanedPhone}`);
          return "OTP sent to your phone!";
        },
        error: (error: unknown) => {
          console.error(error);
          if (axios.isAxiosError(error) && error.response) {
            return `Failed to send OTP: ${
              error.response.data.error || "Please try again."
            }`;
          }
          return "Failed to send OTP";
        },
      }
    );
  };

  return (
    <div className="max-w-sm mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

      <Input
        type="tel"
        placeholder="Enter 11-digit phone number"
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        className="mb-4"
        maxLength={11}
      />

      <Button onClick={handleSubmit} className="w-full">
        Send OTP
      </Button>
    </div>
  );
}
