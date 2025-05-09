"use client";
import { useEffect, useState } from "react";

import {
  Home,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  UserPlus,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { InviteUserModal } from "@/features/user/InviteUserModal";
import { AddChurchModal } from "@/features/church/AddChurchModal";
import { toast } from "sonner";
import { useLogout } from "@/features/auth/services/auth.service";

export interface JWTPayload {
  userId: string;
  role?: string;
  church_id?: string;
  exp: number;
}

export function SidebarStats() {
  const [inviteUserModalOpen, setinviteUserModalOpen] = useState(false);
  const [role, setRole] = useState<string | undefined>(undefined);
  const [addChurchModalOpen, setAddChurchModalOpen] = useState(false);
  const { mutateAsync: logout } = useLogout(); // Assuming you have a logout function in your auth service

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login"; // Redirect to login page
  };

  useEffect(() => {
    const authToken = Cookies.get("auth_token"); // Get the name of your auth cookie

    if (authToken) {
      try {
        const decodedToken = jwtDecode<JWTPayload>(authToken);
        setRole(decodedToken?.role);
      } catch (error) {
        toast.error(`Cannot get user ${error}`);
        window.location.href = "/auth/login";
        // Handle invalid token, e.g., redirect to login or clear cookie
      }
    }
  }, []);
  const shouldShowInviteButton =
    role === "super_admin" || role === "church_admin";
  return (
    <>
      <InviteUserModal
        open={inviteUserModalOpen}
        onOpenChange={setinviteUserModalOpen}
      />
      <AddChurchModal
        open={addChurchModalOpen}
        onOpenChange={setAddChurchModalOpen}
      />
      <TooltipProvider delayDuration={300}>
        <div className="flex flex-col h-full items-center py-2">
          {/* Main Nav Icons */}
          <div className="flex flex-col items-center space-y-4 w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-muted h-auto cursor-pointer py-2"
                  >
                    <Home className="h-5 w-5" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Manage Sessions</p>
              </TooltipContent>
            </Tooltip>

            {role === "super_admin" && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      onClick={() => setAddChurchModalOpen(true)}
                      size="icon"
                      className="h-auto py-2 cursor-pointer"
                    >
                      <Users className="h-5 w-5" />
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add a new church</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-auto py-2 cursor-pointer"
                  >
                    <ClipboardList className="h-5 w-5" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>View reports</p>
              </TooltipContent>
            </Tooltip>

            {shouldShowInviteButton && ( // Only render if condition is met
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <Button
                      variant="ghost"
                      onClick={() => setinviteUserModalOpen(true)}
                      size="icon"
                      className="h-auto py-2 cursor-pointer"
                    >
                      <UserPlus className="h-5 w-5" />
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Invite new users</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Bottom Actions */}

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-auto py-2 cursor-pointer"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Manage settings</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="h-auto py-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Sign out of your account</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
}
