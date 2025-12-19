import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import PostCard, { PostData } from "../../Feature/PostCard";
import CreatePostModal from "../../Feature/CreatePostModal";

const Drafts: React.FC = () => {
  const { email } = useOutletContext<{ email: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const draftPost: PostData = {
    id: 1,
    date: "31 декабря",
    title: "Заголовок",
    content:
      "Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов. Предварительные выводы неутешительны: перспективное планирование не даёт нам иного выбора, кроме определения экономической целесообразности принимаемых решений.",
    likes: 110,
    comments: 110,
  };

  return (
    <div className="flex flex-col gap-4">
      <PostCard
        post={draftPost}
        email={email}
        clickable={false}
        showPublish
        onEdit={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          mode="edit"
          initialData={{
            title: draftPost.title,
            content: draftPost.content,
          }}
          customTitle="Редактировать"
        />
      )}
    </div>
  );
};

export default Drafts;
