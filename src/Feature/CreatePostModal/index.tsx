import React, { useState } from "react";
import DarkButton from "../../components/layout/DarkButton";
import Typography from "../../components/ui/Typography";
import { ImagePlus } from "lucide-react";

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = () => {
    console.log("Опубликовать пост:", { title, content });
    onClose();
  };

  const handleDraft = () => {
    console.log("Отправить в черновики:", { title, content });
    onClose();
  };

  const handleAddImage = () => {
    console.log("Добавить картинку (откроется файловый диалог)");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-2xl w-[544px] h-[400px] flex flex-col gap-4">
        <Typography variant="h4" color="primary">
          Создать пост
        </Typography>

        <div className="flex flex-col gap-1">
          <Typography variant="subtitle-medium" color="primary">
            Заголовок
          </Typography>
          <input
            type="text"
            placeholder="Введите заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 border rounded-md px-2"
          />
        </div>

        <DarkButton
          className="w-[191px] h-[40px] flex items-center justify-center gap-2"
          onClick={handleAddImage}
        >
          <ImagePlus className="w-4 h-4" />
          <Typography variant="body" color="white">
            Добавить картинку
          </Typography>
        </DarkButton>

        <div className="flex flex-col gap-1">
          <Typography variant="subtitle-medium" color="primary">
            Контент
          </Typography>
          <textarea
            placeholder="Введите контент"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-[512px] h-[80px] border rounded-md p-2 resize-none"
          />
        </div>

        <div className="flex gap-2 mt-auto">
          <DarkButton
            className="w-[167px] h-[40px] flex items-center justify-center"
            onClick={handlePublish}
          >
            <Typography variant="subtitle-medium" color="white">
              Опубликовать пост
            </Typography>
          </DarkButton>

          <DarkButton
            className="w-[167px] h-[40px] flex items-center justify-center bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
            onClick={handleDraft}
          >
            <Typography variant="subtitle-medium" color="primary">
              Черновики
            </Typography>
          </DarkButton>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
