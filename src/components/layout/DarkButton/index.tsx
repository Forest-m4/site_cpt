import React, { ButtonHTMLAttributes } from "react";

interface DarkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DarkButton: React.FC<DarkButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-[384px] h-[40px] bg-[var(--color-primary)] text-[var(--color-back)] rounded-md hover:bg-[#2a2d46] active:bg-[#1f2235] transition-colors"
    >
      {children}
    </button>
  );
};

export default DarkButton;
