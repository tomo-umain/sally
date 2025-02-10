import { RabbitIcon } from "lucide-react";

export const SidebarHeader = () => {
  return (
    <div>
      <h1 className="sally-text-lg sally-flex sally-gap-2 sally-items-center sally-lowercase sally-text-black">
        <RabbitIcon size="24" />
        sally
      </h1>
      <div className="sally-font-normal sally-text-sm sally-text-black/70">
        the silliest accessibility helper you've ever seen.
      </div>
    </div>
  );
};
