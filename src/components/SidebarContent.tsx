import { useState } from "react";
import { checkAccessibility } from "../lib/checks";
import "../lib/tailwind.min";
import {
  AccessibilityCategory,
  AccessibilityCategoryType,
} from "./AccessibilityCategory";
import { AccessibilityViolation } from "./Violation";

export interface AccessibilityReport {
  aria: AccessibilityIssue[];
  structure: AccessibilityIssue[];
  contrast: AccessibilityIssue[];
}

export interface AccessibilityIssue {
  severity: "error" | "warning";
  message: string;
  element: string;
  outerHTML?: string;
  impact: string;
  help: string;
}

export interface AccessibilityViolationProps {
  severity: "error" | "warning";
  message: string;
  element?: string;
  outerHTML?: string;
  impact?: string;
  help?: string;
}

export function SidebarContent() {
  const [violations, setViolations] = useState<AccessibilityReport>({
    aria: [],
    structure: [],
    contrast: [],
  });

  const [hasRun, setHasRun] = useState({
    aria: false,
    structure: false,
    contrast: false,
  });

  const [loading, setLoading] = useState({
    aria: false,
    structure: false,
    contrast: false,
  });

  const runCategoryCheck = (category: AccessibilityCategoryType) => {
    const issues = checkAccessibility(category);

    setLoading((prev) => ({
      ...prev,
      [category]: true,
    }));

    setViolations((prev) => ({
      ...prev,
      [category]: issues[category],
    }));

    setHasRun((prev) => ({
      ...prev,
      [category]: true,
    }));

    setTimeout(() => {
      setLoading((prev) => ({
        ...prev,
        [category]: false,
      }));
    }, 300);
  };

  return (
    <div className="!flex !flex-col !gap-4" id="accessibility-sidebar">
      <AccessibilityCategory
        category="structure"
        count={violations.structure.length}
        loading={loading.structure}
        runCategoryCheck={runCategoryCheck}
        hasRun={hasRun}
      >
        {violations.structure.map(
          (violation: AccessibilityViolationProps, index) => (
            <AccessibilityViolation key={index} {...violation} />
          )
        )}
      </AccessibilityCategory>

      <AccessibilityCategory
        category="aria"
        count={violations.aria.length}
        loading={loading.aria}
        runCategoryCheck={runCategoryCheck}
        hasRun={hasRun}
      >
        {violations.aria.map(
          (violation: AccessibilityViolationProps, index) => (
            <AccessibilityViolation key={index} {...violation} />
          )
        )}
      </AccessibilityCategory>

      <AccessibilityCategory
        category="contrast"
        count={violations.contrast.length}
        loading={loading.contrast}
        runCategoryCheck={runCategoryCheck}
        hasRun={hasRun}
      >
        {violations.contrast.map(
          (violation: AccessibilityViolationProps, index) => (
            <AccessibilityViolation key={index} {...violation} />
          )
        )}
      </AccessibilityCategory>
    </div>
  );
}
