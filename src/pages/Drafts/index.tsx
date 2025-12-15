import React, { useState } from "react";
import PostCard from "../../lib/PostCard";
import CreatePostModal from "../../Feature/CreatePostModal";

const Drafts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost] = useState<{
    title: string;
    content: string;
  } | null>({
    title: "Заголовок черновика",
    content:
      "Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов. Предварительные выводы неутешительны: перспективное планирование не даёт нам иного выбора, кроме определения экономической целесообразности принимаемых решений.",
  });

  return (
    <div className="flex flex-col gap-4">
      <PostCard
        email="user@example.com"
        date="31 декабря"
        title={selectedPost!.title}
        content={selectedPost!.content}
        likes={110}
        comments={110}
        showPublish={true}
        onEdit={() => setIsModalOpen(true)}
      />

      {isModalOpen && selectedPost && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          mode="edit"
          initialData={selectedPost}
          customTitle="Редактировать"
        />
      )}
    </div>
  );
};

export default Drafts;
