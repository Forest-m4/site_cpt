import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Feature/Header";
import Sidebar from "../../Feature/Sidebar";

const Posts: React.FC = () => {
  const location = useLocation();
  const userEmail = location.state?.email || "user@example.com";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header email={userEmail} />

      <Sidebar />
      <main className="ml-48 mt-10 p-4">___</main>
    </div>
  );
};

export default Posts;
