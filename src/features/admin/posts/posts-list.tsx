"use client";

import { useState } from "react";

import { Eye, EyeOff, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for demonstration
const initialPosts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the first post content.",
    flagged: true,
    userReported: false,
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the second post content.",
    flagged: false,
    userReported: true,
  },
  {
    id: 3,
    title: "Third Post",
    content: "This is the third post content.",
    flagged: true,
    userReported: true,
  },
  {
    id: 4,
    title: "Fourth Post",
    content: "This is the fourth post content.",
    flagged: false,
    userReported: false,
  },
];

export const PostsList = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState("all");

  const filteredPosts = posts.filter((post) => {
    if (filter === "flagged") return post.flagged;
    if (filter === "reported") return post.userReported;
    return true;
  });

  const handleHidePost = (id: number) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, hidden: true } : post))
    );
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Post Moderation</h1>
      <div className="mb-4">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter posts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="flagged">Flagged Posts</SelectItem>
            <SelectItem value="reported">User Reported</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                {post.content.substring(0, 100)}...
              </p>
              {post.flagged && (
                <span className="inline-block rounded-full bg-red-100 px-2 text-xs font-semibold uppercase tracking-wide text-red-800">
                  Flagged
                </span>
              )}
              {post.userReported && (
                <span className="ml-2 inline-block rounded-full bg-yellow-100 px-2 text-xs font-semibold uppercase tracking-wide text-yellow-800">
                  Reported
                </span>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4 text-brand" />
                    View Details
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{post.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {post.content}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleHidePost(post.id)}
              >
                <EyeOff className="mr-2 h-4 w-4" />
                Hide
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this post?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
