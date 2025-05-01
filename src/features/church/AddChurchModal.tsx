"use client";

import { useState } from "react";

import { toast } from "sonner";
import { useCreateChurch } from "./church.service";
import AddChurchForm from "./AddChurchForm";

export function AddChurchModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    logo_url: "",
  });

  const { mutate: createChurch, isPending } = useCreateChurch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    createChurch(form, {
      onSuccess: () => {
        onOpenChange(false);
        toast.success("Church added successfully!");
        setForm({
          name: "",
          contact_email: "",
          contact_phone: "",
          address: "",
          logo_url: "",
        });
      },
    });
  };

  return (
    <AddChurchForm
      open={open}
      onOpenChange={onOpenChange}
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isPending={isPending}
    />
  );
}
