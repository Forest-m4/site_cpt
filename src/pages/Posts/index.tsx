import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Feature/Header";

const Posts: React.FC = () => {
  const location = useLocation();
  const userEmail = location.state?.email || "user@example.com";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header email={userEmail} />

      <main className="p-4">___</main>
    </div>
  );
};

export default Posts;
