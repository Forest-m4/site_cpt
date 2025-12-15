import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import PostCard from "../../lib/PostCard";
import CreatePostModal from "../../Feature/CreatePostModal";

type OutletContextType = {
  email: string;
};

const Drafts: React.FC = () => {
  const { email } = useOutletContext<OutletContextType>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost] = useState({
    title: "Заголовок",
    content:
      "Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов.",
  });

  return (
    <div className="flex flex-col gap-4">
      <PostCard
        email={email}
        date="31 декабря"
        title={selectedPost.title}
        content={selectedPost.content}
        likes={110}
        comments={110}
        showPublish={true}
        onEdit={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
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
