"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { verifyOtp } from "../otp/otp.service";

export default function VerifyScreen() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const phone = searchParams.get("phone") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!phone) {
      toast.error("Missing phone number. Redirecting...");
      router.push("/auth/login");
    }
  }, [phone]);

  const handleVerify = async () => {
    if (!/^\d{5,6}$/.test(code)) {
      toast.error("Invalid code. Enter 5 or 6 digits.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({ phone, code });
      toast.success("Logged in successfully");

      // Save token or user to localStorage if returned
      // if (res?.token) {
      //   localStorage.setItem("auth_token", res.token);
      // }

      if (res) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("OTP Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Verify OTP</h1>

      <Input
        type="text"
        placeholder="Enter your OTP code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mb-4"
        maxLength={6}
      />

      <Button onClick={handleVerify} disabled={loading} className="w-full">
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>
    </div>
  );
}
