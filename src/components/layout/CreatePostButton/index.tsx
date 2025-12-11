import React from "react";
import DarkButton from "../DarkButton";
import Typography from "../../ui/Typography";

interface CreatePostButtonProps {
  onClick?: () => void;
}

const CreatePostButton: React.FC<CreatePostButtonProps> = ({ onClick }) => {
  return (
    <DarkButton className="w-full max-w-xs mt-4" onClick={onClick}>
      <Typography variant="subtitle-medium" color="white">
        Создать пост
      </Typography>
    </DarkButton>
  );
};

export default CreatePostButton;
