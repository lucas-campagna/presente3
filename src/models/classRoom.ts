import type { RecordId } from "surrealdb";

export type ClassRoom = {
  id: RecordId<'class'>;
  name: string;
  active: boolean;
};

export function getLabel(item: ClassRoom) {
  return item.name;
}

export function onSort(a: ClassRoom, b: ClassRoom) {
  return a.name.localeCompare(b.name);
}