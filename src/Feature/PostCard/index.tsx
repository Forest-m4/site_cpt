import React from "react";
import { Link } from "react-router-dom";
import Typography from "../../components/ui/Typography";
import UIButton from "../../components/ui/UiButton";
import { Heart, MessageCircle } from "lucide-react";

export interface PostData {
  id: number;
  date: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
}

interface PostCardProps {
  post: PostData;
  email: string;
  clickable?: boolean;
  onEdit?: () => void;
  showPublish?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  email,
  clickable = true,
  onEdit,
  showPublish = false,
}) => {
  const hasActions = showPublish || onEdit;

  const CardInner = (
    <div
      className={`
        w-full max-w-[768px] mx-auto
        rounded-2xl shadow p-6
        flex flex-col gap-4
        bg-white
        transition
        ${
          clickable
            ? "cursor-pointer hover:bg-gray-50 active:bg-gray-100 active:scale-[0.99]"
            : ""
        }
      `}
    >
      {/* header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
        <div className="flex flex-col">
          <Typography variant="body">{email}</Typography>
          <Typography variant="detail" className="text-gray-500">
            {post.date}
          </Typography>
        </div>
      </div>

      <Typography variant="h4">{post.title}</Typography>

      <div className="w-full h-[432px] bg-gray-200 rounded-md" />

      <Typography variant="body">{post.content}</Typography>

      {hasActions && (
        <div className="flex gap-3 mt-1">
          {showPublish && (
            <UIButton
              className="w-[167px] h-[40px] bg-black text-white"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Опубликовать пост
            </UIButton>
          )}

          {onEdit && (
            <UIButton
              className="w-[138px] h-[40px] bg-gray-200 text-black"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
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
            {post.likes}
          </Typography>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
          <MessageCircle className="w-4 h-4 text-muted" />
          <Typography variant="body" color="muted">
            {post.comments}
          </Typography>
        </div>
      </div>
    </div>
  );

  if (!clickable) {
    return CardInner;
  }

  return (
    <Link to={`/posts/${post.id}`} state={{ post, email }} className="block">
      {CardInner}
    </Link>
  );
};

export default PostCard;
