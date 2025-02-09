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
        onClick={() => runCategoryCheck(category)}
        className="cursor-pointer"
      >
        <div className="!flex !gap-2 !items-center">
          <RefreshCwIcon
            size="16"
            className={cn("!animate-spin", !loading && "!hidden")}
          />
          {icon}
          run {category} checks
        </div>
      </Button>
    </div>
  );
};
