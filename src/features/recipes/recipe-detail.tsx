"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Bookmark, ChefHat, Clock, Heart } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Tags } from "../common/tags";
import { RecipeComments } from "./recipe-comments";
import { SuggestedRecipes } from "./suggested-recipes";

// Mock data for the recipe
const recipe = {
  title: "Vegan Chocolate Avocado Mousse",
  author: "Jane Doe",
  authorAvatar: "/chef-user.jpg",
  mainImage: "/spicy-chicken.jpg",
  ingredients: [
    "2 ripe avocados",
    "1/4 cup cocoa powder",
    "1/4 cup maple syrup",
    "2 tbsp almond milk",
    "1 tsp vanilla extract",
    "Pinch of salt",
  ],
  instructions: [
    "Cut avocados in half, remove the pit, and scoop out the flesh into a food processor.",
    "Add cocoa powder, maple syrup, almond milk, vanilla extract, and salt to the food processor.",
    "Blend until smooth and creamy, scraping down the sides as needed.",
    "Taste and adjust sweetness if desired.",
    "Spoon the mousse into serving glasses or bowls.",
    "Refrigerate for at least 30 minutes before serving.",
    "Optionally, garnish with fresh berries or coconut flakes before serving.",
  ],
  cookingTime: "15 minutes",
  difficulty: "Easy",
  dietaryInfo: ["Vegan", "Gluten-free"],
  tags: ["Dessert", "Chocolate", "Quick", "No-bake"],
};

export const RecipeDetails = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleSave = () => setSaved(!saved);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">{recipe.title}</h1>

      <div className="mb-6 flex items-center">
        <Avatar className="mr-3 h-10 w-10">
          <AvatarImage src={recipe.authorAvatar} alt={recipe.author} />
          <AvatarFallback>{recipe.author[0]}</AvatarFallback>
        </Avatar>
        <Link href="#" className="text-primary hover:underline">
          {recipe.author}
        </Link>
      </div>

      <Image
        src={recipe.mainImage}
        alt={recipe.title}
        width={600}
        height={400}
        className="mb-6 w-full rounded-lg"
      />

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="mr-2 text-brand" />
            <span>{recipe.cookingTime}</span>
          </div>
          <div className="flex items-center">
            <ChefHat className="mr-2 text-brand" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={handleLike}>
            <Heart className={liked ? "fill-primary" : ""} />
            <span className="sr-only">Like recipe</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleSave}>
            <Bookmark className={saved ? "fill-primary" : ""} />
            <span className="sr-only">Save recipe</span>
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Ingredients</h2>
        <ul className="list-inside list-disc">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Instructions</h2>
        <ol className="list-inside list-decimal">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="mb-2">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Dietary Information</h2>
        <div className="flex flex-wrap gap-2">
          {recipe.dietaryInfo.map((info, index) => (
            <Badge key={index} variant="secondary" className="bg-brand">
              {info}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Tags</h2>
        <Tags tags={recipe.tags} />
      </div>

      <Separator className="my-8" />

      <div className="mb-8">
        <RecipeComments />
      </div>

      <Separator className="my-8" />

      <SuggestedRecipes />
    </div>
  );
};
