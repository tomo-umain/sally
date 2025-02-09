import { RabbitIcon } from "lucide-react";

export const SidebarHeader = () => {
  return (
    <div>
      <h1 className="!text-lg !flex !gap-2 !items-center !lowercase !text-black">
        <RabbitIcon size="24" />
        sally
      </h1>
      <div className="font-normal text-sm text-black/70">
        the silliest accessibility helper you've ever seen.
      </div>
    </div>
  );
};
