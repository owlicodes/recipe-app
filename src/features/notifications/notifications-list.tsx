"use client";

import { useState } from "react";

import {
  AlertTriangle,
  Heart,
  MessageSquare,
  Trash2,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Notification = {
  id: string;
  type: "like" | "comment" | "follow" | "admin";
  message: string;
  time: string;
};

export const NotificationsList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "like",
      message: "John Doe liked your Spaghetti Carbonara recipe",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "comment",
      message: "Jane Smith commented on your Chocolate Cake recipe",
      time: "4 hours ago",
    },
    {
      id: "3",
      type: "follow",
      message: "Mike Johnson started following you",
      time: "1 day ago",
    },
    {
      id: "4",
      type: "admin",
      message: "Your Spicy Chicken Wings recipe has been flagged for review",
      time: "2 days ago",
    },
    {
      id: "5",
      type: "like",
      message: "Sarah Lee liked your comment on Vegetarian Lasagna",
      time: "3 days ago",
    },
  ]);

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "comment":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-5 w-5 text-green-500" />;
      case "admin":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Button
          variant="outline"
          onClick={clearAllNotifications}
          disabled={notifications.length === 0}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>
      <Separator />
      <ScrollArea className="h-[calc(100vh-150px)]">
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-4 rounded-lg bg-card p-4 shadow"
              >
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No notifications to display
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
