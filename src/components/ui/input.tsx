import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "file:text-foreground placeholder:text-muted-foreground text-black selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
        // Border
        "border-b border-gray-300 focus:border-[#008B8B]",
        // Layout
        "flex h-9 w-full min-w-0 bg-transparent px-3 py-1 text-base",
        // Shadow
        "shadow-sm focus:shadow-md",
        // Transition & outline
        "transition-[color,box-shadow,border-color] outline-none",
        // File input styles
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Responsive
        "md:text-sm",
        // Invalid state
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        className
      )}
      {...props}
    />
  );
}

export { Input };
