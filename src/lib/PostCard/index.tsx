import React from "react";
import Typography from "../../components/ui/Typography";
import UIButton from "../../components/ui/UiButton";
import { Heart, MessageCircle } from "lucide-react";

interface PostCardProps {
  email: string;
  date: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  onEdit?: () => void;
  showPublish?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  email,
  date,
  title,
  content,
  likes,
  comments,
  onEdit,
  showPublish = false,
}) => {
  const hasActions = showPublish || onEdit;

  return (
    <div className="w-full max-w-[768px] bg-white rounded-2xl shadow p-6 flex flex-col gap-4 mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div className="flex flex-col">
          <Typography variant="body">{email}</Typography>
          <Typography variant="detail" className="text-gray-500">
            {date}
          </Typography>
        </div>
      </div>

      <Typography variant="h4">{title}</Typography>

      <div className="w-full h-[432px] bg-gray-200 rounded-md" />

      <Typography variant="body">{content}</Typography>

      {hasActions && (
        <div className="flex gap-3 mt-1">
          {showPublish && (
            <UIButton className="w-[167px] h-[40px] bg-black text-white">
              Опубликовать пост
            </UIButton>
          )}

          {onEdit && (
            <UIButton
              className="w-[138px] h-[40px] bg-gray-200 text-black"
              onClick={onEdit}
            >
              Редактировать
            </UIButton>
          )}
        </div>
      )}

      <div
        className={`flex items-center gap-4 ${hasActions ? "mt-auto" : "pt-2"}`}
      >
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
          <Heart className="w-4 h-4 text-muted" />
          <Typography variant="body" color="muted">
            {likes}
          </Typography>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
          <MessageCircle className="w-4 h-4 text-muted" />
          <Typography variant="body" color="muted">
            {comments}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
