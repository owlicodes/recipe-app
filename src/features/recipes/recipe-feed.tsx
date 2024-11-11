import { recipes } from "@/data";

import { RecipeCard } from "./recipe-card";

export const RecipeFeed = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Recipe Feed</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
