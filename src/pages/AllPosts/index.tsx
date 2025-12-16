import { useEffect, useState } from "react";
import PostCard from "../../lib/PostCard";
import { postsApi } from "../../api/posts.api";
import { Post } from "../../models/Post";

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postsApi
      .getAll()
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          email={post.authorEmail}
          date={new Date(post.createdAt).toLocaleDateString()}
          title={post.title}
          content={post.content}
          likes={post.likes}
          comments={post.commentsCount}
          showPublish={false}
        />
      ))}
    </div>
  );
};

export default AllPosts;
