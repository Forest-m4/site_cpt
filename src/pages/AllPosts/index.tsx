import { useOutletContext } from "react-router-dom";
import PostCard, { PostData } from "../../lib/PostCard";

const AllPosts: React.FC = () => {
  const { email } = useOutletContext<{ email: string }>();

  const posts: PostData[] = [
    {
      id: 1,
      date: "31 декабря",
      title: "Первый пост",
      content:
        "Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов.",
      likes: 110,
      comments: 110,
    },
    {
      id: 2,
      date: "30 декабря",
      title: "Второй пост",
      content:
        "Предварительные выводы неутешительны: перспективное планирование не даёт нам иного выбора.",
      likes: 52,
      comments: 12,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} email={email} />
      ))}
    </div>
  );
};

export default AllPosts;
