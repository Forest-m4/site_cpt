import React, { useState } from "react";
import UIButton from "../../components/ui/UiButton";
import CreatePostModal from "../../Feature/CreatePostModal";
import Typography from "../../components/ui/Typography";

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

      <div className="flex flex-col gap-4">
        <Typography>Постов нет</Typography>
      </div>

      {isModalOpen && (
        <CreatePostModal onClose={() => setIsModalOpen(false)} mode="create" />
      )}
    </div>
  );
};

export default MyPosts;
