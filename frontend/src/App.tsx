import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import AllPosts from "./pages/AllPosts";
import MyPosts from "./pages/MyPosts";
import Drafts from "./pages/Drafts";
import PostPage from "./pages/PostPage";

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("userEmail");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/posts/all" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<Navigate to="all" replace />} />
          <Route path="all" element={<AllPosts />} />
          <Route path="my" element={<MyPosts />} />
          <Route path="drafts" element={<Drafts />} />
          <Route path=":id" element={<PostPage />} /> {/* 👈 вот он */}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
