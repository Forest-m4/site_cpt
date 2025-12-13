import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Feature/Header";
import Sidebar from "../../Feature/Sidebar";
import PostsFilter from "../../components/layout/PostsFilter";
import Typography from "../../components/ui/Typography";
import UIButton from "../../components/ui/UiButton";
import { PostFilterType } from "../../types/posts";
import CreatePostModal from "../../Feature/CreatePostModal";

interface LocationState {
  email?: string;
  role?: "reader" | "author";
}

const Posts: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const userEmail = state?.email || "user@example.com";
  const role = state?.role || "reader";

  const [filter, setFilter] = useState<PostFilterType>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showCreateButton = role === "author" && filter === "my";

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
      <Sidebar />
      <Header email={userEmail} />

      <main className="ml-[265px] mt-[40px] p-4 flex flex-col gap-4">
        {role === "author" && (
          <PostsFilter activeFilter={filter} onChange={setFilter} />
        )}

        {showCreateButton && (
          <UIButton
            size="md"
            color="primary"
            className="w-[978px] h-[40px]"
            onClick={() => setIsModalOpen(true)}
          >
            Создать пост
          </UIButton>
        )}

        <Typography variant="subtitle-medium">Содержимое постов...</Typography>
      </main>

      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Posts;
