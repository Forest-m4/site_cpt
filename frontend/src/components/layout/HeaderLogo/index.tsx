import React from "react";

interface HeaderLogoProps {
  src?: string;
  className?: string;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  src = "/images/logo.png",
  className,
}) => {
  return (
    <img src={src} alt="Logo" className={className || "w-[72px] h-[20px]"} />
  );
};

export default HeaderLogo;
