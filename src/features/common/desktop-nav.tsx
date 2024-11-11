import Link from "next/link";

import { Button } from "@/components/ui/button";

export const DesktopNav = () => {
  return (
    <nav className="hidden space-x-4 md:flex">
      <Button variant="ghost" asChild>
        <Link href="/explore">Explore</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/create">Create Recipe</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href="/saved">Saved Recipes</Link>
      </Button>
    </nav>
  );
};
