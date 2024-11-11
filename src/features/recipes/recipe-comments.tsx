import { useState } from "react";

import { Flag, Send, ThumbsUp } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Mock data for comments
const comments = [
  {
    id: 1,
    user: "Alice",
    avatar: "/check-user.jpg",
    content: "Delicious! I added a bit of cinnamon and it was perfect.",
    likes: 5,
  },
  {
    id: 2,
    user: "Bob",
    avatar: "/chef-user.jpg",
    content: "So easy to make and tastes amazing. Thanks for sharing!",
    likes: 3,
  },
];

export const RecipeComments = () => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    // Here you would typically send the comment to your backend
    console.log("Submitting comment:", newComment);
    setNewComment("");
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Comments</h2>
      {comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardHeader>
            <div className="flex items-center">
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage src={comment.avatar} alt={comment.user} />
                <AvatarFallback>{comment.user[0]}</AvatarFallback>
              </Avatar>
              <CardTitle>{comment.user}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>{comment.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              {comment.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="mr-2 h-4 w-4" />
              Report
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="mt-4">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2 bg-white"
        />
        <Button variant="brand" onClick={handleCommentSubmit}>
          <Send className="mr-2 h-4 w-4" />
          Post Comment
        </Button>
      </div>
    </div>
  );
};
