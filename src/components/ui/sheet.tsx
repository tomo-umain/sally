import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { toggleSidebar } from "./../../content";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "sally-fixed sally-inset-0 sally-z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "sally-fixed sally-z-50 sally-gap-4 bg-background sally-p-6 sally-shadow-lg sally-transition sally-ease-in-out data-[state=closed]:sally-duration-300 data-[state=open]:sally-duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "sally-inset-x-0 sally-top-0 sally-border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "sally-inset-x-0 sally-bottom-0 sally-border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "sally-inset-y-0 sally-left-0 sally-h-full sally-w-3/4 sally-border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:sally-max-w-sm",
        right:
          "sally-inset-y-0 sally-right-0 sally-h-full sally-w-3/4 sally-border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:sally-max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <div
        onClick={() => toggleSidebar()}
        className="sally-absolute sally-right-4 sally-top-4 sally-rounded-sm sally-opacity-70 sally-ring-offset-background sally-transition-opacity hover:sally-opacity-100 focus:sally-outline-none focus:sally-ring-2 focus:sally-ring-ring focus:sally-ring-offset-2 disabled:sally-pointer-events-none data-[state=open]:sally-bg-secondary sally-cursor-pointer hover:sally-bg-gray-400/20 sally-p-1"
      >
        <X className="sally-h-4 sally-w-4" />
        <span className="sally-sr-only">Close</span>
      </div>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sally-flex sally-flex-col sally-space-y-2 sally-text-center sm:sally-text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sally-flex sally-flex-col-reverse sm:sally-flex-row sm:sally-justify-end sm:sally-space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "sally-text-lg sally-font-semibold sally-text-foreground",
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("sally-sally-text-sm sally-text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
