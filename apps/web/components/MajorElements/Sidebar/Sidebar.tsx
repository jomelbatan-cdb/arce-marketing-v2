"use client";

import { useState } from "react";
import SidebarItem from "./SidebarItem";
import {
  Home,
  ShoppingCart,
  User,
  Settings,
  Menu,
  Package,
  GitBranchPlus,
} from "lucide-react";
import Image from "next/image";
import { arceAssets } from "@/constant";

const items = [
  { label: "Dashboard", icon: Home, href: "/admin" },
  { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { label: "Products", icon: Package, href: "/admin/products" },
  { label: "Variations", icon: GitBranchPlus, href: "/admin/variations" },
  { label: "Customers", icon: User, href: "/admin/users" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar() {
  return (
    <div
      className={`
        h-screen border-r bg-primary-pastel flex flex-col
        transition-[width] duration-300 ease-in-out
        w-64
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Image
          src={arceAssets.ARCE}
          alt="ARCE Logo"
          className="h-8 md:h-8 w-fit transition-opacity duration-300"
        />
      </div>

      {/* Menu Items */}
      <nav className="mt-4 flex flex-col gap-2 px-2">
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </nav>
    </div>
  );
}
