import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const alertVariants = cva(
  "sally-relative sally-w-full sally-rounded-lg sally-border sally-border-2 sally-px-4 sally-py-3 sally-text-sm [&>svg+div]:sally-translate-y-[-3px] [&>svg]:sally-absolute [&>svg]:sally-left-4 [&>svg]:sally-top-4 [&>svg]:sally-text-foreground [&>svg~*]:sally-pl-7",
  {
    variants: {
      variant: {
        default: "sally-bg-white",
        destructive:
          "sally-rounded-lg sally-bg-red-50/90 sally-border-red-200 sally-text-red-700 [&>svg]:sally-text-red-700 sally-text-left",
        warning:
          "sally-rounded-lg sally-bg-yellow-50/90 sally-border-yellow-200 sally-text-yellow-700 [&>svg]:sally-text-yellow-700 sally-text-left",
        success:
          "sally-rounded-lg sally-bg-green-50/90 sally-border-green-200 sally-text-green-700 [&>svg]:!text-green-700 sally-text-left",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      data-variant={variant}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
});

Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "sally-mb-1 sally-font-medium sally-leading-none sally-tracking-tight",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("sally-text-sm [&_p]:sally-leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
