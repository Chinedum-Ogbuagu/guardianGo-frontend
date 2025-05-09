"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "../../components/ui/button";
import { useDashboardContext } from "../../lib/dashboard-context";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";
import { useConfirmPickupSession } from "./services/pickup.service";
import { useQueryClient } from "@tanstack/react-query";
import { panelStateKeys } from "@/features/dropoff/types/types.dropoff";
import { useSendOtp, useVerifyOtp } from "@/features/otp/otp.service";
import {
  ArrowLeft,
  Clock,
  RefreshCw,
  Check,
  SendHorizontal,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function ConfirmPickupPanel() {
  const {
    setActiveDropSession,
    activeDropSession: dropSession,
    setDetailsPanelState,
  } = useDashboardContext() || {};
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: confirmPickup } = useConfirmPickupSession();
  const { mutateAsync: sendOtp } = useSendOtp();
  const { mutateAsync: verifyOtp } = useVerifyOtp();

  const handleBack = () => {
    setDetailsPanelState?.(panelStateKeys.dropDetails);
  };

  const sendOTP = async () => {
    setLoading(true);
    toast.info(`Sending OTP to: ${dropSession?.guardian_phone ?? "unknown"}`);
    try {
      await sendOtp({
        phone:
          dropSession?.guardian_phone ??
          (() => {
            throw new Error("guardian_phone is undefined");
          })(),
        drop_off_id: dropSession?.id,
        purpose: "pickup",
      });

      toast.success("OTP sent successfully!");
      setOtpSent(true);
      setTimeLeft(300);

      // Start the timer
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error("Failed to send OTP: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setVerifyLoading(true);
    try {
      await verifyOtp({
        phone:
          dropSession?.guardian_phone ??
          (() => {
            throw new Error("guardian_phone is undefined");
          })(),
        code: otp,
        purpose: "pickup",
      });

      toast.success("OTP verified successfully!");
      handleManualConfirm();
    } catch (error) {
      toast.error("Failed to verify OTP: " + (error as Error).message);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleManualConfirm = async () => {
    setConfirmLoading(true);
    try {
      await confirmPickup({
        dropSessionId:
          dropSession?.id ??
          (() => {
            throw new Error("dropSessionId is undefined");
          })(),
        payload: {
          verified_by: JSON.parse(localStorage.getItem("user") || "{}")?.ID,
          notes: "Picked up on time",
        },
      });

      toast.success("Pickup confirmed ✅");
      queryClient.invalidateQueries({
        queryKey: ["drop-sessions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dropOffs"],
      });

      setActiveDropSession?.(null);
      setDetailsPanelState?.(panelStateKeys.noActiveSession);
    } catch (error) {
      toast.error("Failed to confirm pickup: " + (error as Error).message);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className="h-full my-auto rounded-lg shadow-md ">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="hover:bg-transparent hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h2 className="text-lg font-semibold">Confirm Pickup</h2>
        <div className="w-10"></div> {/* Empty div for flex spacing */}
      </div>

      <div className="px-4 pb-4">
        <Card className="shadow-sm">
          <CardHeader className="p-4 flex items-center justify-center bg-muted/30">
            <div className="rounded-full w-24 h-24 flex items-center justify-center bg-muted overflow-hidden">
              {dropSession?.photo_url ? (
                <Image
                  src={dropSession.photo_url}
                  alt="Child"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-muted-foreground/60" />
              )}
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Guardian</span>
                <Badge
                  variant="outline"
                  className="px-2 py-1 text-xs font-normal"
                >
                  {dropSession?.guardian_name || "Not available"}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Contact</span>
                <Badge
                  variant="outline"
                  className="px-2 py-1 text-xs font-normal"
                >
                  {dropSession?.guardian_phone || "Not available"}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Verification Code</span>
                {timeLeft > 0 && (
                  <div className="flex items-center text-xs text-amber-500 dark:text-amber-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      {Math.floor(timeLeft / 60)}:
                      {String(timeLeft % 60).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>

              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otp}
                onChange={(value) => setOtp(value)}
                className="w-full justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
              </InputOTP>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sendOTP}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <SendHorizontal className="h-4 w-4 mr-1" />
                  )}
                  {otpSent ? "Resend OTP" : "Send OTP"}
                </Button>

                <Button
                  onClick={verifyOTP}
                  disabled={verifyLoading || otp.length < 5 || !otpSent}
                  size="sm"
                  className="flex-1"
                >
                  {verifyLoading ? (
                    <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 mr-1" />
                  )}
                  Verify
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Manual verification:
              </p>
              <Button
                variant="secondary"
                onClick={handleManualConfirm}
                disabled={confirmLoading}
                className="w-full"
              >
                {confirmLoading ? (
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-1" />
                )}
                Confirm Pickup
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Use only when OTP verification isn&apos;t possible
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
