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
  icon: React.ReactNode;
}

export function AccessibilityCategory({
  category,
  children,
  count,
  loading,
  runCategoryCheck,
  hasRun,
  icon,
}: AccessibilityCategoryProps) {
  return (
    <div className="sally-flex sally-flex-col sally-gap-4 sally-mt-4">
      <RunButton
        icon={icon}
        runCategoryCheck={runCategoryCheck}
        category={category}
        loading={loading}
      />

      {!loading && hasRun[category] && (
        <TotalIssues totalIssues={count || 0} category={category} />
      )}

      {!loading && count && count > 0 ? (
        <div className={cn("sally-flex sally-flex-col sally-gap-2")}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
