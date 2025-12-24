import { type JSX, type PropsWithChildren } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const typesMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  label: "label",
  span: "span",
  a: "a",
} as const;

type TypographyType = keyof typeof typesMapping;

const typography = tv({
  base: "font-inter",
  variants: {
    variant: {
      h4: "text-[20px] font-semibold",
      "p-ui": "text-[16px] font-normal",
      regular: "text-[15px] font-normal",
      "subtitle-medium": "text-[14px] font-medium",
      body: "text-[14px] font-normal",
      detail: "text-[12px] font-medium",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      back: "text-back",
      muted: "text-muted",
      white: "text-white",
      slate500: "text-slate500",
    },
  },
  defaultVariants: {
    variant: "p-ui",
    color: "primary",
  },
});

type TypographyVariantProps = VariantProps<typeof typography>;

interface TypographyProps extends PropsWithChildren, TypographyVariantProps {
  type?: TypographyType;
  className?: string;
  htmlFor?: string;
  href?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  type = "p",
  variant,
  color,
  className,
  ...props
}) => {
  const Component = typesMapping[type] as keyof JSX.IntrinsicElements;

  return (
    <Component
      {...props}
      className={twMerge(className, typography({ variant, color }))}
    >
      {children}
    </Component>
  );
};

export default Typography;
