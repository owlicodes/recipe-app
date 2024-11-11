import Link from "next/link";
import { useState } from "react";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Notification = {
  id: string;
  message: string;
  date: string;
};

export const NotificationDropdown = ({
  notifications = [],
}: {
  notifications?: Notification[];
}) => {
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const handleNotificationClick = () => {
    setUnreadCount(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.slice(0, 3).map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            onClick={handleNotificationClick}
          >
            <div className="flex flex-col">
              <p className="text-sm">{notification.message}</p>
              <span className="text-xs text-gray-500">{notification.date}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild>
          <Link
            href="/notifications"
            className="w-full text-center text-sm text-blue-600 hover:text-blue-800"
          >
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
