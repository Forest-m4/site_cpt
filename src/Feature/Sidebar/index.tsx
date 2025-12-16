import React, { useState, useEffect, useRef } from "react";
import { FileText, Phone, LogOut } from "lucide-react";
import SidebarItem from "../../components/layout/SidebarItem";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { logout } = useAuth();
  const [activeItem, setActiveItem] = useState<"posts" | "contacts">("posts");
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (delta > 5 && currentScrollY > 50) {
        setVisible(false);
      } else if (delta < -3) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={`
        fixed top-[96px]
        w-48
        flex flex-col justify-between h-[calc(100vh-96px)]
        transition-transform duration-200 ease-out
        overflow-y-auto
        ${className || ""}
      `}
      style={{
        transform: visible ? "translateY(0)" : "translateY(-120px)",
        opacity: visible ? 1 : 0.95,
      }}
    >
      <div className="px-6 flex flex-col gap-2 pt-4">
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

      <div className="px-6 pb-6 mt-auto">
        <SidebarItem icon={LogOut} label="Выйти" onClick={logout} />
      </div>
    </aside>
  );
};

export default Sidebar;
