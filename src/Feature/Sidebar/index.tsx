import { useState } from "react";
import { FileText, Phone, LogOut } from "lucide-react";
import SidebarItem from "../../components/layout/SidebarItem";
import { useAuth } from "../../context/AuthContext";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<"posts" | "contacts">("posts");
  const { logout } = useAuth();

  return (
    <aside className="fixed top-[112px] left-[170px] h-[calc(100vh-128px)] w-48 flex flex-col justify-between">
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
      <div className="px-6 pb-4">
        <SidebarItem icon={LogOut} label="Выйти" onClick={logout} />
      </div>
    </aside>
  );
};

export default Sidebar;
