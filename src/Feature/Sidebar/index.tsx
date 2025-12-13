import { useState } from "react";
import SidebarItem from "../../components/layout/SidebarItem";
import { FileText, Phone } from "lucide-react";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<"posts" | "contacts">("posts");

  return (
    <aside className="fixed top-[112px] left-[170px] h-[calc(100vh-128px)] w-48 flex flex-col gap-2">
      <div className="px-6 flex flex-col gap-2 w-full">
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
      </div>
    </aside>
  );
};

export default Sidebar;
