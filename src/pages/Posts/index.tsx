// src/pages/Posts.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Feature/Header";
import Sidebar from "../../Feature/Sidebar";

const Posts: React.FC = () => {
  const location = useLocation();
  const userEmail = location.state?.email || "user@example.com";

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
      <Sidebar />
      <Header email={userEmail} />
      <main className="ml-[235px] mt-[34px] p-4">
        <div className="text-lg font-medium">___</div>
      </main>
    </div>
  );
};

export default Posts;
