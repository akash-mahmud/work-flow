"use client";
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const routes = [
  {
    href: "",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];
const DesktopSidebar = () => {
  const pathName = usePathname();
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathName.includes(route.href)
    ) || routes[0];
  return (
    <div
      className=" hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden bg-primary/5 dark:bg-secondary/30 dark:text-foreground
    text-muted-foreground border-r-2  border-separate
    "
    >
      <div className=" flex items-center justify-center gap-2 border-b p-4 border-separate ">
        <Logo />
      </div>
      <div className="p-2">TODO CREDITS</div>
      <div className="flex flex-col p-2">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sideBarActiveItem"
                  : "sideBarItem",
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export function MobileSidebar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathName.includes(route.href)
    ) || routes[0];
  return (
    // md:hidden
    <div
      className=" block border-separate bg-background 
    md:hidden
    "
    >
      <nav className=" container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px space-y-4]"
            side={"left"}
          >
            <Logo />
            <div className="flex flex-col gap-1 mt-5">
              {routes.map((route) => (
                <Link
                  href={route.href}
                  onClick={() => setIsOpen((prev) => !prev)}
                  key={route.href}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href
                        ? "sideBarActiveItem"
                        : "sideBarItem",
                  })}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
export default DesktopSidebar;
