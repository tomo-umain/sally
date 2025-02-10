import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "sally-inline-flex sally-items-center sally-justify-center sally-gap-2 sally-whitespace-nowrap sally-rounded-md sally-text-sm sally-font-medium sally-transition-colors focus-visible:sally-outline-none focus-visible:sally-ring-1 focus-visible:sally-ring-ring disabled:sally-pointer-events-none disabled:sally-opacity-50 [&_svg]:sally-pointer-events-none [&_svg]:sally-size-4 [&_svg]:sally-shrink-0",
  {
    variants: {
      variant: {
        default:
          "sally-bg-white sally-text-black sally-shadow hover:sally-bg-primary/90",
        destructive:
          "sally-bg-destructive sally-text-destructive-foreground sally-shadow-sm hover:sally-bg-destructive/90",
        outline:
          "sally-border sally-border-input sally-bg-background sally-shadow-sm hover:sally-bg-accent hover:sally-text-accent-foreground",
        secondary:
          "sally-bg-secondary sally-text-secondary-foreground sally-shadow-sm hover:sally-bg-secondary/80",
        ghost: "hover:sally-bg-accent hover:sally-text-accent-foreground",
        link: "sally-text-primary sally-underline-offset-4 hover:sally-underline",
      },
      size: {
        default: "sally-h-9 sally-px-4 sally-py-2",
        sm: "sally-h-8 sally-rounded-md sally-px-3 sally-text-xs",
        lg: "sally-h-10 sally-rounded-md sally-px-8",
        icon: "sally-h-9 sally-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
