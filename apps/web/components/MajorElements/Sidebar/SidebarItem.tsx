import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export default function SidebarItem({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center
        justify-start
        gap-3 p-3 rounded-lg hover:bg-gray-100 hover:text-primary-pastel transition-colors
      `}
    >
      <Icon size={22} />

      {/* Label fades and slides only when expanded */}
      <span
        className={`
          text-sm font-medium
          transition-all duration-300
          opacity-100 w-auto
        `}
      >
        {label}
      </span>
    </Link>
  );
}
