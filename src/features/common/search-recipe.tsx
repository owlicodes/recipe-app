import { useRouter } from "next/navigation";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export const SearchRecipe = () => {
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="mx-4 max-w-lg flex-1">
      <div className="relative">
        <Input
          type="search"
          name="search"
          placeholder="Search recipes..."
          className="w-full bg-white pl-10"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
      </div>
    </form>
  );
};
