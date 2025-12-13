import React, { useState } from "react";
import UIButton from "../../components/ui/UiButton";
import CreatePostModal from "../../Feature/CreatePostModal";
import PostCard from "../../lib/PostCard";

const MyPosts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <UIButton
        size="md"
        color="primary"
        className="w-[765px] h-[40px] mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Создать пост
      </UIButton>

      <PostCard
        email="user@example.com"
        date="12.12.2025"
        title="Заголовок поста"
        content="Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов. Предварительные выводы неутешительны: перспективное планирование не даёт нам иного выбора, кроме определения экономической целесообразности принимаемых решений."
        likes={110}
        comments={110}
      />

      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default MyPosts;
