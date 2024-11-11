import { popularTags } from "@/data";

import { Tags } from "./tags";

export const PopularTags = () => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">Popular Tags</h2>

      <Tags tags={popularTags} />
    </div>
  );
};
