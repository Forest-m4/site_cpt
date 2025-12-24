import { createContext } from "react";

export interface PostType {
  id: string;
  email: string;
  date: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
}

interface PostsContextProps {
  posts: PostType[];
}

export const PostsContext = createContext<PostsContextProps>({
  posts: [],
});
