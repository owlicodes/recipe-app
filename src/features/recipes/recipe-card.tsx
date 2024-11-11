import Link from "next/link";

import { BookmarkPlus, Heart, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TRecipe } from "@/data/types";

type RecipeCardProps = {
  recipe: TRecipe;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <Card key={recipe.id} className="shadow-md">
        <CardHeader>
          <CardTitle>{recipe.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="mb-4 h-48 w-full rounded-md object-cover"
          />
          <p className="text-sm text-muted-foreground">{recipe.description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Posted by {recipe.postedBy}
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              aria-label={`Like recipe: ${recipe.likes} likes`}
            >
              <Heart className="h-4 w-4 text-red-500" />
              <span className="sr-only">Like</span>
              <span className="ml-1">{recipe.likes}</span>
            </Button>
            <Button
              variant="ghost"
              aria-label={`Comment on recipe: ${recipe.comments} comments`}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Comment</span>
              <span className="ml-1">{recipe.comments}</span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Save recipe">
              <BookmarkPlus className="h-4 w-4 text-brand" />
              <span className="sr-only">Save</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
