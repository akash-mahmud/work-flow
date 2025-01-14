import Logo from "@/components/Logo";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex flex-col h-screen">
      {children}

      <Separator />
      <footer className=" flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize=" text-xl" />
        <ThemeModeToggle />
      </footer>
    </div>
  );
};

export default layout;
