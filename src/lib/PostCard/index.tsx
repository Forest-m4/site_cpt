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
}

const PostCard: React.FC<PostCardProps> = ({
  email,
  date,
  title,
  content,
  likes,
  comments,
  onEdit,
}) => {
  return (
    <div className="w-[768px] h-[780px] bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
      {/* Верхняя панель */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
          <div className="flex flex-col">
            <Typography variant="body">{email}</Typography>
            <Typography variant="detail" className="text-gray-500">
              {date}
            </Typography>
          </div>
        </div>
      </div>

      {/* Заголовок */}
      <Typography variant="h4">{title}</Typography>

      {/* Серая панелька */}
      <div className="w-[736px] h-[432px] bg-gray-200 rounded-md flex items-center justify-center">
        <Typography variant="body" className="text-gray-400"></Typography>
      </div>

      {/* Текст поста */}
      <Typography variant="body">{content}</Typography>

      {/* Кнопки */}
      <div className="flex gap-3 mt-1">
        <UIButton className="w-[167px] h-[40px] bg-black text-white">
          Опубликовать пост
        </UIButton>
        <UIButton
          className="w-[138px] h-[40px] bg-gray-200 text-black"
          onClick={onEdit}
        >
          Редактировать
        </UIButton>
      </div>

      {/* Лайки и комментарии */}
      <div className="flex items-center gap-4 mt-auto">
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
