import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import UIButton from "../../components/ui/UiButton";
import CreatePostModal from "../../Feature/CreatePostModal";
import PostCard, { PostData } from "../../lib/PostCard";

const MyPosts: React.FC = () => {
  const { email } = useOutletContext<{ email: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myPost: PostData = {
    id: 10,
    date: "31 декабря",
    title: "Мой пост",
    content:
      "Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов.",
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
        post={myPost}
        email={email}
        onEdit={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          mode="edit"
          initialData={{
            title: myPost.title,
            content: myPost.content,
          }}
          customTitle="Редактировать"
        />
      )}
    </div>
  );
};

export default MyPosts;
