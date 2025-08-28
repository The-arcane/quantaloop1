import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GradientCard({ children, className, glow = true }: { children: ReactNode; className?: string, glow?: boolean }) {
  return (
    <div className={cn(
      "rounded-lg p-[2px] bg-gradient-to-br from-primary via-accent to-secondary transition-all duration-300",
      glow && "hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)]",
      className
    )}>
      {children}
    </div>
  );
}
