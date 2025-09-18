import * as lucideIcons from "lucide-react";
import { allowedItems } from "./constants";

export type MenuItemBaseProps = {
  type: keyof typeof allowedItems;
  text: string;
  icon: keyof typeof lucideIcons;
  onClick?: () => void;
};

export type MenuItemProps = Omit<Omit<MenuItemBaseProps, "text">, "icon">;
