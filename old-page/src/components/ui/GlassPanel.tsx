import React, { useCallback } from "react";

type GlassPanelProps<T extends React.ElementType> = {
  as?: T;
  hover?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function GlassPanel<T extends React.ElementType = "div">({
  as,
  hover = true,
  className = "",
  children,
  ...rest
}: GlassPanelProps<T>) {
  const Component = as || "div";

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    target.style.setProperty("--glass-x", `${x}%`);
    target.style.setProperty("--glass-y", `${y}%`);
  }, []);

  return (
    <Component
      className={`glass rounded-2xl ${hover ? "glass-hover" : ""} ${className}`}
      onMouseMove={hover ? handleMouseMove : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}
