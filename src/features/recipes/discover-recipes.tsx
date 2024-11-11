import { BookmarkPlus, Heart, MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { popularTags, recipes } from "@/data";

import { RecipeFilter } from "./recipe-filter";

export const DiscoverRecipes = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Discover Recipes</h1>

      <RecipeFilter />

      {/* Popular Tags */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-brand">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Trending Recipes */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Trending Recipes</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {recipes.slice(0, 3).map((recipe) => (
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
                <p className="text-sm text-muted-foreground">
                  {recipe.description}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Posted by{" "}
                  <a
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    {recipe.postedBy}
                  </a>
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
          ))}
        </div>
      </div>

      {/* Recipe Feed */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Recipe Feed</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
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
                <p className="text-sm text-muted-foreground">
                  {recipe.description}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Posted by{" "}
                  <a
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    {recipe.postedBy}
                  </a>
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
          ))}
        </div>
      </div>
    </div>
  );
};
