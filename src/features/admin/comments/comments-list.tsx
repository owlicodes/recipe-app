"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CommentsTable } from "./comments-table";
import { ReportsTable } from "./reports-table";

export type Comment = {
  id: string;
  user: string;
  content: string;
  date: string;
  isFlagged: boolean;
};

export type Report = {
  id: string;
  reporter: string;
  reported: string;
  reason: string;
  date: string;
};

const mockComments: Comment[] = [
  {
    id: "1",
    user: "Alice",
    content: "Great post!",
    date: "2023-05-15",
    isFlagged: false,
  },
  {
    id: "2",
    user: "Bob",
    content: "I disagree with this.",
    date: "2023-05-16",
    isFlagged: true,
  },
  {
    id: "3",
    user: "Charlie",
    content: "Thanks for sharing!",
    date: "2023-05-17",
    isFlagged: false,
  },
];

const mockReports: Report[] = [
  {
    id: "1",
    reporter: "David",
    reported: "Bob",
    reason: "Inappropriate language",
    date: "2023-05-16",
  },
  {
    id: "2",
    reporter: "Eve",
    reported: "Charlie",
    reason: "Spam",
    date: "2023-05-18",
  },
];

export const CommentsList = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [reports, setReports] = useState<Report[]>(mockReports);

  const deleteComment = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
    setReports(
      reports.filter(
        (report) => report.reported !== comments.find((c) => c.id === id)?.user
      )
    );
  };

  const warnUser = (user: string) => {
    // In a real application, this would send a warning to the user
    console.log(`Warning sent to user: ${user}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Comments Moderation</h1>
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Comments</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Comments</TabsTrigger>
          <TabsTrigger value="reports">User Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <CommentsTable
            comments={comments}
            deleteComment={deleteComment}
            warnUser={warnUser}
          />
        </TabsContent>
        <TabsContent value="flagged">
          <CommentsTable
            comments={comments.filter((c) => c.isFlagged)}
            deleteComment={deleteComment}
            warnUser={warnUser}
          />
        </TabsContent>
        <TabsContent value="reports">
          <ReportsTable
            reports={reports}
            deleteComment={deleteComment}
            warnUser={warnUser}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
