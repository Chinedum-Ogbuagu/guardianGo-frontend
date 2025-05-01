import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { useGetAllChurches } from "@/features/church/church.service";
import { IChurch } from "../church/church.types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  userRole: string;
  churchId: string;
  setChurchId?: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  mutation: {
    isPending: boolean;
    mutate: (data: {
      name: string;
      phone: string;
      role: string;
      church_id: string;
    }) => void;
  };
};

function InviteUserForm({
  open,
  onOpenChange,
  name,
  setName,
  role,
  setRole,
  userRole,
  phone,
  setPhone,
  churchId,
  setChurchId,
  handleSubmit,
  mutation,
}: Props) {
  const { data: churches, isLoading } = useGetAllChurches();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attendant">Attendant</SelectItem>
                {userRole === "super_admin" && (
                  <SelectItem value="church_admin">Church Admin</SelectItem>
                )}
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {userRole === "super_admin" && (
            <div>
              <Label>Assign to Church</Label>
              <Select value={churchId} onValueChange={setChurchId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select church" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem disabled value="">
                      Loading...
                    </SelectItem>
                  ) : (
                    churches?.map((church: IChurch) => (
                      <SelectItem key={church.ID} value={church.ID}>
                        {church.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={mutation.isPending}>
            {mutation.isPending ? "Inviting..." : "Invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUserForm;
