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
}

const PostCard: React.FC<PostCardProps> = ({
  email,
  date,
  title,
  content,
  likes,
  comments,
}) => {
  return (
    <div className="w-[768px] h-[780px] bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
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

      <Typography variant="h4">{title}</Typography>

      <div className="w-[736px] h-[432px] bg-gray-200 rounded-md flex items-center justify-center">
        <Typography variant="body" className="text-gray-400">
          Изображение
        </Typography>
      </div>

      <Typography variant="body">{content}</Typography>

      <div className="flex gap-3 mt-2">
        <UIButton className="w-[167px] h-[40px] bg-black text-white">
          Опубликовать пост
        </UIButton>
        <UIButton className="w-[138px] h-[40px] bg-gray-200 text-black">
          Редактировать
        </UIButton>
      </div>

      <div className="flex items-center gap-4 mt-auto">
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
          <Heart className="w-4 h-4" />
          <Typography variant="body">{likes}</Typography>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
          <MessageCircle className="w-4 h-4 text-gray-700" />
          <Typography variant="body">{comments}</Typography>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
