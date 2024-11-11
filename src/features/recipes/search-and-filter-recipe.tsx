"use client";

import { useState } from "react";

import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const SearchAndFilterRecipe = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popularity");

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Search recipes, ingredients, or users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
      </div>
      <div className="flex gap-4">
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Recipes</SheetTitle>
              <SheetDescription>
                Narrow down your search with these filters.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="font-medium">Cuisine Type</h3>
                {["Italian", "Asian", "Mexican", "American"].map((cuisine) => (
                  <div className="flex items-center space-x-2" key={cuisine}>
                    <Checkbox id={`cuisine-${cuisine.toLowerCase()}`} />
                    <Label htmlFor={`cuisine-${cuisine.toLowerCase()}`}>
                      {cuisine}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Dietary Restrictions</h3>
                {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map(
                  (diet) => (
                    <div className="flex items-center space-x-2" key={diet}>
                      <Checkbox id={`diet-${diet.toLowerCase()}`} />
                      <Label htmlFor={`diet-${diet.toLowerCase()}`}>
                        {diet}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
