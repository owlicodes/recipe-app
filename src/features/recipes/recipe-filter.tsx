"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RecipeFilter = () => {
  const [, setCuisine] = useState("");
  const [, setDiet] = useState("");

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <Select onValueChange={setCuisine}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Cuisine" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="italian">Italian</SelectItem>
          <SelectItem value="thai">Thai</SelectItem>
          <SelectItem value="mexican">Mexican</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setDiet}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Dietary Preference" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vegetarian">Vegetarian</SelectItem>
          <SelectItem value="vegan">Vegan</SelectItem>
          <SelectItem value="gluten-free">Gluten-Free</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
