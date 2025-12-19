import PostCard, { PostData } from "../../../Feature/PostCard";

interface PostsFeedProps {
  posts: PostData[];
  email: string;
}

const PostsFeed: React.FC<PostsFeedProps> = ({ posts, email }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} email={email} />
      ))}
    </div>
  );
};

export default PostsFeed;
