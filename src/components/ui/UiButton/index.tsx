import React, {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const button = tv({
  base: "rounded-md flex items-center justify-center font-medium transition-colors",
  variants: {
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    },
    color: {
      primary: "bg-primary text-back hover:bg-primary/90 active:bg-primary/80",
      secondary:
        "bg-secondary text-back hover:bg-secondary/90 active:bg-secondary/80",
      dark: "bg-black text-white hover:bg-gray-800 active:bg-gray-900",
      gray: "bg-gray-300 text-primary hover:bg-gray-400 active:bg-gray-500",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
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
  className,
  ...props
}) => {
  return (
    <button {...props} className={twMerge(button(props), className)}>
      {children}
    </button>
  );
};

export default UIButton;
