import { LayoutDashboard, Users, CircleDollarSign, Settings } from "lucide-react";

/** Where the full version of Pulse is sold. Delete PRO_URL and proNav if you don't need them. */
export const PRO_URL = "https://www.bontemplates.com/product";

export const mainNav = [{ href: "/", label: "Overview", icon: LayoutDashboard }] as const;

/** Pages available in Pulse Pro. Shown in the sidebar as upgrade links. */
export const proNav = [
  { label: "Customers", icon: Users },
  { label: "Revenue", icon: CircleDollarSign },
  { label: "Settings", icon: Settings },
] as const;
