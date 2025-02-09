import { AccessibilityCategoryType } from "../components/AccessibilityCategory";
import {
  AccessibilityReport,
  AccessibilityViolationProps,
} from "../components/SidebarContent";
import { calculateContrastRatio, convertToALevel } from "./contrast";

const getSidebar = () =>
  document.getElementById("accessibility-sidebar") as HTMLElement | null;

const landmarkNames = ["header", "main", "nav", "footer", "aside"];

const getAllLandmarks = () =>
  Array.from(
    document.querySelectorAll(landmarkNames.join(","))
  ) as HTMLElement[];

const getAllImages = () =>
  document.querySelectorAll("img") as NodeListOf<HTMLImageElement>;

const getAllContrastElements = () =>
  document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, span, a, button, li, td, th, label, input, svg"
  ) as NodeListOf<HTMLElement>;

const getAllInteractiveElements = () =>
  document.querySelectorAll(
    "input, select, textarea"
  ) as NodeListOf<HTMLElement>;

const getAllFormControlElements = () =>
  document.querySelectorAll(
    "input, select, textarea"
  ) as NodeListOf<HTMLElement>;

const getAllHeadings = () =>
  document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6"
  ) as NodeListOf<HTMLElement>;

const getAllLabels = () => Array.from(document.querySelectorAll("label"));

const getAllFocusableElements = () =>
  document.querySelectorAll(
    "a, button, input, select, textarea"
  ) as NodeListOf<HTMLElement>;

const isElementInsideSidebar = (element: HTMLElement) => {
  const sidebar = getSidebar();
  return sidebar && sidebar.contains(element);
};

const checkContrast = (element: HTMLElement) => {
  try {
    const bgColor = window.getComputedStyle(element).backgroundColor;
    const textColor = window.getComputedStyle(element).color;

    const contrastRatio = Number(
      calculateContrastRatio(bgColor, textColor).toFixed(1)
    );

    if (contrastRatio <= 4.5 && contrastRatio !== 1) {
      return {
        severity: "error" as AccessibilityViolationProps["severity"],
        message: `Low contrast text - (${contrastRatio}) ${convertToALevel(
          contrastRatio
        )}`,
        element: `<${element.tagName.toLowerCase()}>`,
        outerHTML: element.outerHTML,
        impact: "Critical - Text may be difficult to read",
        help: "Ensure a contrast ratio of at least 4.5",
      };
    }
  } catch (error) {
    console.log(error);
  }
};

const checkAriaLabels = (element: HTMLElement) => {
  try {
    const isValidElement =
      (element.tagName === "BUTTON" ||
        element.tagName === "A" ||
        element.hasAttribute("role")) &&
      !element.hasAttribute("aria-label") &&
      !element.hasAttribute("aria-labelledby") &&
      element.tagName !== "IFRAME" &&
      !element.textContent?.trim();

    if (!isValidElement) return;

    return {
      severity: "error" as AccessibilityViolationProps["severity"],
      message: "Interactive element missing accessible name",
      element: `<${element.tagName.toLowerCase()}>`,
      outerHTML: element.outerHTML,
      impact: "Critical - Screen readers cannot identify the purpose",
      help: "Add aria-label, aria-labelledby, or visible text content",
    };
  } catch (error) {
    console.log(error);
  }
};

export const checkAccessibility = (
  category?: AccessibilityCategoryType
): AccessibilityReport => {
  const issues: AccessibilityReport = {
    aria: [],
    structure: [],
    contrast: [],
  };

  if (category === "contrast") {
    // check contrast
    getAllContrastElements().forEach((element) => {
      if (isElementInsideSidebar(element)) return;

      const issue = checkContrast(element);
      if (issue) issues.contrast.push(issue);
    });
  }

  if (category === "aria") {
    const labels = getAllLabels();

    getAllInteractiveElements().forEach((element) => {
      // check aria labels
      if (isElementInsideSidebar(element)) return;

      const issue = checkAriaLabels(element);
      if (issue) issues.aria.push(issue);
    });

    getAllFormControlElements().forEach((element) => {
      // check form control labels
      if (isElementInsideSidebar(element)) return;

      const hasLabel = labels.some((label) => label.htmlFor === element.id);

      if (!hasLabel && !element.hasAttribute("aria-label")) {
        issues.aria.push({
          severity: "error",
          message: "Form control missing label",
          element: `<${element.tagName.toLowerCase()}>`,
          outerHTML: element.outerHTML,
          impact: "Critical - Screen readers cannot identify the input purpose",
          help: 'Add a label element with matching "for" attribute or aria-label',
        });
      }
    });

    getAllImages().forEach((element) => {
      // check alt text for images
      if (isElementInsideSidebar(element)) return;

      if (!element.hasAttribute("alt")) {
        issues.aria.push({
          severity: "warning",
          message: "Image missing alt text",
          element: "<img>",
          outerHTML: element.outerHTML,
          impact: "Critical - Screen readers cannot describe the image",
          help: "Add alt attribute to provide image description if image is not decorative",
        });
      }
    });

    getAllFocusableElements().forEach((element) => {
      // check focusable elements
      if (isElementInsideSidebar(element)) return;

      if (element.tabIndex < 0) {
        issues.aria.push({
          severity: "warning",
          message: "Element not focusable via keyboard",
          element: `<${element.tagName.toLowerCase()}>`,
          outerHTML: element.outerHTML,
          impact: "Critical - Element cannot be accessed via keyboard",
          help: "Ensure element is focusable via keyboard",
        });
      }
    });
  }

  if (category === "structure") {
    const elements = getAllHeadings();

    elements.forEach((element, index) => {
      // check heading levels
      if (isElementInsideSidebar(element)) return;

      try {
        const currentLevel = parseInt(element.tagName[1]);

        if (index > 0) {
          const prevLevel = parseInt(elements[index - 1].tagName[1]);

          if (currentLevel > prevLevel + 1) {
            issues.structure.push({
              severity: "warning",
              message: "Skipped heading level",
              element: `<${element.tagName.toLowerCase()}>`,
              outerHTML: element.outerHTML,
              impact: "Moderate - Document structure may be confusing",
              help: `Don't skip heading levels. Expected h${
                prevLevel + 1
              }, found h${currentLevel}`,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

    const landmarks = getAllLandmarks();
    landmarkNames.forEach((landmark) => {
      // check landmark regions
      if (
        !landmarks.some(
          (element) =>
            element.tagName.toLowerCase() === landmark &&
            !isElementInsideSidebar(element)
        )
      ) {
        issues.structure.push({
          severity: "warning",
          message: "Missing landmark region",
          element: `<${landmark}>`,
          impact: "Moderate - Screen readers may not navigate correctly",
          help: `Add a <${landmark}> element to define the region`,
        });
      }
    });
  }

  return issues;
};
