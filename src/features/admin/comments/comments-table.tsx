import { AlertTriangle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Comment } from "./comments-list";

export const CommentsTable = ({
  comments,
  deleteComment,
  warnUser,
}: {
  comments: Comment[];
  deleteComment: (id: string) => void;
  warnUser: (user: string) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Comment</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comments.map((comment) => (
          <TableRow key={comment.id}>
            <TableCell>{comment.user}</TableCell>
            <TableCell>{comment.content}</TableCell>
            <TableCell>{comment.date}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteComment(comment.id)}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => warnUser(comment.user)}
                >
                  <AlertTriangle className="mr-1 h-4 w-4 text-orange-500" />
                  Warn
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
