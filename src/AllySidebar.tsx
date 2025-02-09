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
import "./lib/tailwind.min";

function AllySidebar() {
  return (
    <Sheet defaultOpen={true}>
      <SheetContent className="!bg-white !text-black !z-[5000] !overflow-y-scroll animate-slide-in-from-right">
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

export default AllySidebar;
