"use client";

import { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<style jsx global>{`
  :root {
    --primary: 60 100% 50%;
    --primary-foreground: 60 10% 10%;
  }
`}</style>;

// Mock data for demonstration
const recipes = [
  {
    id: 1,
    title: "Spicy Thai Basil Chicken",
    description:
      "A quick and flavorful Thai dish with chicken, basil, and chili.",
    image: "/placeholder.svg?height=200&width=300",
    postedBy: "ThaiFoodLover",
    likes: 1200,
    comments: 89,
  },
  {
    id: 2,
    title: "Creamy Mushroom Risotto",
    description: "Rich and creamy Italian risotto with assorted mushrooms.",
    image: "/placeholder.svg?height=200&width=300",
    postedBy: "ItalianChef",
    likes: 980,
    comments: 65,
  },
  // Add more recipe objects as needed
];

const popularTags = [
  "#HealthyEating",
  "#QuickMeals",
  "#VeganRecipes",
  "#ComfortFood",
  "#SeasonalCooking",
];

export const DiscoverRecipes = () => {
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Discover Recipes</h1>

      {/* Filters & Categories */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Select onValueChange={setCuisine}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Cuisine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="italian">Italian</SelectItem>
            <SelectItem value="thai">Thai</SelectItem>
            <SelectItem value="mexican">Mexican</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setDiet}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Dietary Preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vegetarian">Vegetarian</SelectItem>
            <SelectItem value="vegan">Vegan</SelectItem>
            <SelectItem value="gluten-free">Gluten-Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
