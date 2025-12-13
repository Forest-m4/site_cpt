import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import MyPosts from "./pages/MyPosts";
import Typography from "./components/ui/Typography";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<Navigate to="all" replace />} />
          <Route path="all" element={<Typography>Все посты...</Typography>} />
          <Route path="my" element={<MyPosts />} />
          <Route
            path="drafts"
            element={<Typography>Черновики...</Typography>}
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
