import { RefreshCwIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { AccessibilityCategoryType } from "./AccessibilityCategory";
import { Button } from "./ui/button";

export const RunButton = ({
  icon,
  runCategoryCheck,
  category,
  loading = false,
}: {
  icon: React.ReactNode;
  runCategoryCheck: (category: AccessibilityCategoryType) => void;
  category: AccessibilityCategoryType;
  loading?: boolean;
}) => {
  return (
    <div>
      <Button
        asChild
        onClick={() => runCategoryCheck(category)}
        className="sally-cursor-pointer sally-rounded-lg"
      >
        <div className="sally-flex sally-gap-2 sally-items-center">
          <RefreshCwIcon
            size="16"
            className={cn("sally-animate-spin", !loading && "sally-hidden")}
          />
          {icon}
          run {category} checks
        </div>
      </Button>
    </div>
  );
};
