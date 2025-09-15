import { memo } from "react";
import * as lucideIcons from "lucide-react";

export type MenuType = {
  type: "search" | "order" | "delete";
  text: string;
  icon: keyof typeof lucideIcons;
  onClick?: () => void;
};

const MenuItem = memo(({ onClick, icon, text }: MenuType) => {
  const Icon = lucideIcons[icon] as React.ElementType;
  return (
    <div className="flex flex-col w-10 items-center gap-1 cursor-pointer" onClick={onClick}>
      <Icon/>
      <span className="text-gray-400 text-xs">{text}</span>
    </div>
  );
});

export default MenuItem;
