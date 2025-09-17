import { memo } from "react";
import * as lucideIcons from "lucide-react";
import type { MenuItemBaseProps } from "./types";

const MenuItemBase = memo(({ onClick, icon, text }: MenuItemBaseProps) => {
  const Icon = lucideIcons[icon] as React.ElementType;
  return (
    <div
      className="flex flex-col w-10 items-center gap-1 cursor-pointer"
      onClick={onClick}
    >
      <Icon />
      <span className="text-gray-400 text-xs">{text}</span>
    </div>
  );
});

export default MenuItemBase;
