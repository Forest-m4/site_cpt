export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorEmail: string;
  likes: number;
  commentsCount: number;
  published: boolean;
}
