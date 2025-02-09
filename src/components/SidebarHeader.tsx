import { PersonStandingIcon } from "lucide-react";

export const SidebarHeader = () => {
  return (
    <h1 className="!text-lg !flex !gap-2 !items-center !lowercase !text-black">
      <PersonStandingIcon width="24" height="24" />
      ally-sidebar
    </h1>
  );
};
