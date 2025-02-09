import { CircleAlertIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AccessibilityViolationProps } from "./SidebarContent";

const ViolationIcon = ({
  severity,
}: {
  severity: AccessibilityViolationProps["severity"];
}) => {
  if (severity === "warning") return <CircleAlertIcon size={18} />;
  if (severity === "error") return <TriangleAlertIcon size={18} />;

  return null;
};

export function AccessibilityViolation({
  severity,
  message,
  element,
  outerHTML,
  impact,
  help,
}: AccessibilityViolationProps) {
  const variant = severity === "error" ? "destructive" : "warning";

  return (
    <Alert variant={variant} className="animate-fade-in">
      <ViolationIcon severity={severity} />
      <AlertTitle>{message}</AlertTitle>
      <AlertDescription className="!text-black/70">
        {element && (
          <div className="!mt-1 !font-mono !text-sm !opacity-80">{element}</div>
        )}

        {impact && <p className="!mt-2 !text-sm">Impact: {impact}</p>}

        {help && <p className="!mt-2 !text-sm">Fix: {help}</p>}

        {!!outerHTML && (
          <details>
            <summary className="!cursor-pointer">Element</summary>
            <pre className="!text-xs !overflow-x-auto !bg-gray-50/90 !p-2 !rounded-lg !whitespace-pre-wrap !break-all">
              {outerHTML}
            </pre>
          </details>
        )}
      </AlertDescription>
    </Alert>
  );
}
