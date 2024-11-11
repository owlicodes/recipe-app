import { SearchAndFilterRecipe } from "./search-and-filter-recipe";

export const ExploreRecipes = () => {
  const featuredCategories = [
    { name: "Vegan", image: "/mushroom-risoto.jpg" },
    { name: "Desserts", image: "/spicy-chicken.jpg" },
    { name: "Quick Meals", image: "/mushroom-risoto.jpg" },
    { name: "Healthy", image: "/spicy-chicken.jpg" },
  ];

  const recipes = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      image: "/mushroom-risoto.jpg",
      author: "Chef John",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Vegan Buddha Bowl",
      image: "/spicy-chicken.jpg",
      author: "Green Gourmet",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Chocolate Lava Cake",
      image: "/mushroom-risoto.jpg",
      author: "Sweet Tooth",
      rating: 4.8,
    },
    {
      id: 4,
      name: "15-Minute Stir Fry",
      image: "/spicy-chicken.jpg",
      author: "Quick Cook",
      rating: 4.0,
    },
    {
      id: 5,
      name: "Grilled Salmon",
      image: "/mushroom-risoto.jpg",
      author: "Seafood Specialist",
      rating: 4.6,
    },
    {
      id: 6,
      name: "Avocado Toast",
      image: "/spicy-chicken.jpg",
      author: "Brunch Master",
      rating: 3.9,
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Explore Recipes</h1>
      <SearchAndFilterRecipe />

      {/* Featured Categories */}
      <div className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Featured Categories</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featuredCategories.map((category) => (
            <div
              key={category.name}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-32 w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <span className="text-lg font-semibold text-white">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Discover Recipes</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold">{recipe.name}</h3>
                <p className="mb-2 text-sm text-gray-600">by {recipe.author}</p>
                <div className="flex items-center">
                  <span className="mr-1 text-yellow-400">★</span>
                  <span>{recipe.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
