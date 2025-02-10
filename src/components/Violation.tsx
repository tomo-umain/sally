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
      <AlertTitle className="sally-flex sally-flex-row sally-items-center sally-gap-2">
        {message}
        {element && (
          <div className="sally-font-mono sally-text-xs sally-opacity-80">
            {element}
          </div>
        )}
      </AlertTitle>
      <AlertDescription className="sally-text-black/70">
        {impact && <p className="sally-mt-2 sally-text-sm">{impact}</p>}
        {help && (
          <p className="sally-mt-2 sally-text-sm">
            {help} {icon && icon}
          </p>
        )}

        {!!outerHTML && (
          <details className="sally-mt-2">
            <summary className="sally-cursor-pointer sally-flex sally-flex-row sally-items-center sally-gap-1 sally-opacity-80">
              <SquareCodeIcon size={16} /> see HTML
            </summary>

            <pre className="see-html sally-text-xs sally-overflow-x-auto sally-p-2 sally-rounded-lg sally-whitespace-pre-wrap sally-break-all sally-mt-2">
              {outerHTML}
            </pre>
          </details>
        )}
      </AlertDescription>
    </Alert>
  );
}
