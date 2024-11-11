"use client";

import Link from "next/link";
import { useState } from "react";

import { ChevronDown, Menu, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDialogConfigStore from "@/stores/dialog-store";

import { SignInForm } from "../auth/sign-in-form";
import { SignUpForm } from "../auth/sign-up-form";
import { NotificationDropdown } from "../notifications/notification-dropdown";
import { DesktopNav } from "./desktop-nav";
import { SearchRecipe } from "./search-recipe";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setDialogConfig } = useDialogConfigStore();

  const showSignInForm = () =>
    setDialogConfig({
      open: true,
      title: "Sign In",
      description:
        "Welcome back! Enter your credentials to sign back in, happy cooking!",
      content: <SignInForm />,
    });

  const showSignUpForm = () =>
    setDialogConfig({
      open: true,
      title: "Sign Up",
      description:
        "Welcome, enter your credentials so you can start using the application, happy cooking!",
      content: <SignUpForm />,
    });

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span className="text-2xl font-bold text-brand">RecipeApp</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <SearchRecipe />
            <DesktopNav />
            <div className="ml-4 flex items-center">
              <NotificationDropdown
                notifications={[
                  {
                    id: "1",
                    message: "Chef Logro liked your recipe.",
                    date: new Date().toISOString(),
                  },
                  {
                    id: "2",
                    message: "Chef Judy commented on your recipe.",
                    date: new Date().toISOString(),
                  },
                ]}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="ml-4 flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/chef-user.jpg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 hidden lg:block">Username</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/admin/posts">Admin Pages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/logout">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={showSignInForm}
              >
                Sign In
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={showSignUpForm}
              >
                Sign Up
              </Button>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            <SearchRecipe />
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/explore">Explore</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/create">Create Recipe</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/saved">Saved Recipes</Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={showSignInForm}
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={showSignUpForm}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
