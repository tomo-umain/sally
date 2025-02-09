import { CircleCheckIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertTitle } from "../components/ui/alert";

export const TotalIssues = ({
  hasRun,
  totalIssues,
  className,
}: {
  hasRun: boolean;
  totalIssues: number;
  className?: string;
}) => {
  const variant = totalIssues > 0 ? "destructive" : "success";

  return (
    <Alert variant={variant} className="animate-fade-in">
      <AlertTitle className="flex items-center gap-2">
        {variant === "success" ? (
          <CircleCheckIcon size={18} className="text-green-700" />
        ) : (
          <TriangleAlertIcon size={18} />
        )}
        {`${totalIssues} issue${totalIssues === 1 ? "" : "s"} to address`}
      </AlertTitle>
    </Alert>
  );
};
