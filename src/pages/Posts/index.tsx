import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Feature/Header";
import Sidebar from "../../Feature/Sidebar";
import PostsFilter from "../../components/layout/PostsFilter";
import { PostFilterType } from "../../types/posts";

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
      <Sidebar />
      <Header email={userEmail} />

      <main className="ml-[265px] mt-[40px] p-4">
        {role === "author" && (
          <PostsFilter activeFilter={filter} onChange={setFilter} />
        )}
        <div className="text-lg font-medium">Содержимое постов...</div>
      </main>
    </div>
  );
};

export default Posts;
