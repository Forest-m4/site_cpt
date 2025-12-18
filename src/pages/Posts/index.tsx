import React from "react";
import { Outlet, useLocation, useNavigate, useMatch } from "react-router-dom";

import Sidebar from "../../Feature/Sidebar";
import Header from "../../Feature/Header";
import AdBanner from "../../components/layout/AdBanner";

interface LocationState {
  email?: string;
  role?: "reader" | "author";
}

const POSTS_WIDTH = 768;
const SIDEBAR_WIDTH = 240;

const Posts: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const storedEmail = localStorage.getItem("userEmail");
  const storedRole = localStorage.getItem("userRole") as
    | "reader"
    | "author"
    | null;

  const userEmail = state?.email || storedEmail || "user@example.com";
  const role = state?.role || storedRole || "reader";

  const matchAll = useMatch("/posts/all");
  const matchMy = useMatch("/posts/my");
  const matchDrafts = useMatch("/posts/drafts");

  const tabs = [
    { key: "all", label: "Все посты", match: matchAll },
    { key: "my", label: "Мои посты", match: matchMy },
    { key: "drafts", label: "Черновики", match: matchDrafts },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Header email={userEmail} />
      </div>

      <div className="pt-[96px] flex justify-center">
        {/* Контейнер постов */}
        <div className="relative" style={{ width: POSTS_WIDTH }}>
          {/* Sidebar*/}
          <div
            className="absolute top-0 -left-[190px]"
            style={{ width: SIDEBAR_WIDTH }}
          >
            <Sidebar />
          </div>

          {/* Реклама */}
          <div
            className="fixed"
            style={{
              width: 208,
              top: "144px",
              left: `calc(50% + ${POSTS_WIDTH / 2}px + 32px)`,
            }}
          >
            <div className="flex flex-col gap-6">
              <AdBanner />
            </div>
          </div>

          {/*  Кнопки */}
          {role === "author" && (
            <div className="mb-4">
              <div className="inline-flex border rounded-md overflow-hidden bg-back">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => navigate(tab.key)}
                    className="relative px-6 py-2"
                  >
                    <div
                      className={`absolute inset-1 rounded-md transition-colors ${
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
            </div>
          )}

          {/* Посты */}
          <Outlet context={{ email: userEmail }} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
