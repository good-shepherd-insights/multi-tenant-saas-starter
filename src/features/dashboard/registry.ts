import { LayoutDashboard, Users, Shield, Mail } from "lucide-react";
import type { FeatureMetadata } from "@/lib/registry";

export const dashboardMetadata: FeatureMetadata = {
  id: "dashboard",
  name: "Dashboard",
  navigation: [
    {
      href: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      position: "sidebar",
    },
  ],
  quickActions: [
    { href: "/auth/register", label: "Create Account", icon: Users },
    { href: "/admin", label: "Admin Panel", icon: Shield },
    {
      href: "https://github.com/good-shepherd-insights/multi-tenant-saas-starter",
      label: "Documentation",
      icon: Mail,
      external: true,
    },
  ],
};
