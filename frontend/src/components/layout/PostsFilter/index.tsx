import React from "react";
import Typography from "../../ui/Typography";
import { PostFilterType } from "../../../types/posts";

interface PostsFilterProps {
  activeFilter: PostFilterType;
  onChange: (val: PostFilterType) => void;
}

const PostsFilter: React.FC<PostsFilterProps> = ({
  activeFilter,
  onChange,
}) => {
  const buttons: { label: string; value: PostFilterType }[] = [
    { label: "Все посты", value: "all" },
    { label: "Мои посты", value: "my" },
    { label: "Черновики", value: "drafts" },
  ];

  return (
    <div className="inline-flex border rounded-md p-1 bg-white mb-4">
      {buttons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => onChange(btn.value)}
          className={`px-3 py-1 rounded-md transition-colors duration-200 ${
            activeFilter === btn.value
              ? "bg-back text-primary"
              : "text-muted hover:bg-[#F1F5F9]"
          }`}
        >
          <Typography variant="subtitle-medium">{btn.label}</Typography>
        </button>
      ))}
    </div>
  );
};

export default PostsFilter;
