import React from "react";
import { useOutletContext } from "react-router-dom";
import PostCard from "../../lib/PostCard";

const AllPosts: React.FC = () => {
  const { email } = useOutletContext<{ email: string }>();

  const post = {
    date: "31 декабря",
    title: "Заголовок",
    content:
      "Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов. Предварительные выводы неутешительны: перспективное планирование не даёт нам иного выбора, кроме определения экономической целесообразности принимаемых решений.",
    likes: 110,
    comments: 110,
  };

  return (
    <div className="flex flex-col gap-4">
      <PostCard
        email={email}
        date={post.date}
        title={post.title}
        content={post.content}
        likes={post.likes}
        comments={post.comments}
        showPublish={false}
      />
    </div>
  );
};

export default AllPosts;
