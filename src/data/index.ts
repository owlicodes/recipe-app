import { TRecipe } from "./types";

export const recipes: Array<TRecipe> = [
  {
    id: 1,
    title: "Spicy Thai Basil Chicken",
    description:
      "A quick and flavorful Thai dish with chicken, basil, and chili.",
    image: "/spicy-chicken.jpg",
    postedBy: "ThaiFoodLover",
    likes: 1200,
    comments: 89,
  },
  {
    id: 2,
    title: "Creamy Mushroom Risotto",
    description: "Rich and creamy Italian risotto with assorted mushrooms.",
    image: "/mushroom-risoto.jpg",
    postedBy: "ItalianChef",
    likes: 980,
    comments: 65,
  },
];

export const popularTags = [
  "HealthyEating",
  "QuickMeals",
  "VeganRecipes",
  "ComfortFood",
  "SeasonalCooking",
];
