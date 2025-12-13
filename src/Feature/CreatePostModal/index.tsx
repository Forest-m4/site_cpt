import React, { useState } from "react";
import { createPortal } from "react-dom";
import Typography from "../../components/ui/Typography";
import UIButton from "../../components/ui/UiButton";
import { ImagePlus } from "lucide-react";
import AddImageModal from "../AddImageModal"; // теперь это отдельный файл

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);

  const handlePublish = () => {
    console.log("Опубликовать пост:", { title, content });
    onClose();
  };

  const handleDraft = () => {
    console.log("Отправить в черновики:", { title, content });
    onClose();
  };

  return (
    <>
      {/* Основное окно */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-40">
        <div className="bg-white p-6 rounded-2xl w-[544px] h-[400px] flex flex-col gap-4">
          <Typography variant="h4">Создать пост</Typography>

          {/* Заголовок */}
          <div className="flex flex-col gap-1">
            <Typography variant="subtitle-medium">Заголовок</Typography>
            <input
              type="text"
              placeholder="Введите заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 border rounded-md px-2"
            />
          </div>

          {/* Кнопка добавить картинку */}
          <UIButton
            size="md"
            color="primary"
            onClick={() => setIsAddImageOpen(true)}
            className="gap-2"
          >
            <ImagePlus className="w-4 h-4" />
            <Typography variant="body" color="white">
              Добавить картинку
            </Typography>
          </UIButton>

          {/* Контент */}
          <div className="flex flex-col gap-1">
            <Typography variant="subtitle-medium">Контент</Typography>
            <textarea
              placeholder="Введите контент"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-[512px] h-[80px] border rounded-md p-2 resize-none"
            />
          </div>

          {/* Кнопки */}
          <div className="flex gap-2 mt-auto">
            <UIButton size="sm" color="primary" onClick={handlePublish}>
              Опубликовать пост
            </UIButton>

            <UIButton size="sm" color="gray" onClick={handleDraft}>
              Черновики
            </UIButton>
          </div>
        </div>
      </div>

      {/* Портал для AddImageModal */}
      {isAddImageOpen &&
        createPortal(
          <AddImageModal onClose={() => setIsAddImageOpen(false)} />,
          document.body
        )}
    </>
  );
};

export default CreatePostModal;
