import React, {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const button = tv({
  base: "rounded-md inline-flex items-center justify-center font-medium transition-colors",
  variants: {
    size: {
      sm: "h-[40px] w-[167px] text-[14px]",
      md: "h-[40px] w-[191px] text-[14px]",
      lg: "h-[40px] w-[384px] text-[14px]",
      xl: "h-[40px] w-[768px] text-[14px]",
    },
    color: {
      primary: "bg-primary text-white hover:bg-primary/90 active:bg-primary/80",
      secondary:
        "bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80",
      gray: "bg-gray-300 text-primary hover:bg-gray-400 active:bg-gray-500",
      dark: "bg-black text-white hover:bg-gray-800 active:bg-gray-900",
    },
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
    fullWidth: false,
  },
});

export type UIButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>
>;

const UIButton: React.FC<UIButtonProps> = ({
  children,
  size,
  color,
  fullWidth,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(button({ size, color, fullWidth }), className)}
    >
      {children}
    </button>
  );
};

export default UIButton;
