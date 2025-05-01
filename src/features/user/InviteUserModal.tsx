"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { inviteUser } from "./user.service";
import InviteUserForm from "./InviteUserForm";

export function InviteUserModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userRole = user?.role;
  const defaultChurchId = user?.church_id;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [churchId, setChurchId] = useState<string>(defaultChurchId || "");

  const mutation = useMutation({
    mutationFn: inviteUser,
    onSuccess: () => {
      onOpenChange(false);
      setName("");
      setPhone("");
      setRole("");
      if (userRole === "super_admin") setChurchId("");
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      name,
      phone,
      role,
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
      role={role}
      setRole={setRole}
      userRole={userRole}
      churchId={churchId}
      setChurchId={userRole === "super_admin" ? setChurchId : undefined}
      handleSubmit={handleSubmit}
      mutation={mutation}
    />
  );
}
