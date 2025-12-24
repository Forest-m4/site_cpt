import { useLocation, Navigate } from "react-router-dom";
import PostCard from "../../Feature/PostCard";

const PostPage: React.FC = () => {
  const location = useLocation();
  const post = location.state?.post;
  const email = location.state?.email;

  if (!post) {
    return <Navigate to="/posts/all" replace />;
  }

  return <PostCard post={post} email={email} />;
};

export default PostPage;
