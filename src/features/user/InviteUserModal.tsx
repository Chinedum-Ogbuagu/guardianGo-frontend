"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { inviteUser } from "./user.service";
import InviteUserForm from "./InviteUserForm";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { JWTPayload } from "@/components/SidebarStats";

export function InviteUserModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [userRole, setuserRole] = useState("");
  const [churchId, setChurchId] = useState<string>("");

  const mutation = useMutation({
    mutationFn: inviteUser,
    onSuccess: () => {
      onOpenChange(false);
      setName("");
      setPhone("");
      setuserRole("");
      if (userRole === "super_admin") setChurchId("");
    },
  });
  useEffect(() => {
    const authToken = Cookies.get("auth_token");

    if (authToken) {
      try {
        const decodedToken = jwtDecode<JWTPayload>(authToken);
        setuserRole(decodedToken?.role || "");
        setChurchId(decodedToken?.church_id || "");
        console.log({ userRole, churchId });
      } catch (error) {
        toast.error("Error decoding JWT:");
        console.error("Error decoding JWT:", error);
        // Handle invalid token, e.g., redirect to login or clear cookie
      }
    }
  }, []);
  const handleSubmit = () => {
    mutation.mutate({
      name,
      phone,
      role: userRole,
      church_id: churchId,
    });
  };

  return (
    <InviteUserForm
      open={open}
      onOpenChange={onOpenChange}
      name={name}
      setName={setName}
      phone={phone}
      setPhone={setPhone}
      role={userRole}
      setRole={setuserRole}
      userRole={userRole}
      churchId={churchId}
      setChurchId={userRole === "super_admin" ? setChurchId : undefined}
      handleSubmit={handleSubmit}
      mutation={mutation}
    />
  );
}
