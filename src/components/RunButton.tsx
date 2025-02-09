import { PlayIcon, RefreshCwIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { AccessibilityCategoryType } from "./AccessibilityCategory";

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
      <button
        onClick={() => runCategoryCheck(category)}
        className="!rounded border !border-gray-300 !bg-white !px-4 !py-2 !text-sm !font-medium !text-gray-700 !shadow-sm hover:!bg-gray-50 focus:!outline-none focus:!ring-2 focus:!ring-indigo-500 focus:!ring-offset-2 !flex !gap-2 !items-center cursor-pointer"
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
      </button>
    </div>
  );
};
