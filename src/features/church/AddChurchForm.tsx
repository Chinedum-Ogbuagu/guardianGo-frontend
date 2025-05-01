import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: {
    name: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    logo_url: string;
  };

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  isPending: boolean;
};

function AddChurchForm({
  open,
  onOpenChange,
  form,
  handleChange,
  handleSubmit,
  isPending,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a New Church</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="contact_email">Email</Label>
            <Input
              name="contact_email"
              value={form.contact_email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="contact_phone">Phone</Label>
            <Input
              name="contact_phone"
              value={form.contact_phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              name="logo_url"
              value={form.logo_url}
              onChange={handleChange}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Adding..." : "Add Church"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddChurchForm;
