"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDashboardContext } from "./dashboard-context";

export function ConfirmPickupPanel({ session }) {
  const { setActiveSession } = useDashboardContext();
  const [step, setStep] = useState<"start" | "otp" | "success">("start");
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 min
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    setLoading(true);
    try {
      // TODO: call backend to send OTP here
      console.log("Sending OTP to:", session.phone);
      setStep("otp");
      setTimeLeft(300);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      // TODO: call backend to verify OTP
      console.log("Verifying OTP:", otp);
      setStep("success");
      // update session state or refetch table
      setActiveSession(null);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    sendOTP();
  };

  useEffect(() => {
    if (step === "otp" && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timeLeft]);

  if (step === "success") {
    return (
      <div className="text-center p-6 space-y-4">
        <h2 className="text-xl font-semibold text-green-700">
          Pickup Confirmed ✅
        </h2>
        <p className="text-muted-foreground">
          You can now return to the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-lg font-semibold">Confirm Pickup</h2>

      {step === "start" && (
        <>
          <p className="text-sm text-muted-foreground">
            An OTP will be sent to the guardian's phone number:{" "}
            <strong>{session.phone}</strong>
          </p>
          <Button onClick={sendOTP} disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </>
      )}

      {step === "otp" && (
        <>
          <p className="text-sm text-muted-foreground">
            Enter the OTP sent to <strong>{session.phone}</strong>
          </p>

          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="font-mono text-lg tracking-widest"
          />

          <div className="text-xs text-muted-foreground">
            OTP expires in: {Math.floor(timeLeft / 60)}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>

          <div className="flex justify-between mt-2">
            <Button variant="outline" onClick={handleResend} disabled={loading}>
              Resend OTP
            </Button>
            <Button onClick={verifyOTP} disabled={loading || otp.length < 4}>
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Can't verify via OTP?
            </p>
            <Button
              variant="destructive"
              onClick={() => {
                // TODO: call backend to log manual verify
                setStep("success");
                setActiveSession(null);
              }}
              className="w-full"
            >
              ✅ Manually Confirm Pickup
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
