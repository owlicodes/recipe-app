"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ProfileSettings = () => {
  const [username, setUsername] = useState("johndoe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [isPrivate, setIsPrivate] = useState(false);
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: false,
  });

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="container mx-auto max-w-7xl py-10">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="space-y-2">
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Choose what you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="likes">Likes</Label>
                <Switch
                  id="likes"
                  checked={notifications.likes}
                  onCheckedChange={() => handleNotificationChange("likes")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="comments">Comments</Label>
                <Switch
                  id="comments"
                  checked={notifications.comments}
                  onCheckedChange={() => handleNotificationChange("comments")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="follows">Follows</Label>
                <Switch
                  id="follows"
                  checked={notifications.follows}
                  onCheckedChange={() => handleNotificationChange("follows")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage your account privacy and blocked users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="private-account">Private Account</Label>
                <Switch
                  id="private-account"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                />
              </div>
              <div className="space-y-2">
                <Label>Blocked Users</Label>
                <div className="rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">
                    No users blocked.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
