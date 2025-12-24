import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Typography from "../../components/ui/Typography";
import UIButton from "../../components/ui/UiButton";
import { ImagePlus } from "lucide-react";
import AddImageModal from "../AddImageModal";

interface CreatePostModalProps {
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: {
    title?: string;
    content?: string;
  };
  customTitle?: string;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onClose,
  mode = "create",
  initialData,
  customTitle,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
    }
  }, [initialData]);

  const handlePublish = () => {
    if (mode === "create") {
      console.log("Опубликовать новый пост:", { title, content });
    } else {
      console.log("Сохранить изменения поста:", { title, content });
    }
    onClose();
  };

  const handleDraft = () => {
    if (mode === "create") {
      console.log("Отправить в черновики:", { title, content });
    } else {
      console.log("Сохранить как черновик:", { title, content });
    }
    onClose();
  };

  const modalTitle =
    customTitle || (mode === "create" ? "Создать пост" : "Редактировать");

  const publishButtonText =
    mode === "create" ? "Опубликовать пост" : "Сохранить изменения";

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-40">
        <div className="bg-white p-6 rounded-2xl w-[544px] h-[400px] flex flex-col gap-4">
          <Typography variant="h4">{modalTitle}</Typography>

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
              {publishButtonText}
            </UIButton>

            <UIButton size="sm" color="gray" onClick={handleDraft}>
              Черновики
            </UIButton>
          </div>
        </div>
      </div>

      {/* Передача заголовка */}
      {isAddImageOpen &&
        createPortal(
          <AddImageModal
            onClose={() => setIsAddImageOpen(false)}
            title={modalTitle}
          />,
          document.body
        )}
    </>
  );
};

export default CreatePostModal;
