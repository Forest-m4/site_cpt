import React, { useState } from "react";
import UIButton from "../../components/ui/UiButton";
import CreatePostModal from "../../Feature/CreatePostModal";
import PostCard from "../../lib/PostCard";

const MyPosts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myPost = {
    email: "user@example.com",
    date: "31 декабря",
    title: "Мой пост",
    content:
      "Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов. Предварительные выводы неутешительны: перспективное планирование не даёт нам иного выбора, кроме определения экономической целесообразности принимаемых решений.",
    likes: 42,
    comments: 5,
  };

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

      {/* Пост */}
      <PostCard
        email={myPost.email}
        date={myPost.date}
        title={myPost.title}
        content={myPost.content}
        likes={myPost.likes}
        comments={myPost.comments}
        onEdit={() => console.log("edit")}
        showPublish={false} // 👈 ВАЖНО
      />
      {/* Модалка создания */}
      {isModalOpen && (
        <CreatePostModal onClose={() => setIsModalOpen(false)} mode="create" />
      )}
    </div>
  );
};

export default MyPosts;
