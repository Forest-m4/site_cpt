import { api } from "./axios";
import { Post } from "../models/Post";

export const postsApi = {
  getAll: () => api.get<Post[]>("/posts"),
  getMine: () => api.get<Post[]>("/posts/my"),
  create: (data: Partial<Post>) => api.post("/posts", data),
};
