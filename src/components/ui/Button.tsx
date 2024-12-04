import { ButtonHTMLAttributes, ElementType, FC, useRef } from "react";
import cn from "classnames";
import { Spinner } from "../ui/Spinner";

type BDColors = "white" | "blue" | "magenta" | "primary" | "lightGray";

type Variant = "border" | "fill" | "link";
type Size = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: Variant;
  color?: BDColors;
  size?: Size;
  active?: boolean;
  type?: "submit" | "reset" | "button";
  Component?: ElementType;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  className,
  size = "medium",
  variant = "border",
  children,
  active,
  width,
  color = "blue",
  loading = false,
  disabled = false,
  style = {},
  Component = "button",
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const colorsBorder: { [P in BDColors]: string } = {
    white:
      "border-white text-white-600 transition-all hover:bg-white hover:text-gray-500",
    blue: "border-blue-600 text-blue-600 transition-all hover:bg-blue-600 hover:text-white",
    magenta:
      "border-magenta-600 text-magenta-600 transition-all hover:bg-magenta-600 hover:text-white",
    primary:
      "border-primary-600 text-primary-600 transition-all hover:bg-primary-600 hover:text-white",
    lightGray: "border-light-gray-600 text-light-gray-600",
  };

  const colorsFill: { [P in BDColors]: string } = {
    white:
      "bg-white-600 border-white-600 text-white transition-all hover:bg-white-500 hover:border-white-500",
    blue: "bg-blue-600 border-blue-600 text-white transition-all hover:bg-blue-500 hover:border-blue-500",
    magenta:
      "bg-magenta-600 border-magenta-600 text-white transition-all hover:bg-magenta-500 hover:border-magenta-500",
    primary:
      "bg-primary-600 border-primary-600 text-white transition-all hover:bg-primary-500 hover:border-primary-500",
    lightGray:
      "bg-light-gray-600 border-light-gray-600 text-primary-600 transition-all hover:bg-light-gray-500 hover:border-light-gray-50",
  };

  const colorsLink: { [P in BDColors]: string } = {
    white: "text-white-600 transition-all hover:text-white",
    blue: "text-blue-600 hover:text-blue-500",
    magenta:
      "bg-magenta-600 border-magenta-600 text-white transition-all hover:bg-magenta-500 hover:border-magenta-500",
    primary: "text-primary-600 underline transition-all hover:text-primary-400",
    lightGray:
      "bg-light-gray-600 border-light-gray-600 text-primary-600 transition-all hover:bg-light-gray-500 hover:border-light-gray-50",
  };

  const classVariant: { [P in Variant]: string } = {
    border: colorsBorder[color],
    fill: colorsFill[color],
    link: colorsLink[color],
  };

  const classSize: { [P in Size]: string } = {
    small: "text-sm py-1 px-3",
    medium: "text-sm py-3 px-7",
    large: "text-md py-4 px-9",
  };

  const rootClassName = cn(
    "font-bold rounded-full flex items-center",
    classVariant[variant],
    classSize[size],
    {
      "border-[2px]": variant === "fill" || variant === "border",
      "!px-0": variant === "link",
      "!border-gray-300 !text-gray-300 hover:!bg-inherit":
        disabled && variant === "border",
      "!bg-gray-500 !border-gray-500 !text-white":
        disabled && variant === "fill",
    },
    className
  );

  const colorSpinner = cn(
    {
      "#ffffff": variant === "fill",
      "#060C41": variant === "border" || variant === "link",
    },
    className
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {loading ? size === "small" ? <Spinner /> : "Cargando" : children}
      {loading && size !== "small" && (
        <i className="pl-2 m-0 flex">
          <Spinner size={size ?? 'md'} color={colorSpinner} />
        </i>
      )}
    </Component>
  );
};
