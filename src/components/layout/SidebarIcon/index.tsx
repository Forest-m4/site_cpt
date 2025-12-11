import React from "react";
import { LucideIcon } from "lucide-react";

interface SidebarIconProps {
  Icon: LucideIcon;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ Icon }) => {
  return <Icon className="w-4 h-4" />;
};

export default SidebarIcon;
