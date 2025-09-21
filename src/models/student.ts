import type { RecordId } from "surrealdb";

export type Student = {
  id: RecordId<"student">;
  name: string;
};

export function getLabel(item: Student) {
  return item.name;
}

export function onSort(a: Student, b: Student) {
  return a.name.localeCompare(b.name);
}
