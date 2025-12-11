import React from "react";
import Typography from "../../ui/Typography";

interface SidebarItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>; // компонент иконки
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  onClick,
  active,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ${
        active ? "bg-back" : "hover:bg-[#F1F5F9]"
      }`}
    >
      <Icon
        className={`w-4 h-4 transition-colors duration-200 ${
          active ? "text-primary" : "text-muted"
        }`}
      />
      <Typography
        variant="subtitle-medium"
        color={active ? "primary" : "muted"}
      >
        {label}
      </Typography>
    </button>
  );
};

export default SidebarItem;
