import {
  CameraIcon,
  CaptionsIcon,
  CroissantIcon,
  DogIcon,
  IceCreamBowlIcon,
  MapIcon,
  MoonStarIcon,
} from "lucide-react";
import { AccessibilityCategoryType } from "../components/AccessibilityCategory";
import {
  AccessibilityIssue,
  AccessibilityReport,
} from "../components/SidebarContent";
import { calculateContrastRatio, convertToALevel } from "./contrast";

const DEBUG = false;

const getSidebar = () =>
  document.getElementById("accessibility-sidebar") as HTMLElement | null;

const landmarkNames = ["header", "main", "nav", "footer"];

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

    if (DEBUG || (contrastRatio <= 4.5 && contrastRatio !== 1)) {
      return {
        severity: "error" as AccessibilityIssue["severity"],
        message: `low contrast text - (${contrastRatio}) ${convertToALevel(
          contrastRatio
        )}`,
        element: `<${element.tagName.toLowerCase()}>`,
        outerHTML: element.outerHTML,
        impact: "this text may be difficult to read for certain folks.",
        help: "ensure a contrast ratio of at least 4.5 to follow the WCAG, a standard so good that even dogs can read it.",
        icon: <DogIcon size={16} className="sally-inline" />,
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

    if (!DEBUG && !isValidElement) return;

    return {
      severity: "error" as AccessibilityIssue["severity"],
      message: "interactive element missing accessible name",
      element: `<${element.tagName.toLowerCase()}>`,
      outerHTML: element.outerHTML,
      impact: "screen readers cannot identify the purpose of the element.",
      help: "add aria-label, aria-labelledby, or visible text content. unless its a decorative element, then, uh. nevermind.",
      icon: <CroissantIcon size={16} className="sally-inline" />,
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

      if (DEBUG || (!hasLabel && !element.hasAttribute("aria-label"))) {
        issues.aria.push({
          severity: "error",
          message: "form control missing label",
          element: `<${element.tagName.toLowerCase()}>`,
          outerHTML: element.outerHTML,
          impact: "screen readers cannot identify the input purpose",
          help: `add a label element with matching "for" attribute or aria-label. don't do it for the gram, do it for the screen readers.`,
          icon: <CameraIcon size={16} className="sally-inline" />,
        });
      }
    });

    getAllImages().forEach((element) => {
      // check alt text for images
      if (isElementInsideSidebar(element)) return;

      if (DEBUG || !element.hasAttribute("alt")) {
        issues.aria.push({
          severity: "warning",
          message: "image missing alt text",
          element: "<img>",
          outerHTML: element.outerHTML,
          impact: "screen readers cannot describe the image.",
          help: "add alt attribute to provide image description, if image is not decorative. an image is only as good as the caption.",
          icon: <CaptionsIcon size={16} className="sally-inline" />,
        });
      }
    });

    getAllFocusableElements().forEach((element) => {
      // check focusable elements
      if (isElementInsideSidebar(element)) return;

      if (DEBUG || element.tabIndex < 0) {
        issues.aria.push({
          severity: "warning",
          message: "element not focusable via keyboard",
          element: `<${element.tagName.toLowerCase()}>`,
          outerHTML: element.outerHTML,
          impact: "element cannot be accessed via keyboard.",
          help: "ensure element is focusable via keyboard for better accessibility. why? imagine trying to find your charger in a pitch black room, not fun.",
          icon: <MoonStarIcon size={16} className="sally-inline" />,
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

        if (DEBUG || index > 0) {
          const prevLevel = parseInt(elements[index - 1].tagName[1]);

          if (DEBUG || currentLevel > prevLevel + 1) {
            issues.structure.push({
              severity: "warning",
              message: "skipped heading level",
              element: `<${element.tagName.toLowerCase()}>`,
              outerHTML: element.outerHTML,
              impact:
                "this document structure may raise some confused eyebrows!",
              help: `expected h${
                prevLevel + 1
              }, found h${currentLevel}. try not to skip heading levels. you wouldn't go straight to dessert, would you?`,
              icon: <IceCreamBowlIcon size={16} className="sally-inline" />,
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
        DEBUG ||
        !landmarks.some(
          (element) =>
            element.tagName.toLowerCase() === landmark &&
            !isElementInsideSidebar(element)
        )
      ) {
        issues.structure.push({
          severity: "warning",
          message: "missing landmark region",
          element: `<${landmark}>`,
          impact:
            "aw, this is awkward, but screen readers may not navigate correctly with the current setup.",
          help: `consider adding an <${landmark}> element to define the region. landmark regions are like a mini-map for screen readers.`,
          icon: <MapIcon size={16} className="sally-inline" />,
        });
      }
    });
  }

  return issues;
};
