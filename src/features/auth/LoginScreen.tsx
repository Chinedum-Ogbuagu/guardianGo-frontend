"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useGetUserByPhone } from "../user/user.service";

import { Phone, User, Key, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRequestOtp } from "./services/auth.service";
import axios from "axios";

export default function LoginScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteUsed, setInviteUsed] = useState(false);
  const [showInviteField, setShowInviteField] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    invite: "",
  });
  const { mutateAsync: requestOtp } = useRequestOtp();

  const formatPhone = useCallback(
    (value: string) => value.replace(/\D/g, "").slice(0, 11),
    []
  );
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUserByPhone(
    formatPhone(phone).length === 11 ? formatPhone(phone) : ""
  );

  const validatePhone = useCallback(
    (value: string) => {
      const formatted = formatPhone(value);
      if (!formatted) return "";
      return /^0\d{10}$/.test(formatted)
        ? ""
        : "Phone number must start with 0 and be 11 digits";
    },
    [formatPhone]
  );

  const validateName = (value: string) => {
    if (!value.trim()) return "";
    return /^[a-zA-Z\s]+$/.test(value.trim())
      ? ""
      : "Name should contain only letters and spaces";
  };

  // Format phone number with spaces for better readability
  const formatPhoneForDisplay = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  };
  const fetchInviteDetails = useCallback(
    async (code: string) => {
      try {
        setIsSubmitting(true);
        const res = await axios.get(`/api/invite/${code}`);
        if (res.data) {
          setName(res.data.name || "");
          setPhone(res.data.phone || "");
          setInviteUsed(true);
          toast.success("Invite code applied successfully!");
        }
      } catch {
        setFormErrors({
          ...formErrors,
          invite: "Invalid invite code",
        });
        setTimeout(() => {
          setFormErrors({
            ...formErrors,
            invite: "",
          });
        }, 3000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formErrors]
  );

  useEffect(() => {
    if (inviteCode.trim().length >= 6 && !inviteUsed) {
      fetchInviteDetails(inviteCode.trim());
    }
  }, [fetchInviteDetails, inviteCode, inviteUsed]);

  useEffect(() => {
    // Real-time validation
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      name: validateName(name),
      phone: validatePhone(phone),
    }));
  }, [name, phone, validatePhone]);

  // Auto-fill name if user exists
  useEffect(() => {
    if (userData && userData.name && !inviteUsed && !name) {
      setName(userData.name);
    }
  }, [userData, inviteUsed, name]);

  const handleSubmit = async () => {
    const cleanedPhone = formatPhone(phone);

    // Validate inputs
    const nameError = name.trim()
      ? validateName(name)
      : "Please enter your name";
    const phoneError = cleanedPhone
      ? validatePhone(cleanedPhone)
      : "Please enter your phone number";

    if (nameError || phoneError) {
      setFormErrors({
        name: nameError,
        phone: phoneError,
        invite: formErrors.invite,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      toast.promise(
        requestOtp({
          phone: cleanedPhone,
          name: name.trim(),
          purpose: inviteCode ? "invite" : "login",
          token: inviteCode || undefined,
        }),
        {
          loading: "Sending verification code...",
          success: () => {
            router.push(
              `/auth/verify?phone=${cleanedPhone}&name=${encodeURIComponent(
                name.trim()
              )}${inviteCode ? `&token=${inviteCode}` : ""}`
            );
            return "Verification code sent to your phone!";
          },
          error: (error) => {
            if (axios.isAxiosError(error) && error.response) {
              return `${error.response.data.error || "Please try again."}`;
            }
            return "Failed to send verification code";
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Check if the user exists with the entered phone number
  const userExists = !!userData;

  // Disable the button if:
  // 1. Form is submitting
  // 2. Phone number is valid but user doesn't exist (unless invite code is used)
  // 3. Form has validation errors
  const isButtonDisabled =
    isSubmitting ||
    isUserLoading ||
    (formatPhone(phone).length === 11 && !userExists && !inviteCode) ||
    !!formErrors.name ||
    !!formErrors.phone;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6 border border-zinc-200 dark:border-zinc-800">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-zinc-800 dark:text-zinc-100">
            Welcome
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Sign in with your phone number to continue
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={inviteUsed}
                className={cn(
                  "pl-10 py-6 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
                  formErrors.name && "border-red-500 focus-visible:ring-red-500"
                )}
                onKeyDown={handleKeyDown}
              />
            </div>
            {formErrors.name && (
              <p className="text-red-500 text-xs ml-1">{formErrors.name}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
              <Input
                type="tel"
                placeholder="Phone number (e.g. 08012345678)"
                value={formatPhoneForDisplay(phone)}
                onChange={(e) => setPhone(e.target.value.replace(/\s/g, ""))}
                className={cn(
                  "pl-10 py-6 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
                  formErrors.phone &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
                maxLength={13} // Accounting for spaces
                disabled={inviteUsed}
                onKeyDown={handleKeyDown}
              />
            </div>
            {formErrors.phone && (
              <p className="text-red-500 text-xs ml-1">{formErrors.phone}</p>
            )}
            {formatPhone(phone).length === 11 &&
              !userError &&
              !userExists &&
              !inviteCode && (
                <p className="text-amber-500 text-xs ml-1">
                  No account found with this phone number. Please use an invite
                  code.
                </p>
              )}
          </div>

          {showInviteField && (
            <div className="space-y-1">
              <div className="relative">
                <Key className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Invite Code"
                  value={inviteCode}
                  onChange={(e) => {
                    setInviteUsed(false);
                    setInviteCode(e.target.value.toUpperCase());
                  }}
                  className={cn(
                    "pl-10 py-6 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
                    formErrors.invite &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                  onKeyDown={handleKeyDown}
                />
              </div>
              {formErrors.invite && (
                <p className="text-red-500 text-xs ml-1">{formErrors.invite}</p>
              )}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className={cn(
              "w-full py-6 text-base font-medium transition-all duration-200",
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            )}
            disabled={isButtonDisabled}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </span>
            ) : formatPhone(phone).length === 11 &&
              !userExists &&
              !inviteCode ? (
              <span className="flex items-center justify-center">
                Account Required
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            )}
          </Button>

          <div className="text-center pt-2 ">
            <button
              type="button"
              onClick={() => setShowInviteField((prev) => !prev)}
              className="text-sm cursor-pointer text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200"
            >
              {showInviteField
                ? "Hide invite code"
                : "Have an invite code? Click here"}
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 pt-4">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
