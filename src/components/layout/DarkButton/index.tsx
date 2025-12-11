import React from "react";
import UIButton, { type UIButtonProps } from "../../ui/UiButton";

const DarkButton: React.FC<UIButtonProps> = ({ className, ...props }) => {
  return <UIButton {...props} color="dark" className={className} />;
};

export default DarkButton;
