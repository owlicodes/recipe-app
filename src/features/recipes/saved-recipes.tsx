import { RecipeCard } from "@/features/recipes/recipe-card";

const savedRecipes = [
  {
    id: 4,
    title: "Classic Margherita Pizza",
    description:
      "A quick and flavorful Thai dish with chicken, basil, and chili.",
    image: "/spicy-chicken.jpg",
    postedBy: "ThaiFoodLover",
    likes: 201,
    comments: 34,
  },
  {
    id: 5,
    title: "Chocolate Lava Cake",
    description:
      "A quick and flavorful Thai dish with chicken, basil, and chili.",
    image: "/mushroom-risoto.jpg",
    postedBy: "ThaiFoodLover",
    likes: 178,
    comments: 27,
  },
  {
    id: 6,
    title: "Greek Salad",
    description:
      "A quick and flavorful Thai dish with chicken, basil, and chili.",
    image: "/spicy-chicken.jpg",
    postedBy: "ThaiFoodLover",
    likes: 87,
    comments: 9,
  },
];

export const SavedRecipes = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-brand">Saved Recipes</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {savedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} disableBookmark />
        ))}
      </div>
    </div>
  );
};
