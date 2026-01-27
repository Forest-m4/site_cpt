export interface CommentEntity {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
