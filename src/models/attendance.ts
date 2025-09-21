import type { RecordId } from "surrealdb";

export type Attendance = {
  id: RecordId<'attendance'>;
  in: RecordId<"student">;
  out: RecordId<"class">;
  date: Date;
};

export function getLabel(_item: Attendance) {
  return "";
}

export function onSort(_a: Attendance, _b: Attendance) {
  return 0;
}
