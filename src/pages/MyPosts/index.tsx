import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import UIButton from "../../components/ui/UiButton";
import CreatePostModal from "../../Feature/CreatePostModal";
import PostCard from "../../lib/PostCard";

const MyPosts: React.FC = () => {
  const { email } = useOutletContext<{ email: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myPost = {
    date: "31 декабря",
    title: "Заголовок",
    content:
      "Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов. Предварительные выводы неутешительны: перспективное планирование не даёт нам иного выбора, кроме определения экономической целесообразности принимаемых решений.",
    likes: 110,
    comments: 110,
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

      <PostCard
        email={email}
        date={myPost.date}
        title={myPost.title}
        content={myPost.content}
        likes={myPost.likes}
        comments={myPost.comments}
        onEdit={() => setIsModalOpen(true)}
        showPublish={false}
      />

      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          mode="edit"
          initialData={{ title: myPost.title, content: myPost.content }}
          customTitle="Редактировать"
        />
      )}
    </div>
  );
};

export default MyPosts;
