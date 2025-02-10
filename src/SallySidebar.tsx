import "../src/index.css";
import { SidebarContent } from "./components/SidebarContent";
import { SidebarHeader } from "./components/SidebarHeader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./components/ui/sheet";

function SallySidebar() {
  return (
    <Sheet defaultOpen={true}>
      <SheetContent className="sally-text-black sally-bg-white sally-z-[5000] sally-overflow-y-scroll sally-animate-slide-in-from-right">
        <SheetHeader>
          <SheetTitle>
            <SidebarHeader />
          </SheetTitle>
          <SheetDescription>
            <SidebarContent />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default SallySidebar;
