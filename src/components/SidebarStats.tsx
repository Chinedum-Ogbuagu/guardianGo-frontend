"use client";

import {
  Home,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  HelpCircle,
  UserPlus,
  Crown,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ThemeToggle } from "./theme/ThemeToggle";

export function SidebarStats() {
  return (
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
                  className="bg-muted h-auto py-2"
                >
                  <Home className="h-5 w-5" />
                </Button>
                <span className="text-xs mt-1">Dashboard</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>View dashboard</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-auto py-2">
                  <Users className="h-5 w-5" />
                </Button>
                <span className="text-xs mt-1">Children</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Manage children</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-auto py-2">
                  <ClipboardList className="h-5 w-5" />
                </Button>
                <span className="text-xs mt-1">Reports</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>View reports</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Additional Options */}
        <div className="mt-8 w-full space-y-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-auto py-2">
                  <UserPlus className="h-5 w-5" />
                </Button>
                <span className="text-xs mt-1">Invite</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Invite new users</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-auto py-2">
                  <Crown className="h-5 w-5" />
                </Button>
                <span className="text-xs mt-1">Upgrade</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Upgrade your plan</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto w-full space-y-6 pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <ThemeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Switch theme mode</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-auto py-2">
                  <HelpCircle className="h-5 w-5" />
                </Button>
                <span className="text-xs mt-1">Help</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Get help</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center">
                <Button variant="ghost" size="icon" className="h-auto py-2">
                  <Settings className="h-5 w-5" />
                </Button>
                <span className="text-xs mt-1">Settings</span>
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
                  className="h-auto py-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
                <span className="text-xs mt-1 text-red-500">Sign out</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Sign out of your account</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
