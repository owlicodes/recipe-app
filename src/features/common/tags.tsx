import { Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type TagsProps = {
  tags: Array<string>;
};

export const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="bg-brand">
          <Tag className="mr-1 h-3 w-3" />
          {tag}
        </Badge>
      ))}
    </div>
  );
};
