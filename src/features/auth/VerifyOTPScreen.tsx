"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Loader2, CheckCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetUserByPhone } from "../user/user.service";
import { verifyOtpAndLogin } from "./services/auth.service";

export default function VerifyScreen() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const phone = searchParams.get("phone") || "";
  const name = searchParams.get("name") || "";
  const token = searchParams.get("token") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [inputError, setInputError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const { data: userData } = useGetUserByPhone(phone);

  // const inputRefs = useRef([]);

  // Format phone for display
  const formatPhoneForDisplay = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  };

  useEffect(() => {
    if (!phone) {
      toast.error("Missing phone number. Redirecting...");
      router.push("/auth/login");
    }
  }, [phone, router]);

  // Timer for resend functionality
  useEffect(() => {
    const timer =
      timeLeft > 0 &&
      !canResend &&
      setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

    if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft, canResend]);

  // Handle input of OTP code
  const handleCodeChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "").slice(0, 6);
    setCode(numericInput);

    if (inputError) {
      setInputError("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && code.length >= 5) {
      handleVerify();
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      toast.promise(
        fetch("/api/resend-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            name: decodeURIComponent(name),
            purpose: token ? "invite" : "login",
            token: token || undefined,
          }),
        }),
        {
          loading: "Resending verification code...",
          success: "Verification code resent successfully!",
          error: "Failed to resend code. Please try again.",
        }
      );

      // Reset the timer
      setTimeLeft(60);
      setCanResend(false);
    } catch (error) {
      console.error(error);
    } finally {
      setResendLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!/^\d{5,6}$/.test(code)) {
      setInputError("Please enter a valid 5 or 6 digit code");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtpAndLogin({ phone, code });

      // Success animation before redirect
      toast.success("Verification successful!", {
        duration: 2000,
      });

      // Add a slight delay before redirect for better UX
      setTimeout(() => {
        // Save token or user data here if needed
        // localStorage.setItem("auth_token", res.token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", res.token);

        if (res) {
          router.push("/dashboard");
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setInputError("Invalid code. Please check and try again.");
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBackToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6 border border-zinc-200 dark:border-zinc-800">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-zinc-800 dark:text-zinc-100">
            Verify Your Phone
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            Enter the code sent to
          </p>
          <p className="font-medium text-zinc-800 dark:text-zinc-200">
            {formatPhoneForDisplay(phone)}
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={handleCodeChange}
                maxLength={6}
                className={cn(
                  "text-center text-lg py-6 font-mono tracking-widest bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
                  inputError && "border-red-500 focus-visible:ring-red-500"
                )}
                onKeyDown={handleKeyDown}
              />
            </div>
            {inputError && (
              <p className="text-red-500 text-xs text-center">{inputError}</p>
            )}
          </div>

          <Button
            onClick={handleVerify}
            disabled={loading || code.length < 5}
            className="w-full py-6 text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Verify & Continue
                <CheckCircle className="ml-2 h-5 w-5" />
              </span>
            )}
          </Button>

          <div className="text-center pt-2">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200"
              >
                {resendLoading ? (
                  <span className="flex items-center justify-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Resending...
                  </span>
                ) : (
                  "Resend code"
                )}
              </button>
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Resend code in{" "}
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {timeLeft}s
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={goBackToLogin}
            className="text-sm flex items-center justify-center w-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-200"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
