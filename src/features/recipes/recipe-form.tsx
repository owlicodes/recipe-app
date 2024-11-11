"use client";

import { useState } from "react";

import { PlusCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [tags, setTags] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      title,
      description,
      image,
      ingredients,
      steps,
      tags,
      cookingTime,
      servingSize,
      dietaryPreference,
    });
  };

  return (
    <Card className="mx-auto my-4 max-w-2xl p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Create/Edit Recipe</h1>
          <Label htmlFor="title">Recipe Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Main Image</Label>
          <Input
            id="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
          {image && <p className="mt-2 text-sm text-gray-500">{image.name}</p>}
        </div>

        <div>
          <Label>Ingredients</Label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="mt-2 flex items-center">
              <Input
                value={ingredient}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index] = e.target.value;
                  setIngredients(newIngredients);
                }}
                placeholder={`Ingredient ${index + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeIngredient(index)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addIngredient}
            variant="outline"
            className="mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4 text-brand" /> Add Ingredient
          </Button>
        </div>

        <div>
          <Label>Steps/Instructions</Label>
          {steps.map((step, index) => (
            <div key={index} className="mt-2 flex items-center">
              <Textarea
                value={step}
                onChange={(e) => {
                  const newSteps = [...steps];
                  newSteps[index] = e.target.value;
                  setSteps(newSteps);
                }}
                placeholder={`Step ${index + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeStep(index)}
                className="ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addStep}
            variant="outline"
            className="mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4 text-brand" /> Add Step
          </Button>
        </div>

        <div>
          <Label>Tags</Label>
          <div className="mb-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center rounded-full bg-primary px-2 py-1 text-sm text-primary-foreground"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
            <Button
              variant="brand"
              type="button"
              onClick={() => {
                const input = document.querySelector(
                  "input[placeholder='Add a tag']"
                ) as HTMLInputElement;
                addTag(input.value);
                input.value = "";
              }}
            >
              Add
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
            <Input
              id="cookingTime"
              type="number"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="servingSize">Serving Size</Label>
            <Input
              id="servingSize"
              type="number"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
              min="1"
            />
          </div>
        </div>

        <div>
          <Label>Dietary Preferences</Label>
          <RadioGroup
            value={dietaryPreference}
            onValueChange={setDietaryPreference}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">None</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vegetarian" id="vegetarian" />
              <Label htmlFor="vegetarian">Vegetarian</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vegan" id="vegan" />
              <Label htmlFor="vegan">Vegan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gluten-free" id="gluten-free" />
              <Label htmlFor="gluten-free">Gluten-Free</Label>
            </div>
          </RadioGroup>
        </div>

        <Button variant="brand" type="submit" className="w-full">
          Publish Recipe
        </Button>
      </form>
    </Card>
  );
};
