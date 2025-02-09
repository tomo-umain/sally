import {
  CircleAlertIcon,
  SquareCodeIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AccessibilityIssue } from "./SidebarContent";

const ViolationIcon = ({
  severity,
}: {
  severity: AccessibilityIssue["severity"];
}) => {
  if (severity === "warning") return <CircleAlertIcon size={18} />;
  if (severity === "error") return <TriangleAlertIcon size={18} />;
  if (severity === "info") return <TriangleAlertIcon size={18} />;
  return null;
};

export function AccessibilityViolation({
  severity,
  message,
  element,
  outerHTML,
  impact,
  help,
  icon,
}: AccessibilityIssue) {
  const variant = severity === "error" ? "destructive" : "warning";

  return (
    <Alert variant={variant} className="animate-fade-in">
      <ViolationIcon severity={severity} />
      <AlertTitle className="!flex !flex-row !items-center !gap-2">
        {message}
        {element && (
          <div className="!font-mono !text-xs !opacity-80">{element}</div>
        )}
      </AlertTitle>
      <AlertDescription className="!text-black/70">
        {impact && <p className="!mt-2 !text-sm">{impact}</p>}
        {help && (
          <p className="!mt-2 !text-sm">
            {help} {icon && icon}
          </p>
        )}

        {!!outerHTML && (
          <details className="!mt-2">
            <summary className="!cursor-pointer !flex !flex-row !items-center !gap-1 !opacity-80">
              <SquareCodeIcon size={16} /> see HTML
            </summary>

            <pre className="!text-xs !overflow-x-auto !p-2 !rounded-lg !whitespace-pre-wrap !break-all bg-black/5 !mt-2">
              {outerHTML}
            </pre>
          </details>
        )}
      </AlertDescription>
    </Alert>
  );
}
