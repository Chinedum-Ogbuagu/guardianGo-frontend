"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { verifyOtp } from "@/api/otp";
import { useAuth } from "./useAuth";

export default function VerifyOTPScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const phone = params.get("phone") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const isValid = await verifyOtp(phone, code);
      if (isValid) {
        login({ phone }); // You can also load attendant details here
        router.push("/dashboard");
      } else {
        setError("Invalid OTP");
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-4">Enter OTP</h1>
      <p className="text-muted-foreground mb-4">Sent to {phone}</p>
      <Input
        type="text"
        placeholder="Enter OTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
