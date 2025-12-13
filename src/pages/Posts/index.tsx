import React from "react";
import { useNavigate, Outlet, useMatch } from "react-router-dom";

import Sidebar from "../../Feature/Sidebar";
import Header from "../../Feature/Header";

const Posts: React.FC = () => {
  const navigate = useNavigate();

  const matchAll = useMatch("/posts/all");
  const matchMy = useMatch("/posts/my");
  const matchDrafts = useMatch("/posts/drafts");

  const tabs = [
    { key: "all", label: "Все посты", match: matchAll },
    { key: "my", label: "Мои посты", match: matchMy },
    { key: "drafts", label: "Черновики", match: matchDrafts },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
      <Sidebar />
      <Header email="user@example.com" />

      <main className="ml-[265px] mt-[40px] p-4 flex flex-col gap-4">
        {/* Панель вкладок */}
        <div className="w-[360px] h-[42px] flex border rounded-md overflow-hidden bg-back mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => navigate(tab.key)}
              className="w-1/3 h-full relative flex items-center justify-center"
            >
              <div
                className={`absolute inset-1 rounded-md transition-colors duration-200 ${
                  tab.match ? "bg-white" : "bg-back"
                }`}
              />
              <span
                className={`relative z-10 text-sm font-medium ${
                  tab.match ? "text-primary" : "text-gray-500"
                }`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default Posts;
