import { PlayIcon, RefreshCwIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { AccessibilityCategoryType } from "./AccessibilityCategory";
import { Button } from "./ui/button";

export const RunButton = ({
  runCategoryCheck,
  category,
  loading = false,
}: {
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
            width="16"
            height="16"
            className={cn("!animate-spin", !loading && "!hidden")}
          />
          <PlayIcon
            width="16"
            height="16"
            className={cn(loading && "!hidden")}
          />
          Run {category} checks
        </div>
      </Button>
    </div>
  );
};
