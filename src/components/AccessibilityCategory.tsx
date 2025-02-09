import { cn } from "../lib/utils";
import { RunButton } from "./RunButton";
import { TotalIssues } from "./TotalIssues";

export type AccessibilityCategoryType = "aria" | "structure" | "contrast";

export interface AccessibilityCategoryProps {
  category: AccessibilityCategoryType;
  children: React.ReactNode;
  count?: number;
  loading?: boolean;
  runCategoryCheck: (category: AccessibilityCategoryType) => void;
  hasRun: { aria: boolean; structure: boolean; contrast: boolean };
}

export function AccessibilityCategory({
  category,
  children,
  count,
  loading,
  runCategoryCheck,
  hasRun,
}: AccessibilityCategoryProps) {
  return (
    <div className="!flex !flex-col !gap-4 mt-4">
      <RunButton
        runCategoryCheck={runCategoryCheck}
        category={category}
        loading={loading}
      />

      {!loading && hasRun[category] && (
        <TotalIssues hasRun={hasRun[category]} totalIssues={count || 0} />
      )}

      <div className={cn("!flex !flex-col !gap-2")}>
        {!loading && count && count > 0 ? children : null}
      </div>
    </div>
  );
}
