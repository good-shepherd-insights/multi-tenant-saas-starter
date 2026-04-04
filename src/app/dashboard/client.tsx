"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import LayoutComponent from "@/features/dashboard/components/layout/dashboard-layout";
import { authClientProvider } from "@/auth/client-provider";
import { dashboardConfig } from "@/features/dashboard/config/dashboard-config";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClientProvider.signOut();
      router.push("/auth/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LayoutComponent
      pathname={pathname}
      onLogout={handleLogout}
      navItems={dashboardConfig.nav}
      footerItems={dashboardConfig.footerNav}
      title={dashboardConfig.title}
      version={dashboardConfig.version}
      rootLabel="Dashboard"
      rootHref="/dashboard"
    >
      {children}
    </LayoutComponent>
  );
}
