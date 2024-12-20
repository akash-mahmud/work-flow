import DesktopSidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className=" flex h-screen">
          <DesktopSidebar/>
      <div className="flex flex-1 flex-col min-h-screen">
        <header className=" flex items-center justify-between pc-6 py-4 h-[50px] container">
          Work Flow
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
