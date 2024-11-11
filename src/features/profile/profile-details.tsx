import { Facebook, Github, Instagram, Twitter } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { RecipeCard } from "../recipes/recipe-card";
import { SavedRecipes } from "../recipes/saved-recipes";

export const ProfileDetails = () => {
  // Placeholder data
  const user = {
    name: "Jane Doe",
    username: "janedoe",
    bio: "Passionate food lover and recipe creator. Always experimenting in the kitchen!",
    profilePicture: "chef-user.jpg",
    socialMedia: {
      facebook: "https://facebook.com/janedoe",
      instagram: "https://instagram.com/janedoe",
      twitter: "https://twitter.com/janedoe",
      github: "https://github.com/janedoe",
    },
    stats: {
      recipes: 42,
      followers: 1337,
      following: 420,
    },
  };

  const postedRecipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description:
        "A quick and flavorful Thai dish with chicken, basil, and chili.",
      image: "/mushroom-risoto.jpg",
      postedBy: "ThaiFoodLover",
      likes: 156,
      comments: 23,
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      description:
        "A quick and flavorful Thai dish with chicken, basil, and chili.",
      image: "/spicy-chicken.jpg",
      postedBy: "ThaiFoodLover",
      likes: 132,
      comments: 18,
    },
    {
      id: 3,
      title: "Vegan Buddha Bowl",
      description:
        "A quick and flavorful Thai dish with chicken, basil, and chili.",
      image: "/mushroom-risoto.jpg",
      postedBy: "ThaiFoodLover",
      likes: 98,
      comments: 12,
    },
  ];

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* User Information */}
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-xl text-brand">@{user.username}</p>
                  <p className="mt-2">{user.bio}</p>
                  <div className="mt-4 flex justify-center gap-4 md:justify-start">
                    <a
                      href={user.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a
                      href={user.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a
                      href={user.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a
                      href={user.socialMedia.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-brand">
                    {user.stats.recipes}
                  </p>
                  <p className="text-sm text-muted-foreground">Recipes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand">
                    {user.stats.followers}
                  </p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand">
                    {user.stats.following}
                  </p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User's Recipes */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-brand">
            Posted Recipes
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {postedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} disableBookmark />
            ))}
          </div>
        </div>

        {/* Saved Recipes */}
        <SavedRecipes />
      </div>
    </div>
  );
};
