import React from "react";
import HeaderLogo from "../../components/layout/HeaderLogo";
import HeaderUser from "../../components/layout/HeaderUser";

interface HeaderProps {
  email: string;
  avatarUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ email, avatarUrl }) => {
  return (
    <header className="w-full flex items-center justify-between px-20 py-4 bg-back shadow-md">
      <HeaderLogo />

      <HeaderUser email={email} avatarUrl={avatarUrl} />
    </header>
  );
};

export default Header;
