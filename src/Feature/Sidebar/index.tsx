import { useEffect, useState } from "react";
import { FileText, Phone, LogOut } from "lucide-react";
import SidebarItem from "../../components/layout/SidebarItem";
import { useAuth } from "../../context/AuthContext";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<"posts" | "contacts">("posts");
  const { logout } = useAuth();

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <aside
      className={`
        fixed top-[112px] left-[170px]
        h-[calc(100vh-128px)]
        w-48
        flex flex-col justify-between
        transition-transform duration-300 ease-out
        ${visible ? "translate-y-0" : "-translate-y-24"}
      `}
    >
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
