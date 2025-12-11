import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Feature/Header";
import Sidebar from "../../Feature/Sidebar";
import PostsFilter from "../../components/layout/PostsFilter";
import DarkButton from "../../components/layout/DarkButton";
import Typography from "../../components/ui/Typography";
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
          <div className="flex items-center gap-2">
            <PostsFilter activeFilter={filter} onChange={setFilter} />
          </div>
        )}

        {showCreateButton && (
          <div className="mt-2">
            <DarkButton
              style={{ width: "978px", height: "40px" }}
              onClick={() => setIsModalOpen(true)}
            >
              <Typography variant="subtitle-medium" color="white">
                Создать пост
              </Typography>
            </DarkButton>
          </div>
        )}

        <div className="text-lg font-medium">Содержимое постов...</div>
      </main>

      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Posts;
