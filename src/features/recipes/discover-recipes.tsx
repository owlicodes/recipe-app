import { PopularTags } from "../common/popular-tags";
import { RecipeFeed } from "./recipe-feed";
import { RecipeFilter } from "./recipe-filter";
import { TrendingRecipes } from "./trending-recipes";

export const DiscoverRecipes = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Discover Recipes</h1>
      <RecipeFilter />
      <PopularTags />
      <TrendingRecipes />
      <RecipeFeed />
    </div>
  );
};
