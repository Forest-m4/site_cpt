import { useState } from "react";
import SidebarItem from "../../components/layout/SidebarItem";
import { FileText, Phone } from "lucide-react";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<"posts" | "contacts">("posts");

  return (
    <aside className="fixed top-[128px] left-12 h-[calc(100vh-128px)] w-48 flex flex-col gap-2 px-4">
      <SidebarItem
        icon={FileText}
        label="Посты"
        active={activeItem === "posts"}
        onClick={() => setActiveItem("posts")}
      />
      <SidebarItem
        icon={Phone}
        label="Контакты"
        active={activeItem === "contacts"}
        onClick={() => setActiveItem("contacts")}
      />
    </aside>
  );
};

export default Sidebar;
