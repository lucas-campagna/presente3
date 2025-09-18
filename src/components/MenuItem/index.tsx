import BaseMenuItem from "./base";
import { allowedItems } from "./constants";
import type { MenuItemProps, MenuItemBaseProps } from "./types";
export type { MenuItemProps, MenuItemBaseProps } from "./types";

const MenuItem = (props: MenuItemProps) => (
  <BaseMenuItem
    {...({ ...allowedItems[props.type], ...props } as MenuItemBaseProps)}
  />
);

export default MenuItem;
