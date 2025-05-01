import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  ChevronRight,
  MessageCircle,
  Phone,
  Tag,
  Users,
} from "lucide-react";
import React from "react";

type Props = {
  guardian_name: string;
  guardian_phone: number;
  drop_offs: {
    child_name: string;
    class: string;
    bag_status: boolean;
    note?: string;
  }[];
  formattedDate: string;
  formattedTime: string;
};

function SessionDetailTabs({
  guardian_name,
  guardian_phone,
  drop_offs,
  formattedDate,
  formattedTime,
}: Props) {
  return (
    <Tabs defaultValue="details" className="flex-1 flex flex-col">
      <TabsList className="grid grid-cols-2 rounded-none px-2 pt-2 bg-transparent">
        <TabsTrigger
          value="details"
          className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-indigo-950/40 dark:data-[state=active]:text-indigo-300 rounded-t-lg"
        >
          Details
        </TabsTrigger>
        <TabsTrigger
          value="children"
          className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 dark:data-[state=active]:bg-indigo-950/40 dark:data-[state=active]:text-indigo-300 rounded-t-lg"
        >
          Children ({drop_offs.length})
        </TabsTrigger>
      </TabsList>

      {/* Details Tab */}
      <TabsContent
        value="details"
        className="flex-1 overflow-y-auto p-4 bg-indigo-50/50 dark:bg-indigo-950/10"
      >
        <Card className="mb-4 border-none shadow-sm">
          <CardContent className="p-0">
            <div className="p-4 flex items-center space-x-4 bg-white dark:bg-gray-900 rounded-t-lg">
              <Avatar className="h-14 w-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium">
                <span>
                  {guardian_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{guardian_name}</h3>
                <p className="text-sm text-muted-foreground">Guardian</p>
              </div>
            </div>

            <Separator />

            <div className="p-4 space-y-3 bg-white dark:bg-gray-900 rounded-b-lg">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-3" />
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="font-medium">{guardian_phone}</div>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-3" />
                <div>
                  <div className="text-xs text-muted-foreground">
                    Drop-off Time
                  </div>
                  <div className="font-medium">
                    {formattedDate} at {formattedTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-3" />
                <div>
                  <div className="text-xs text-muted-foreground">Children</div>
                  <div className="font-medium">
                    {drop_offs.length} child
                    {drop_offs.length !== 1 ? "ren" : ""}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">
            Quick Actions
          </h3>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start h-10 text-left"
            >
              <MessageCircle className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
              <span>Send Message to Guardian</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-10 text-left"
            >
              <Tag className="h-4 w-4 mr-2 text-pink-600 dark:text-pink-400" />
              <span>Add Session Label</span>
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
          </div>
        </div>
      </TabsContent>

      {/* Children Tab */}
      <TabsContent
        value="children"
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-indigo-50/50 dark:bg-indigo-950/10"
      >
        {drop_offs.map((child, idx) => (
          <Card key={idx} className="overflow-hidden shadow-sm border-none">
            <div className="flex">
              <div
                className={`w-1.5 ${
                  child.bag_status
                    ? "bg-gradient-to-b from-indigo-600 to-purple-600"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
              <div className="flex-1 p-4 bg-white dark:bg-gray-900">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Avatar
                      className={`h-10 w-10 mr-3 ${
                        child.bag_status
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600"
                          : "bg-gray-200 dark:bg-gray-800"
                      } text-white font-medium text-sm`}
                    >
                      <span>{child.child_name[0].toUpperCase()}</span>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{child.child_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Class: {child.class}
                      </p>
                    </div>
                  </div>
                  {child.bag_status && (
                    <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 flex items-center px-2 py-1 font-normal">
                      <Briefcase className="h-3.5 w-3.5 mr-1" /> Bag
                    </Badge>
                  )}
                </div>
                {child.note && (
                  <div className="mt-3 text-sm flex items-start bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-amber-500 dark:text-amber-400 mr-2 mt-0.5 shrink-0" />
                    <p className="text-amber-800 dark:text-amber-300">
                      {child.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </TabsContent>
    </Tabs>
  );
}

export default SessionDetailTabs;
