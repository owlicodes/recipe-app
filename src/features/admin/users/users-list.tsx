"use client";

import { useState } from "react";

import { AlertTriangle, Ban, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id: string;
  name: string;
  email: string;
  posts: number;
  comments: number;
  flaggedActivity: number;
};

type Action = "warn" | "ban" | "delete";

const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    posts: 15,
    comments: 45,
    flaggedActivity: 2,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    posts: 8,
    comments: 23,
    flaggedActivity: 0,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    posts: 32,
    comments: 78,
    flaggedActivity: 5,
  },
];

export const UsersLists = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [action, setAction] = useState<Action | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAction = (user: User, action: Action) => {
    setSelectedUser(user);
    setAction(action);
    setIsDialogOpen(true);
  };

  const confirmAction = () => {
    if (selectedUser && action) {
      switch (action) {
        case "warn":
          console.log(`Warning user: ${selectedUser.name}`);
          break;
        case "ban":
          setUsers(users.filter((u) => u.id !== selectedUser.id));
          console.log(`Banning user: ${selectedUser.name}`);
          break;
        case "delete":
          setUsers(users.filter((u) => u.id !== selectedUser.id));
          console.log(`Deleting user: ${selectedUser.name}`);
          break;
      }
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-5 text-2xl font-bold">User Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Posts</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Flagged Activity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.posts}</TableCell>
              <TableCell>{user.comments}</TableCell>
              <TableCell>{user.flaggedActivity}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(user, "warn")}
                  >
                    <AlertTriangle className="mr-1 h-4 w-4 text-orange-500" />
                    Warn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(user, "ban")}
                  >
                    <Ban className="mr-1 h-4 w-4 text-red-500" />
                    Ban
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction(user, "delete")}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to {action} user {selectedUser?.name}?
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
