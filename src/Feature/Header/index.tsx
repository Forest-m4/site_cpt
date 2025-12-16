import React from "react";
import HeaderLogo from "../../components/layout/HeaderLogo";
import HeaderUser from "../../components/layout/HeaderUser";

interface HeaderProps {
  email: string;
  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ email, avatarUrl }) => {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex items-center gap-12 py-4 max-w-[68rem]">
        <div className="shrink-0">
          <HeaderLogo />
        </div>

        <div className="flex-1" />

        <div className="shrink-0">
          <HeaderUser email={email} avatarUrl={avatarUrl} />
        </div>
      </div>
    </header>
  );
};

export default Header;
