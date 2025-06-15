"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { firstSection, secondSection } from "../../utils/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import DashboardUserButton from "./dashboard-user-button";

type Props = {};

const DashboardSidebar = (props: Props) => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image
            src="/logo.svg"
            alt="Miva AI Logo - AI Meeting Assistant"
            width={36}
            height={36}
          />
          <p className="font-heading text-2xl font-semibold">Miva AI</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5d6b68]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => {
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#13d197]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        pathname === item.href &&
                          "bg-linear-to-r/oklch border-[#13d197]/10"
                      )}
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span className="text-base font-medium tracking-tight">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="opacity-10 text-[#5d6b68]" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => {
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#13d197]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                        pathname === item.href &&
                          "bg-linear-to-r/oklch border-[#13d197]/10"
                      )}
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span className="text-base font-medium tracking-tight">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
           <DashboardUserButton />   
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
