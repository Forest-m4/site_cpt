// pages/Drafts.tsx
import React from "react";
import PostCard from "../../lib/PostCard";

const Drafts: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <PostCard
        email="user@example.com"
        date="31 декабря"
        title="Заголовок"
        content="Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов. Предварительные выводы неутешительны: перспективное планирование не даёт нам иного выбора, кроме определения экономической целесообразности принимаемых решений."
        likes={110}
        comments={110}
      />
    </div>
  );
};

export default Drafts;
