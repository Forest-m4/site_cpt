import React, { useState } from "react";
import Typography from "../../components/ui/Typography";
import UIButton from "../../components/ui/UiButton";
import { Trash2 } from "lucide-react";

interface AddImageModalProps {
  onClose: () => void;
}

const AddImageModal: React.FC<AddImageModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showTrash, setShowTrash] = useState(false);

  const handlePublish = () => {
    console.log("Опубликовать пост:", { title, content });
    onClose();
  };

  const handleDraft = () => {
    console.log("Отправить в черновики:", { title, content });
    onClose();
  };

  const handleDeleteImage = () => {
    console.log("Удалить изображение");
    setShowTrash(false);
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/40 z-50 pt-20">
      <div className="bg-white p-6 rounded-2xl w-[544px] h-[600px] flex flex-col gap-4">
        <Typography variant="h4">Создать пост</Typography>

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

        <button
          type="button"
          className="w-full h-[288px] bg-gray-300 border rounded-md relative"
          onClick={() => console.log("клик по серому полю")}
          onMouseEnter={() => setShowTrash(true)}
          onMouseLeave={() => setShowTrash(false)}
        >
          {showTrash && (
            <button
              onClick={handleDeleteImage}
              className="absolute top-2 right-2 p-1 bg-transparent rounded"
              aria-label="Удалить изображение"
            >
              <Trash2 className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </button>

        <div className="flex flex-col gap-1">
          <Typography variant="subtitle-medium">Контент</Typography>
          <textarea
            placeholder="Введите контент"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[80px] border rounded-md p-2 resize-none"
          />
        </div>

        <div className="flex gap-3 mt-auto">
          <UIButton
            onClick={handlePublish}
            className="w-[167px] h-[40px] bg-black text-white"
          >
            Опубликовать пост
          </UIButton>

          <UIButton
            onClick={handleDraft}
            className="w-[196px] h-[40px] bg-gray-200 text-black"
          >
            Отправить в черновики
          </UIButton>
        </div>
      </div>
    </div>
  );
};

export default AddImageModal;
