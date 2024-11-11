import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

// Mock data for suggested recipes
const suggestedRecipes = [
  {
    id: 1,
    title: "Vegan Banana Bread",
    image: "/mushroom-risoto.jpg",
  },
  {
    id: 2,
    title: "Avocado Toast",
    image: "/spicy-chicken.jpg",
  },
  {
    id: 3,
    title: "Raw Vegan Brownies",
    image: "/mushroom-risoto.jpg",
  },
];

export const SuggestedRecipes = () => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">You might also like</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {suggestedRecipes.map((recipe) => (
          <Card key={recipe.id}>
            <CardContent className="p-4">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={100}
                height={100}
                className="mb-2 h-24 w-full rounded-md object-cover"
              />
              <h3 className="font-semibold">{recipe.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
