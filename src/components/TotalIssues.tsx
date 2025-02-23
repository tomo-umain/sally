import { CircleCheckIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { cn } from "../lib/utils";
import { AccessibilityCategoryType } from "./AccessibilityCategory";

export const TotalIssues = ({
  totalIssues,
  className,
  category,
}: {
  totalIssues: number;
  className?: string;
  category: AccessibilityCategoryType;
}) => {
  const variant = totalIssues > 0 ? "destructive" : "success";

  return (
    <Alert variant={variant} className={cn("sally-animate-fade-in", className)}>
      <AlertDescription className="sally-flex sally-items-center sally-gap-2">
        {variant === "success" ? (
          <CircleCheckIcon size={18} className="sally-text-green-700" />
        ) : (
          <TriangleAlertIcon size={18} />
        )}
        {`${totalIssues} ${category} issue${totalIssues === 1 ? "" : "s"}`}
      </AlertDescription>
    </Alert>
  );
};
