import { recipes } from "@/data";

import { RecipeCard } from "./recipe-card";

export const TrendingRecipes = () => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">Trending Recipes</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        {recipes.slice(0, 3).map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
